<script setup lang="ts">
import type { IterateObject } from '@typings/index'
import type { UploadProps } from 'element-plus'

export interface BasicUploadProps {
  modelValue: string[] | IterateObject[]
  fileType?: 'image' | 'video'
  listType: UploadProps['listType']
}

const props = withDefaults(defineProps<BasicUploadProps>(), {})

const accept = computed(() => {
  if (props.fileType === 'image') {
    return 'image/*'
  } else if (props.fileType === 'video') {
    return 'video/*'
  } else {
    return '*'
  }
})
</script>

<template>
  <div class="basic-upload">
    <el-upload
      action="#"
      list-type="picture-card"
      :accept="accept"
      :auto-upload="false"
    >
      <as-icons name="downloading" size="26" />
    </el-upload>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-upload) {
  width: 88px;
  height: 88px;
}
</style>
