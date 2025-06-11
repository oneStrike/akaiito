export default {
  maxUploadFileSize: 100 * 1024 * 1024,

  allowFileType: {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'm4v'],
    audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'],
    document: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md', 'rtf'],
    compressed: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
    other: [],
  },
}
