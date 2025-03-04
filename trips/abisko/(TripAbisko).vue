<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGGallery from '@/components/SGGallery.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGText from '@/components/SGText.vue'
import { abisko } from './abisko'
import SGMapOrbit from '@/components/SGMapOrbit.vue'
</script>

<template>
  <DetailView>
    <SGHeader>An Adventure in Abisko</SGHeader>
    <SGText>
      Tuesday was our last day in Abisko, and after cleaning our room thoroughly according to the
      very prescriptive card in the corner, we were checked out and assembled in the reception,
      ready to meet our guide for todays activity, ice-climbing. We were both excited and scared for
      the experience ahead.
      <br />
      <br />
      Our guide Gonilla (rhymes with Vanilla), when she arrived, was the picture of Swedish
      outdoorsiness. She was immediately concerned with our levels of warmth, and once assured that
      we were wearing suitable clothes, she began fitting us for crampons. Crampons were really
      spiky; big triangles of metal stuck to the bottom of our boots, easily capable of tearing
      holes in our pants if we walked with our feet too close together.
      <br />
      <br />
      We headed outside and towards the canyon, marvelling at how the ground we'd be sliding around
      on yesterday was rendered rock steady under our newly spiked feet. we went
    </SGText>
    <!-- <SGMapCutout :center="[18.784977536167617, 68.35877754299938]" :zoom="17" :pitch="80"  /> -->
    <SGMapOrbit
      :center="[18.784977536167617, 68.35877754299938]"
      :zoom="14"
      :pitch="75"
      :satellite="true"
      :vanishing-offset="0.6"
    />
    <SGMapCutout :fit-bounds-geometry="abisko.geography.detail" />
    <SGGallery :list="['20241120_124548.jpg', '20241123_144615.jpg']" />
  </DetailView>
</template>
