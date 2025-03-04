<template>
  <div class="attribution">
    <PostageStamp image="/images/DSC_0722.jpg"></PostageStamp>
    <br />
    <br />
    <div>
      An account of exploration by
      <div class="name">Daniel Birch-Smith</div>
    </div>
    <br />
    <br />
    Find more things I've done at
    <a href="https://www.danielbirchsmith.com" target="_blank">www.danielbirchsmith.com</a>
    <br />
    <br />
    Text, photos and code on this site by me, unless otherwise noted.
    <br />
    <br />
    <div>
      Map by&nbsp;
      <a
        class="mapboxgl-ctrl-logo"
        style="display: inline-block; vertical-align: -0.125em"
        target="_blank"
        rel="noopener nofollow"
        href="https://www.mapbox.com/"
        aria-label="Mapbox homepage"
      ></a
      >, style is based on Standard, with some modifications to reduce clutter. Forgive my
      cartography skills, mapmaking is hard.
    </div>
    <br />
    Written in Vue, Vite, Typescript, using the Mapbox, VueUse, PhotoSwipe and vite-imagetools
    libraries.
    <br /><br />
    There are almost certainly bugs (especially on iOS). Let me know if you find one.
  </div>
</template>

<style scoped>
.attribution {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2em;
  /* padding-top: 6em; */
  text-align: center;
  /* background-color: white; */
  max-width: 50em;
  a {
    color: var(--primary);
  }
}

.name {
  color: var(--primary);
  font-family: 'Libre Caslon Text', serif;
  font-weight: 600;
  font-size: 2em;
}
</style>
<script setup lang="ts">
import PostageStamp from '@/components/PostageStamp.vue'
</script>
