<template>
  <div class="startSeg"></div>
  <div>
    <div class="mapIntToggle" @click="setMapInteractive(!mapInteractive)">
      <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
      <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
      {{ mapInteractive ? 'Lock' : 'Unlock' }} Map
    </div>
    <div v-if="currentTime != ''" class="timeBox">
      <iconify-icon icon="mdi:clock" inline></iconify-icon> {{ currentTime }}
    </div>
    <div class="mapCutout" v-intersection-observer="onIntersectionObserver" ref="el"></div>
    <!-- <div class="mapIntToggle bottom" @click="setMapInteractive(!mapInteractive)">
      <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
      <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
      {{ scrollProgress }} {{ mapInteractive ? 'Lock' : 'Unlock' }} Map {{ top }} {{ y }}
      {{ height }} {{ winHeight }}
    </div> -->
  </div>
  <div class="endSeg"></div>
</template>

<script setup lang="ts">
import { fitBounds, getMap, useMapInteractive } from '@/functions/map'
import type { Feature, LineString, Position } from 'geojson'
import {
  bearing,
  bezierSpline,
  featureCollection,
  length,
  lineSlice,
  lineSliceAlong,
  point,
  rhumbBearing,
  simplify
} from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useElementBounding, useIntersectionObserver, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GeoJSONSource, RasterLayerSpecification } from 'mapbox-gl'
import { addMinutes, differenceInMinutes, format, parseISO } from 'date-fns'
import { findClosestFrame } from '@/functions/timeSearch'
import { formatInTimeZone } from 'date-fns-tz'
const { setMapInteractive, mapInteractive } = useMapInteractive()

const props = defineProps<{
  geometry?: Feature<LineString>
  zoom?: number
  pitch?: number
  follow?: boolean
  fit?: boolean
  useTime?: boolean
}>()

let fullGeometry: Feature<LineString>
let fullGeometryDistance = 0
let percentShown = 0
let shouldAnimate = ref(false)
const currentTime = ref('')
let currentCoord = { lat: 0, lng: 0 }
let currentBearing = 0
let followCameraLine: Feature<LineString>
let followCameraLineLength = 0
let cameraPos = { lat: 0, lng: 0 }
let camBearing = 0

// const { height } = useWindowSize()

const randomId = Math.random().toString(36).slice(2)

const el = ref(null)
const { top, height } = useElementBounding(el)
const { height: winHeight } = useWindowSize()

const scrollProgress = computed(() => {
  if (!shouldAnimate.value) return percentShown

  // const position = -(top.value - Math.floor(winHeight.value / 2))
  const position = -top.value
  // const endStop = height.value - Math.floor(winHeight.value / 4)
  const endStop = height.value - Math.floor(winHeight.value)
  if (position < 0) return 0
  const ratio = position / endStop
  if (ratio > 1) return 1
  return ratio
})

function generateFrame() {
  if (!shouldAnimate.value) return
  if (scrollProgress.value === percentShown) {
    requestAnimationFrame(generateFrame)
    return
  }
  const map = getMap()
  if (!map) return
  const geom = getPercGeom(fullGeometry, scrollProgress.value)
  const source = map.getSource(randomId + 'Follow') as GeoJSONSource
  if (source) {
    source.setData(geom)
  }
  // if (props.follow) map.jumpTo({ center: currentCoord, pitch: 80, zoom: 15.5 })
  // if (props.follow) map.easeTo({ center: currentCoord, pitch: 65, zoom: 15.5, duration: 1000 })
  // if (props.follow) map.jumpTo({ center: currentCoord, pitch: 65, zoom: 14.5 })
  if (props.follow) map.jumpTo({ center: cameraPos, pitch: 70, zoom: 14.5, bearing: camBearing })
  if (props.follow) {
    const locArrowSource = map.getSource(randomId + 'locArrow') as GeoJSONSource
    if (locArrowSource) {
      locArrowSource.setData(
        featureCollection([
          point([currentCoord.lng, currentCoord.lat], { bearing: currentBearing })
        ])
      )
    }
  }
  // if (props.follow)
  //   map.panTo(currentCoord, {
  //     pitch: 65,
  //     zoom: 15.5,
  //     duration: 100
  //   })
  percentShown = scrollProgress.value
  requestAnimationFrame(generateFrame)
}

