export default {
  //静态资源场景
  resourceScenario: [
    'adminUserAvatar',
    'adminResourceLibrary',
    'userAvatar',
    'shared'
  ],
  //上传时允许的文件类型
  allowFileType: {
    image: ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'wbmp', 'webp', 'tif', 'svg'],
    video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'],
    audio: ['mp3', 'flac', 'aac', 'wma', 'wav']
  },
  //最大上传文件大小，单位m
  maxUploadFileSize: 10
}
