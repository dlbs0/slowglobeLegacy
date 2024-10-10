<template>
  <div class="startSeg"></div>
  <div class="mapIntToggle" @click="setMapInteractive(!mapInteractive)">
    <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
    <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
    {{ mapInteractive ? 'Lock' : 'Unlock' }} Map {{ currentTime }}
  </div>
  <div class="mapCutout" v-intersection-observer="onIntersectionObserver" ref="el"></div>
  <!-- <div class="mapIntToggle bottom" @click="setMapInteractive(!mapInteractive)">
    <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
    <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
    {{ scrollProgress }} {{ mapInteractive ? 'Lock' : 'Unlock' }} Map {{ top }} {{ y }}
    {{ height }} {{ winHeight }}
  </div> -->
  <div class="endSeg"></div>
</template>

<script setup lang="ts">
import { fitBounds, getMap, useMapInteractive } from '@/functions/map'
import type { Feature, LineString } from 'geojson'
import { featureCollection, length, lineSlice, lineSliceAlong } from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useElementBounding, useIntersectionObserver, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { GeoJSONSource, RasterLayerSpecification } from 'mapbox-gl'
import { addMinutes, differenceInMinutes, format, parseISO } from 'date-fns'
import { findClosestFrame } from '@/functions/timeSearch'
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
const percentShown = 0
let shouldAnimate = ref(false)
const currentTime = ref('')

// const { height } = useWindowSize()

const randomId = Math.random().toString(36).slice(2)

const el = ref(null)
const { top, height } = useElementBounding(el)
const { height: winHeight } = useWindowSize()

const scrollProgress = computed(() => {
  if (!shouldAnimate.value) return percentShown

  const position = -(top.value - Math.floor(winHeight.value / 2))
  const endStop = height.value - Math.floor(winHeight.value / 4)
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
  const geom = getPercGeom(fullGeometry, scrollProgress.value)
  const map = getMap()
  if (!map) return
  const source = map.getSource(randomId + 'Follow') as GeoJSONSource
  if (source) {
    source.setData(geom)
  }
  requestAnimationFrame(generateFrame)
}

function getPercGeom(geom: Feature<LineString>, perc: number) {
  if (
    props.useTime &&
    fullGeometry?.properties?.coordinateProperties?.times &&
    Array.isArray(fullGeometry?.properties?.coordinateProperties?.times)
  ) {
    const output = lineSliceAlong(geom, 0, perc * fullGeometryDistance)
    return output
  } else {
    const timeArray = geom?.properties?.coordinateProperties?.times
    if (!timeArray) return geom
    const firstDate = parseISO(timeArray[0])
    const lastDate = parseISO(timeArray[timeArray.length - 1])
    const dateDiff = differenceInMinutes(lastDate, firstDate)
    const progressDate = addMinutes(firstDate, perc * dateDiff)
    currentTime.value = format(progressDate, 'HH:mm')
    const coordIndexAtTime = findClosestFrame(timeArray, progressDate)
    const coord = geom.geometry.coordinates[coordIndexAtTime]

    const output = lineSlice(geom.geometry.coordinates[0], coord, geom)
    return output
  }
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
    shouldAnimate.value = true
    requestAnimationFrame(generateFrame)
  } else {
    shouldAnimate.value = false
  }
}

function addHikingLayers(visible: boolean) {
  const map = getMap()
  if (!map) return
  const coolLayers = ['mapbox-satellite', 'hillshade', 'contour', 'contour-labels']

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
      } else {
        addHikingLayers(false)
      }
    },
    { rootMargin: '-45% 0px -45% 0px' }
  )
}

onMounted(() => {
  if (props.geometry) {
    fullGeometry = props.geometry
    fullGeometryDistance = length(fullGeometry)
  }
})

onUnmounted(() => {
  const map = getMap()
  if (map) {
    map.removeLayer(randomId + 'follow-tracks')
    map.removeSource(randomId + 'Follow')
  }
})
</script>

<style scoped>
.startSeg {
  /* background-color: var(--article-background-color); */
  height: 0em;
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
}
.mapCutout {
  height: max(250vh, 300px);
  min-width: 200px;
  background-color: transparent;
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

.mapIntToggle {
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
