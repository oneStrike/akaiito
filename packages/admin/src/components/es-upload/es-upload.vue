<script setup lang="ts">
import type { UploadFileTypesRes } from '@/apis/types/upload'
import type { UploadFile, UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import { config } from '@/config'
import { useMessage } from '@/hooks/useFeedback'
import { useUpload } from '@/hooks/useUpload'
import { utils } from '@/utils'

export interface EsUploadProps {
  modelValue?: UploadFileTypesRes | UploadUserFile[] | string | string[]
  fileType?: 'image' | 'video' | 'audio' | 'compressed'
  listType?: UploadProps['listType']
  multiple?: UploadProps['multiple']
  scenario?: string
  maxCount?: number
  maxSize?: number
  assetLibrary?: boolean
  structure?: 'string' | 'object' | 'field'
}

const props = withDefaults(defineProps<EsUploadProps>(), {
  listType: 'picture-card',
  maxSize: config.upload.maxUploadFileSize,
  maxCount: 1,
  structure: 'field',
})
const emits = defineEmits<{
  (event: 'update:modelValue', data: typeof fileList.value): void
  (event: 'updateError', data: any[]): void
}>()
const uploadRef = ref<UploadInstance>()

function filePathToObj(path: string, name?: string) {
  return {
    fileName: name,
    name,
    filePath: path,
    url: path,
    mimeType: `${props.fileType}/${path.split('.').at(-1)}`,
    status: 'success',
    uid: new Date().getTime(),
  }
}

function transformModelValue() {
  if (!props.modelValue) {
    return []
  }
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.map((item: any) => {
      const filePath = typeof item === 'string' ? item : item.filePath || item.url
      return filePathToObj(filePath, item.fileName)
    })
  } else if (utils.isJson(props.modelValue)) {
    return JSON.parse(props.modelValue).map((item: any) => ({
      ...item,
      name: item.fileName,
      url: item.filePath,
    }))
  } else {
    return [filePathToObj(props.modelValue)]
  }
}

const fileList = ref()
const previewImages = ref()
const uploadBtnDisplay = computed(() => (fileList.value?.length >= props.maxCount ? 'none' : 'inline-flex'))

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      fileList.value = transformModelValue()
    }
  },
  { deep: true, immediate: true },
)

const accept = computed(() => {
  if (!props.fileType) {
    return '*'
  }
  const allowFileType = config.upload.allowFileType[props.fileType]
  if (!allowFileType) {
    return props.fileType
  }
  return allowFileType
    .map((item: string) => {
      if (props.fileType === 'compressed') {
        return `application/x-${item}-compressed`
      }
      return `${props.fileType}/${item}`
    })
    .join(',')
})

// 文件上传之前，判断上传的数量是否超量
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (fileList.value?.length >= props.maxCount) {
    useMessage.error(`【${rawFile.name}】超出最大数量限制`)
    return false
  } else if (rawFile.size > props.maxSize * 1024 * 1024) {
    useMessage.error(`【${rawFile.name}】超出文件大小限制`)
    return false
  } else if (!accept.value.includes(rawFile.type)) {
    useMessage.error(`【${rawFile.name}】文件格式错误`)
    return
  }
  return true
}

function onPreview(uploadFile: UploadFile) {
  const fileType = uploadFile.url?.split('.').at(-1) ?? ''
  if (config.upload.allowFileType.image.includes(fileType)) {
    previewImages.value = [uploadFile]
  }
}

const upload: UploadProps['httpRequest'] = async ({ file }) => {
  const uploadRes = await useUpload(file, props.scenario!)
  return uploadRes.success[0]
}

function change() {
  if (fileList.value && fileList.value.length) {
    const emitData = fileList.value.map((item: any) => {
      const target = item.response ? item.response : item
      return {
        fileName: target.fileName,
        filePath: target.filePath,
        mimeType: target.mimeType,
      }
    })
    let res = emitData
    if (props.structure === 'string') {
      res = JSON.stringify(emitData)
    } else if (props.structure === 'field') {
      res = emitData[0].filePath
    }
    emits('update:modelValue', res)
  }
}
</script>

<template>
  <div class="w-full es-upload">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="accept"
      :multiple="multiple"
      :on-preview="onPreview"
      :on-change="change"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <template #trigger>
        <div v-if="assetLibrary" class="w-full h-full">
          <el-popconfirm
            width="180"
            title="素材库选择或者上传"
            cancel-button-text="资源库"
            confirm-button-text="本地上传"
            :hide-after="10"
            @confirm="uploadRef!.$el.querySelector('input').click()"
          >
            <template #reference>
              <div class="w-full h-full flex-center" @click.stop>
                <es-icon name="uploading" :size="26" />
              </div>
            </template>
          </el-popconfirm>
        </div>
        <es-icon v-if="listType === 'picture-card'" name="uploading" :size="22" class="mr-2" />
        <el-button v-else type="primary">
          <es-icon name="uploading" :size="22" class="mr-2" />
          上传
        </el-button>
      </template>
    </el-upload>

    <es-preview-image
      v-if="Array.isArray(previewImages) && previewImages.length"
      :url-list="previewImages"
      @close="previewImages = []"
    />
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-upload--picture-card) {
  width: 88px;
  height: 88px;
  display: v-bind(uploadBtnDisplay);
}

::v-deep(.el-upload--text) {
  display: v-bind(uploadBtnDisplay);
}

::v-deep(.el-upload-list--picture-card) {
  .el-upload-list__item {
    width: 88px;
    height: 88px;
  }
}
</style>
