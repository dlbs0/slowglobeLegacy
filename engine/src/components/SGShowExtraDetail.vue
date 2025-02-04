<template>
  <div
    class="topTrigger"
    v-intersection-observer="[onIntersectionObserver, { rootMargin: intMarg }]"
  ></div>
</template>

<script setup lang="ts">
import { showExtraTripDetail } from '@/functions/map'
import { vIntersectionObserver } from '@vueuse/components'

const props = defineProps<{
  reverse?: boolean
}>()

const intMarg = '-45% 0px -45% 0px'

function onIntersectionObserver([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting) {
    const val = props.reverse ? false : true
    showExtraTripDetail(val)
  }
}
</script>

<style scoped>
.topTrigger {
  height: 0px;
  padding: 0;
}
</style>
