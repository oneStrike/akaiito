<script setup lang="ts">
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import type { FileItem, UploadInstance } from '@arco-design/web-vue'
import dayjs from 'dayjs'
import config from '@/config'
import { useMessage } from '@/hooks/useMessage'
import SvgIcon from '@/components/SvgIcon.vue'
import { watchThrottled } from '@vueuse/core'
import { useUserStore } from '@/stores'
type UploadProps = UploadInstance['$props']

interface BaseUploadProps {
  fileList?: string | string[] | CommonUploadRes
  accept?: string
  acceptType?: 'image' | 'video'
  multiple?: boolean
  directory?: boolean
  tip?: string
  name?: UploadProps['name']
  limit?: number
  size?: number
  fileCategory?: 'shared' | 'material'
  listType?: UploadProps['listType'] | 'avatar'
  showFileList?: UploadProps['showFileList']
}
const baseFileUrl = config.FILE_PATH

const props = withDefaults(defineProps<BaseUploadProps>(), {
  name: 'filename',
  acceptType: 'image',
  multiple: true,
  directory: false,
  limit: 1, // 取消使用a-upload自带的数量校验
  fileCategory: 'shared',
  listType: 'picture-card',
  showFileList: true
})

const emits = defineEmits<{
  (event: 'upload:fileList', data: CommonUploadRes): void
  (event: 'success', data: CommonUploadRes): void
}>()

//将传递的文件列表转换为a-upload支持的文件列表
const formatFileItem = (file: CommonUploadRes[number] | string): FileItem => {
  let url, name
  if (typeof file !== 'string') {
    url = file.path
    name = file.filename
  } else {
    url = file
    name = file.split(',').pop()
  }

  return {
    uid: dayjs().unix().toString(),
    status: 'done',
    url: baseFileUrl + url,
    name
  }
}
const formatFileList = (fileList: BaseUploadProps['fileList']) => {
  const returnRes: FileItem[] = []
  //字符串格式
  if (typeof fileList === 'string') {
    const fileListArr = fileList.split(',')
    fileListArr.forEach((item) => {
      returnRes.push(formatFileItem(item))
    })
  } else if (Array.isArray(fileList)) {
    fileList.forEach((item) => {
      if (typeof item === 'string') {
        returnRes.push(formatFileItem(item))
      } else if (item._ext) {
        returnRes.push(formatFileItem(item))
      }
    })
  }
  return returnRes
}
const formatEmitFile = (fileList: FileItem[]): CommonUploadRes => {
  const fileRes: CommonUploadRes = []
  fileList.forEach((item) => {
    if (item.response) {
      const response = JSON.parse(item.response)
      fileRes.push(response.data[0])
    } else {
      fileRes.push(item as unknown as CommonUploadRes[number])
    }
  })
  return fileRes
}
const showUploadButton = ref(true)
const innerFileList = ref<FileItem[]>([])
watchThrottled(
  () => props.fileList,
  (val) => {
    const fileListRes = formatFileList(val)
    showUploadButton.value = fileListRes.length < props.limit
    innerFileList.value = fileListRes
  },
  {
    deep: true,
    throttle: 100,
    immediate: true
  }
)

watchThrottled(
  innerFileList,
  (val) => {
    showUploadButton.value = val.length < props.limit
    emits('upload:fileList', formatEmitFile(val))
  },
  {
    deep: true,
    throttle: 100,
    immediate: true
  }
)

//允许的文件类型
const innerAccept = computed(() => {
  if (props.accept) return props.accept
  if (props.acceptType === 'image') return config.ALLOW_IMAGE_TYPE.join(',')
  if (props.acceptType === 'video') return config.ALLOW_VIDEO_TYPE.join(',')
  return config.ALLOW_IMAGE_TYPE.join(',')
})

const awaitFiles: File[] = []
const beforeUpload = (file: File) => {
  if (!innerAccept.value.includes(file.type)) {
    useMessage.error(`【${file.name}】文件类型不符合`)
    return
  }
  if (props.size && file.size / 1024 / 1024 > props.size) {
    useMessage.error(`【${file.name}】超出文件大小限制`)
    return
  }
  if (awaitFiles.length + innerFileList.value.length > props.limit) {
    useMessage.error(`【${file.name}】超出文件数量限制`)
    return
  }
  awaitFiles.push(file)
  return true
}

//自定义上传函数
const customRequest: UploadProps['customRequest'] = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent
      if (event.total > 0) percent = event.loaded / event.total
      onProgress(percent || 1, event)
    }
  }
  xhr.onerror = (e) => onError(e)
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText)
    }
    const response = JSON.parse(xhr.response)
    if (response.code !== 1) {
      onError(xhr.response)
    } else {
      onSuccess(xhr.response)
    }
  }

  const formData = new FormData()
  formData.append(name as string, fileItem.file as Blob)
  formData.append('fileCategory', props.fileCategory)
  xhr.open('post', config.UPLOAD_URL, true)
  xhr.setRequestHeader('Authorization', useUserStore().auth.token)
  xhr.send(formData)
  return {
    abort() {
      xhr.abort()
    }
  }
}

//移除图片
const beforeRemove = (file: FileItem) => {
  if (awaitFiles.length) {
    const removeIndex = awaitFiles.findIndex((item) => item.name === file.name)
    awaitFiles.splice(removeIndex, 1)
  }
  return true
}

//上传错误
const uploadError = (file: FileItem) => {
  const errorResponse = JSON.parse(file.response)
  useMessage.error(`【${file.name}】文件${errorResponse.desc}`)
}

//上传成功
const uploadSuccess = useDebounceFn(() => {
  useMessage.success(`${awaitFiles.length}份文件上传成功`)
  awaitFiles.splice(0)
  emits('success', formatEmitFile(innerFileList.value))
}, 200)

//展示素材库
const viewMaterialLibrary = () => {}

//手动弹出文件选择框
const uploadBtn = ref()
const manualStartUpload = () => {
  const fileInput = uploadBtn.value.parentNode.previousElementSibling
	fileInput.click()
}
</script>

<template>
  <a-upload
    v-model:file-list="innerFileList"
    :multiple="multiple"
    :accept="innerAccept"
    :limit="99999"
    :name="name"
    :tip="tip"
    :list-type="listType"
    :show-upload-button="showUploadButton || listType === 'avatar'"
    :show-file-list="showFileList"
    :custom-request="customRequest"
    :image-preview="true"
    :on-before-remove="beforeRemove"
    :on-before-upload="beforeUpload"
    @error="uploadError"
    @success="uploadSuccess"
  >
    <template #upload-button>
      <slot>
        <a-popconfirm
          content="请选择上传方式？"
          ok-text="素材库"
          cancel-text="本地"
          @ok="viewMaterialLibrary"
          @cancel="manualStartUpload"
        >
          <div
            ref="uploadBtn"
            style="margin: auto"
            class="arco-upload-picture-card"
            @click.stop
          >
            <svg-icon icon-name="uploading" />
          </div>
        </a-popconfirm>
      </slot>
    </template>
  </a-upload>
</template>
