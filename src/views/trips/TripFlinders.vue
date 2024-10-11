<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGText from '@/components/SGText.vue'
import { flinders } from '@/trips/flindersHike'
import SGMapFollow from '@/components/SGMapFollow.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import type { Feature, LineString } from 'geojson'

const dayOneGeom = flinders.geography.detail?.features[0] as Feature<LineString>
const dayTwoGeom = flinders.geography.detail?.features[1] as Feature<LineString>
const dayThreeGeom = flinders.geography.detail?.features[2] as Feature<LineString>
const dayFourGeom = flinders.geography.detail?.features[3] as Feature<LineString>

const tripId = 'flinders'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">Hiking the Flinders</SGHeader>

    <SGText>The good old Flonders Rongers </SGText>
    <SGMapFollow :geometry="dayOneGeom" :pitch="60" :follow="true" :fit="true" :use-time="true" />
    <SGText>
      Flonders Rongers
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </SGText>
    <SGText> Flonders Rongers </SGText>
    <SGMapCutout :fit-bounds-geometry="flinders.geography.detail" :pitch="0" />
    <SGText> Flonders Rongers </SGText>
    <SGText> Flonders Rongers </SGText>
    <SGMapFollow :geometry="dayTwoGeom" :pitch="60" :follow="true" :fit="true" :use-time="true" />
    <SGMapFollow :geometry="dayThreeGeom" :pitch="60" :follow="true" :fit="true" :use-time="true" />
    <SGMapFollow :geometry="dayFourGeom" :pitch="60" :follow="true" :fit="true" :use-time="true" />
  </DetailView>
</template>
