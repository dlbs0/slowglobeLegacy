import type { Trip } from '@/functions/trips'
import imgUrl from './images/20241126_143343.jpg?w=600&gallery'
import overviewGeo from './geometry.geojson?simplify'
import detailGeo from './geometry.geojson'

// https://valhalla.openstreetmap.de/directions?profile=car&wps=17.10733830928803%2C61.72452548073263%2C16.099755764007572%2C61.826195357595985

export const ljusdal: Trip = {
  id: 'ljusdal',
  name: 'A graphic lunch in Ljusdal',
  headerImage: imgUrl,
  // headerImage: '/images/gavle/DSC_0241.jpg',
  date: '2024-11-26',
  locationText: 'Ljusdal, Sweden',
  geography: {
    overview: {
      zoom: 7,
      center: [16.09905871288072, 61.82649817536674],
      tracks: overviewGeo
    },
    detail: detailGeo
  }
}
