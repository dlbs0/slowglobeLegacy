<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import { Gallery } from 'vue-preview-imgs'
</script>

<template>
  <div class="pswp"></div>
  <DetailView>
    <SGHeader byline="Bräcke, Sweden" date="2024-09-22">To Buy a Bike in Bräcke</SGHeader>
    <div class="gallery-container">
      <Gallery
        :list="[
          {
            href: '/images/20240922_162227.jpg',
            // thumbnail: '/images/20240922_172726-2.jpg',
            width: 3000,
            height: 3000
            // cropped: true
          },

          {
            href: '/images/20240922_172726.jpg',
            width: 3000,
            height: 3000
          }
        ]"
      />
    </div>

    Here is a lot of text to fill the space. I will write all about the things that happen in
    Bräcke.
  </DetailView>
</template>

<style scoped></style>
