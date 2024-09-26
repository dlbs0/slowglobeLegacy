<template>
  <div class="pswp"></div>

  <div class="cont2">
    <!-- <div class="container"> -->
    <slot></slot>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.cont2 {
  margin: 0 auto;
  margin-top: 45vh;
  /* padding: 1em 3em; */
  /* padding-top: 3em; */
  max-width: calc(60ch + 6em);
  color: var(--md-sys-color-on-surface);
  /* background-color: var(--md-sys-color-surface); */
  /* background-color: var(--article-background-color); */
  /* display: flex;
  flex-direction: column; */
  /* gap: 20vh; */
}
.container {
  margin: 0 auto;
  margin-top: 45vh;
  padding: 1em 3em;
  padding-top: 3em;
  max-width: 60ch;
  /* background-color: var(--md-sys-color-surface); */
  color: var(--md-sys-color-on-surface);

  /* z-index: 1; */
  display: flex;
  flex-direction: column;
  /* position: relative; */
  /* opacity: 0.9; */
  /* gap: 20vh; */
}

.cont2 > * {
  background-color: var(--article-background-color);
  padding: 1em 3em;
}
</style>
