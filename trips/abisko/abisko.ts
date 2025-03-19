import imgUrl from './images/20241231_122518.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'
import type { Trip } from '@/functions/trips'

export const abisko: Trip = {
  id: 'abisko',
  name: 'An Adventure in Abisko',
  headerImage: imgUrl,
  date: '2024-12-29',
  locationText: 'Abisko, Sweden',
  geography: {
    overview: {
      center: [18.784589334449606, 68.35816615337762],
      zoom: 5.5,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
