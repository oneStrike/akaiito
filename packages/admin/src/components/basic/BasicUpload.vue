<script setup lang="ts">
import { config } from '@/config'
import type { IterateObject } from '@typings/index'
import type { UploadProps } from 'element-plus'

export interface BasicUploadProps {
  modelValue: string[] | IterateObject[]
  fileType?: 'image' | 'video' | 'audio'
  listType: UploadProps['listType']
}

const props = withDefaults(defineProps<BasicUploadProps>(), {})

const action = ref(import.meta.env.VITE_BASE_URL)
console.log('🚀 ~ file:BasicUpload method: line:15 -----', action)
const accept = computed(() => {
  if (!props.fileType) return '*'
  return config.allowFileType[props.fileType]
    .map((item) => '.' + item)
    .join(',')
})
</script>

<template>
  <div class="basic-upload">
    <el-upload
      :action="action"
      list-type="picture-card"
      :accept="accept"
      :auto-upload="false"
    >
      <as-icons name="downloading" :size="26" />
    </el-upload>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-upload) {
  width: 88px;
  height: 88px;
}
::v-deep(.el-upload-list__item) {
  width: 88px;
  height: 88px;
}
</style>
