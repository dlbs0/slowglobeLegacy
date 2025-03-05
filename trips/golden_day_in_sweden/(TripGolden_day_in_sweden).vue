<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGGallery from '@/components/SGGallery.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGText from '@/components/SGText.vue'
import { golden_day_in_sweden } from './golden_day_in_sweden'
</script>

<template>
  <DetailView>
    <SGHeader>A Golden Day in Sweden</SGHeader>
    <SGText>
      The moment Nathan arrived he was shown the snowman which Bek and Paula had been building based
      on his likeness for the past few hours. Suitably impressed, the group ate their first (of
      many) Swedish burger meal, and piled into the car to drive to an undisclosed location.
    </SGText>
    <SGGallery :list="['PXL_20250222_153320241.PORTRAIT.jpg', 'PXL_20250222_185817425.jpg']" />
  </DetailView>
</template>

<!-- 'o_PXL_20250222_142020422~2.m4a', 'PXL_20250222_153320241.PORTRAIT.jpg','o_PXL_20250222_175234634.m4a',  -->