function getForwardBearing(
  geom: Feature<LineString>,
  lineLength: number,
  progress: number
): {
  bearing: number
  location: Position
  progressLine: Feature<LineString>
} {
  const currentPosLine = lineSliceAlong(
    geom,
    0,
    Math.min(Math.max((progress - 0) * lineLength, 0.001), lineLength)
  )
  const forwardPosLine = lineSliceAlong(
    geom,
    0,
    Math.min(Math.max((progress + 0.01) * lineLength, 0.001), lineLength)
  )
  const currPos =
    currentPosLine.geometry.coordinates[currentPosLine.geometry.coordinates.length - 1]
  const forwardPos =
    forwardPosLine.geometry.coordinates[forwardPosLine.geometry.coordinates.length - 1]
  const forwardBearing = bearing(currPos, forwardPos)

  return {
    bearing: forwardBearing,
    location: currPos,
    progressLine: currentPosLine
  }
}

function getPercGeom(geom: Feature<LineString>, perc: number) {
  let progress = perc
  if (
    props.useTime &&
    fullGeometry?.properties?.coordinateProperties?.times &&
    Array.isArray(fullGeometry?.properties?.coordinateProperties?.times)
  ) {
    const timeArray = geom?.properties?.coordinateProperties?.times
    if (!timeArray) return geom
    const firstDate = parseISO(timeArray[0])
    const lastDate = parseISO(timeArray[timeArray.length - 1])
    const dateDiff = differenceInMinutes(lastDate, firstDate)
    const progressDate = addMinutes(firstDate, perc * dateDiff)
    // currentTime.value = format(progressDate, 'HH:mm')
    currentTime.value = formatInTimeZone(progressDate, 'Australia/Adelaide', 'HH:mm')
    const coordIndexAtTime = findClosestFrame(timeArray, progressDate)
    const coord = geom.geometry.coordinates[coordIndexAtTime]

    // /find distance along line to coord, which will give us percentage distance travelled
    const progressLine = lineSlice(geom.geometry.coordinates[0], coord, geom)
    const progressLineLength = length(progressLine)
    progress = progressLineLength / fullGeometryDistance

    // currentCoord = { lat: coord[1], lng: coord[0] }
    // const output = lineSlice(geom.geometry.coordinates[0], coord, geom)
    // return output
  }
  const pos = getForwardBearing(geom, fullGeometryDistance, progress)
  currentCoord = { lng: pos.location[0], lat: pos.location[1] }
  currentBearing = pos.bearing

  const camera = getForwardBearing(followCameraLine, followCameraLineLength, progress - 0.001)
  cameraPos = { lat: camera.location[1], lng: camera.location[0] }
  camBearing = camera.bearing

  return pos.progressLine
}

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  console.log('isIntersecting:', isIntersecting)
  if (isIntersecting) {
    const map = getMap()
    if (!map) return
    console.log(map?.getLayer('continent-label'))
    if (!map.getSource(randomId + 'Follow')) {
      map.addSource(randomId + 'Follow', {
        type: 'geojson',
        data: featureCollection([])
      })
    }
    if (!map.getLayer(randomId + 'follow-tracks')) {
      map.addLayer({
        id: randomId + 'follow-tracks',
        type: 'line',
        source: randomId + 'Follow',
        paint: {
          'line-color': 'rgb(110, 25, 25)',
          'line-width': 8
        }
      })
    }
    if (!map.getSource(randomId + 'locArrow')) {
      map.addSource(randomId + 'locArrow', {
        type: 'geojson',
        data: featureCollection([])
      })
    }
    if (!map.getLayer(randomId + 'locArrow')) {
      map.addLayer({
        id: randomId + 'locArrow',
        type: 'symbol',
        source: randomId + 'locArrow',
        layout: {
          'icon-image': 'loc-arrow',
          'icon-size': 1,
          'icon-allow-overlap': true,
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map'
        },
        paint: {
          'icon-color': '#aa8c53',
          'icon-halo-width': 5,
          'icon-halo-color': '#721817'
        }
      })
    }
    shouldAnimate.value = true
    requestAnimationFrame(generateFrame)
  } else {
    shouldAnimate.value = false
  }
}

function showLocationArrow(visible: boolean) {
  const map = getMap()
  if (!map) return
  if (map.getLayer(randomId + 'locArrow')) {
    map.setLayoutProperty(randomId + 'locArrow', 'visibility', visible ? 'visible' : 'none')
  }
}

