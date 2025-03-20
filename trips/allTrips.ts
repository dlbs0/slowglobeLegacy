import type { Trip } from '@/functions/trips'
import { bracke } from '~/bracke/bracke'
import { flinders } from '~/flinders/flindersHike'
import { gavle } from '~/gavle/gavle'
import { sweden } from '~/sweden/sweden'
import { ljusdal } from '~/ljusdal/ljusdal'
import { germanGigs } from '~/germanGigs/germanGigs'
import { golden_day_in_sweden } from '~/golden_day_in_sweden/golden_day_in_sweden'
import { greatOceanRoad } from '~/greatOceanRoad/greatOceanRoad'
import { abisko } from './abisko/abisko'
import { crossCountryKlovsjo } from './crossCountryKlovsjo/crossCountryKlovsjo'

export const allTrips: Trip[] = [
  crossCountryKlovsjo,
  golden_day_in_sweden,
  germanGigs,
  abisko,
  ljusdal,
  gavle,
  bracke,
  sweden,
  greatOceanRoad,
  flinders
]
