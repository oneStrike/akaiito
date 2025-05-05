<script setup lang="ts" async>
import type { GetComicContentTypesRes } from '@/apis/types/content'
import type { UploadFile, UploadFiles } from 'element-plus'
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

async function getContent() {
  fileList.value = await getComicContentApi({ chapterId: props.chapterId, comicId: props.comicId })
}

getContent()
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

async function clearContent() {
}

async function handleFileChange(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  await useUpload(uploadFile.raw!, { chapterId: props.chapterId, comicId: props.comicId }, 'comic')
  await getContent()
}
</script>

<template>
  <es-modal v-model="showModel">
    <div class="w-full flex justify-between">
      <div>
        <el-upload
          action=""
          :auto-upload="false"
          :on-change="handleFileChange"
          :limit="10"
          :multiple="true"
          :show-file-list="false"
        >
          <el-button type="primary">
            <template #icon>
              <es-icon name="uploading" :size="20" />
            </template>
            上传
          </el-button>
        </el-upload>
      </div>
      <el-button @click="clearContent">清空</el-button>
    </div>
  </es-modal>
</template>

<style scoped lang="scss"></style>
