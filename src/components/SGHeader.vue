<!-- Heading component, styles and formats text placed inside it from the parent component -->

<template>
  <div class="wrap">
    <div class="titleRow">
      <div class="above">
        <div class="byline">
          {{ byline }}
        </div>
        <div class="date">{{ date }}</div>
      </div>
      <img src="/images/20240922_172726-2.jpg" />
    </div>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped>
.wrap {
  z-index: 1;
  position: relative;
  --mask: conic-gradient(from 130deg at top, #000000, #000000 1deg 99deg, #00000000 100deg) 50%/2.38em
    100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
  padding-top: 3em;
}
img {
  display: inline-block;
  height: 5.5em;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
img {
  --r: 4px; /* control the radius of the circles */
  padding: calc(2 * var(--r));
  filter: grayscale(0.6) drop-shadow(0 0 1px #0005) drop-shadow(0 0 1px #0005);
  background:
    radial-gradient(var(--r), #0000 98%, #fbf9e2) round calc(-1.5 * var(--r)) calc(-1.5 * var(--r)) /
      calc(3 * var(--r)) calc(3 * var(--r)),
    linear-gradient(#fbf9e2 0 0) no-repeat 50% / calc(100% - 3 * var(--r)) calc(100% - 3 * var(--r));
}

.titleRow {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: space-between;
}

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
