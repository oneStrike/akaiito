<script setup lang="ts">
import { config } from '@/config'
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadProps,
  UploadUserFile
} from 'element-plus'
import { useMessage } from '@/hooks/useFeedback'
import { useUpload } from '@/hooks/useUpload'
import type { UploadFileTypings } from '@/apis/upload.d'

export interface BasicUploadProps {
  modelValue?:
    | UploadUserFile[]
    | string
    | string[]
    | UploadFileTypings['Response']
  fileType?: 'image' | 'video' | 'audio'
  listType?: UploadProps['listType']
  multiple?: UploadProps['multiple']
  scenario?: string
  maxCount?: number
  maxSize?: number
  assetLibrary?: boolean
}

const uploadRef = ref<UploadInstance>()
const props = withDefaults(defineProps<BasicUploadProps>(), {
  listType: 'picture-card',
  maxSize: config.maxUploadFileSize,
  maxCount: 1
})
const emits = defineEmits<{
  (event: 'update:modelValue', data: typeof files.value): void
  (event: 'updateError', data: any[]): void
}>()

const filePathToObj = (path: string) => {
  return {
    fileName: path.split('/').at(-1),
    filePath: path,
    url: path,
    mimeType: props.fileType + '/' + path.split('.').at(-1),
    status: 'success',
    uid: new Date().getTime()
  }
}

const transformModelValue = () => {
  if (!props.modelValue) return []
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((item) => {
      const filePath =
        typeof item === 'string' ? item : item.filePath || item.url
      return filePathToObj(filePath)
    })
  } else {
    return [filePathToObj(props.modelValue)]
  }
}

const files = ref<UploadFileTypings['Response']>([])
const previewImages = ref()
const uploadBtnDisplay = computed(() =>
  fileList.value?.length >= props.maxCount ? 'none' : 'inline-flex'
)

const fileList = ref()
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      fileList.value = transformModelValue()
      files.value = transformModelValue()
    }
  },
  { deep: true, immediate: true }
)

const accept = computed(() => {
  if (!props.fileType) return '*'
  return config.allowFileType[props.fileType]
    .map((item) => props.fileType + '/' + item)
    .join(',')
})

// 定义一个ref，用于存储上传文件列表

// 使用debounceFn函数定义一个异步函数，用于上传文件
const startUpload = useDebounceFn(async (uploadFiles: UploadFiles) => {
  const removeFileList = []
  const readyFile = []

  // 遍历上传文件列表
  uploadFiles.forEach((item) => {
    // 判断文件大小是否超过限制
    if (item.size > props.maxSize * 1024 * 1024) {
      removeFileList.push(item)
      useMessage.error(`【${item.name}】超出文件大小限制`)
      return
    }

    // 获取已上传成功的文件数量
    const successFileCount = fileList.value.filter(
      (item) => item.status === 'success'
    )

    // 判断上传文件数量是否超过限制
    if (readyFile.length + successFileCount.length >= props.maxCount) {
      removeFileList.push(item)
      useMessage.error(`【${item.name}】超出最大数量限制`)
      return
    }

    // 判断文件格式是否正确
    if (!accept.value.includes(item.raw.type)) {
      removeFileList.push(item)
      useMessage.error(`【${item.name}】文件格式错误`)
      return
    }

    // 将文件添加到readyFile数组中
    readyFile.push(item)
  })

  // 如果需要移除的文件列表不为空，则移除这些文件
  if (removeFileList.length) {
    removeFileList.forEach((item) => uploadRef.value.handleRemove(item))
  }

  // 如果readyFile数组不为空，则上传文件
  if (readyFile.length) {
    const complete = await useUpload(readyFile, props.scenario)

    // 将上传成功的文件添加到files数组中
    files.value = files.value.concat(complete.success)

    // 触发更新modelValue的事件
    emits('update:modelValue', files.value)

    // 如果上传失败的文件列表不为空，则触发更新Error的事件
    if (complete.error && complete.error.length) {
      emits('updateError', complete.error)
    }
  }
}, 30)

const change = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  startUpload(uploadFiles)
}

const remove = async (
  uploadFile: UploadFile & UploadFileTypings['Response'][number]
) => {
  files.value = files.value.filter(
    (item) => item.fileName !== uploadFile.fileName
  )
  emits('update:modelValue', files.value)
}

const onPreview = (uploadFile: UploadFile) => {
  previewImages.value = [uploadFile]
}
</script>

<template>
  <div class="basic-upload">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="accept"
      :auto-upload="false"
      :data="{ scenario }"
      :multiple="multiple"
      :on-change="change"
      :on-remove="remove"
      :on-preview="onPreview"
    >
      <template #trigger>
        <div class="w-full h-full" v-if="assetLibrary">
          <el-popconfirm
            width="180"
            title="素材库选择或者上传"
            cancel-button-text="资源库"
            confirm-button-text="本地上传"
            :hide-after="10"
            @confirm="uploadRef.$el.querySelector('input').click()"
          >
            <template #reference>
              <div class="w-full h-full flex-center" @click.stop>
                <as-icons name="downloading" :size="26" />
              </div>
            </template>
          </el-popconfirm>
        </div>
        <as-icons name="downloading" :size="26" v-else />
      </template>
    </el-upload>

    <preview-image
      v-if="Array.isArray(previewImages) && previewImages.length"
      :url-list="previewImages"
      @close="previewImages = []"
    />
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-upload) {
  width: 88px;
  height: 88px;
  display: v-bind(uploadBtnDisplay);
}
::v-deep(.el-upload-list__item) {
  width: 88px;
  height: 88px;
}
</style>
