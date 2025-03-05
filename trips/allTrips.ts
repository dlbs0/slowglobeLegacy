import { bracke } from '~/bracke/bracke'
import { flinders } from '~/flinders/flindersHike'
import { gavle } from '~/gavle/gavle'
import { sweden } from '~/sweden/sweden'
import { ljusdal } from '~/ljusdal/ljusdal'
import { germanGigs } from '~/germanGigs/germanGigs'
// import { golden_day_in_sweden } from '~/golden_day_in_sweden/golden_day_in_sweden'
import { greatOceanRoad } from '~/greatOceanRoad/greatOceanRoad'
import { abisko } from './abisko/abisko'

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

export const allTrips: Trip[] = [
  // golden_day_in_sweden,
  germanGigs,
  abisko,
  ljusdal,
  gavle,
  bracke,
  sweden,
  greatOceanRoad,
  flinders
]
