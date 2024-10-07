<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'
import { useWindowSize } from '@vueuse/core'
import { vIntersectionObserver } from '@vueuse/components'
import { computed, onBeforeMount, onUnmounted } from 'vue'
import PolaroidPicture from '@/components/PolaroidPicture.vue'
import {
  setMapSpin,
  showExtraTripDetail,
  showGlobe,
  showOverviews,
  useMapInteractive,
  zoomToId
} from '@/functions/map'
import { allTrips } from '@/trips/allTrips'
import { useRouter } from 'vue-router'

const { setMapInteractive } = useMapInteractive()

const router = useRouter()

onBeforeMount(() => {
  showGlobe()
  setMapInteractive(false)
  setMapSpin(true)
  showOverviews(true)
  showExtraTripDetail(false)
})

onUnmounted(() => {
  setMapInteractive(false)
  setMapSpin(false)
  showOverviews(false)
})

function onIntersectionObserver([
  { isIntersecting, target, rootBounds }
]: IntersectionObserverEntry[]) {
  if (isIntersecting && target.id) {
    if (target.id === 'topOfPage' && router.currentRoute.value.name == 'home') {
      showGlobe()
      setMapSpin(true)
    } else {
      console.log('target.id:', target.id, rootBounds)
      zoomToId(target.id)
    }
  }
}

const { width } = useWindowSize()

const intMarg = computed(() => {
  if (width.value <= 900) {
    return '-60% 0px -30px 0px'
  }
  return '-45% 0px -45% 0px'
})
</script>

<template>
  <!-- <div class="main" ref="elz"> -->
  <div class="polaroidGrid">
    <div
      class="mapSpacer"
      id="topOfPage"
      v-intersection-observer="[onIntersectionObserver, { rootMargin: intMarg }]"
    >
      Scroll Down
      <br />
      <iconify-icon icon="guidance:down-arrow"></iconify-icon>
    </div>
    <div class="mapSpacer"></div>
    <template v-for="i in allTrips" :key="i">
      <PolaroidPicture
        :img-url="i.headerImage"
        :caption="i.name"
        :link="`/trip/${i.id}`"
      ></PolaroidPicture>
      <!-- <div></div> -->

      <div
        class="snapper"
        :id="i.id"
        v-intersection-observer="[onIntersectionObserver, { rootMargin: intMarg }]"
      ></div>
    </template>
    <div class="mapSpacer halfHeight"></div>
    <!-- </div> -->
  </div>
</template>

<style></style>

<style scoped>
.main {
  /* scroll-snap-type: y mandatory;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-padding: calc((100vh - 4rem) / 2-1);
  @media (width <= 900px) {
    scroll-padding: calc((100vh - (var(--polaroid-width) * 1.362 / 2)) - 4em - 1px);
  }
  z-index: 20; */
}

.polaroidGrid {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-columns: 100% 10px;
  grid-template-rows: 85vh auto;
  gap: 4em 0px;
  @media (width <= 900px) {
    grid-template-rows: 90svh auto;
    gap: 55vh 0px;
  }
  justify-items: start;
  align-items: center;
  z-index: 2;
}

.snapper {
  translate: -100px 0;
  width: 1px;
  height: 90px;
  background-color: blue;
  scroll-snap-align: center;
  @media (width <= 900px) {
    scroll-snap-align: end;
    height: 100%;
    @supports (-webkit-touch-callout: none) {
      scroll-snap-align: center;
      /* CSS specific to iOS devices */
      height: 100dvh;
    }
  }
  scroll-snap-stop: always;
  z-index: 20;
}

.mapSpacer {
  align-self: flex-start;
  /* height: min(100%, calc(100vh - 4rem - 50vh)); */
  height: 100%;
  scroll-snap-align: start;
  z-index: 2;
}
.halfHeight {
  height: 50vh;
}

.mapSpacer:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(((var(--polaroid-width) * 1.362)));
  width: var(--polaroid-width);
  padding: calc(var(--polaroid-width) * 0.056);
  /* width: 100%; */
  @media (width <= 900px) {
    /* … */
    /* padding: 0px calc((100vw - (var(--polaroid-width) * 1.12)) / 2); */
    width: 100%;
    padding-top: 4em;
    padding: 0;
    justify-content: end;
    height: 90svh;
    /* margin-bottom: 1200vh; */
  }
  /* padding: 0px 10vw; */
  padding: 0px 10vw;
  padding-top: 4em;

  font-family: 'Reenie Beanie', 'Courier New', Courier, monospace;
  font-size: 2em;

  /* scroll-margin-top: 4em; */
  scroll-margin-block-start: 4em;

  animation:
    hover 3s ease-in-out infinite alternate,
    fadeOut 5s forwards ease-in-out 15s;

  animation: hover 3s ease-in-out infinite alternate;
}

@keyframes hover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.mapSpacer:last-child {
  height: 50vh;
}
</style>
