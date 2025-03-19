import type { Trip } from '@/functions/trips'
import imgUrl from './images/20240712_141222-2.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

export const flinders: Trip = {
  id: 'flinders',
  name: 'Hiking the Flinders Ranges',
  headerImage: imgUrl,
  date: '2024-07-22',
  locationText: 'Flinders Ranges, South Australia',
  geography: {
    overview: {
      center: [138.5445785243, -31.5794543736],
      zoom: 7,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
