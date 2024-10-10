<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGText from '@/components/SGText.vue'
import { flinders } from '@/trips/flindersHike'
import SGMapFollow from '@/components/SGMapFollow.vue'
import type { Feature, LineString } from 'geojson'

const dayOneGeom = flinders.geography.detail?.features[0] as Feature<LineString>

const tripId = 'flinders'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">Hiking the Flinders</SGHeader>

    <SGText>The good old Flonders Rongers </SGText>
    <SGMapFollow :geometry="dayOneGeom" :pitch="60" :follow="true" :fit="true" />
    <SGText> Flonders Rongers </SGText>
    <SGText> Flonders Rongers </SGText>
    <!-- <SGMapCutout :fit-bounds-geometry="flinders.geography.detail" /> -->
  </DetailView>
</template>
