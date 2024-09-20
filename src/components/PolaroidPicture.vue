<template>
  <div class="container stickyCard" id="polaroidCard">
    <div class="polaroid">
      <div class="polaroid-img">
        <img src="http://farm7.static.flickr.com/6052/6411572503_fd28c63f1a.jpg" />
      </div>
      <div class="polaroid-caption">Fields of gold</div>
    </div>
  </div>
</template>

<style scoped>
.container:nth-child(4n-1) {
  transform: rotate(-4deg) translateX(-1em);
}
.container:nth-child(4n + 1) {
  transform: rotate(4deg) translateX(2em);
}

.container:nth-child(7n) {
  transform: rotate(11deg) translateX(1.6em);
}
.container:nth-child(8n + 1) {
  transform: rotate(0deg);
}
.container:nth-child(8n + 8) {
  transform: rotate(-10deg);
}
.container:nth-child(14n + 14) {
  transform: rotate(-1deg) translateX(1em);
}

.stickyCard {
  position: sticky;
  /* top: 100px; */
  top: calc((100vh - 4rem) / 2 - (calc(var(--polaroid-width) * 1.112 * 0.5)) - 1px);
  transform-origin: center center;
  z-index: 2;
  width: min-content;
}

.backing {
  width: calc(var(--polaroid-width) * 1.112 * 1.1);
  aspect-ratio: 0.8;
  background-color: aqua;
  z-index: 0;
  position: relative;
  top: 0;
  scroll-snap-align: center;
}

.polaroid {
  width: var(--polaroid-width);
  padding: calc(var(--polaroid-width) * 0.056);
  aspect-ratio: 0.8;
  background: #fff;
  /* position: absolute;
  left: 40%;
  top: 15%; */
  background: linear-gradient(120deg, #fff, #ddd 60%);
  /* box-shadow:
    2px -2px 20px 0px rgba(0, 0, 0, 0.6),
    inset 4px 5px 10px 0 rgba(0, 0, 0, 0.1); */
  box-shadow: inset 4px 5px 10px 0 rgba(0, 0, 0, 0.1);
  /* -webkit-backface-visibility: hidden; */
  /* backface-visibility: hidden; */
  filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.6));
  /* inset drop-shadow(4px 5px 10px rgba(0, 0, 0, 0.1)); */
  display: grid;
  gap: 0;

  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.polaroid-img {
  /* position: absolute; */
  position: relative;
  display: inline-block;
  aspect-ratio: 1/1;
  width: 100%;
  /* top: 20px;
  left: 10px; */

  /* width: var(--polaroid-width); */
  /* margin: calc(var(--polaroid-width) * 0.056); */
  /* margin: 5.6%; */
  /* 17%; */
  /* height: 280px; */
  background: #eee;
  overflow: hidden;
  img {
    width: 100%;
    z-index: -1;
  }
}
.polaroid-img::before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* width: calc(var(--polaroid-width) - (var(--polaroid-width) * 2 * 0.056));
  height: calc(var(--polaroid-width) - (var(--polaroid-width) * 2 * 0.056)); */
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.6),
    transparent 60%,
    rgba(0, 0, 0, 0.5) 99%
  );
  box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.polaroid-caption {
  /* position: relative; */
  justify-self: center;
  flex-grow: 10;
  font-family: 'Reenie Beanie', cursive;
  font-size: 1.6em;
  font-weight: 400;
  font-style: normal;
  bottom: 5px;
  padding: 5px 5px;
  margin: 0;
  /* letter-spacing: 0.1em; */
}
</style>
