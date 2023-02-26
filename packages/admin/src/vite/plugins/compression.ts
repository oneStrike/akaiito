import viteCompression from 'vite-plugin-compression'

export const compression = () => {
  return viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz'
  })
}
