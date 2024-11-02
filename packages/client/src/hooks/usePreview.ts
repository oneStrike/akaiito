import { filePath } from '@/utils/filePath'

function isImage(url: string): boolean {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.svg',
    '.webp',
  ]
  const urlExtension = url.substring(url.lastIndexOf('.')).toLowerCase()
  return imageExtensions.includes(urlExtension)
}

export const usePreview = (urls: string | any[], idx?: number) => {
  urls = Array.isArray(urls) ? urls : [urls]
  const previewList: string[] = []
  urls.forEach(item => {
    if (isImage(item.path || item)) {
      previewList.push(filePath(item.path || item))
    }
  })

  uni.previewImage({
    current: idx ?? 0,
    urls: previewList,
  })
}
