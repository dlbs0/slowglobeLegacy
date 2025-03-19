import type { Trip } from '@/functions/trips'
import imgUrl from './images/PXL_20250227_212707341.jpg?w=600&gallery'

export const golden_day_in_sweden: Trip = {
  id: 'golden_day_in_sweden',
  name: 'A Golden Day in Sweden',
  headerImage: imgUrl,
  date: '2025-02-22',
  locationText: 'Sundsvall, Sweden',
  geography: {
    overview: {
      center: [17.2638639906221, 62.406413433909364],
      zoom: 6
    }
  }
}
