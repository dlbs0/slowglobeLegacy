<template>
  <div class="startSeg"></div>
  <div ref="entireComponent">
    <div class="mapIntToggle" @click="setMapInteractive(!mapInteractive)">
      <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
      <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
      {{ mapInteractive ? 'Lock' : 'Unlock' }} Map
    </div>
    <div v-if="currentTime != ''" class="timeBox">
      <iconify-icon icon="mdi:clock" inline></iconify-icon> {{ currentTime }}
    </div>
    <div
      v-if="overview"
      class="mapCutout boundsFrame"
      v-intersection-observer="[onTopBoundsFrame, { rootMargin: '-45% 0px -45% 0px' }]"
    ></div>
    <div class="mapCutout" v-intersection-observer="onIntersectionObserver" ref="el"></div>
  </div>
  <div class="endSeg"></div>
</template>

<script setup lang="ts">
import { useHikingLayers, fitBounds, getMap, useMapInteractive } from '@/functions/map'
import type { Feature, LineString, Position } from 'geojson'
import {
  bbox,
  bearing,
  bezierSpline,
  featureCollection,
  length,
  lineSlice,
  lineSliceAlong,
  point,
  simplify
} from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useElementBounding, useIntersectionObserver, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { CameraOptions, GeoJSONSource } from 'mapbox-gl'
import { addMinutes, differenceInMinutes, parseISO } from 'date-fns'
import { findClosestFrame } from '@/functions/timeSearch'
import { formatInTimeZone } from 'date-fns-tz'
const { setMapInteractive, mapInteractive } = useMapInteractive()
const { showHikingLayers } = useHikingLayers()

const props = defineProps<{
  geometry?: Feature<LineString>
  follow?: boolean
  overview?: boolean
  overviewPitch?: number
  useTime?: boolean
  showTime?: boolean
}>()

const followPitch = 70
const followZoom = 14.5

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

const initialCameraPosition: CameraOptions = {}

const randomId = Math.random().toString(36).slice(2)

const entireComponent = ref(null)
const el = ref(null)
const { top, height } = useElementBounding(el)
const { height: winHeight } = useWindowSize()

const scrollProgress = computed(() => {
  if (!shouldAnimate.value) return percentShown
  const position = -top.value
  const endStop = height.value - Math.floor(winHeight.value)
  if (position < 0) return 0
  const ratio = position / endStop
  if (ratio > 1) return 1
  return ratio
})

const preScrollProgress = computed(() => {
  if (!shouldAnimate.value || !props.follow) return 0
  const startPos = top.value - Math.floor(winHeight.value / 2)
  const ratio = -startPos / Math.floor(winHeight.value / 2)
  if (ratio > 1) return 1
  if (ratio < 0) return 0
  return ratio
})

function generateFrame() {
  if (!shouldAnimate.value) return

  const map = getMap()
  if (!map) return
  //animate from the fit bounds frame down to the start of the follow camera section
  if (preScrollProgress.value > 0 && preScrollProgress.value < 1) {
    doPreScrollAnimation()
  }
  if (scrollProgress.value === percentShown) {
    requestAnimationFrame(generateFrame)
    return
  }
  const geom = getPercGeom(fullGeometry, scrollProgress.value)
  const source = map.getSource(randomId + 'Follow') as GeoJSONSource
  if (source) {
    source.setData(geom)
  }
  percentShown = scrollProgress.value
  if (scrollProgress.value > 0 && scrollProgress.value < 1) {
    if (props.follow)
      map.jumpTo({ center: cameraPos, pitch: followPitch, zoom: followZoom, bearing: camBearing })
  }
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
  setLighting()
  requestAnimationFrame(generateFrame)
}

