<script setup lang="ts" async>
import type { GetComicContentPageTypesRes } from '@/apis/types/content'
import { getComicContentPageApi } from '@/apis/content.ts'

defineOptions({
  name: 'ComicContent',
})

const props = withDefaults(
  defineProps<{
    comicId: number
    chapterId: number
  }>(),
  {},
)

const fileList = ref<GetComicContentPageTypesRes['list']>()
getComicContentPageApi({ chapterId: props.chapterId }).then(({ list }) => {
  fileList.value = list.map((item) => ({
    ...item,
    fileName: item.url.split('/').at(-1),
    filePath: item.url,
  }))
  console.log('🚀 ~ fileList.value=list.map ~ fileList.value:', fileList.value)
})
const showModel = defineModel('show', { default: false })
</script>

<template>
  <es-modal v-model="showModel">
    <es-upload
      v-model="fileList"
      list-type="picture"
      content-type="comic"
      :data="{ comicId, chapterId }"
      :max-count="999"
      file-type="image"
      multiple
    >
      <el-button type="primary">上传</el-button>
    </es-upload>
  </es-modal>
</template>

<style scoped lang="scss"></style>
