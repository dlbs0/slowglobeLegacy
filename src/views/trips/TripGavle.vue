<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGImages from '@/components/SGImages.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGText from '@/components/SGText.vue'
import { gavle } from '@/trips/gavle'

const tripId = 'gavle'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">A Monday in Gävle</SGHeader>
    <SGText>
      Another week, another train trip to acquire items from strangers.
      <br />
      <br />
      This week, I was off to Gävle (pronounced yeah-vle) to pick up some speakers. It's about two
      hours south of Sundsvall by train, but due to track upgrades, the line was closed in the
      middle of the day, so my only option was to make a day of it, leaving at 7:00, and arriving
      home at 18:30.
      <br />
      <br />
      I left the house early in the morning on the coldest day we've had yet; cycling down to the
      train station over frost-covered ground, regretting my lack of gloves and metal brake levers.
      I made it onto the full train with a few minutes to warm up before we left.
    </SGText>
    <SGMapCutout :fit-bounds-geometry="gavle.geography.detail?.features[0]" />
    <SGText>
      On the train, I had a look at what exciting things there would be to do when I got there.
      Gävle is famous for the Gävlebocken, a giant goat made from straw, but it's a Christmas
      tradition, so it wouldn't be up yet. Gävle is also home to the Swedish Railway Museum, which
      would be great, if it wasn't closed on Mondays. Closed too was the Prison Museum, the Cultural
      Centre, and the County Museum.
      <br />
      <br />Monday is perhaps not the day to visit Gävle.
      <br />
      <br />We'd passed through Gävle before to change trains, but never gotten out of the station,
      only getting a glimpse of the classic 'small European' city behind it. Now that I was here, I
      would get plenty of time to get acquainted.
      <br />
      <br />I spent the day wandering the streets, looking to go past as many of the B-list
      attractions from the city's walking tour as I could. Some highlights included the town square,
      where vendors were selling berries and mushrooms from the back of trucks, the river running
      through the centre of town, where there's a historic lighthouse boat moored, and the old
      industrial district and gasworks, with lovely old brick buildings.
      <br />
    </SGText>
    <SGMapCutout :fit-bounds-geometry="gavle.geography.detail?.features[1]" />
    <!-- <SGMapCutout
      :fit-bounds-geometry="
        featureCollection([
          point([17.179866272796776, 60.68079257583379]),
          point([17.17173505418336, 60.67952802154804]),
          point([17.179046755903336, 60.678043775561555]),
          point([17.167597825628537, 60.68211539870141]),
          point([17.18401294442797, 60.67574761846086])
        ])
      "
    /> -->

    <SGImages
      :add-photos-to-map="true"
      :list="[
        {
          href: '/images/gavle/20240930_140125.jpg',
          coords: [17.179046755903336, 60.678043775561555]
        },
        '/images/gavle/DSC_0261.jpg',
        '/images/gavle/DSC_0299.jpg',
        '/images/gavle/DSC_0286.jpg',
        '/images/gavle/DSC_0270.jpg',
        '/images/gavle/DSC_0281.jpg',
        '/images/gavle/DSC_0267.jpg',
        '/images/gavle/DSC_0297.jpg',
        {
          href: '/images/gavle/20240930_100123.jpg',
          coords: [17.141058822578366, 60.67739343466307]
        },
        {
          href: '/images/gavle/DSC_0170.jpg',
          coords: [17.179866272796776, 60.68079257583379]
        },
        '/images/gavle/DSC_0183.jpg',
        '/images/gavle/DSC_0157.jpg',
        '/images/gavle/DSC_0198.jpg',
        '/images/gavle/DSC_0215.jpg',
        {
          href: '/images/gavle/DSC_0229.jpg',
          coords: [17.17173505418336, 60.67952802154804]
        },
        '/images/gavle/DSC_0116.jpg'
      ]"
    ></SGImages>
    <SGText>
      <br />I had a late salad bar and pastry lunch (Swedish salad bars are in most supermarkets,
      and a great easy lunch option), and then it was getting close to time to actually go and pick
      up some speakers.
      <br />
    </SGText>
    <SGImages
      :add-photos-to-map="true"
      :list="[
        {
          href: '/images/gavle/20240930_145153.jpg',
          coords: [17.15019202295648, 60.67429377366447]
        },
        '/images/gavle/20240930_143101.jpg',
        {
          href: '/images/gavle/20240930_145641.jpg',
          coords: [17.14950866889892, 60.67287024882222]
        }
      ]"
    ></SGImages>
    <!-- <SGMapCutout :center="[17.15019202295648, 60.67429377366447]" :zoom="17"></SGMapCutout> -->
    <SGMapCutout
      :center="[17.14993156983021, 60.673195058808204]"
      :zoom="16.5"
      :pitch="30"
    ></SGMapCutout>
    <SGText>
      <br />My route took me through the old part of the city, which was quite different to the
      older parts of most Swedish cities I've seen. Here, the houses are mostly wooden, and date
      from the 18th century. They were supposedly saved from the great fire of 1869 by demolishing
      one of the bridges across the river so the fire couldn't spread. It was a very pretty part of
      town, with some really nice 'real' cobblestone roads.
      <br />
      <br />I successfully acquired the speakers I was after and was then faced with the challenge
      of getting them back to the station. Having previously owned the smaller versions of them, I
      had anticipated just putting them into some IKEA bags and carrying them home. I had woefully
      underestimated the size and weight (8.5kg each…) and they did not fit at all in the bags I had
      brought. I could barely see over the top of the two boxes, and was quite glad that my train
      was delayed a little so I could take a break halfway through and put them down.
      <br />
    </SGText>
    <SGImages
      :list="['/images/gavle/20240930_160947.jpg', '/images/gavle/20240930_154613.jpg']"
    ></SGImages>
    <SGText>
      <br />Luckily when I arrived back in Sundsvall, I was saved from having to carry them home by
      Ebba and Paula picking me up after their bulb buying trip to the nursery.
      <br />
      <br />I thoroughly enjoyed my time in Gävle. It's a beautiful town on the river, with some
      incredible old buildings and lots of history. I'll have to go back soon, but maybe not on a
      Monday.
    </SGText></DetailView
  >
</template>
