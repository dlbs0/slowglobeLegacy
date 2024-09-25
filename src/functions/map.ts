import { getTripById } from '@/trips/allTrips'
import { randomPoint } from '@turf/turf'
import { useScroll, useWindowSize } from '@vueuse/core'
import mapboxgl from 'mapbox-gl'
import { onMounted, ref, watch } from 'vue'

let map: null | mapboxgl.Map = null

const { width, height } = useWindowSize()

export function useMap() {
  console.log('map')

  onMounted(() => {
    console.log('map mounted')
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGxiczAiLCJhIjoiY20wdGlpMmc2MHJqaDJsczVtNXRvN2ZneCJ9.47aVkXUGN8JNldnZUjj-nA'
    map = new mapboxgl.Map({
      container: 'backmap', // container ID
      style: 'mapbox://styles/dlbs0/cm0zbvi4501a501pj3rkd5sls',
      center: [130, 0], // starting position [lng, lat]
      zoom: 1.5, // starting zoom
      projection: 'globe', // display the map as a 3D globe
      attributionControl: false
      // antialias: true
    })

    map.on('style.load', () => {
      console.log('style loaded')
      console.log(map?.getFog())
      map?.setFog({
        range: [0.5, 10],
        'horizon-blend': 0.1,
        color: '#c8d8de',
        'high-color': 'transparent',
        'space-color': 'transparent',
        'star-intensity': 0.0
      }) // Set the default atmosphere style

      spinGlobe()
    })
    map.on('moveend', () => {
      if (arrivedState.top) spinGlobe()
    })
    function spinGlobe() {
      if (!map) return
      const secondsPerRevolution = 180
      const distancePerSecond = 360 / secondsPerRevolution

      const center = map.getCenter()
      center.lng += distancePerSecond
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      // map.easeTo({ center, duration: 1000, easing: (n) => n, zoom: 1.5, pitch: 0 })
    }
  })

  const el = ref<HTMLElement | null>(null)
  const { isScrolling, arrivedState } = useScroll(el)
  watch(isScrolling, (value) => {
    if (!value && map && !arrivedState.top) {
      console.log('arrivedState', value, map)
      // generate a random lnglat
      const randomPointCoords = randomPoint()
      map.easeTo({
        duration: 2000,
        pitch: 60,
        zoom: 3,
        center: randomPointCoords.features[0].geometry.coordinates as [number, number]
      })
    }
  })
  watch(arrivedState, (value) => {
    console.log('arrivedState', value.top)
    if (!value.top && map) {
      map.setPadding({ left: 300, right: 0, top: 0, bottom: 0 })
    } else if (map) {
      map.setPadding({ left: 0, right: 0, top: 0, bottom: 0 })
    }
  })

  return { interactive: arrivedState.top }
}

export function showBracke() {
  if (!map) return
  map.easeTo({
    center: [15.4185552491721, 62.750063825451555],
    duration: 3000,
    pitch: 0,
    zoom: 12,
    padding: { left: 0, right: 0, top: 0, bottom: height.value * 0.25 }
  })
}

export function showGlobe() {
  if (!map) return
  map.flyTo({
    center: [130, 0], // starting position [lng, lat]
    zoom: 1.5, // starting zoom    duration: 2000,
    pitch: 0,
    duration: 3000,
    padding: { left: 0, right: 0, top: 0, bottom: 0 }
  })
}

export function zoomToId(id: string) {
  if (!map) return
  const trip = getTripById(id)
  if (!trip) return
  const bottomPadding = width.value > 900 ? 0 : height.value * 0.5
  const leftPadding = width.value > 900 ? width.value * 0.25 : 0

  map.flyTo({
    center: trip.geography.overview.center,
    zoom: trip.geography.overview.zoom,
    duration: 2000,
    pitch: 50,
    padding: { left: leftPadding, right: 0, top: 0, bottom: bottomPadding }
  })
}

export function cancelMovement() {
  if (!map) return
  map.stop()
}
