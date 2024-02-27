<script setup lang="ts">
import type { UploadFileTypings } from '@/apis/upload.d'

export interface PreviewImageProps {
  urlList: string[] | UploadFileTypings['Response']
  zIndex?: number
  initialIndex?: number
  infinite?: boolean
}

const props = withDefaults(defineProps<PreviewImageProps>(), {
  zIndex: 999,
  initialIndex: 0
})

const emits = defineEmits<{
  (event: 'close'): void
}>()

const imageList = computed(() => {
  if (!Array.isArray(props.urlList)) return []
  return props.urlList.map((item) => {
    return typeof item === 'string' ? item : item.filePath
  })
})
</script>

<template>
  <el-image-viewer
    :url-list="imageList"
    :initial-index="initialIndex"
    :infinite="true"
    @close="emits('close')"
  />
</template>

<style scoped></style>
