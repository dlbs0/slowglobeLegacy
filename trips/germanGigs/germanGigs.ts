import type { Trip } from '@/functions/trips'
import imgUrl from './images/vlcsnap-2025-03-04-15h41m48s027.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

export const germanGigs: Trip = {
  id: 'germanGigs',
  name: 'Three Gigs in Germany',
  headerImage: imgUrl,
  date: '2025-02-05',
  locationText: 'Berlin, Germany',
  geography: {
    overview: {
      center: [13.38905952078278, 52.517102412037445],
      zoom: 7,
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
