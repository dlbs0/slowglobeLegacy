<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGImages from '@/components/SGImages.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGShowExtraDetail from '@/components/SGShowExtraDetail.vue'
import SGText from '@/components/SGText.vue'
import { germanGigs } from './germanGigs'
import BandcampEmbed from '@/components/BandcampEmbed.vue'
import SpotifyEmbed from '@/components/SpotifyEmbed.vue'

const tripId = 'germanGigs'
</script>

<template>
  <DetailView :trip="tripId">
    <SGHeader :id="tripId">Three Gigs in Germany</SGHeader>
    <SGText>
      For Christmas last year, my gift to Paula was a pair of concert tickets, which would let us
      see three of our favourite bands. As you've probably guessed from the title of this post, the
      catch was that these three gigs would require a bit of travel. But when I found out that "Cory
      Wong", "Couch" and "Sammy Rae and The Friends" would all be playing within a week of each
      other in Northern Germany where some of Paula's family lives, it seemed like an obvious fit.
      <br />
      <br />
      So on Thursday, at midday, we found ourselves once again at the train station in Sundsvall,
      heading South to Stockholm. The ride there was beautiful, our first bit of good weather in
      weeks, and we were able to observe over the three hour trip how the decreasing latitude
      dramatically changed the amount of snow on the ground, down all the way to nothing once we got
      into Stockholm proper.
      <br />
      <br />
      We had a brief wander in Stockholm, vaguely looking for food, and realistically looking at
      architecture, before giving up, eating at the station, and boarding our night train to Berlin.

      <!-- <br />
      <br /> -->
    </SGText>

    <SGImages :list="['20250201_095913.jpg', '20250131_184152.jpg']" />
    <SGText>
      The ride was quite comfortable, and while we were delayed by a few hours, it was just long
      enough for us to get a 50% refund and meet the very fun conductor who gave us some free
      breakfast.
      <br />
      <br />
    </SGText>
    <SGMapCutout :fit-bounds-geometry="germanGigs.geography.detail" :feature-indexes="[0]" />
    <SGText>
      Arriving in Berlin was a concrete shock; leaving the multilevel open train station you are
      surrounded by brutalist concrete architecture, tall grey squares stretching into the sky and
      covering the ground. It took some time to properly appreciate, but as we wandered the city and
      saw the sights it did begin to grow on me.
      <br />
      <br />
      Berlin being Berlin, pretty soon we found ourselves immersed in the war history of the city.
      We visited the Topography of Terror, a museum built on the site of the old secret police
      headquarters, which did an excellent job at explaining the the human side of the city in the
      years before and during the war. It was far too easy to draw parallels to things we could see
      happening today, which is quite scary.
      <br />
      <br />
      On a less end of humanity note, we had dinner at a tiny pizza bar, when the friendly owner
      produced the best tasting pizza I've had in years. Paula complimented him on the gluten-free
      base, saying "it's the best I've ever had", to which he replied "I know" with justified
      confidence.
      <br />
      <br />
      Tonight we would be seeing "Couch" and "Cory Wong", both bands we were excited for. After
      reading reviews of the venue, I was terrified that coat-check, a necessity in the german
      winter, would take hours, but it proved to be a relatively simple process once we had managed
      to procure some Euros by purchasing some Rhabarberschorle.
      <br />
      <br />
      Couch was opening (at 20:00 on the dot), and had a really good set, with a number of solos
      that showed some range that doesn't appear in any of their recorded material.
    </SGText>
    <SpotifyEmbed url="artist/3nYyLjhw4mYzYfJePsCJYJ" />
    <!-- <SpotifyEmbed url="track/15zyYQ2m37BDFXuhY8RTNr" :small="true" /> -->
    <SGText>
      Cory Wong is a great guitarist, backed up by possibly the tightest band I've seen. Their
      drummer had incredible stage presence, the full 5-piece horn section was playing harmonies
      I've never heard in their records, and the whole band was backed by the keys and bass. They
      were touring for the "Starship Syncopation" album, but we got lots of older tracks too, with
      tons of improvisation completely altering the original songs.
    </SGText>
    <SpotifyEmbed url="album/4pg7Me8QZeJoW2qvcLiwSN" />
    <SGText
      >They had a great set, bringing the Couch vocalist on stage for a few songs too. As an encore,
      the took requests from the audience, finally leaving the stage to Bluebird (a request from a
      guy wearing a Louis Cole shirt). We had an excellent time.
    </SGText>
    <SpotifyEmbed url="track/1i4aQnstz1fR7SqFju6B2I" :small="true" />
    <SGImages :list="['20250131_184152.jpg', '20250201_095913.jpg']" />
    <SGText>
      The next morning we were in pursuit of German bakeries. I was very happy with what I found on
      every street corner, but Paula managed to find a gluten-free place a short walk away, where we
      enjoyed some breakfast (Paula was very unhappy with us sleeping through the hostels
      complimentary fare).
      <br />
      <br />
      Replenished, we made our way to Berlin's museum island, which is pretty much what the name
      suggests. Lots of lovely buildings, but we ended up underground in the DDR museum, where we
      got a much better idea of what was happening post WWII in Berlin. We also got a chance to look
      at the East Side Gallery, a section of the Berlin Wall that was painted by many different
      artists just after the fall.
      <br />
      <br />
      We then had a ICE connection to Osnabrück, which for some reason took us through our least
      favourite German city, Hamburg. We were quite impressed with the first train, it left at
      exactly the timetabled time, with a modern and comfortable interior, and it arrived right on
      time in Hamburg too. Unfortunately, that was where our German train luck ran out, as we were
      met with a message in the DB app that said "Journey not Possible", as the connecting ICE had
      been cancelled. Unsurprised, we managed to rebook onto a different train, which arrived only
      an hour and one minute later than expected (though at 11:34pm), which once again qualified us
      for a partial refund.
    </SGText>
    <SGMapCutout :fit-bounds-geometry="germanGigs.geography.detail" :feature-indexes="[1, 2]" />
    <SGText>
      We were met at the station by Paula's uncle Peter, with whom we would be staying the week
      with. He drove us to his place, where we collapsed into bed.
    </SGText>

    <SpotifyEmbed url="album/3Bhtlh9Mc1CVNaen3eTEyP" />
    <SGText>
      <!-- <SpotifyEmbed url="playlist/6VWBc91arnXu6JyqCVAcbr" :small="true" :dark-mode="true" /> -->
      <br />
      <br />
      <!-- <BandcampEmbed /> -->
      <br />
      <br />
    </SGText>
  </DetailView>
</template>
