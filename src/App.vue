<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- slowglobe -->
      <!-- SLOWGLOBE -->
      SG
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  /* line-height: 1.5; */
  max-height: 4rem;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  text-align: center;
}
.wrapper {
  background-color: var(--header-background-color);
  width: min-content;
  font-size: 3.5rem;
  font-weight: 700;
  padding: 0 0.4em;
  border-radius: 0 0 0.2em 0.2em;
  color: rgb(110, 25, 25);
}
</style>
