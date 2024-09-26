<template>
  <div class="container">
    <div class="gallery-container">
      <Gallery :list="props.list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gallery, Item } from 'vue-preview-imgs'
const props = defineProps({
  list: Array<Item>
})
</script>

<style scoped>
.container {
  background-color: var(--article-background-color);
  z-index: 2;
  position: relative;
}
</style>
