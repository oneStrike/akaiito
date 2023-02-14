<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import config from '@/config'
import { FileTypeEnum } from '@/enum/fileTypeEnum'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

interface BaseUploadProps {
  modelValue?: string | string[] | CommonUploadRes
  options?: UploadProps
  fileType: FileTypeEnum
  maxSize?: number
}

const props = withDefaults(defineProps<BaseUploadProps>(), {})
const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
}>()
const defaultOptions = {
  action: config.UPLOAD_URL,
  listType: 'picture-card',
  maxCount: 1,
  maxSize: 1,
  data: { fileType: props.fileType }
}
const uploadHeaders = {
  Authorization: userStore.auth.token
}
const updateOptions = Object.assign(defaultOptions, props.options)
console.log('🚀 ~ file:baseUpload method: line:32 -----', updateOptions)
const handlerModelValueType = (val: typeof props.modelValue) => {
  const { cloned } = useCloned(val)
  if (typeof cloned.value === 'string') {
    return [
      {
        uid: dayjs().unix(),
        name: cloned.value.split('/').pop(),
        status: 'done',
        url: config.FILE_PATH + cloned.value
      }
    ]
  }
}

const fileList = computed({
  get() {
    return handlerModelValueType(props.modelValue)
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <a-upload
    v-bind="updateOptions"
    v-model:file-list="fileList"
    :headers="uploadHeaders"
  >
    <slot>
      <svg-icon icon-name="uploading" />
    </slot>
    <template #itemRender></template>
  </a-upload>
</template>

<style scoped lang="less"></style>
