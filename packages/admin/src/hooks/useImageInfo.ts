/**
 * 图片信息获取函数
 * 用于获取图片的大小、格式和尺寸信息
 */

/**
 * 图片信息接口定义
 */
export interface ImageInfo {
  /** 图片大小（MB） */
  size: number
  /** 图片格式 */
  format: string
  /** 图片宽度（像素） */
  width: number
  /** 图片高度（像素） */
  height: number
  /** 上传日期 */
  uploadTime: string
  /** 图片宽高比例（如 16:9） */
  ratio: string
}

/**
 * 计算最大公约数
 * @param a 第一个数
 * @param b 第二个数
 * @returns 最大公约数
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/**
 * 计算宽高比例
 * @param width 宽度
 * @param height 高度
 * @returns 简化后的宽高比例字符串（如 16:9）
 */
function calculateRatio(width: number, height: number): string {
  if (width === 0 || height === 0) return '0:0'

  const divisor = gcd(width, height)
  return `${width / divisor}:${height / divisor}`
}

/**
 * 获取图片信息
 * @param source 图片链接地址或File对象
 * @returns Promise<ImageInfo> 图片信息对象
 */
export function useImageInfo(source: string | File): Promise<ImageInfo> {
  return new Promise((resolve, reject) => {
    try {
      let uploadTime = ''
      if (typeof source === 'string') {
        // 使用正则提取时间戳部分
        const timestampMatch = source.match(/upload_(\d+)/)
        if (timestampMatch && timestampMatch.length >= 2) {
          const timestampStr = timestampMatch[1]
          const timestamp = Number.parseInt(timestampStr, 10)

          // 检查是否为有效的时间戳
          if (!Number.isNaN(timestamp)) {
            const date = new Date(timestamp)
            // 格式化为 YYYY-MM-DD HH:mm:ss
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const day = date.getDate().toString().padStart(2, '0')
            const hours = date.getHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            const seconds = date.getSeconds().toString().padStart(2, '0')
            uploadTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
          }
        }
      }

      // 创建图片对象
      const img = new Image()

      // 图片加载完成事件
      img.onload = () => {
        // 获取图片格式
        let format = ''

        if (typeof source === 'string') {
          // 从URL获取格式
          format = source.split('.').pop()?.toLowerCase() || ''
        } else {
          // 从File对象获取格式
          format = source.name.split('.').pop()?.toLowerCase() || ''
        }

        // 创建canvas用于获取图片数据
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('无法创建canvas上下文'))
          return
        }

        // 绘制图片到canvas
        ctx.drawImage(img, 0, 0)

        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        // 计算图片大小（近似值，以MB为单位）
        // 每个像素4字节(RGBA)，除以1024*1024转换为MB
        let size: number

        if (typeof source === 'string') {
          // 从图像数据估算大小
          size = Number((imageData.data.length / (1024 * 1024)).toFixed(2))
        } else {
          // 从File对象获取准确大小
          size = Number((source.size / (1024 * 1024)).toFixed(2))
        }

        // 计算宽高比例
        const ratio = calculateRatio(img.naturalWidth, img.naturalHeight)

        // 返回图片信息
        resolve({
          size,
          format,
          width: img.naturalWidth,
          height: img.naturalHeight,
          ratio,
          uploadTime,
        })
      }

      // 图片加载错误事件
      img.onerror = () => {
        reject(new Error('图片加载失败'))
      }

      // 设置跨域属性
      img.crossOrigin = 'Anonymous'

      // 根据输入类型设置图片源
      if (typeof source === 'string') {
        // 直接设置URL
        img.src = source
      } else {
        // 从File对象创建URL
        const objectUrl = URL.createObjectURL(source)
        img.src = objectUrl

        // 图片加载完成后释放URL
        img.onload = function () {
          URL.revokeObjectURL(objectUrl)

          // 获取图片格式
          const format = source.name.split('.').pop()?.toLowerCase() || ''

          // 创建canvas用于获取图片数据
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('无法创建canvas上下文'))
            return
          }

          // 绘制图片到canvas
          ctx.drawImage(img, 0, 0)

          // 从File对象获取准确大小
          const size = Number((source.size / (1024 * 1024)).toFixed(2))

          // 计算宽高比例
          const ratio = calculateRatio(img.naturalWidth, img.naturalHeight)

          // 返回图片信息
          resolve({
            size,
            format,
            width: img.naturalWidth,
            height: img.naturalHeight,
            ratio,
            uploadTime,
          })
        }
      }
    } catch (error) {
      // 捕获其他可能的错误
      reject(error instanceof Error ? error : new Error(String(error)))
    }
  })
}
