<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import mapboxgl from 'mapbox-gl'
import { randomPoint } from '@turf/turf'
import { onMounted, ref, watch } from 'vue'
import PolaroidPicture from '@/components/PolaroidPicture.vue'
import { useScroll } from '@vueuse/core'

let map: null | mapboxgl.Map = null

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
  map = new mapboxgl.Map({
    container: 'backmap', // container ID
    style: 'mapbox://styles/dlbs0/cm0zbvi4501a501pj3rkd5sls',
    center: [130, 0], // starting position [lng, lat]
    zoom: 1.5, // starting zoom
    projection: 'globe', // display the map as a 3D globe
    attributionControl: false
    // interactive: false
  })
  map.on('style.load', () => {
    map?.setFog({ 'space-color': 'transparent', 'horizon-blend': 0 }) // Set the default atmosphere style
    map?.setFog({
      range: [-1, 2],
      'horizon-blend': 0.1,
      color: '#c8d8de',
      'high-color': 'transparent',
      'space-color': 'transparent',
      'star-intensity': 0.0
    }) // Set the default atmosphere style
    // map.easeTo({
    //   center: [17.266653349606436, 62.40558318791134],
    //   pitch: 75,
    //   zoom: 3,
    //   duration: 5000
    // })
    spinGlobe()

    // setTimeout(() => map.setPadding({ left: 0, right: 0, top: 0, bottom: 400 }), 2000)
  })
  map.on('moveend', () => {
    if (arrivedState.top) spinGlobe()
  })
  function spinGlobe() {
    if (!map) return
    const secondsPerRevolution = 180
    let distancePerSecond = 360 / secondsPerRevolution
    // const zoom = map.getZoom()
    // if (zoom > slowSpinZoom) {
    //   // Slow spinning at higher zooms
    //   const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom)
    //   distancePerSecond *= zoomDif
    // }
    const center = map.getCenter()
    center.lng += distancePerSecond
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n, zoom: 1.5, pitch: 0 })
  }
})
const el = ref<HTMLElement | null>(null)
const { isScrolling, arrivedState } = useScroll(el)
watch(isScrolling, (value) => {
  if (!value && map && !arrivedState.top) {
    console.log('arrivedState', value, map)
    // generate a random lnglat
    const randomPointCoords = randomPoint()
    map.easeTo({
      duration: 2000,
      pitch: 60,
      zoom: 3,
      center: randomPointCoords.features[0].geometry.coordinates as [number, number]
    })
  }
})
watch(arrivedState, (value) => {
  console.log('arrivedState', value.top)
  if (!value.top && map) {
    map.setPadding({ left: 300, right: 0, top: 0, bottom: 0 })
  } else if (map) {
    map.setPadding({ left: 0, right: 0, top: 0, bottom: 0 })
  }
})
</script>

<template>
  <div class="map" id="backmap"></div>
  <div class="main" ref="el">
    <!-- <h1>Home</h1> -->
    <div class="polaroidGrid">
      <div class="mapSpacer"></div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
      <div class="pGridItem">
        <PolaroidPicture></PolaroidPicture>
      </div>
    </div>
  </div>
  <!-- <div class="scrollableContentWrapper">
      <div class="scrollableContent">
        <div class="scrollSpacer"></div>
        <PolaroidPicture></PolaroidPicture>

        <div class="contentCard">
          <h2>Content</h2>
          Yes there's lots of content here
        </div>
        <div class="contentCard">
          <h2>Great Ocean Roadtrip</h2>
          Yes there's lots of content here
        </div>
      </div>
    </div> -->
  <!-- <div class="header">Timeline</div> -->
  <!-- <div class="content"></div> -->
  <!-- <div class="content"></div>
    <div class="content"></div> -->
  <!-- </div> -->
</template>

<style scoped>
.map {
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: -1; */
  width: 100%;
  height: 100vh;
  pointer-events: v-bind('arrivedState.top ? "none" : "auto"');
}

.main {
  scroll-snap-type: y mandatory;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  scroll-padding: calc((100vh - 4rem) / 2-1);
}

.polaroidGrid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100vh auto;
  grid-gap: 4em;
  justify-items: start;
  padding-left: 1em;
}
.pGridItem {
  scroll-snap-align: center;
  z-index: 2;
  width: min-content;
}

.mapSpacer {
  height: calc(100vh - 4rem - 50vh);
  scroll-snap-align: start;
  z-index: 2;
}
.scrollSpacer {
  height: 50vh;
}
/* .scrollableContentWrapper {
  display: flex;
  justify-content: center;
} */
.scrollableContent {
  height: 50vh;
  /* width: 60%; */
  overflow-y: scroll;
  overflow-x: hidden;
}

.contentCard {
  background-color: #724c1777;
  background-color: #ffffff;
  /* border-radius: 0.4em; */
  margin: 1em;
  padding: 1em;
  backdrop-filter: blur(10px);
  h2 {
    margin-top: 0;
    margin-bottom: 0.4em;
  }
}

.header {
  max-height: 4rem;
  background-color: #c8d8de;
  font-size: 2em;
  width: 60%;
  text-align: center;
}

.content {
  height: 100vh;
}
</style>
