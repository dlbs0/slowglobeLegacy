<template>
  <div class="container">
    <div class="gallery-container">
      <lightgallery
        :settings="{ speed: 500, plugins: plugins }"
        :onInit="onInit"
        :onBeforeSlide="onBeforeSlide"
      >
        <template v-for="item in galleryImages" :key="item.href">
          <a
            v-if="item.type === 'image'"
            :data-lg-size="item.size"
            className="gallery-item"
            :data-src="item.href"
          >
            <img className="img-responsive" :src="item.thumbnail" />
          </a>
          <!-- <a href="/images/logoStamp.png" className="gallery-item">
            <img alt="img1" src="/images/logoStamp.png" />
          </a> -->
          <a
            v-if="item.type === 'video'"
            className="gallery-item"
            data-lg-size="1080-1920"
            :data-video="getVideoData(item.href)"
          >
            <!-- <img width="300" height="100" class="img-responsive" :src="item.href" /> -->
            <video preload="metadata" class="img-responsive gallery-item">
              <source :src="item.href + '#t=15'" type="video/mp4" />
            </video>
            <!-- <img width="300" height="100" class="img-responsive" src="/images/logoStamp.png" /> -->
          </a>
          <!-- ... -->
        </template>
      </lightgallery>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Options, Vue } from 'vue-class-component'
import Lightgallery from 'lightgallery/vue'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import type { InitDetail } from 'lightgallery/lg-events'
import type { LightGallery } from 'lightgallery/lightgallery'
import { asyncComputed } from '@vueuse/core'
import {
  allTripImages,
  allTripVideos,
  fullPathLookup,
  fullVideoPathLookup
} from '@/functions/images'
import { computed, nextTick, onMounted, watch } from 'vue'

interface Img {
  img: string
  coords?: [number, number]
  caption?: string
}

const props = defineProps<{
  list: Array<string | Img>
  addPhotosToMap?: boolean
}>()

const plugins = [lgThumbnail, lgZoom, lgVideo]
let lg: LightGallery | null = null

// const items = [
//   {
//     src: '/images/logoStamp.png',
//     caption: 'Stamp',
//     type: 'image',
//     thumb: '/images/logoStamp.png',
//     subHtml: '<h4>Stamp</h4>'
//   }
// ]

function onInit(detail: InitDetail) {
  console.log('lightGallery has been initialized')
  lg = detail.instance
  console.log('detail:', detail)
  updateSlides()
}
function onBeforeSlide() {
  console.log('calling before slide')
}

function getVideoData(href: string) {
  return `{"source": [{"src":"${href}", "type":"video/mp4"}],  "attributes": {"preload": false, "playsinline": true, "controls": true}}`
}

function updateSlides() {
  lg?.refresh()
  //   lg?.updateSlides(items, 0)
  //   lg?.openGallery()
}

const imageList = computed(() =>
  (props.list ?? []).map((i) => {
    const base = typeof i == 'string' ? i : i.img
    console.log(
      'i:',
      i,
      allTripImages[fullPathLookup[base]],
      allTripVideos[fullVideoPathLookup[base]]
    )
    if (base.endsWith('.m4v'))
      return {
        module: allTripVideos[fullVideoPathLookup[base]],
        coords: typeof i == 'string' ? undefined : i?.coords,
        caption: typeof i == 'string' ? undefined : i?.caption
      }
    return {
      module: allTripImages[fullPathLookup[base]],
      coords: typeof i == 'string' ? undefined : i?.coords,
      caption: typeof i == 'string' ? undefined : i?.caption
    }
  })
)

const galleryImages = asyncComputed(async () => {
  if (!imageList.value) return []
  const output: Array<{
    href: string
    width?: number
    height?: number
    thumbnail?: string
    coords?: [number, number]
    caption: string
    type: 'image' | 'video'
    size?: string
  }> = []
  for (const path in imageList.value) {
    console.log('path:', imageList.value[path])
    // if ('video' in imageList.value[path]) {
    //   output.push({
    //     href: imageList.value[path].video ?? '',
    //     width: 0,
    //     height: 0,
    //     thumbnail: imageList.value[path].video ?? '',
    //     coords: undefined,
    //     caption: ''
    //   })
    //   continue
    // }

    const mod = await imageList.value[path].module()
    console.log('mod:', mod)
    const coords = imageList.value[path].coords
    const caption = imageList.value[path]?.caption ?? ''

    if (Array.isArray(mod)) {
      const { width, height } = mod[1]
      output.push({
        href: mod[1].src,
        width,
        height,
        thumbnail: mod[0].src,
        coords,
        caption,
        type: 'image',
        size: `${width}-${height}`
      })
    } else {
      output.push({
        href: mod as string,
        coords,
        caption,
        type: 'video'
      })
    }
  }
  return output
})
watch(galleryImages, () => {
  nextTick(() => {
    updateSlides()
    console.log('watched updateSlides:')
  })
})

onMounted(() => {
  updateSlides()
})
// export default class App extends Vue {}
</script>
<style lang="css" scoped>
.container {
  z-index: 2;
  position: relative;
  /* margin: 1em 0; */
}

.lightgallery-vue {
  padding: 1em;

  width: 100%;
  margin-left: -1em;
  background-color: white;
  /* border: rgb(235, 235, 235) 1px solid; */
  /* box-shadow: 0px 1px 0.25em rgba(0, 0, 0, 0.2); */
  border-radius: 0.5em;
  /* background-color: rgb(252 234 232); */
  /* background-color: rgb(245 221 219); */
  /* background-color: rgb(255 248 247); */
  gap: 1em;
  /* padding: 2em; */
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.vpis-gallery {
  gap: 1em;
  /* padding: 2em; */
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.gallery-item img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5em;
  object-position: 50% 50%;
  image-orientation: from-image;
}

.gallery-item video {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5em;
  object-position: 50% 50%;
  image-orientation: from-image;
}
</style>

<style></style>
