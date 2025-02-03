<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useMap } from '@/functions/map'
import { computed, ref } from 'vue'
const route = useRoute()

const { interactive } = useMap()
const shouldScrollSnap = computed(() => route.path === '/')
const ssnapText = computed(() => (shouldScrollSnap.value ? 'y mandatory' : 'none'))
const transitionName = computed(() => (route.path === '/' ? 'slide' : 'up'))
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/"> SG </RouterLink>
    </div>
  </header>
  <main>
    <!-- <RouterView /> -->
    <div class="map" id="backmap"></div>
    <router-view v-slot="{ Component, route }">
      <Transition :name="transitionName" mode="out-in">
        <div :key="route.name" class="test">
          <component :is="Component" :key="route.path"></component>
        </div>
      </Transition>
    </router-view>
  </main>
  <component :is="'style'" type="text/css">
    html { --some-var: {{ ssnapText }}; scroll-snap-type: var(--some-var) !important; }
  </component>
</template>

<style>
.slide-enter-to,
.slide-leave-from,
.up-enter-to,
.up-leave-from {
  position: relative;
  left: 0;
}

.slide-enter-from,
.up-leave-to {
  position: relative;
  left: calc(var(--polaroid-width) * 1.362 * -1.1);
}

.up-enter-from,
.slide-leave-to {
  position: relative;
  margin-top: 100vh;
  opacity: 0;
}

.slide-leave-active,
.up-enter-active {
  transition:
    margin 0.7s ease-out,
    opacity 0.7s ease-out;
}
.slide-enter-active,
.up-leave-active {
  transition: left 0.3s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
  opacity: 1;
  position: relative;
}

.fade-enter-from,
.fade-leave-to {
  position: relative;
  opacity: 0;
}
</style>

<style scoped>
header {
  max-height: 4rem;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 100;
}
.wrapper {
  background-color: var(--header-background-color);
  z-index: 100;
  width: min-content;
  font-size: 3.5rem;
  font-weight: 700;
  padding: 0 0.4em;
  border-radius: 0 0 0.2em 0.2em;
  color: rgb(110, 25, 25);
  color: var(--primary) !important;
  a {
    text-decoration: none;
    color: inherit;
    color: var(--primary) !important;
  }
}
.router-link-active {
  color: var(--primary) !important;
  text-decoration: none;
}
.map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: v-bind('interactive ?  "auto":"none"');
  z-index: 0;
}
</style>
