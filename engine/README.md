# slowglobe

A map and photo based blogging engine

## Recommended Setup

[VSCode](https://code.visualstudio.com/) + Nodejs + npm.

Using Eslint with prettier as formatter.

ffmpeg is required if using the video optimisation tools.

## Project Setup

The engine folder is the backend of this project, but the content lives in the separate `trips` folder. There are scripts to generate trips. `npm run create-trip` will generate a new trip.

### Install and Start

```sh
npm install

npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Images and Videos

Images are stored in the `images` folder of the relevant trip. They are compressed with vite-imagetools, and on build, two versions are created, the thumbnail and original.

Videos are stored in the `videos` folder of the relevant trip. We need to both compress and create a thumbnail for the video, and vite cannot do this natively, so we use the `encode-video` script to do this.

To use, place videos into the `videos` folder in the trip, and run `npm run encode-video`. It will move the original files to the `source_files` folder (not committed), and create the new files with the prefix `o_` (optimised). If you want to crop the video, you should do that before optimising.
