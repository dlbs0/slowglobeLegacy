<template>
  <div class="container">
    <div class="gallery-container" ref="target">
      <Gallery
        :list="
          images.length ? images : props.list?.map((i) => (typeof i == 'string' ? { href: i } : i))
        "
        :id="'gallery-' + randomId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMap } from '@/functions/map'
import { useIntersectionObserver } from '@vueuse/core'
import mapboxgl, { Marker } from 'mapbox-gl'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { Gallery, Item } from 'vue-preview-imgs'

interface Img {
  href: string
  coords?: [number, number]
}

const target = ref(null)
const randomId = Math.random().toString(36).substring(7)
const props = defineProps({
  list: Array<Img | string>,
  addPhotosToMap: Boolean || undefined
})
let markers: Marker[] = []
const images: Ref<Item[]> = ref([])

if (props.addPhotosToMap) {
  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting && props.list) {
      for (const marker of props.list) {
        // Create a DOM element for each marker.
        if (typeof marker == 'string' || !marker.coords) continue
        const el = document.createElement('div')

        el.className = 'photoMarker'

        const img = document.createElement('img')
        img.src = marker.href
        el.appendChild(img)

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

onMounted(() => {
  if (!props.list) return
  const tempImages = [
    ...props.list.map((i) => ({ href: typeof i == 'string' ? i : i.href, height: 0, width: 0 }))
  ]
  // console.log('images mounted')
  // document.getElementById('gallery-' + randomId)?.scrollIntoView()
  // list the children of the gallery
  const gallery = document.getElementById('gallery-' + randomId)
  // console.log('gallery:', gallery)
  if (!gallery) return
  const children = gallery.children
  // console.log('children:', children)
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    // console.log('child:', child)

    if (!child) continue
    const image = child.querySelector('img')
    if (!image) continue
    // console.log('image:', image, image.naturalWidth, image.naturalHeight)

    image.addEventListener('load', function () {
      tempImages[i].width = image.naturalWidth
      tempImages[i].height = image.naturalHeight
      images.value = [...tempImages]
    })
  }

  images.value = tempImages
})

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
