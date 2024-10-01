<template>
  <div class="pswp"></div>
  <div class="topTrigger" v-intersection-observer="onIntersectionObserver"></div>

  <div class="cont2">
    <slot></slot>
  </div>
</template>

<style scoped>
.topTrigger {
  height: 1px;
}
.cont2 {
  margin: 0 auto;
  margin-top: 45vh;
  max-width: calc(60ch + 6em);
  color: var(--md-sys-color-on-surface);
  /* filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4)); */
}

.cont2 > * {
  background-color: var(--article-background-color);
  padding: 1em 3em;
}
</style>

<script setup lang="ts">
import {
  setMapSpin,
  showArticleStart,
  showOverviews,
  showTracks,
  useMapInteractive
} from '@/functions/map'
import { vIntersectionObserver } from '@vueuse/components'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  trip: String
})
const { setMapInteractive } = useMapInteractive()

onMounted(() => {
  setMapInteractive(false)
  setMapSpin(false)
  showOverviews(false)
  showTracks('bracke')
  showArticleStart(props.trip ?? '')
})
const router = useRouter()

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting && router.currentRoute.value.name == props.trip) {
    showArticleStart(props.trip ?? '')
  }
}
</script>
