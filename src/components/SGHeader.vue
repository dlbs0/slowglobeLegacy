<!-- Heading component, styles and formats text placed inside it from the parent component -->

<template>
  <div class="above">
    <div class="byline">
      {{ byline }}
    </div>
    <div class="date">{{ date }}</div>
  </div>
  <h1>
    <slot></slot>
  </h1>
</template>

<style scoped>
.byline {
  color: var(--primary);
  font-size: 1.2em;
  font-family: 'Public Sans', sans-serif;

  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.date {
  color: var(--primary);
  font-size: 0.9em;
  font-family: 'Public Sans', sans-serif;
  font-style: italic;
}
</style>

<script setup lang="ts">
const props = defineProps({
  byline: String,
  date: String
})
</script>
