<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import config from '@/config'
import type { FileCategoryEnum } from '@/enum/fileCategoryEnum'
import dayjs from 'dayjs'
import { useMessage } from '@/hooks/useMessage'
import { uploadFile } from '@/api/common'
import { Hint } from '@/utils/hint'

const imageType = ['image/png', 'image/jpg', 'image/jpeg']
const videoType = ['video/mp4', 'video/mkv', 'video/flv']

interface BaseUploadProps {
  value?: string | string[] | CommonUploadRes
  options?: UploadProps
  fileCategory: FileCategoryEnum
  maxSize?: number
  fileType?: 'image' | 'video'
}

const props = withDefaults(defineProps<BaseUploadProps>(), {
  fileType: 'image',
  maxSize: 1
})
const emits = defineEmits<{
  (event: 'update:value', data: any): void
}>()

//处理接收的文件类型
const handlerAcceptFile = computed(() => {
  if (props.options?.accept) return props.options?.accept
  if (props.fileType === 'image') return imageType.join(',')
  if (props.fileType === 'video') return videoType.join(',')
})

//默认的上传配置
const defaultOptions = {
  action: config.UPLOAD_URL,
  listType: 'picture-card',
  maxCount: 1,
  accept: handlerAcceptFile.value,
  multiple: false
}

//上传配置
const uploadOptions = Object.assign(defaultOptions, props.options)

//处理modelValue的类型，以兼容upload的fileList格式
const handlerModelValueType = (
  val: typeof props.value
): UploadProps['fileList'] => {
  const { cloned } = useCloned(val)
  if (typeof cloned.value === 'string') {
    return [
      {
        uid: dayjs().unix().toString(),
        name: cloned.value.split('/').pop() || 'temp',
        status: 'done',
        url: config.FILE_PATH + cloned.value
      }
    ]
  } else if (Array.isArray(cloned.value)) {
    const fileList: UploadProps['fileList'] = []
    cloned.value.forEach((item: any) => {
      const res = handlerModelValueType(item.path || item)
      if (res) fileList.push(res[0])
    })
    return fileList
  }
  return []
}

const fileList = ref(handlerModelValueType(props.value))

//取消自动上传，开启手动上传
const beforeUpload: UploadProps['beforeUpload'] = () => false

const awaitUploadFile: UploadProps['fileList'] = []
let overflowFileCount = 0
let timer: number
const uploadChange: UploadProps['onChange'] = ({ file }) => {
  if (!file.type || !imageType.includes(file.type)) {
    useMessage.error(file.name + '格式不支持')
    return
  }
  if (awaitUploadFile.length >= uploadOptions.maxCount) {
    overflowFileCount++
    return
  }
  awaitUploadFile.push(file)
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => {
    handleUpload(awaitUploadFile)
  }, 150)
}
//手动上传文件
const handleUpload = async (files: UploadProps['fileList']) => {
  if (!files?.length) return
  try {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('filename', file as any)
    })
    formData.append('fileCategory', props.fileCategory)
    const uploadFiles = await uploadFile(formData)
    if (overflowFileCount) {
      useMessage.error(overflowFileCount + '份文件超出最大数量限制')
    }
    const formatList = handlerModelValueType(uploadFiles)!
    if (uploadOptions.maxCount === 1) {
      fileList.value = uploadOptions.showUploadList === false ? [] : formatList
      emits('update:value', uploadFiles)
    } else {
      fileList.value?.push(...formatList)
      if (props.value && Array.isArray(props.value)) {
        emits('update:value', [...uploadFiles, ...props.value])
      } else if (props.value) {
        emits('update:value', [...uploadFiles, props.value])
      } else {
        emits('update:value', uploadFiles)
      }
    }
    awaitUploadFile.splice(0, awaitUploadFile.length)
    overflowFileCount = 0
    useMessage.success(Hint.UPL_SUC)
  } catch (e) {}
}
</script>

<template>
  <a-upload
    v-bind="uploadOptions"
    :file-list="fileList"
    :before-upload="beforeUpload"
    @change="uploadChange"
  >
    <slot>
      <svg-icon icon-name="uploading" />
    </slot>
  </a-upload>
</template>

<style scoped lang="less"></style>
