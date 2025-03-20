import type { Trip } from '@/functions/trips'
import imgUrl from './images/d186894c-f18b-4148-b6c3-0361baa2724e-2.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

export const crossCountryKlovsjo: Trip = {
  id: 'crossCountryKlovsjo',
  name: 'Cross Country in Klövsjö',
  headerImage: imgUrl,
  date: '2025-03-7',
  locationText: 'Klövsjö, Sweden',
  geography: {
    overview: {
      center: [14.194307634326947, 62.52389179475344],
      zoom: 7,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
