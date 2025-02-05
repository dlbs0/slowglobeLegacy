<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGImages from '@/components/SGImages.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGShowExtraDetail from '@/components/SGShowExtraDetail.vue'
import SGText from '@/components/SGText.vue'
import { germanGigs } from './germanGigs'
import BandcampEmbed from '@/components/BandcampEmbed.vue'
import SpotifyEmbed from '@/components/SpotifyEmbed.vue'

const tripId = 'germanGigs'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">Three Gigs in Germany</SGHeader>
    <SGText>
      Words here.
      <br />
      <br />
      <SpotifyEmbed url="album/3Bhtlh9Mc1CVNaen3eTEyP" />
      <br />
      <br />
      <SpotifyEmbed url="playlist/6VWBc91arnXu6JyqCVAcbr" :small="true" :dark-mode="true" />
      <br />
      <br />
      <BandcampEmbed />
      <br />
      <br />
    </SGText>
  </DetailView>
</template>
