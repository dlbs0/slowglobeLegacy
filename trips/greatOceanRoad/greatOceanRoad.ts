import type { Trip } from '~/allTrips'
import imgUrl from '@/assets/images/other/20240922_172726-2.jpg'

export const greatOceanRoad: Trip = {
  id: 'greatOceanRoad',
  name: 'Great Ocean Roadtrip',
  headerImage: imgUrl,
  date: '2024-09-06',
  locationText: 'Adelaide - Melbourne, Australia',
  geography: {
    overview: {
      center: [144.95, -37.8],
      zoom: 6
    }
  }
}
