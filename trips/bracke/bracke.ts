import type { Trip } from '@/functions/trips'
import imgUrl from './images/20240922_162227.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

// signal.eu.org/osm/#locs=62.750236,15.417418;62.386411,17.315204
export const bracke: Trip = {
  id: 'bracke',
  name: 'To buy a bike in Bräcke',
  headerImage: imgUrl,
  date: '2024-09-22',
  locationText: 'Bräcke, Sweden',
  geography: {
    overview: {
      center: [15.4185552491721, 62.750063825451555],
      zoom: 7,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
