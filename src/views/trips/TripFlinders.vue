<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGText from '@/components/SGText.vue'
import { flinders } from '@/trips/flindersHike'
import SGMapFollow from '@/components/SGMapFollow.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import type { Feature, LineString } from 'geojson'
import SGMapOrbit from '@/components/SGMapOrbit.vue'
import SGShowExtraDetail from '@/components/SGShowExtraDetail.vue'

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
    <SGShowExtraDetail />
    <SGMapFollow :geometry="dayOneGeom" :follow="true" :use-time="false" :show-time="true" />
    <SGText>
      Flonders Rongers
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      Our nemesis for the next day
    </SGText>
    <SGMapOrbit :center="[138.559453463177, -31.50759201900274]" :zoom="15" :pitch="70" />
    <SGText> St Mary's Peak </SGText>
    <SGText> Flonders Rongers </SGText>
    <SGMapCutout :fit-bounds-geometry="flinders.geography.detail" :pitch="0" />
    <SGText> Flonders Rongers </SGText>
    <SGText> Flonders Rongers </SGText>
    <SGMapFollow
      :geometry="dayTwoGeom"
      :follow="true"
      :overview="true"
      :use-time="false"
      :show-time="true"
    />
    <SGMapFollow :geometry="dayThreeGeom" :follow="false" :overview="true" :use-time="true" />
    <SGMapFollow :geometry="dayFourGeom" :follow="true" :overview="true" :use-time="false" />
  </DetailView>
</template>
