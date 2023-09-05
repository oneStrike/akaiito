import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

export const chunkSplit = () => {
  return chunkSplitPlugin({
    customSplitting: {
      utils: [/src\/utils/],
      components: [/src\/components/]
    }
  })
}
