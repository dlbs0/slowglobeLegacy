export type ImageModules = Record<
  string,
  () => Promise<
    {
      width: number
      height: number
      src: string
    }[]
  >
>
