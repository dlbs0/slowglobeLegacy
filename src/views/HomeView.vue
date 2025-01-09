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
  useHikingLayers,
  useMapInteractive,
  zoomToId
} from '@/functions/map'
import { allTrips } from '@/trips/allTrips'
import { useRouter } from 'vue-router'
import PostageStamp from '@/components/PostageStamp.vue'

const { showHikingLayers } = useHikingLayers()
const { setMapInteractive } = useMapInteractive()

const router = useRouter()

onBeforeMount(() => {
  showGlobe()
  showHikingLayers(false)
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

function showNotification() {
  function renderNotif() {
    const notification = new Notification('A new entry was posted on Slow Globe', {
      body: 'A graphic lunch in Ljusdal',
      badge: 'https://explore.danielbirchsmith.com/images/logoStamp.svg',
      icon: 'https://explore.danielbirchsmith.com/images/logoStamp.svg',
      //@ts-expect-error doesn't know about this yet
      image:
        'https://api.mapbox.com/styles/v1/dlbs0/cm5phtqcr00h301rz8au80wkk/static/17.5955,62.4376,4.89,0/300x200@2x?access_token=pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
      // 'https://api.mapbox.com/styles/v1/dlbs0/cm5pf7vuc00h801plejusddml/static/16.1065,61.8373,9,0/300x200?access_token=pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
      // 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/16.0991,61.8265,9,0/300x200?access_token=pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
    })
  }
  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    renderNotif()
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        renderNotif()
      }
    })
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
</script>

<template>
  <!-- When scroll animation has better browser support, look at this https://scroll-driven-animations.style/demos/stacking-cards/css/ -->
  <div class="polaroidGrid">
    <div
      class="mapSpacer"
      id="topOfPage"
      v-intersection-observer="[onIntersectionObserver, { rootMargin: intMarg }]"
    >
      Scroll Down
      <br />
      <iconify-icon icon="guidance:down-arrow"></iconify-icon>
      <button @click="showNotification">
        <iconify-icon icon="mdi:bell"></iconify-icon> Notifications
      </button>
    </div>
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
    <div class="mapSpacer halfHeight"></div>
    <div class="mapSpacer halfHeight"></div>
    <div class="attributionContainer">
      <div class="attribution">
        <PostageStamp image="/images/DSC_0722.jpg"></PostageStamp>
        <br />
        <br />
        <div>
          An account of exploration by
          <div class="name">Daniel Birch-Smith</div>
        </div>
        <br />
        <br />
        Find more things I've done at
        <a href="https://www.danielbirchsmith.com" target="_blank">www.danielbirchsmith.com</a>
        <br />
        <br />
        Text, photos and code on this site by me, unless otherwise noted.
        <br />
        <br />
        <div>
          Map by&nbsp;
          <a
            class="mapboxgl-ctrl-logo"
            style="display: inline-block; vertical-align: -0.125em"
            target="_blank"
            rel="noopener nofollow"
            href="https://www.mapbox.com/"
            aria-label="Mapbox homepage"
          ></a
          >, style is based on Standard, with some modifications to reduce clutter. Forgive my
          cartography skills, mapmaking is hard.
        </div>
        <br />
        Written in Vue, Vite, Typescript, using the Mapbox, VueUse, PhotoSwipe and vite-imagetools
        libraries.
        <br /><br />
        There are almost certainly bugs (especially on iOS). Let me know if you find one.
      </div>
    </div>
  </div>
</template>

<style></style>

<style scoped>
.attributionContainer {
  min-height: 100vh;
  position: relative;
  scroll-snap-align: start;
  z-index: 110;
  width: 100%;
  color: var(--md-sys-color-on-surface);
  background-color: var(--md-sys-color-surface);
}
.attribution {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2em;
  padding-top: 6em;
  text-align: center;
  a {
    color: var(--primary);
  }
}

.name {
  color: var(--primary);
  font-family: 'Libre Caslon Text', serif;
  font-weight: 600;
  font-size: 2em;
}

.polaroidGrid {
  --desktop-pol-peek: 75vh;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-columns: 100% 10px;
  grid-template-rows: var(--desktop-pol-peek) auto;
  gap: 4em 0px;
  @media (width <= 900px) {
    grid-template-rows: 90vh auto;
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
  scroll-snap-align: center;
  @media (width <= 900px) {
    scroll-snap-align: end;
    height: 100%;
    @supports (-webkit-touch-callout: none) {
      /* CSS specific to iOS devices */
      background-color: blue;
      scroll-snap-align: start;
      height: 100vh;
      z-index: 20;
    }
  }
  scroll-snap-stop: always;
  z-index: -20;
}

.mapSpacer {
  align-self: flex-start;
  translate: -100px 0;
  width: 1px;
  height: 100%;
  scroll-snap-align: end;
  z-index: 2;
}
.halfHeight {
  scroll-snap-align: none;
  height: 50vh;
}

.mapSpacer:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--polaroid-width);
  height: unset;
  translate: none;
  padding: 0px 10vw;
  padding-top: calc(50vh - 2em);

  @media (width <= 900px) {
    height: 100%;
    width: 100%;
    padding: 0;
    justify-content: end;
  }

  font-family: 'Reenie Beanie', 'Courier New', Courier, monospace;
  line-height: 2em;
  font-size: 2em;
  scroll-snap-align: none;

  /* animation:
    hover 3s ease-in-out infinite alternate,
    fadeOut 5s forwards ease-in-out 15s; */

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
