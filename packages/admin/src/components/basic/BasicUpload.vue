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
    mimeType: props.fileType + '/' + path.split('.').at(-1)
  }
}

const transformModelValue = () => {
  if (!props.modelValue) return []
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((item) => {
      if (typeof item === 'string') {
        return filePathToObj(item)
      } else if (item.mimeType) {
        return item
      } else {
        return {
          fileName: item.name,
          filePath: item.url,
          mimeType: item.raw.type
        }
      }
    })
  } else {
    return [filePathToObj(props.modelValue)]
  }
}

const files = ref<UploadFileTypings['Response']>([])
onMounted(() => {
  files.value = transformModelValue()
})

const uploadBtnDisplay = computed(() =>
  fileList.value.length >= props.maxCount ? 'none' : 'inline-flex'
)
const fileList = computed({
  get() {
    if (!props.modelValue) return []
    if (typeof props.modelValue === 'string') {
      const modelValue = []
      modelValue.push({
        name: props.modelValue.split('/').at(-1),
        url: import.meta.env.VITE_BASE_URL + props.modelValue
      })
      return modelValue
    }
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
const action = ref(import.meta.env.VITE_BASE_URL)
const accept = computed(() => {
  if (!props.fileType) return '*'
  return config.allowFileType[props.fileType]
    .map((item) => props.fileType + '/' + item)
    .join(',')
})

const readyFile = ref<UploadFiles>([])
const startUpload = useDebounceFn(async (uploadFiles: UploadFiles) => {
  uploadFiles.forEach((item) => {
    if (item.size > props.maxSize * 1024 * 1024) {
      useMessage.error(`【${item.name}】超出文件大小限制`)
      return
    }

    const successFileCount = fileList.value.filter(
      (item) => item.status !== 'ready'
    )

    if (readyFile.value.length + successFileCount.length >= props.maxCount) {
      uploadRef.value.handleRemove(item)
      useMessage.error(`【${item.name}】超出最大数量限制`)
      return
    }

    if (!accept.value.includes(item.raw.type)) {
      uploadRef.value.handleRemove(item)
      useMessage.error(`【${item.name}】格式错误`)
      return
    }
    readyFile.value.push(item)
  })
  if (readyFile.value.length) {
    const complete = await useUpload(readyFile.value, props.scenario)

    files.value = files.value.concat(complete.success)
    if (complete.error && complete.error.length) {
      emits('updateError', complete.error)
    }
    readyFile.value = []
  }
}, 20)

const change = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  startUpload(uploadFiles)
}

const upload = async () => {}
</script>

<template>
  <div class="basic-upload">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :action="action"
      list-type="picture-card"
      :accept="accept"
      :auto-upload="false"
      :data="{ scenario }"
      :multiple="multiple"
      :on-change="change"
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