function addHikingLayers(visible: boolean) {
  const map = getMap()
  if (!map) return
  const coolLayers = ['mapbox-satellite', 'hillshade', 'contour', 'contour-labels']
  // const coolLayers = ['hillshade', 'contour', 'contour-labels']

  coolLayers.forEach((layer) => {
    const lay = map.getLayer(layer) as RasterLayerSpecification
    if (lay) {
      map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none')
    }
  })
}

if (props.fit) {
  useIntersectionObserver(
    el,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        fitBounds(fullGeometry ?? featureCollection([]), undefined, props.pitch ?? 0)
        addHikingLayers(true)
        showLocationArrow(true)
      } else {
        addHikingLayers(false)
        showLocationArrow(false)
      }
    },
    { rootMargin: '-45% 0px -45% 0px' }
  )
}

onMounted(() => {
  if (props.geometry) {
    fullGeometry = props.geometry
    // fullGeometry = simplify(fullGeometry, { tolerance: 0.01 })
    // fullGeometry = bezierSpline(fullGeometry)
    fullGeometryDistance = length(fullGeometry)
    if (props.follow) {
      // followCameraLine = bezierSpline(simplify(fullGeometry, { tolerance: 0.01 }))
      // followCameraLine = simplify(fullGeometry, { tolerance: 0.005 })
      followCameraLine = bezierSpline(simplify(fullGeometry, { tolerance: 0.005 }))
      followCameraLineLength = length(followCameraLine)
      // const map = getMap()
      // if (!map) return
      // if (!map.getSource('fcam' + randomId)) {
      //   map.addSource('fcam' + randomId, {
      //     type: 'geojson',
      //     data: featureCollection([followCameraLine])
      //   })
      // }
      // if (!map.getLayer('fcam' + randomId)) {
      //   map.addLayer({
      //     id: 'fcam' + randomId,
      //     type: 'line',
      //     source: 'fcam' + randomId,
      //     paint: {
      //       'line-color': 'rgb(10, 255, 25)',
      //       'line-width': 8
      //     }
      //   })
      // }
    }
  }
})

onUnmounted(() => {
  const map = getMap()
  if (map) {
    if (map.getLayer(randomId + 'follow-tracks')) map.removeLayer(randomId + 'follow-tracks')
    if (map.getSource(randomId + 'Follow')) map.removeSource(randomId + 'Follow')
    if (map.getLayer(randomId + 'locArrow')) map.removeLayer(randomId + 'locArrow')
  }
  showLocationArrow(false)
  addHikingLayers(false)
})
</script>

<style scoped>
.startSeg {
  /* height: 0em; */
  --mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50%/2.38em 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
.endSeg {
  /* background-color: var(--article-background-color); */
  height: 0em;
  --mask: conic-gradient(from 130deg at top, #000000, #000000 1deg 99deg, #00000000 100deg) 50%/2.38em
    100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  position: relative;
  z-index: 10;
}
.mapCutout {
  height: max(350vh, 300px);
  min-width: 200px;
  background-color: transparent;
  padding: 0;
  margin: 0;
  /* z-index: -10; */

  z-index: -10;
  /* transform: translate(100px, -10vh); */
  position: relative;
  /* position: static; */
  top: 0;
  left: 0;
  /* pointer-events: none; */
  /* opacity: 0.9; */
}

.timeBox {
  width: max-content;
  position: sticky;
  top: calc(100vh - 4em);
  right: 0em;
  margin-left: auto;
  border-radius: 0.25em;

  padding: 0.5em;
  background-color: var(--md-sys-color-on-surface);
  color: white;
  right: 0em;
  /* color: var(--md-sys-color-on-surface); */
  font-size: 1em;
  font-family: 'Public Sans', sans-serif;
}

.mapIntToggle {
  background-color: var(--md-sys-color-surface);

  width: max-content;
  position: sticky;
  top: 4em;

  right: 0em;
  @media (width <= 900px) {
    right: 1em;
  }
  /* background-color: var(--article-background-color); */
  padding: 0.5em;
  margin-top: 1em;
  margin-left: auto;
  border-radius: 0.25em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  color: var(--md-sys-color-on-surface);
  font-size: 1em;
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  cursor: pointer;
  z-index: 10;
}

.bottom {
  top: unset;
  bottom: 40em;
}
</style>
