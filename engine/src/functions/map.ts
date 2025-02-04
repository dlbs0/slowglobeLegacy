import { allTrips, getTripById } from '@/trips/allTrips'
import { bbox, featureCollection, point } from '@turf/turf'
import { useWindowSize } from '@vueuse/core'
import type { Feature, FeatureCollection } from 'geojson'
import mapboxgl, {
  GeoJSONSource,
  type RasterLayerSpecification,
  type StyleImageInterface
} from 'mapbox-gl'
import { onMounted, readonly, ref } from 'vue'

let map: null | mapboxgl.Map = null
const mapShouldSpin = ref(false)
const mapInteractive = ref(false)
let firstLoad = true
const hikingLayersVisible = ref(false)

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
    }).addControl(
      new mapboxgl.AttributionControl({
        compact: true,
        customAttribution: 'dlbs'
      })
    )

    map.on('style.load', () => {
      console.log('style loaded')
      map?.setFog({
        range: [0.5, 10],
        'horizon-blend': 0.1,
        color: '#c8d8de',
        'high-color': 'transparent',
        'space-color': 'transparent',
        'star-intensity': 0.0
      }) // Set the default atmosphere style
      addLayersAndSources()
      // console.log(map?.getConfig('basemap'))
      // map?.setConfig('basemap', {
      //   theme: 'default',
      //   showPlaceLabels: false,
      //   showRoadLabels: false,
      //   showPointOfInterestLabels: false,
      //   showTransitLabels: false,
      //   show3dObjects: true,
      //   lightPreset: 'dawn',
      //   font: 'DIN Pro'
      // })
    })
    map.on('moveend', () => {
      if (mapShouldSpin.value) spinGlobe()
    })
  })
  return { interactive: readonly(mapInteractive) }
}

export function useMapInteractive() {
  function setMapInteractive(value: boolean) {
    mapInteractive.value = value
    if (!map) return
    const ints = [
      map.scrollZoom,
      map.dragRotate,
      map.dragPan,
      map.doubleClickZoom,
      map.touchZoomRotate
    ]
    if (value) {
      ints.forEach((int) => int.enable())
    } else {
      ints.forEach((int) => int.disable())
    }
  }
  return { mapInteractive: readonly(mapInteractive), setMapInteractive }
}

function spinGlobe() {
  if (!map) return
  if (!mapShouldSpin.value) return
  if (map.isMoving()) return
  const secondsPerRevolution = 180
  const distancePerSecond = 360 / secondsPerRevolution

  const center = map.getCenter()
  center.lng += distancePerSecond
  // Smoothly animate the map over one second.
  // When this animation is complete, it calls a 'moveend' event.
  map.easeTo({
    center,
    duration: 1000,
    easing: (n) => n,
    zoom: 1.5,
    pitch: 0,
    padding: 0,
    bearing: 0
  })
}

export function showArticleStart(id: string) {
  if (!map) return
  const trip = getTripById(id)
  if (!trip) return

  const zoom = 12

  map.easeTo({
    center: trip.geography.overview.center,
    duration: firstLoad ? 10 : 3000,
    pitch: 0,
    zoom,
    bearing: 0,
    padding: { left: 0, right: 0, top: 0, bottom: height.value * 0.25 }
  })
  firstLoad = false
}

export function showGlobe() {
  if (!map) return
  map.flyTo({
    center: [map.getCenter().lng, 0], // starting position [lng, lat]
    zoom: 1.5, // starting zoom    duration: 2000,
    pitch: 0,
    bearing: 0,
    duration: 3000,
    padding: { left: 0, right: 0, top: 0, bottom: 0 }
  })
}

export function zoomToId(id: string) {
  setMapSpin(false)
  if (!map) return
  const trip = getTripById(id)
  if (!trip) return
  const bottomPadding = width.value > 900 ? 0 : height.value * 0.5
  const leftPadding = width.value > 900 ? width.value * 0.25 : 0

  let zoom = trip.geography.overview.zoom
  if (width.value < 900) zoom -= 1

  map.flyTo({
    center: trip.geography.overview.center,
    zoom: zoom,
    duration: 2000,
    pitch: 50,
    bearing: 0,
    padding: { left: leftPadding, right: 0, top: 0, bottom: bottomPadding }
  })
  const dotSource = map.getSource('dot-point') as GeoJSONSource
  dotSource?.setData(featureCollection([point(trip.geography.overview.center)]))
  const tracksSource = map.getSource('overview-tracks') as GeoJSONSource
  tracksSource?.setData(trip.geography.detail ?? featureCollection([]))
  firstLoad = false
}

