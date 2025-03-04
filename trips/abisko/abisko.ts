import type { Trip } from '~/allTrips'
import imgUrl from '@/assets/images/other/20240922_172726-2.jpg?w=600&gallery'
import abiksoGeo from './abisko.json'

export const abisko: Trip = {
  id: 'abisko',
  name: 'An Adventure in Abisko',
  headerImage: imgUrl,
  date: '2024-12-29',
  locationText: 'Abisko, Sweden',
  geography: {
    overview: {
      center: [18.784589334449606, 68.35816615337762],
      zoom: 5.5
    },
    detail: abiksoGeo
  }
}
