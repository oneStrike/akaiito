<script setup lang="ts" async>
import type { GetComicContentPageTypesRes } from '@/apis/types/content'
import { getComicContentPageApi } from '@/apis/content.ts'

defineOptions({
  name: 'ComicContent',
})

const props = withDefaults(defineProps<{
  comicId: number,
  chapterId: number
}>(), {})

const fileList = ref<GetComicContentPageTypesRes['list']>()
getComicContentPageApi({ chapterId: props.chapterId }).then(({ list }) => {
  fileList.value = list
})
const showModel = defineModel('show', { default: false })

function changeContent(data) {
  console.log(data)
}
</script>

<template>
  <es-modal v-model="showModel">
    <es-upload list-type="picture" :data="props" :max-count="999" file-type="image" multiple @change="changeContent">
      <el-button type="primary">上传</el-button>
    </es-upload>
  </es-modal>
</template>

<style scoped lang="scss">

</style>
