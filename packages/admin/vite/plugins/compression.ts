import type { Plugin } from 'vite'
import viteCompression from 'vite-plugin-compression'

export function Compression(): Plugin[] {
  return [
    // Gzip压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 大于10kb的文件才压缩
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false, // 保留原文件
    }),
    // Brotli压缩（更高压缩率）
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
  ]
}
