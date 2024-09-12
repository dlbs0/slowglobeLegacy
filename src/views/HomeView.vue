<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import { onMounted } from 'vue'

onMounted(() => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
  const map = new mapboxgl.Map({
    container: 'backmap', // container ID
    style: 'mapbox://styles/dlbs0/cm0zbvi4501a501pj3rkd5sls',
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1.5, // starting zoom
    projection: 'globe', // display the map as a 3D globe
    attributionControl: false,
    interactive: false
  })
  map.on('style.load', () => {
    map.setFog({ 'space-color': 'transparent', 'horizon-blend': 0 }) // Set the default atmosphere style
    map.setFog({
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
    spinGlobe()
  })
  function spinGlobe() {
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
    map.easeTo({ center, duration: 1000, easing: (n) => n })
  }
})
</script>

<template>
  <div class="map" id="backmap"></div>
  <main>
    <!-- <h1>Home</h1> -->
    <div class="mapSpacer"></div>
    <div class="scrollableContentWrapper">
      <div class="scrollableContent">
        <div class="scrollSpacer"></div>
        <div class="header">Timeline</div>
        <div class="header">Timeline</div>
        <div class="header">Timeline</div>
      </div>
    </div>
    <!-- <div class="content"></div> -->
    <!-- <div class="content"></div>
    <div class="content"></div> -->
  </main>
</template>

<style scoped>
.map {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
}

.mapSpacer {
  height: calc(100vh - 4rem - 50vh);
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
