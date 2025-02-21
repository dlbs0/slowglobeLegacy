<template>
  <div class="container">
    <lightgallery :settings="{ speed: 500, plugins: plugins, licenseKey: '1' }" :onInit="onInit">
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
          :data-video="getVideoData(item.href)"
          :data-poster="item.thumbnail"
          :data-lg-size="item.size"
        >
          <div class="vidBox">
            <img className="img-responsive" :src="item.thumbnail" />
            <!-- <video preload="metadata" class="img-responsive gallery-item">
              <source :src="item.href" type="video/mp4" />
            </video> -->
          </div>
          <div class="vidOverlay">&#x25B6;</div>
          <!-- <div class="vidOverlay"></div> -->
          <!-- <img width="300" height="100" class="img-responsive" src="/images/logoStamp.png" /> -->
        </a>
        <!-- ... -->
      </template>
    </lightgallery>
  </div>
</template>

<script setup lang="ts">
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
  allTripVideoThumbs,
  fullPathLookup,
  fullVideoPathLookup,
  fullVideoPathThumbsLookup
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

function onInit(detail: InitDetail) {
  // console.log('lightGallery has been initialized')
  lg = detail.instance
  updateSlides()
}

function getVideoData(href: string) {
  return `{"source": [{"src":"${href}", "type":"video/mp4"}],  "attributes": {"preload": false, "playsinline": true, "controls": true}}`
}

function updateSlides() {
  lg?.refresh()
}

const imageList = computed(() =>
  (props.list ?? []).map((i) => {
    const base = typeof i == 'string' ? i : i.img
    if (base.endsWith('.m4v')) {
      const imgName = base.split('.')[0] + '_thumb'
      return {
        imageModule: allTripVideoThumbs[fullVideoPathThumbsLookup[imgName]],
        videoModule: allTripVideos[fullVideoPathLookup[base]],
        coords: typeof i == 'string' ? undefined : i?.coords,
        caption: typeof i == 'string' ? undefined : i?.caption
      }
    }
    return {
      imageModule: allTripImages[fullPathLookup[base]],
      coords: typeof i == 'string' ? undefined : i?.coords,
      caption: typeof i == 'string' ? undefined : i?.caption
    }
  })
)

const galleryImages = asyncComputed(async () => {
  if (!imageList.value) return []
  const gImages: Array<{
    href: string
    thumbnail: string
    coords?: [number, number]
    caption: string
    type: 'image' | 'video'
    size: string
  }> = []
  for (const path of imageList.value) {
    const imageModule = await path.imageModule()
    const coords = path.coords
    const caption = path?.caption ?? ''

    const thumbnail = !Array.isArray(imageModule) ? imageModule : imageModule[0]

    const output = {
      coords,
      caption,
      size: '',
      href: '',
      thumbnail: thumbnail.src,
      type: 'image' as 'video' | 'image'
    }

    if (path.videoModule) {
      const videoModule = await path.videoModule()
      output.type = 'video'
      output.href = videoModule as string
      output.size = `${thumbnail.width * 3}-${thumbnail.height * 3}`
    } else if (Array.isArray(imageModule) && imageModule[1]) {
      const { width, height } = imageModule[1]
      output.size = `${width}-${height}`
      output.href = imageModule[1].src
    }
    gImages.push(output)
  }
  return gImages
})
watch(galleryImages, () => {
  nextTick(() => {
    updateSlides()
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
.vidBox {
  /* position: relative;
  background-color: aquamarine;
  z-index: 4; */
}

.gallery-item {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
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
.vidOverlay {
  aspect-ratio: 1 / 1;
  cursor: pointer;
  z-index: 4;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  top: -100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: center;
  font-size: 6rem;
  color: #ffffff;
  opacity: 0.7;
  text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    background-color: #ffffff15;
    /* font-size: 6.5rem; */
    transform: scale(1.1);
  }
}
</style>

<style></style>
