<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import { showBracke } from '@/functions/map'
import { onMounted } from 'vue'
import { Gallery } from 'vue-preview-imgs'

onMounted(() => {
  showBracke()
})
</script>

<template>
  <div class="pswp"></div>
  <DetailView>
    <SGHeader byline="Bräcke, Sweden" date="2024-09-22">To Buy a Bike in Bräcke</SGHeader>
    I needed a bike.
    <br />
    <br />
    After a week of searching, I finally found something on Marketplace that met my requirements.
    Something with big wheels, disc brakes, basic suspension and a good deal. Quite a surprisingly
    good deal actually, only 1000kr.
    <br />
    <br />
    The catch - it was in Bräcke.
    <br />
    <br />
    While Bräcke looks close to Sundsvall on the map, without a car, it's not the easiest place to
    get to. While the train ride from Sundsvall Central is only an hour and a half, the unoptimised
    timetable meant it would be at least a 7 hour adventure. Add to that the fact that I would need
    to walk from home to the station, because I can't ride two bikes home, and it was turning into
    quite the undertaking.
    <br />
    <br />
    But I had nothing else to do on the weekend, so I messaged the guy, who informed me that he was
    in the studio all day Saturday recording drums for his band, but they'd probably be done by
    Sunday. And so Sunday, just after lunch, I found myself walking to the station on a lovely crisp
    Autumn day.

    <div class="gallery-container">
      <Gallery
        :list="[
          {
            href: '/images/20240912_092320.jpg',
            // thumbnail: '/images/20240922_172726-2.jpg',
            width: 3959,
            height: 2969,
            cropped: true
          },

          {
            href: '/images/20240922_134006.jpg',
            width: 2963,
            height: 3951,
            cropped: true
          }
        ]"
      />
    </div>
    After negotiating the correct amount out of the ATM, I was at the train station just in time to
    recieve a text informing me that my train was cancelled. I would get the pleasure of a
    replacement bus instead.

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
  </DetailView>
</template>

<style scoped></style>
