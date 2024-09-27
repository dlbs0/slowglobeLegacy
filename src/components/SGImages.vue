<template>
  <div class="container">
    <div class="gallery-container" ref="target">
      <Gallery :list="props.list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMap } from '@/functions/map'
import { useIntersectionObserver } from '@vueuse/core'
import mapboxgl, { Marker } from 'mapbox-gl'
import { onUnmounted, ref } from 'vue'
import { Gallery, Item } from 'vue-preview-imgs'
const target = ref(null)
const props = defineProps({
  list: Array<Item>,
  addPhotosToMap: Boolean || undefined
})
let markers: Marker[] = []

if (props.addPhotosToMap) {
  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    console.log('isIntersecting:', isIntersecting)
    if (isIntersecting && props.list) {
      for (const marker of props.list) {
        // Create a DOM element for each marker.
        if (!marker.coords) continue
        const el = document.createElement('div')

        el.className = 'photoMarker'

        const img = document.createElement('img')
        img.src = marker.href
        el.appendChild(img)

        // el.addEventListener('click', () => {
        //   window.alert(marker.properties.message)
        // })

        // Add markers to the map.
        const map = getMap()
        if (!map) continue
        const m = new mapboxgl.Marker(el).setLngLat(marker.coords).addTo(map)
        markers.push(m)
      }
    } else {
      removeAllMarkers()
    }
  })
}

function removeAllMarkers() {
  if (markers.length > 0) {
    markers.forEach((m) => {
      m.remove()
    })
    markers = []
  }
}

onUnmounted(() => {
  removeAllMarkers()
})
</script>

<style scoped>
.container {
  background-color: var(--article-background-color);
  z-index: 2;
  position: relative;
}
</style>
