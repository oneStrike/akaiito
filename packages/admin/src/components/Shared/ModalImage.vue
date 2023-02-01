<script setup lang="ts">
import config from '@/config'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'

interface ModalImage {
  visible: boolean
  imageList: string[] | CommonUploadRes
  initIndex?: number
}

const props = withDefaults(defineProps<ModalImage>(), {
  imageList: () => [],
  initIndex: 0
})

const emits = defineEmits<{
  (event: 'close'): void
}>()

const elImageRef = ref()
const interImageList: string[] = reactive([])
watch(
  () => props.imageList,
  (val) => {
    if (Array.isArray(val) && val.length) {
      interImageList.splice(0, interImageList.length)
      val.forEach((item) => {
        if (typeof item === 'string') {
          if (item.includes('http')) {
            interImageList.push(item)
          } else {
            interImageList.push(config.FILE_PATH + item)
          }
        } else {
          interImageList.push(config.FILE_PATH + item.path)
        }
      })
      nextTick().then(() => {
        const imageEl = document.querySelector(
          '.modal_image .el-image__preview'
        ) as HTMLImageElement
        imageEl.click()
      })
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <div class="modal_image">
    <el-image
      ref="elImageRef"
      v-if="visible && interImageList.length"
      :preview-src-list="interImageList"
      :initial-index="initIndex"
      @close="emits('close')"
    ></el-image>
  </div>
</template>

<style scoped></style>
