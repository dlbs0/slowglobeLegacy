import type { ImageModules } from './classes'

export const allTripImages = import.meta.glob('@/assets/images/**/*.jpg', {
  query: {
    w: '400;',
    // h: '300;',
    format: 'webp',
    as: 'metadata'
  }, // '?w=300&h=300&format=webp&as=metadata',
  import: 'default'
}) as ImageModules

export const fullPathLookup = Object.keys(allTripImages).reduce(
  (acc: Record<string, string>, curr) => {
    const imgName = curr.split('/').pop() as string
    acc[imgName] = curr
    return acc
  },
  {}
)

export function getImage(imgName: string) {
  return allTripImages[fullPathLookup[imgName]]
}

export async function getImageSrc(imgName: string | undefined, thumb = false) {
  if (!imgName) return ''
  const img = allTripImages[fullPathLookup[imgName]]
  if (!img) return ''
  const ressed = await img()
  const index = thumb ? 0 : 1

  return ressed[index].src
}
