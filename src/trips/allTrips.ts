import { bracke } from './bracke'

export interface Trip {
  id: string
  name: string
  headerImage: string
  date: string
  locationText: string
  geography: { overview: TripGeographyOverview; detail?: GeoJSON.FeatureCollection }
}

export interface TripGeographyOverview {
  center: [number, number]
  zoom: number
}

const sundsvall: Trip = {
  id: 'sundsvall',
  name: 'Sundsvall',
  headerImage: '/images/20240906_112409.jpg',
  date: '2024-09-06',
  locationText: 'Sundsvall, Sweden',
  geography: {
    overview: {
      center: [17.9, 62.4],
      zoom: 6
    }
  }
}

const greatOceanRoad: Trip = {
  id: 'great-ocean-road',
  name: 'Great Ocean Road',
  headerImage: '/images/20240922_172726-2.jpg',
  date: '2024-09-06',
  locationText: 'Adelaide - Melbourne, Australia',
  geography: {
    overview: {
      center: [144.95, -37.8],
      zoom: 6
    }
  }
}

export function getTripById(id: string) {
  return allTrips.find((trip) => trip.id === id)
}

export const allTrips: Trip[] = [bracke, sundsvall, greatOceanRoad]
