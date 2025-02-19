console.log('Hello World')

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(`Trip ID (used in the url)`, (id) => {
  rl.question(`Trip Name (used in the title)`, (name) => {
    console.log(`OK ${id}! ${name}`)
    rl.close()

    const typescriptContent = `import type { Trip } from '~/allTrips'
import imgUrl from '@/assets/images/other/20240922_172726-2.jpg?w=600&gallery'

export const ${id}: Trip = {
  id: '${id}',
  name: '${name}',
  headerImage: imgUrl,
  date: '2024-09-22',
  locationText: 'Bräcke, Sweden',
  geography: {
    overview: {
      center: [15.4185552491721, 62.750063825451555],
      zoom: 7
  }}
}`

    const vueContent = `<script setup lang="ts">
import DetailView from '@/components/DetailView.vue'
import SGHeader from '@/components/SGHeader.vue'
import SGImages from '@/components/SGImages.vue'
import SGMapCutout from '@/components/SGMapCutout.vue'
import SGText from '@/components/SGText.vue'
import { ${id} } from './${id}'
</script>

<template>
  <DetailView>
    <SGHeader>${name}</SGHeader>
    <SGText>
      Words here.
      <br />
      <br />
    </SGText>
  </DetailView>
</template>`

    try {
      if (!existsSync('../trips/' + id)) mkdirSync('../trips/' + id)
      if (!existsSync('../trips/' + id + '/images')) mkdirSync('../trips/' + id + '/images')
      writeFileSync('../trips/' + id + '/' + id + '.ts', typescriptContent)
      writeFileSync(
        '../trips/' +
          id +
          '/(Trip' +
          id.charAt(0).toUpperCase() +
          id.substring(1).toLowerCase() +
          ').vue',
        vueContent
      )
      // file written successfully
    } catch (err) {
      console.error(err)
    }
  })
})
