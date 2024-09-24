<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/"> SG </RouterLink>
    </div>
  </header>

  <RouterView />
</template>

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
</style>
