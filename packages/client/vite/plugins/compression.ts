import viteCompression from 'vite-plugin-compression'

export function Compression() {
  return viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  })
}
