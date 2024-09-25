<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import { vIntersectionObserver } from '@vueuse/components'
import { computed, onBeforeMount } from 'vue'
import PolaroidPicture from '@/components/PolaroidPicture.vue'
import { showGlobe, zoomToId } from '@/functions/map'
import { allTrips } from '@/trips/allTrips'

onBeforeMount(() => {
  showGlobe()
})

function onIntersectionObserver([
  { isIntersecting, target, rootBounds }
]: IntersectionObserverEntry[]) {
  if (isIntersecting && target.id) {
    console.log('target.id:', target.id, rootBounds)
    zoomToId(target.id)
  }
}

import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

const intMarg = computed(() => {
  if (width.value <= 900) {
    return '-60% 0px -30px 0px'
  }
  return '-45% 0px -45% 0px'
})
</script>

<template>
  <div class="main" ref="el">
    <div class="polaroidGrid">
      <div class="mapSpacer"></div>
      <div class="mapSpacer"></div>
      <template v-for="i in allTrips" :key="i">
        <PolaroidPicture
          :img-url="i.headerImage"
          :caption="i.name"
          :link="`/trip/${i.id}`"
        ></PolaroidPicture>

        <div
          class="snapper"
          :id="i.id"
          v-intersection-observer="[onIntersectionObserver, { rootMargin: intMarg }]"
        ></div>
      </template>
      <div class="mapSpacer"></div>
    </div>
  </div>
</template>

<style scoped>
.main {
  scroll-snap-type: y mandatory;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-padding: calc((100vh - 4rem) / 2-1);
  @media (width <= 900px) {
    scroll-padding: calc((100vh - (var(--polaroid-width) * 1.362 / 2)) - 4em - 1px);
    /* scroll-snap-type: none; */
  }
}

.polaroidGrid {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-columns: 100% 10px;
  grid-template-rows: 100vh auto;
  gap: 4em 0px;
  @media (width <= 900px) {
    /* gap: 25vh 0px; */
  }
  justify-items: start;
  align-items: center;
  /* padding: 0 1em; */
  /* padding-left: 1em; */
}

.snapper {
  width: 10px;
  height: 100%;
  /* background-color: blue; */
  /* margin-right: 10px; */
  /* scroll-snap-align: start; */
  scroll-snap-align: center;
  z-index: -20;
}

.mapSpacer {
  height: calc(100vh - 4rem - 50vh);
  scroll-snap-align: start;
  z-index: 2;
}
</style>
