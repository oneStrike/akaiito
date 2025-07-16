import viteCompression from 'vite-plugin-compression'

export function Compression() {
  return [
    // Gzip 压缩
    viteCompression({
      verbose: false, // 减少日志输出
      disable: false,
      threshold: 1024, // 降低压缩阈值，1KB以上就压缩
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false, // 保留原文件
      filter: /\.(js|mjs|json|css|html|svg)$/i, // 指定压缩文件类型
    }),

    // Brotli 压缩（更好的压缩率）
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 1024,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg)$/i,
    }),
  ]
}
