<template>
  <h1>Convert GPX to timestamped geojson</h1>

  <p>Upload GPX file</p>

  <input type="file" accept=".gpx" />
  <button @click="onConvert">Convert</button>

  geoJsonVersion: {{ geoJsonVersion }}
  <br />
  <br />
  <br />
  {{ gpxText }}
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { gpx } from '@tmcw/togeojson'

const gpxText: Ref<string> = ref('')

// Read the input file when the convert button is clicked

function onConvert() {
  const file = document.querySelector('input[type="file"]') as HTMLInputElement
  const gpx = file.files?.[0]
  console.log('gpx:', gpx)
  if (!gpx) return
  const reader = new FileReader()

  reader.onload = function () {
    gpxText.value = reader.result as string
  }

  reader.readAsText(gpx)
}

const geoJsonVersion = computed(() => {
  try {
    const geoJSON = gpx(new DOMParser().parseFromString(gpxText.value, 'text/xml'))
    return geoJSON
  } catch (e) {
    console.warn('gpx parse error', e)
    return ''
  }
})
</script>
