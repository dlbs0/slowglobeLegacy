<template>
  <div class="startSeg"></div>
  <div class="mapIntToggle" @click="setMapInteractive(!mapInteractive)">
    <iconify-icon v-if="mapInteractive" icon="material-symbols:lock" inline></iconify-icon>
    <iconify-icon v-else icon="material-symbols:lock-open" inline></iconify-icon>
    {{ mapInteractive ? 'Lock' : 'Unlock' }} Map
  </div>
  <div
    class="mapCutout"
    v-intersection-observer="[onIntersectionObserver, { rootMargin: '-45% 0px -45% 0px' }]"
  ></div>
  <div class="endSeg"></div>
</template>

<script setup lang="ts">
import { addHikingLayers, fitBounds, getMap, useMapInteractive } from '@/functions/map'
import type { Feature, FeatureCollection } from 'geojson'
import { featureCollection, point } from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'
import type { GeoJSONSource } from 'mapbox-gl'
const { setMapInteractive, mapInteractive } = useMapInteractive()

const props = defineProps<{
  center: [number, number]
  zoom?: number
  pitch?: number
}>()

const randomId = Math.random().toString(36).slice(2)
const shouldAnimate = ref(false)
let initialBearing = -99

function generateFrame(timestamp: number) {
  if (!shouldAnimate.value) return

  const map = getMap()
  if (!map) return
  if (initialBearing === -99) initialBearing = timestamp - map.getBearing() * 100
  //   map.rotateTo(map.getBearing() + 0.1, { duration: 0 })
  map.rotateTo(((timestamp - initialBearing) / 100) % 360, { duration: 0 })
  // Request the next frame of the animation.
  requestAnimationFrame(generateFrame)
}

function onIntersectionObserver([
  { isIntersecting, target, rootBounds }
]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    console.log('isIntersecting:', isIntersecting)
    addHikingLayers(true)
    showLocation(true)
    shouldAnimate.value = true
    if (props.center) {
      const map = getMap()
      if (!map) return
      map.flyTo({
        center: props.center,
        zoom: props.zoom ?? 12,
        pitch: props.pitch ?? 0,
        bearing: map.getBearing(),
        // speed: 0.5,
        duration: 2000,
        easing: (t) => {
          return t
        }
      })
      const dotSource = map.getSource(randomId + 'location') as GeoJSONSource
      dotSource?.setData(featureCollection([point(props.center)]))
      map.once('moveend', () => {
        requestAnimationFrame(generateFrame)
      })
    }
  } else {
    addHikingLayers(false)
    showLocation(false)
    shouldAnimate.value = false
    initialBearing = -99
  }
}

function showLocation(visible: boolean) {
  const map = getMap()
  if (!map) return
  if (map.getLayer(randomId + 'location')) {
    map.setLayoutProperty(randomId + 'location', 'visibility', visible ? 'visible' : 'none')
  }
}

onMounted(() => {
  const map = getMap()
  if (map) {
    if (!map.getSource(randomId + 'location'))
      map.addSource(randomId + 'location', {
        type: 'geojson',
        data: featureCollection([point(props.center)])
      })
    if (!map.getLayer(randomId + 'location'))
      map.addLayer({
        id: randomId + 'location',
        type: 'symbol',
        source: randomId + 'location',
        layout: {
          'icon-image': 'pulsing-dot',
          //   'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map'
        }
      })
  }
})

onUnmounted(() => {
  addHikingLayers(false)
  const map = getMap()
  if (map) {
    if (map.getLayer(randomId + 'location')) map.removeLayer(randomId + 'location')
    if (map.getSource(randomId + 'location')) map.removeSource(randomId + 'location')
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
  height: max(60vh, 300px);
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
  position: relative;
  top: 1em;
  right: 0em;
  @media (width <= 900px) {
    right: 1em;
  }
  /* background-color: var(--article-background-color); */
  padding: 0.5em;
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
</style>
