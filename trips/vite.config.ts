import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { imagetools } from 'vite-imagetools'
import { resolve } from 'path';
import { realpathSync} from 'fs';

const dirname = realpathSync('.');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '~': fileURLToPath(new URL('../trips', import.meta.url)),
      '~': resolve(dirname, '../trips'),
      '@': resolve(dirname, './src'),
    }
  },
  build:{outDir: '../dist', emptyOutDir: true},
  plugins: [
    imagetools(),
    VueRouter({
      /* options */
      routesFolder: ['src/pages', {src: '../trips', path: 'trip/'}],

    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('iconify-')
        }
      }
    })
  ],
})
