import type { Trip } from '@/functions/trips'
import sundsvallImage from './images/20240906_112409.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

// signal.eu.org/osm/#locs=62.750236,15.417418;62.386411,17.315204
export const sweden: Trip = {
  id: 'sweden',
  name: 'Off to Sweden',
  headerImage: sundsvallImage,
  date: '2024-09-06',
  locationText: 'Sundsvall, Sweden',
  geography: {
    overview: {
      center: [17.2638639906221, 62.406413433909364],
      zoom: 6,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
