export const getVideoInfo = (
  path: string,
): Promise<{
  videoCover: string
  width: number
  height: number
  duration: number
}> => {
  const videoInfo = {
    videoCover: '',
    width: 0,
    height: 0,
    duration: 0,
  }

  const videoElement = document.createElement('video')
  // 设置视频源
  videoElement.src = path
  videoElement.setAttribute('preload', 'auto')
  return new Promise(resolve => {
    // 监听视频加载完成事件
    videoElement.oncanplaythrough = () => {
      videoInfo.width = videoElement.videoWidth
      videoInfo.height = videoElement.videoHeight
      videoInfo.duration = videoElement.duration

      // 创建视频封面
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight

      requestAnimationFrame(() => {
        canvas
          .getContext('2d')!
          .drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        videoInfo.videoCover = canvas.toDataURL('image/png')
        resolve(videoInfo)
      })
    }
  })
}
