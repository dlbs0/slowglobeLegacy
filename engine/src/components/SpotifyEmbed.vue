<template>
  <iframe
    style="border-radius: 12px"
    :style="{ height: props.small ? '152px' : '50vh' }"
    :src="embedSrc"
    width="100%"
    frameBorder="0"
    allowfullscreen="true"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>

  <br />
  <!-- <iframe
    style="border-radius: 12px; height: 50vh"
    src="https://open.spotify.com/embed/album/3Bhtlh9Mc1CVNaen3eTEyP?utm_source=generator"
    width="100%"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe> -->
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url: string
  small?: boolean
  darkMode?: boolean
}>()

const embedSrc = computed(
  () =>
    `https://open.spotify.com/embed/${props.url}?utm_source=generator${props.darkMode ? '&theme=0' : ''}`
)
</script>

<style scoped>
.bcPlayer {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