function setLighting() {
  return
  // const map = getMap()
  // if (!map) return
  // if (props.follow && props.useTime) {
  //   const currentLight = map.getLights() as DirectionalLightSpecification[]
  //   console.log('currentLight:', currentLight)
  //   // if (!currentLight || !currentLight[0]) return
  //   // let startColour = { h: 0, s: 0, l: 100 }
  //   let startColour = { h: 33, s: 98, l: 77 }
  //   // let endColour = { h: 33, s: 98, l: 77 }
  //   let endColour = { h: 0, s: 0, l: 29 }
  //   //smoothly transition between the colours based on percentShown
  //   let colour = {
  //     h: (endColour.h - startColour.h) * percentShown + startColour.h,
  //     s: (endColour.s - startColour.s) * percentShown + startColour.s,
  //     l: (endColour.l - startColour.l) * percentShown + startColour.l
  //   }

  //   console.log(
  //     '`hsl(${colour.h}, ${colour.s}%, ${colour.l}%)`:',
  //     `hsl(${colour.h}, ${colour.s}%, ${colour.l}%)`
  //   )
  //   map.setLights([
  //     {
  //       id: 'sun_light',
  //       type: 'directional',
  //       properties: {
  //         color: `hsl(${colour.h}, ${colour.s}%, ${colour.l}%)`,
  //         // color: 'rgba(255.0, 0.0, 0.0, 1.0)',
  //         intensity: 0.9,
  //         direction: [120, 40.0],
  //         'cast-shadows': true,
  //         'shadow-intensity': 1
  //       }
  //     },
  //     {
  //       id: 'ambient_l',
  //       type: 'ambient',
  //       properties: {
  //         color: `hsl(${colour.h}, ${colour.s}%, ${colour.l}%)`,
  //         // color: 'rgba(255.0, 0.0, 0.0, 1.0)',
  //         intensity: 0.1
  //       }
  //     }
  //   ])

  //   const arr = [
  //     'match',
  //     ['config', 'lightPreset'],
  //     'dawn',
  //     'hsl(33, 98%, 77%)',
  //     'day',
  //     'hsl(0, 0%, 100%)',
  //     'dusk',
  //     'hsl(30, 98%, 76%)',
  //     'night',
  //     'hsl(0, 0%, 29%)'
  //   ]

  // currentLight[0].properties.direction = [360 * percentShown, 40]

  // const light: DirectionalLightSpecification = {
  //   type: 'directional',
  //   properties: {
  //     direction: [360 * percentShown, 40],
  //     color: 'hsl(33, 98%, 77%)',
  //     intensity: 1,
  //     'cast-shadows': true
  //   },
  //   id: 'danlight'
  // }

  // map.setLights([light])
  // }
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
    (props.useTime || props.showTime) &&
    fullGeometry?.properties?.coordinateProperties?.times &&
    Array.isArray(fullGeometry?.properties?.coordinateProperties?.times)
  ) {
    const timeArray = geom?.properties?.coordinateProperties?.times
    if (!timeArray) return geom
    const firstDate = parseISO(timeArray[0])
    const lastDate = parseISO(timeArray[timeArray.length - 1])
    const dateDiff = differenceInMinutes(lastDate, firstDate)
    const progressDate = addMinutes(firstDate, perc * dateDiff)
    currentTime.value = formatInTimeZone(progressDate, 'Australia/Adelaide', 'HH:mm')

    if (props.useTime) {
      const coordIndexAtTime = findClosestFrame(timeArray, progressDate)
      const coord = geom.geometry.coordinates[coordIndexAtTime]

      // /find distance along line to coord, which will give us percentage distance travelled
      const progressLine = lineSlice(geom.geometry.coordinates[0], coord, geom)
      const progressLineLength = length(progressLine)
      progress = progressLineLength / fullGeometryDistance
    }
  }
  const pos = getForwardBearing(geom, fullGeometryDistance, progress)
  currentCoord = { lng: pos.location[0], lat: pos.location[1] }
  currentBearing = pos.bearing

  if (props.follow) {
    const camera = getForwardBearing(followCameraLine, followCameraLineLength, progress - 0.001)
    cameraPos = { lat: camera.location[1], lng: camera.location[0] }
    camBearing = camera.bearing
  }

  return pos.progressLine
}
function getProgress(perc: number, end?: number, start?: number) {
  return ((end ?? 0) - (start ?? 0)) * perc + (start ?? 0)
}

