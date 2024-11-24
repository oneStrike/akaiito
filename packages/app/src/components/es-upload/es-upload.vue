<script setup lang="ts">
import type { EsUploadProps } from '@/components/es-upload/types'
import type { IterateObject } from '@/types/global'
import { getVideoInfo } from '@/components/libs/utils/videoInfo'
import { basicConfig } from '@/config/basic.config'
import { usePreview } from '@/hooks/usePreview'
import { useUserStore } from '@/stores/modules/user'

defineOptions({
  name: 'EsUpload',
  options: {
    virtualHost: true,
  },
})
const props = withDefaults(defineProps<EsUploadProps>(), {
  limit: 9,
  accept: 'image',
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any[] | null): void
  (event: 'delete', idx: number): void
}>()
const fileType = {
  videoType: ['.mp4', '.avi', '.mkv', '.rmvb', 'wmv', '.flv', '.mov'],
  imageType: ['.jpg', '.jpeg', '.png', '.gif', '.tif', '.bmp', '.svg'],
  voiceType: ['.aac', '.mp3', '.wav', '.pcm'],
}

const fileList = ref<any[]>([])

const formatFileList = (data: any): any[] => {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      status: 'finish',
      progress: 100,
    }))
  } else if (typeof data === 'string') {
    return [
      {
        path: data,
        status: 'finish',
        progress: 100,
      },
    ]
  }
  return []
}
const internalFileList = ref<any[]>([])

watch(
  () => props.modelValue,
  newValue => {
    const formattedList = formatFileList(newValue)
    fileList.value = formattedList
    if (
      Array.isArray(internalFileList.value) &&
      !internalFileList.value.length
    ) {
      internalFileList.value = JSON.parse(JSON.stringify(formattedList))
    }
  },
  { deep: true, immediate: true },
)

function emitFileList() {
  const emitData =
    Array.isArray(fileList.value) && fileList.value.length
      ? fileList.value
      : null
  emitData?.forEach(item => {
    delete item.status
    delete item.progress
  })
  emits('update:modelValue', emitData)
}

function selectFile(type?: EsUploadProps['accept']) {
  type = type || props.accept
  if (type === 'image' || type === 'video') {
    // #ifdef MP
    uni.chooseMedia({
      count: props.limit,
      maxDuration: 30,
      sourceType: ['album', 'camera'],
      mediaType: [type],
      success: file => {
        if (Array.isArray(file.tempFiles)) {
          file.tempFiles.forEach(item => {
            if (item.fileType === 'video') {
              internalFileList.value.push({
                name: 'fileName',
                path: item.tempFilePath,
                width: item.width,
                height: item.height,
                videoCover: item.thumbTempFilePath,
                duration: item.duration,
              })
            } else {
              internalFileList.value.push({
                name: 'fileName',
                path: item.tempFilePath,
              })
            }
          })
          uploadFile()
        }
      },
    })
    // #endif
    // #ifndef MP
    if (type === 'image') {
      uni.chooseImage({
        count: props.limit,
        success: file => {
          if (Array.isArray(file.tempFiles)) {
            file.tempFiles.forEach(item => {
              internalFileList.value.push({
                // @ts-expect-error ignore
                name: item.name,
                // @ts-expect-error ignore
                path: item.path,
              })
            })
            uploadFile()
          }
        },
      })
    } else {
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        success: async res => {
          const viewInfo = await getVideoInfo(res.tempFilePath)
          internalFileList.value.push({
            name: res.name,
            path: res.tempFilePath,
            type: 'video',
            ...viewInfo,
          })
          uploadFile()
        },
      })
    }
    // #endif
  } else if (type === 'choice') {
    uni.showActionSheet({
      itemList: ['图片', '视频', '录音'],
      success: ({ tapIndex }) => {
        if (tapIndex < 2) {
          selectFile(tapIndex === 1 ? 'video' : 'image')
        }
      },
    })
  } else {
    console.log(123)
  }
}

// 获取上传地址，视频和其他文件不使用同一个地址
const getUploadUrl = (file: IterateObject) => {
  let isVideo = file.type === 'video'
  if (!isVideo) {
    const fileSuffix = `.${file.path.split('.')[1]}`
    for (const fileTypeKey in fileType) {
      if (fileType[fileTypeKey as keyof typeof fileType].includes(fileSuffix)) {
        isVideo = fileTypeKey === 'videoType'
      }
    }
  }
  return isVideo ? basicConfig.VIDEO_UPLOAD_URL : basicConfig.UPLOAD_URL
}

