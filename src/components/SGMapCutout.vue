<template>
  <div class="startSeg"></div>
  <div
    class="mapCutout"
    v-intersection-observer="[onIntersectionObserver, { rootMargin: '-45% 0px -45% 0px' }]"
  ></div>
  <div class="endSeg"></div>
</template>

<script setup lang="ts">
import { fitBounds } from '@/functions/map'
import type { Feature, FeatureCollection } from 'geojson'
import { featureCollection } from '@turf/turf'
import { vIntersectionObserver } from '@vueuse/components'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  fitBoundsGeometry?: FeatureCollection | Feature
}>()

const { height } = useWindowSize()

function onIntersectionObserver([
  { isIntersecting, target, rootBounds }
]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    console.log('target.id:', target.id, rootBounds)
    if (props.fitBoundsGeometry) {
      const vh = height.value * 0.2
      fitBounds(props.fitBoundsGeometry ?? featureCollection([]), {
        top: vh,
        bottom: vh,
        left: 100,
        right: 100
      })
    }
  }
}
</script>

<style scoped>
.startSeg {
  background-color: var(--article-background-color);
  height: 1em;
  --mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50%/2.38em 100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
.endSeg {
  background-color: var(--article-background-color);
  height: 1em;
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
  top: 0;
  left: 0;
  opacity: 0.9;
}
</style>
