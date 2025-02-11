import type { Trip } from './allTrips'
import imgUrl from '@/assets/images/abisko/20241231_122518.jpg'
import abiksoGeo from '@/trips/abisko.json'

// signal.eu.org/osm/#locs=62.750236,15.417418;62.386411,17.315204
export const abisko: Trip = {
  id: 'abisko',
  name: 'Active adventures in Abisko',
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
