<script setup lang="ts" async>
import type { GetComicContentTypesRes } from '@/apis/types/content'
import type { UploadFile } from 'element-plus'
import { deleteComicContentApi, getComicContentApi } from '@/apis/content.ts'
import { PromptsEnum } from '@/enum/prompts.ts'

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

const fileList = ref<GetComicContentTypesRes>()
getComicContentApi({ chapterId: props.chapterId }).then((list) => {
  fileList.value = list.map((item) => ({
    ...item,
    fileName: item.url.split('/').at(-1),
    filePath: item.url,
  }))
  console.log('🚀 ~ fileList.value=list.map ~ fileList.value:', fileList.value)
})
const showModel = defineModel('show', { default: false })

async function remove(file: UploadFile) {
  const target = fileList.value?.find((item) => item.url === file.url)
  if (target?.id) {
    await deleteComicContentApi({ id: target.id })
    useMessage.success(PromptsEnum.DELETED)
  } else {
    useMessage.error(PromptsEnum.ERROR_DELETE)
  }
}
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
      @remove="remove"
    >
      <el-button type="primary">上传</el-button>
    </es-upload>
  </es-modal>
</template>

<style scoped lang="scss"></style>
