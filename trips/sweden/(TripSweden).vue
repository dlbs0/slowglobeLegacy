<script setup lang="ts">
import SGImages from '@/components/SGImages.vue'
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGShowExtraDetail from '@/components/SGShowExtraDetail.vue'
import SGText from '@/components/SGText.vue'
import { sweden } from './sweden'

// Flight data from https://www.flightaware.com/live/flight/THA466/history/20240905/0340Z/YMML/VTBS/tracklog

const tripId = 'sweden'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">Moving to Sweden</SGHeader>
    <!-- <SGMapFollow
      :geometry="sweden.geography.detail?.features[5]"
      :follow="true"
      :no-satelite="true"
      :overview="true"
      :follow-zoom="4"
    ></SGMapFollow> -->
    <SGText>
      For anyone who's been out of the loop, and hasn't already worked it out from the title, we're
      moving (moved?) to Sweden for the next few years. And since this is a collection of stories
      about trips, I think that this probably qualifies, though it's a short and mostly uneventful
      one.
      <br />
      <br />
      We were lucky enough to be dropped off at Melbourne Airport by Galvin, who indulged my detour
      to the chemist to buy a years supply of the only effective chap stick that exists, and then
      made a second round trip to chauffeur an errant pillow.
      <br />
      <br />
      We left Melbourne slightly overwhelmed by the last hetic few weeks of moving out, seeing
      friends, and sorting out life in a foreign country. We'd been through the same international
      gate with Bec on our recent Fiji trip, so despite not being our home airport, it felt
      strangely familiar, taking away a lot of the gravitas.
      <br />
      <br />
      First time flying Thai, and it was possibly the best flight experience I've ever had (barring
      one almost completely empty and very surreal A380 DXB-LGW flight). Spacious, clean, new, and
      (thanks to a going away present from Bertram) the ability to connect our noise cancelling
      headphones to the inflight entertainment.
      <br />
      <br />
      Transferring in Bangkok was a little confusing, but we had several hours to figure it out and
      wander around the empty airport before boarding the connecting flight.
      <br />
      <br />
      We made a significant detour around Russia, and watched the sun rise over Poland as we got
      ever closer to Sweden. We saw the island of Gotland, and then it was never-ending pine forests
      until we touched down at Stockholm Arlanda.
      <br />
      <br />
      Arlanda Airport smells like Sweden. It also had extremely fast customs (despite our passport
      worries) and baggage pickup, which leaves you in a familiar arrivals areas with a short walk
      to the train that would take us all the way home.
      <br />
      <br />
      We were picked up at Sundsvall station by our new landlord Peter, and made a quick supermarket
      run before getting a tour of the house. We're lucky enough to get a whole house to ourselves,
      and spent the afternoon learning about all the house maintanence that comes with sub-zero
      temperatures. House lesson over, we finally had a chance to sleep for as long as we wanted for
      the first time in weeks. It was fun.
    </SGText>
    <SGShowExtraDetail />
    <SGMapCutout :fit-bounds-geometry="sweden.geography.detail" />
    <SGImages
      :list="[
        '20240906_112409.jpg',
        '20240905_212251.jpg',
        '20240906_104644.jpg',
        '20240906_104119.jpg',
        '20240906_110142.jpg',
        '20240906_212444.jpg',
        'PXL_20240905_000733663.MP.jpg'
      ]"
    ></SGImages>
    <SGText>(Flight path above is the actual recorded flight data for the day)</SGText>
  </DetailView>
</template>
