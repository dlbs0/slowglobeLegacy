import type { Trip } from '@/trips/allTrips'
import imgUrl from '@/assets/images/other/20240922_172726-2.jpg?w=600&gallery'

export const germanGigs: Trip = {
  id: 'germanGigs',
  name: 'Three Gigs in Germany',
  headerImage: imgUrl,
  date: '2025-02-05',
  locationText: 'Berlin, Germany',
  geography: {
    overview: {
      center: [13.392504113856035, 52.48465316811334],
      zoom: 7
    }
  }
}
