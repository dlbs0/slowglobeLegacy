<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGImages from '@/components/SGImages.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGShowExtraDetail from '@/components/SGShowExtraDetail.vue'
import SGText from '@/components/SGText.vue'
import { bracke } from './bracke'
import { dFeatureCollection, dPoint } from '@/functions/classes'

const tripId = 'bracke'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">To Buy a Bike in Bräcke</SGHeader>
    <SGText>
      I needed a bike.
      <br />
      <br />
      After a week of searching, I finally found something on Marketplace that met my requirements.
      Something with big wheels, disc brakes, basic suspension and a good deal. Quite a surprisingly
      good deal actually, only 1000kr.
      <br />
      <br />
      The catch - it was in Bräcke.
      <br />
      <br />
      While Bräcke looks close to Sundsvall on the map, without a car, it's not the easiest place to
      get to. While the train ride from Sundsvall Central is only an hour and a half, the
      unoptimised timetable meant it would be at least a 7 hour adventure. Add to that the fact that
      I would need to walk from home to the station, because I can't ride two bikes home, and it was
      turning into quite the undertaking.
      <br />
    </SGText>
    <SGMapCutout :fit-bounds-geometry="bracke.geography.detail" />
    <SGText>
      <br />
      But I had nothing else to do on the weekend, so I messaged the guy, who informed me that he
      was in the studio all day Saturday recording drums for his band, but they'd probably be done
      by Sunday. And so Sunday, just after lunch, I found myself walking to the station on a lovely
      crisp Autumn day.
    </SGText>
    <SGShowExtraDetail />

    <SGImages
      :addPhotosToMap="true"
      :list="[
        {
          img: '20240912_092320.jpg',
          coords: [17.30491637358277, 62.39231737278283]
        },
        {
          img: '20240922_134006.jpg',
          coords: [17.3124174738977, 62.39050823971086]
        }
      ]"
    />
    <!-- <SGMapCutout :fit-bounds-geometry="bracke.geography.detail?.features[0]" /> -->
    <SGMapCutout
      :fit-bounds-geometry="
        dFeatureCollection([
          dPoint([17.300041770187057, 62.393583266996245]),
          dPoint([17.316135024206655, 62.38844209644947])
        ])
      "
    />

    <SGText>
      After negotiating the correct amount out of the ATM, I was at the train station just in time
      to recieve a text informing me that my train was cancelled. I would get the pleasure of a
      replacement bus instead. There seemed to be a few people in the same boat, and we all went
      down the escalators into the bus terminal, and were eventually bundled onto a waiting bus.

      <br />
      <br />
      The bus took it's time getting to Ånge, where we were switched to the train, and then finally
      I arrived in Bräcke, only close to an hour late. It was a strange but nice town; weathered and
      empty feeling, but a few people were on the streets as I walked to my destination, just out of
      town.
    </SGText>

    <SGMapCutout :fit-bounds-geometry="bracke.geography.detail?.features[2]" :pitch="55" />
    <SGImages
      :add-photos-to-map="true"
      :list="[
        {
          img: '20240922_161623.jpg',
          coords: [15.41796956604836, 62.7499712815856]
        },
        '20240922_162336.jpg',
        {
          img: '20240922_162029.jpg',
          coords: [15.419971930896901, 62.75265443913532]
        },
        '20240922_162652.jpg',
        {
          img: '20240922_163258.jpg',
          coords: [15.42889978328157, 62.75658631423672]
        }
      ]"
    />
    <SGText>
      My drumming friend was into drums and bikes, both motored and not. I found his red house in a
      little enclave of roads needing works and pine trees. He enthusiastically talked me through
      the bike, then invited me inside while I waited for my train to come, where we drank cordial
      and talked as he smoked.
      <br />
      <br />
      Time went surprisingly quickly, and all of a sudden I realised that I'd need to leave if I
      didn't want to miss my train home, so I was in a rush to pay the guy, take the bike and speed
      down the hill to the lake where I beat the train by seconds. After my earlier bus experiences,
      I enjoyed the newfound luxury of the train all the way home.
    </SGText>
    <SGImages :list="['20240922_162227.jpg', '20240922_172726-3.jpg']" />
  </DetailView>
</template>

<style scoped></style>