export function showTracks(id: string) {
  if (!map) return
  console.log('showTracks', id)
  const trip = getTripById(id)
  if (!trip) return

  const tracksSource = map.getSource('detail-tracks') as GeoJSONSource
  tracksSource?.setData(trip.geography.detail ?? featureCollection([]))
}

export function useHikingLayers() {
  function showHikingLayers(visible: boolean) {
    const map = getMap()
    if (!map) return
    const coolLayers = ['mapbox-satellite', 'hillshade', 'contour', 'contour-labels']
    hikingLayersVisible.value = visible

    coolLayers.forEach((layer) => {
      const lay = map.getLayer(layer) as RasterLayerSpecification
      if (lay) {
        map.setLayoutProperty(layer, 'visibility', visible ? 'visible' : 'none')
      }
    })
  }

  return { visible: readonly(hikingLayersVisible), showHikingLayers }
}

export function fitBounds(
  geography: FeatureCollection | Feature,
  padding: { left: number; right: number; top: number; bottom: number } = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  },
  pitch: number = 0
) {
  if (!map) return
  const bounds = bbox(geography)
  if (!bounds || bounds.length != 4) return
  map.fitBounds(bounds, { padding, pitch, speed: 1 })
}

export function cancelMovement() {
  if (!map) return
  map.stop()
}

export function setMapSpin(value: boolean) {
  mapShouldSpin.value = value
  if (value) spinGlobe()
}

