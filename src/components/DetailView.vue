<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 50vh;
  padding: 1em 3em;
  padding-top: 3em;
  max-width: 60ch;
  background-color: rgba(0, 0, 0, 0.07);
  /* background-color: var(--md-sys-color-surface); */
  color: var(--md-sys-color-on-surface);
  --mask: conic-gradient(from 130deg at top, #ff0000, #ff0000 1deg 99deg, #fa000000 100deg) 50%/2.38em
    100%;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