function doPreScrollAnimation() {
  const map = getMap()
  if (!map) return
  const intCamCent: {
    lat: number
    lng: number
  } = (initialCameraPosition.center as {
    lat: number
    lng: number
  }) ?? {
    lat: 0,
    lng: 0
  }
  if (intCamCent.lat === 0 && intCamCent.lng === 0) {
    Object.assign(initialCameraPosition, {
      center: map.getCenter(),
      pitch: map.getPitch(),
      zoom: map.getZoom(),
      bearing: map.getBearing()
    })
  }

  getPercGeom(fullGeometry, 0)
  const endCamera = {
    center: cameraPos,
    pitch: followPitch,
    zoom: followZoom,
    bearing: camBearing
  }
  const currentPitch = getProgress(
    preScrollProgress.value,
    endCamera.pitch,
    initialCameraPosition.pitch
  )
  const currentZoom = getProgress(
    preScrollProgress.value,
    endCamera.zoom,
    initialCameraPosition.zoom
  )
  const currentBearing = getProgress(
    preScrollProgress.value,
    endCamera.bearing,
    initialCameraPosition.bearing
  )

  const currentLat = getProgress(preScrollProgress.value, endCamera.center.lat, intCamCent.lat)
  const currentLng = getProgress(preScrollProgress.value, endCamera.center.lng, intCamCent.lng)
  map.jumpTo({
    center: { lat: currentLat, lng: currentLng },
    pitch: currentPitch,
    zoom: currentZoom,
    bearing: currentBearing
  })
}

function onTopBoundsFrame([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    fitBounds(fullGeometry, undefined, props.overviewPitch ?? 0)
    const map = getMap()
    if (!map) return
    const bounds = bbox(fullGeometry)
    if (!bounds || bounds.length != 4) return
    Object.assign(
      initialCameraPosition,
      map.cameraForBounds(bounds, { padding: 20, pitch: props.overviewPitch ?? 0 })
    )
  }
}

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    const map = getMap()
    if (!map) return
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
          'icon-ignore-placement': true,
          // 'icon-rotate': 90,
          'icon-rotate': ['get', 'bearing'],
          // 'icon-pitch-alignment': 'viewport',
          // 'icon-pitch-alignment': 'map',
          'icon-rotation-alignment': 'map'
          // 'icon-rotation-alignment': 'viewport',
          // 'symbol-placement': 'point'
        },
        paint: {
          // 'icon-color': '#aa8c53',
          // 'icon-halo-width': 5,
          // 'icon-halo-color': '#721817',
          // 'icon-halo-blur': 0
        }
      })
    }
    shouldAnimate.value = true
    requestAnimationFrame(generateFrame)
  } else {
    generateFrame()
    shouldAnimate.value = false
  }
}

// if (props.overview) {
useIntersectionObserver(
  entireComponent,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      showLocationArrow(true)
      showHikingLayers(true)
    } else {
      showHikingLayers(false)
      showLocationArrow(false)
    }
  },
  { rootMargin: '-50% 0px -45% 0px' }
)
// }

function showLocationArrow(visible: boolean) {
  const map = getMap()
  if (!map) return
  if (map.getLayer(randomId + 'locArrow')) {
    map.setLayoutProperty(randomId + 'locArrow', 'visibility', visible ? 'visible' : 'none')
  }
}

onMounted(() => {
  if (props.geometry) {
    fullGeometry = props.geometry
    fullGeometryDistance = length(fullGeometry)
    if (props.follow) {
      followCameraLine = bezierSpline(simplify(fullGeometry, { tolerance: 0.005 }))
      followCameraLineLength = length(followCameraLine)
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
  showHikingLayers(false)
  shouldAnimate.value = false
})
</script>

<style scoped>
.startSeg {
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
  height: max(300vh, 300px);
  min-width: 200px;
  background-color: transparent;
  padding: 0;
  margin: 0;
  z-index: -10;
  position: relative;
  top: 0;
  left: 0;
}

.boundsFrame {
  height: 90vh;
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