function addLayersAndSources() {
  if (!map) return

  const images: [string, string, boolean?][] = [
    ['diamond', 'diamond.png'],
    ['pattern-dot', 'dot.png'],
    ['loc-arrow', 'locArrow.png'],
    ['campsite', 'campsite.png'],
    ['target', 'target.png'],
    ['plane', 'plane.png'],
    ['mountain', 'mountain.png'],
    ['picnic', 'picnic-site.png'],
    ['flag', 'racetrack.png']
  ]
  images.forEach((image) => {
    map?.loadImage('/images/' + image[1], (error, imageData) => {
      if (error) throw error
      if (!map?.hasImage(image[0]) && imageData)
        map?.addImage(image[0], imageData, { sdf: image[2] })
    })
  })

  map.addSource('centers', {
    type: 'geojson',
    data: featureCollection(allTrips.map((trip) => point(trip.geography.overview.center)))
  })

  map.addLayer({
    id: 'centers',
    type: 'symbol',
    source: 'centers',
    layout: {
      'icon-image': 'diamond',
      'icon-size': 1
    },
    paint: { 'icon-halo-color': 'rgba(255, 255, 255, 0.8)', 'icon-halo-width': 2 }
  })

  map.addSource('overview-tracks', {
    type: 'geojson',
    data: featureCollection([])
  })

  map.addLayer({
    id: 'overview-tracks',
    type: 'line',
    source: 'overview-tracks',
    paint: {
      'line-color': 'rgb(110, 25, 25)',
      'line-width': 2
    }
  })

  map.addSource('detail-tracks', {
    type: 'geojson',
    lineMetrics: true,

    data: featureCollection([])
  })

  const lineBaseWidth = 6
  map.addLayer({
    id: 'detail-tracks-walk',
    type: 'line',
    source: 'detail-tracks',
    layout: { 'line-join': 'none' },
    paint: {
      // 'line-width': 10,
      'line-occlusion-opacity': 0.5,
      'line-pattern': 'pattern-dot',
      'line-color': 'rgb(110, 25, 25)',
      'line-width': [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        0,
        lineBaseWidth * 1,
        0.9999,
        lineBaseWidth * 2,
        1,
        lineBaseWidth * 1,
        1.9999,
        lineBaseWidth * 2,
        2,
        lineBaseWidth * 1,
        2.9999,
        lineBaseWidth * 2,
        3,
        lineBaseWidth * 1,
        3.9999,
        lineBaseWidth * 2,
        4,
        lineBaseWidth * 1,
        4.9999,
        lineBaseWidth * 2,
        5,
        lineBaseWidth * 1,
        5.9999,
        lineBaseWidth * 2,
        6,
        lineBaseWidth * 1,
        6.9999,
        lineBaseWidth * 2,
        7,
        lineBaseWidth * 1,
        7.9999,
        lineBaseWidth * 2,
        8,
        lineBaseWidth * 1,
        8.9999,
        lineBaseWidth * 2,
        9,
        lineBaseWidth * 1,
        9.9999,
        lineBaseWidth * 2,
        10,
        lineBaseWidth * 1,
        10.9999,
        lineBaseWidth * 2,
        11,
        lineBaseWidth * 1,
        11.9999,
        lineBaseWidth * 2,
        12,
        lineBaseWidth * 1,
        12.9999,
        lineBaseWidth * 2,
        13,
        lineBaseWidth * 1,
        13.9999,
        lineBaseWidth * 2,
        14,
        lineBaseWidth * 1,
        14.9999,
        lineBaseWidth * 2,
        15,
        lineBaseWidth * 1,
        15.9999,
        lineBaseWidth * 2,
        16,
        lineBaseWidth * 1,
        16.9999,
        lineBaseWidth * 2,
        17,
        lineBaseWidth * 1,
        17.9999,
        lineBaseWidth * 2,
        18,
        lineBaseWidth * 1,
        18.9999,
        lineBaseWidth * 2,
        19,
        lineBaseWidth * 1,
        19.9999,
        lineBaseWidth * 2,
        20,
        lineBaseWidth * 1,
        20.9999,
        lineBaseWidth * 2,
        21,
        lineBaseWidth * 1,
        22,
        lineBaseWidth * 2
      ]
    },
    filter: [
      'all',
      ['==', ['get', 'type'], 'walk'],
      ['case', ['has', 'overview'], ['==', true, ['get', 'overview']], true]
    ]
  })
  map.addLayer({
    id: 'detail-tracks-train',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      'line-color': 'rgb(110, 25, 25)',
      'line-width': 6
    },
    filter: ['==', 'type', 'train']
  })
  map.addLayer({
    id: 'detail-tracks-train-dashes',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      'line-color': '#aa8c53',
      'line-width': 4,
      'line-dasharray': [0, 2, 2]
    },
    filter: ['==', 'type', 'train']
  })
  map.addLayer({
    id: 'detail-tracks-bus',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      // 'line-color': '#aa8c53',
      'line-color': 'rgb(110, 25, 25)',
      'line-width': 6
    },
    filter: ['==', 'type', 'bus']
  })
  map.addLayer({
    id: 'detail-tracks-bus-dashes',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      'line-color': '#aa8c53',
      // 'line-color': 'rgb(110, 25, 25)',
      'line-width': 4
      // 'line-dasharray': [0, 2, 4]
    },
    filter: ['==', 'type', 'bus']
  })
  map.addLayer({
    id: 'detail-tracks-flight-yellow',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      'line-color': '#aa8c53',
      'line-width': 3
    },
    filter: ['==', 'type', 'flight']
  })
  map.addLayer({
    id: 'detail-tracks-flight',
    type: 'line',
    source: 'detail-tracks',
    paint: {
      'line-color': 'rgb(110, 25, 25)',
      'line-width': 1.5,
      'line-gap-width': 3
    },
    filter: ['==', 'type', 'flight']
  })
  map.addLayer({
    id: 'detail-tracks-flight-icon',
    type: 'symbol',
    source: 'detail-tracks',
    paint: { 'text-color': '#fff', 'text-translate': [0, 0], 'icon-translate': [0, 0] },
    layout: {
      'symbol-placement': 'line',
      'icon-image': 'plane',
      'icon-rotate': 90,

      'icon-anchor': 'bottom',
      // 'text-field': ['get', 'name'],
      // 'text-font': ['Crimson Bold', 'Open Sans Regular', 'Arial Unicode MS Regular'],
      // 'text-anchor': 'left',
      // 'text-size': 12,
      // 'symbol-spacing': 50
      'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 5, 50, 10, 200]
      // 'text-radial-offset': 2
    },
    filter: ['==', 'type', 'flight']
  })
  map.addLayer({
    id: 'detail-points',
    type: 'symbol',
    source: 'detail-tracks',
    layout: {
      'icon-image': ['get', 'icon'],
      'icon-size': 1,
      'text-anchor': 'left',
      'text-radial-offset': 0.75,
      'text-field': ['get', 'name'],
      'text-font': ['Crimson Italic', 'Open Sans Regular', 'Arial Unicode MS Regular']
    },
    paint: {
      'text-color': 'rgb(66, 10, 17)',
      'text-halo-color': 'rgba(255,255,255, 0.6)',
      'text-halo-width': 1.5,
      'text-translate': [0, 2]
    },
    filter: ['has', 'icon']
  })

  map.addImage('pulsing-dot', new pulsingDot(), { pixelRatio: 2 })

  map.addSource('dot-point', {
    type: 'geojson',
    data: featureCollection([])
  })
  map.addLayer({
    id: 'layer-with-pulsing-dot',
    type: 'symbol',
    source: 'dot-point',
    layout: {
      'icon-image': 'pulsing-dot'
    },
    paint: {
      'icon-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1, 12, 0]
    }
  })
}

