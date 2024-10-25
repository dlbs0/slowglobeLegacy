import { bracke } from './bracke'
import { flinders } from './flindersHike'
import { gavle } from './gavle'

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

import greatOceanRoadImage from '@/assets/images/other/20240922_172726-2.jpg?w=600&gallery'
import { sweden } from './sweden'

export const greatOceanRoad: Trip = {
  id: 'great-ocean-road',
  name: 'Great Ocean Road',
  headerImage: greatOceanRoadImage,
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

export function getTripHeaderInfoById(id: string) {
  const trip = getTripById(id)
  if (!trip) {
    return { locationText: '', date: '', headerImage: '' }
  }

  const { locationText, date, headerImage } = trip
  return { locationText, date, headerImage }
}

export const allTrips: Trip[] = [gavle, bracke, sweden, greatOceanRoad, flinders]
