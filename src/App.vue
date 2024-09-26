<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMap } from '@/functions/map'

const { interactive } = useMap()
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/"> SG </RouterLink>
    </div>
  </header>
  <main class="test">
    <div class="map" id="backmap"></div>
    <!-- <RouterView /> -->
    <router-view v-slot="{ Component, route }">
      <Transition name="up" mode="out-in">
        <div :key="route.name" class="test">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
    <!-- <router-view v-slot="{ Component }">
      
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <!-- <transition>
      <router-view></router-view>
    </transition> -->
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="slide-fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
  </main>
</template>

<style>
.test {
  /* position: absolute;
  position: relative;
  left: 100%; */
  /* overflow-x: hidden;
  z-index: 2; */
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
  z-index: 2;
  opacity: 1;
  /* position: absolute; */
  position: relative;
}

.fade-enter-from,
.fade-leave-to {
  /* position: absolute; */
  position: relative;
  opacity: 0;
  z-index: 2;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
  .main {
    scrollbar-color: transparent transparent;
  }
}

.slide-enter-to {
  position: relative;
  left: 0;
}

.slide-enter-from {
  position: relative;
  left: 100%;
}

.slide-leave-to {
  position: relative;
  left: -100%;
}

.slide-leave-from {
  position: relative;
  left: 0;
}

.up-enter-active,
.up-leave-active {
  /* transition: all 0.5s ease-out; */
  transition:
    margin 0.75s ease-out,
    opacity 0.75s linear;

  .main {
    scrollbar-color: transparent transparent;
  }
}

.up-enter-to {
  position: relative;
  left: 0;
}

.up-enter-from {
  position: relative;
  margin-top: 100vh;
  opacity: 0;
}

.up-leave-to {
  position: relative;
  margin-top: 100vh;
}

.up-leave-from {
  position: relative;
  left: 0;
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
  color: var(--primary);
  a {
    text-decoration: none;
    color: inherit;
  }
}
.router-link-active {
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