export function showExtraTripDetail(val: boolean) {
  if (!map) return
  if (map.getLayer('detail-tracks-walk')) {
    const filter = map.getFilter('detail-tracks-walk')
    if (!filter || !filter[2] || !filter[2][2] || typeof filter[2][2][1] != 'boolean') return
    filter[2][2][1] = !val
    map?.setFilter('detail-tracks-walk', filter)
  }
  if (map.getLayer('detail-points')) {
    map?.setLayoutProperty('detail-points', 'visibility', val ? 'visible' : 'none')
  }
}

export function showOverviews(value: boolean) {
  if (!map) return
  const overviewLayers = ['layer-with-pulsing-dot', 'centers', 'overview-tracks']

  overviewLayers.forEach((layer) => {
    const lay = map?.getLayer(layer)
    if (!lay) {
      setTimeout(() => {
        console.log('retrying setting overviews', layer)
        showOverviews(value)
      }, 100)
    } else map?.setLayoutProperty(layer, 'visibility', value ? 'visible' : 'none')
  })

  const detailLayers = [
    'detail-tracks-walk',
    'detail-tracks-train',
    'detail-tracks-train-dashes',
    'detail-tracks-bus',
    'detail-tracks-bus-dashes',
    'detail-points',
    'detail-tracks-flight',
    'detail-tracks-flight-yellow',
    'detail-tracks-flight-icon'
  ]
  detailLayers.forEach((layer) => {
    const lay = map?.getLayer(layer)
    if (!lay) {
      setTimeout(() => {
        console.log('retrying setting overviews', layer)
        showOverviews(value)
      }, 100)
    } else map?.setLayoutProperty(layer, 'visibility', value ? 'none' : 'visible')
  })
}

// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
class pulsingDot implements StyleImageInterface {
  size = 200
  public width = this.size
  public height = this.size
  public data = new Uint8ClampedArray(this.size * this.size * 4)
  public context: CanvasRenderingContext2D | null = null

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  public onAdd() {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    this.context = canvas.getContext('2d')
  }

  // Call once before every frame where the icon will be used.
  public render() {
    const duration = 2000
    const t = (performance.now() % duration) / duration
    const t2 = ((performance.now() + duration / 2) % duration) / duration

    const radius = (this.size / 2) * 0.3
    const outerRadius = (this.size / 2) * 0.7 * t + radius
    const outerRadius2 = (this.size / 2) * 0.7 * t2 + radius
    const context = this.context
    if (!context) return true

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height)
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
    context.fillStyle = `rgba(114, 24, 23, ${1 - t})`
    context.fill()

    context.beginPath()
    context.arc(this.width / 2, this.height / 2, outerRadius2, 0, Math.PI * 2)
    context.fillStyle = `rgba(114, 24, 23, ${1 - t2})`
    context.fill()

    // Draw the inner circle.
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(114, 24, 23, 1)'
    context.strokeStyle = '#ddd'
    context.lineWidth = 2 + 2 * (1 - t / 2)
    // context.lineWidth = 4
    context.fill()
    context.stroke()

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map?.triggerRepaint()

    // Return `true` to let the map know that the image was updated.
    return true
  }
}

export function getMap() {
  return map
}