const getUploadData = (file: IterateObject): Promise<IterateObject> => {
  return new Promise(resolve => {
    uni.uploadFile({
      url: getUploadUrl(file),
      header: {
        Authorization: useUserStore()?.token,
      },
      name: 'file',
      filePath: file.path,
      success(res) {
        const response = JSON.parse(res.data)
        if (res.statusCode === 200 && response.status) {
          resolve(response.data[0])
        }
      },
    })
  })
}

function uploadFile() {
  const header = {
    Authorization: useUserStore()?.token,
  }
  internalFileList.value.forEach((item, idx) => {
    if (!item.status) {
      const uploadTask = uni.uploadFile({
        url: getUploadUrl(item),
        header,
        name: 'file',
        filePath: item.path,
        success: async res => {
          const response = JSON.parse(res.data)
          if (res.statusCode === 200 && response.status) {
            item.status = 'finish'
            item.response = response.data[0]
            if (item.videoCover) {
              const { path } = await getUploadData({
                path: item.videoCover,
                type: 'image',
              })
              item.response.width = item.width
              item.response.height = item.height
              item.response.duration = item.duration
              item.response.videoCover = path
            }
            fileList.value.splice(idx, 0, item.response)
            emitFileList()
          } else {
            item.status = 'error'
          }
        },
        fail() {
          // 设置上传失败
          emitFileList()
          item.status = 'error'
        },
      })

      uploadTask.onProgressUpdate(res => {
        item.status = 'uploading'
        item.progress = res.progress
        if (res.progress === 100) {
          item.status = 'finish'
        }
      })
    }
  })
}

function deleteFile(idx: number) {
  internalFileList.value.splice(idx, 1)
  fileList.value.splice(idx, 1)
  emits('delete', idx)
  nextTick(emitFileList)
}

const videoPreview = reactive({
  path: '',
  show: false,
})
const previewVideo = (video: IterateObject) => {
  videoPreview.path = video.path
  videoPreview.show = true
}
</script>

<template>
  <view class="flex flex-wrap">
    <view
      v-for="(item, idx) in internalFileList"
      :key="idx"
      class="relative mb-4 mr-4 h-24 w-24"
    >
      <view
        v-if="item.progress !== 100"
        class="absolute left-0 top-0 z-10 h-full w-full flex flex-col items-center justify-center bg-black/[0.6]"
      >
        <es-icons name="loading" color="white" />
        <es-text :text="`${item.progress || 0}%`" color="white" size="xs" />
      </view>
      <view
        v-if="item.status === 'error'"
        class="absolute left-0 top-0 z-10 h-full w-full flex flex-col items-center justify-center bg-black/[0.6]"
      >
        <es-icons name="closeLine" color="white" />
        <es-text text="上传失败" color="white" size="xs" />
      </view>
      <image
        :src="$filePath(item.videoCover || item.path)"
        class="h-24 w-24"
        mode="aspectFill"
        @click="usePreview(internalFileList, idx)"
      ></image>
      <view
        v-if="item.videoCover && item.progress === 100"
        class="absolute left-0 top-0 z-10 h-full w-full flex flex-col items-center justify-center bg-black/[0.6]"
        @click="previewVideo(item)"
      >
        <es-icons name="play" color="white" :size="50" />
      </view>
      <view
        v-if="item.status === 'finish'"
        class="absolute z-10 rounded-full bg-white -right-1.5 -top-1.5"
        @click="deleteFile(idx)"
      >
        <es-icons name="close" color="error" />
      </view>
    </view>
    <slot v-if="internalFileList.length < props.limit">
      <view
        class="upload-btn h-24 w-24 flex items-center justify-center rounded-s bg-zinc-100"
        @click="selectFile()"
      >
        <es-icons name="camera" color="#d3d4d6" :size="50" />
      </view>
    </slot>
    <es-preview-video
      v-model:show="videoPreview.show"
      :path="videoPreview.path"
    />
  </view>
</template>

<style scoped lang="scss"></style>
