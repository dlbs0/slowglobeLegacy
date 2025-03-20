import type { Trip } from '@/functions/trips'
import imgUrl from './images/DSC_0241.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

export const gavle: Trip = {
  id: 'gavle',
  name: 'A Monday in Gävle',
  headerImage: imgUrl,
  // headerImage: '/images/gavle/DSC_0241.jpg',
  date: '2024-09-30',
  locationText: 'Gävle, Sweden',
  geography: {
    overview: {
      zoom: 7,
      center: [17.151053, 60.676095],
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
