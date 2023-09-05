<script setup lang="ts">
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import type { UploadInst, UploadProps, UploadFileInfo } from 'naive-ui'
import config from '@/config'
import { useMessage } from '@/hooks/naviaDiscreteApi'
import { userStore } from '@/stores'
import dayjs from 'dayjs'

const useUserStore = userStore()

interface BasicUploadProps {
  fileList?: CommonUploadRes[number][] | string
  fileClassify?: 'shared' | 'material'
  accept?: 'image' | 'video'
  listType: UploadProps['listType']
  max?: number
  multiple?: boolean
  size?: number
  disabled?: boolean
  showFileList?: boolean
  retainFileList?: boolean //保留fileList，否则每次上传完成之后请回清空fileList
}

const props = withDefaults(defineProps<BasicUploadProps>(), {
  accept: 'image',
  max: 1,
  size: 300,
  multiple: false,
  showFileList: true,
  retainFileList: false,
  fileClassify: 'shared'
})

const emits = defineEmits<{
  (event: 'update:fileList', data: BasicUploadProps['fileList']): void
  (event: 'success', data: BasicUploadProps['fileList']): void
}>()

const uploadRef = ref<UploadInst>()

//允许的文件类型
const innerAccept = computed(() => {
  if (props.accept === 'image') {
    return config.ALLOW_IMAGE_TYPE.join(',')
  } else if (props.accept === 'video') {
    return config.ALLOW_VIDEO_TYPE.join(',')
  }
})

//将CommonUploadRes格式转换为n-upload支持的格式
const transformFileList = (
  fileList: BasicUploadProps['fileList']
): UploadFileInfo[] => {
  const files: UploadProps['fileList'] = []
  if (typeof fileList === 'string') {
    files.push({
      id: dayjs().unix().toString(),
      name: fileList.split('/').pop()!,
      status: 'finished',
      url: config.FILE_PATH + fileList
    })
  } else if (Array.isArray(fileList)) {
    fileList.forEach((item) => {
      files.push({
        id: dayjs().unix().toString(),
        name: item.filename,
        status: 'finished',
        url: config.FILE_PATH + item.path
      })
    })
  }
  return files
}
let emitFileList: BasicUploadProps['fileList'] = []
const innerFileList = ref<UploadFileInfo[]>([])
watch(
  () => props.fileList,
  (val) => {
    innerFileList.value = transformFileList(val)
    emitFileList = val || []
  },
  { deep: true, immediate: true }
)

//限制文件的数量、大小、类型
const beforeUpload: UploadProps['onBeforeUpload'] = ({ file, fileList }) => {
  if (!file.type) {
    useMessage.error(`【${file.name}】文件类型未知`)
    return false
  }
  let isAllowFileType
  if (props.accept === 'image') {
    isAllowFileType = config.ALLOW_IMAGE_TYPE.includes(file.type)
  } else {
    isAllowFileType = config.ALLOW_VIDEO_TYPE.includes(file.type)
  }
  if (!isAllowFileType) {
    useMessage.error(`【${file.name}】文件类型被禁止上传`)
    return false
  }
  if (file.file!.size / 1024 / 1024 > props.size) {
    useMessage.error(`【${file.name}】超出大小限制`)
    return false
  }

  if (fileList.length + 1 > props.max) {
    useMessage.error(`【${file.name}】超出数量限制，最大上传${props.max}份`)
    return false
  }
  return true
}

//判断上传是否成功
const isErrorState: UploadProps['isErrorState'] = (xhr) => {
  return JSON.parse(xhr.response).code !== 1
}

//上传失败
const uploadError: UploadProps['onError'] = ({ event }) => {
  innerFileList.value.pop()
  const target = event!.currentTarget as unknown as any
  const response = JSON.parse(target.response)
  useMessage.error(response.desc || HintEnum.UPD_ERR)
}
//上传成功
const uploadFinish: UploadProps['onFinish'] = ({ event }) => {
  const target = event!.currentTarget as unknown as any
  const response = JSON.parse(target.response)
  if (!props.retainFileList) {
    emitFileList = []
    nextTick(() => (innerFileList.value = []))
  }

  emitFileList = emitFileList?.concat(response.data)
  emits('update:fileList', emitFileList)
  emits('success', emitFileList)
  useMessage.success(HintEnum.UPL_SUC)
}

//自定义批量上传
/*const customUpload: UploadProps['customRequest'] = useDebounceFn((options) => {
  const { onFinish, onError, onProgress } = options
  const formData = new FormData()
  waitUploadFileList.forEach((item) => {
    formData.append('file', item.file as File)
  })
  formData.append('fileClassify', props.fileClassify)
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent = 1
      if (event.total > 0) percent = event.loaded / event.total
      onProgress({ percent: percent * 100 })
    }
  }
  xhr.onerror = function error() {
    onError()
  }
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText)
    }
    onFinish()
  }
  xhr.open('post', config.UPLOAD_URL, true)
  xhr.setRequestHeader('Authorization', useUserStore.token)
  xhr.send(formData)
}, 100)*/

//打开素材库
const showMaterial = () => {}
</script>
<template>
  <n-upload
    ref="uploadRef"
    v-model:file-list="innerFileList"
    :action="config.UPLOAD_URL"
    :headers="{ Authorization: useUserStore.token }"
    :data="{ fileClassify }"
    :accept="innerAccept"
    :multiple="multiple"
    :list-type="listType"
    :disabled="disabled"
    :show-file-list="showFileList"
    :is-error-state="isErrorState"
    :max="max"
    @before-upload="beforeUpload"
    @error="uploadError"
    @finish="uploadFinish"
  >
    <slot>
      <div class="w_100 h_100 flex_center" @click.stop>
        <n-popconfirm
          positive-text="素材库"
          negative-text="本地"
          @positive-click="showMaterial"
          @negative-click="uploadRef?.openOpenFileDialog()"
        >
          <template #trigger>
            <div
              class="w_100 h_100 flex_center"
              v-if="listType === 'image-card'"
            >
              <svg-icon icon-name="uploading" />
            </div>
            <n-button v-else>上传文件</n-button>
          </template>
          上传方式
        </n-popconfirm>
      </div>
    </slot>
  </n-upload>
</template>
