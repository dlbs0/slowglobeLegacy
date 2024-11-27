<script setup lang="ts">
import { allTripImages, fullPathLookup } from '@/functions/images'
import { getMap } from '@/functions/map'
import { asyncComputed, useIntersectionObserver } from '@vueuse/core'
import mapboxgl, { Marker } from 'mapbox-gl'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Gallery, setGallery, Item } from 'vue-preview-imgs'

interface Img {
  img: string
  coords?: [number, number]
  caption?: string
}

const props = defineProps<{
  list: Array<string | Img>
  addPhotosToMap?: boolean
}>()

const imageList = computed(() =>
  (props.list ?? []).map((i) => {
    return {
      module: allTripImages[fullPathLookup[typeof i == 'string' ? i : i.img]],
      coords: typeof i == 'string' ? undefined : i?.coords,
      caption: typeof i == 'string' ? undefined : i?.caption
    }
  })
)

const galleryImages = asyncComputed(async () => {
  if (!imageList.value) return []
  const output: Array<{
    href: string
    width: number
    height: number
    thumbnail: string
    coords?: [number, number]
    caption: string
  }> = []
  for (const path in imageList.value) {
    const mod = await imageList.value[path].module()
    const coords = imageList.value[path].coords
    const caption = imageList.value[path]?.caption ?? ''
    const { width, height } = mod[1]
    output.push({
      href: mod[1].src,
      width,
      height,
      thumbnail: mod[0].src,
      coords,
      caption
    })
  }
  return output
})

const target = ref(null)
let markers: Marker[] = []

if (props.addPhotosToMap) {
  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting && galleryImages.value) {
      for (const entry of galleryImages.value) {
        // Create a DOM element for each marker.
        if (!entry.coords) continue
        const el = document.createElement('div')

        el.className = 'photoMarker'

        const img = document.createElement('img')
        img.src = entry.thumbnail
        el.appendChild(img)

        // Add markers to the map.
        const map = getMap()
        if (!map) continue
        const m = new mapboxgl.Marker(el).setLngLat(entry.coords).addTo(map)
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

<template>
  <div class="container">
    <div class="gallery-container" ref="target">
      <!-- <Gallery :list="galleryImages" /> -->
      <Gallery>
        <template v-for="item in galleryImages" :key="item.href">
          <Item v-bind="item" :title="item.caption" />
        </template>
      </Gallery>
    </div>
  </div>
</template>

<style scoped>
.container {
  z-index: 2;
  position: relative;
}
</style>
