<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGGallery from '@/components/SGGallery.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGText from '@/components/SGText.vue'
import { golden_day_in_sweden } from './golden_day_in_sweden'
</script>

<template>
  <DetailView>
    <SGHeader>A Golden Day in Sweden</SGHeader>
    <SGText>
      Thanks to some work-sponsored travel, both Bek and Nathan were in Sundsvall for the week. The
      moment Nathan arrived he was shown the snowman which Bek and Paula had been building based on
      on his likeness for the past few hours. Suitably impressed, the group ate their first (of
      many) Swedish burger meal, and piled into the car to drive to an undisclosed location.
    </SGText>
    <SGGallery :list="['o_snowman-lapse.m4v', 'PXL_20250222_153320241.PORTRAIT.jpg']" />
    <SGText>
      This location turned out to be the SCA arena, host to the evenings hockey game between local
      team Timrå and visiting Leksands. The first hockey game for most of us turned out more
      exciting than we’d imagined, with the home team taking a 3-1 victory, and possibly scoring a
      final extra goal right on the buzzer, taking advantage of the oppositions lack of goalie.
      Timrå had a serious fanbase cheering them on the entire game, and the stadium was a sea of red
      and white (except for Nathan wearing his blue jacket - Leksands colours). It was an exciting
      start to the week, tempered only by being caught in the rush of cars leaving the stadium.
    </SGText>
    <SGGallery :list="['PXL_20250222_185817425.jpg', 'o_ice_hockey.m4v']" />
    <SGText>
      We decided to hit the slopes across town the next day, Bek and Paula on skis and Daniel and
      Nathan on snowboards. We had managed to borrow most of our gear from Fritidsbanken, a kind of
      free outdoor gear library. This first outing took us to the giddy heights of the free kids
      platter, giving us a downwards run of almost 200 meters. This was still plenty while we got
      our feet back under us, but started to get old fairly quickly.
      <br />
      <br />
      <!-- TODO: Thinking the following paragraph could be in italics?? -->
      A subsequent trip later in the week took us to Sidsjöbacken, a slightly larger set of runs on
      the other side of the same mountain. Buying a lift pass didn’t get us away from the children
      however, as our visit coincided with a school trip, meaning we had to be on the lookout for
      small children pizza-ing straight down the hill.
      <br />
      <br />
      We broke for a late lunch at Max, a Swedish burger chain, where we discovered some delicious
      dipping sauces, and then drove up to the North Mountain for a hike and to admire the view over
      the town.
    </SGText>
    <SGGallery
      :list="[
        'PXL_20250223_120146637.jpg',
        'PXL_20250223_132312688.jpg',
        'PXL_20250223_142501295.jpg',
        'PXL_20250223_150747554.jpg'
      ]"
    />
    <SGText>
      Monday night found us all at the bouldering gym in Sundsvall, where we were joined by Paula’s
      friend Ebba for a good climbing session reminiscent of the good old days in Adelaide. After
      feeling all muscles burning we decided to follow old traditions finding one of the local
      burger joints (Apa) for dinner. The burgers were delicious closing out what was a fun evening
      until arriving back at the cars to find that a nasty policeman had left a note on both cars...
    </SGText>
    <SGGallery :list="['PXL_20250224_192555796.jpg']" />
    <SGText>
      On Wednesday, those of us who weren’t working headed 130km north to hike the High Coast, an
      area of Sweden that feels more like Norway with islands, mountains and sheets of ice. Arriving
      in the carpark, we were alone except for a couple with four dogs. For reasons unknown to us,
      they left two of their dogs in the car, and set off on a several hour walk with the others,
      much to the dismay of the two left behind.
      <br />
      <br />
      We planned to test out our new snowshoes, which we strapped on with only minor difficulty and
      began trekking through the snow. We quickly realised that the marked trails were so compacted
      that we were better off with studs, and walking off the trails was a lot of work for those
      breaking trail, so after a kilometer or so when we stopped for lunch, we stowed the snowshoes.
    </SGText>
    <SGGallery
      :list="[
        'PXL_20250226_104859054.MP.jpg',
        'PXL_20250226_105100732.jpg',
        'PXL_20250226_111024044.jpg',
        'PXL_20250226_115930950.jpg',
        'PXL_20250226_125011487.jpg',
        'PXL_20250226_153510325.jpg'
      ]"
    />
  </DetailView>
</template>
