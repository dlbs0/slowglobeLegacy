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
import { fitBounds, useMapInteractive } from '@/functions/map'
import type { Feature, FeatureCollection } from 'geojson'
import { featureCollection } from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'
const { setMapInteractive, mapInteractive } = useMapInteractive()

const props = defineProps<{
  fitBoundsGeometry?: FeatureCollection | Feature
  pitch?: number
}>()

const { height } = useWindowSize()

function onIntersectionObserver([
  { isIntersecting, target, rootBounds }
]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    console.log('target.id:', target.id, rootBounds)
    if (props.fitBoundsGeometry) {
      const vh = height.value * 0.2
      fitBounds(
        props.fitBoundsGeometry ?? featureCollection([]),
        {
          top: vh,
          bottom: vh,
          left: 50,
          right: 50
        },
        props.pitch ?? 0
      )
    }
  }
}
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
