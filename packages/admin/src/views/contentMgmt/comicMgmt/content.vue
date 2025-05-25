<script setup lang="ts" async>
  import type { UploadFile, UploadFiles } from 'element-plus'
  import type { GetComicChapterContentTypesRes } from '@/apis/types/chapter'
  import {
    clearComicChapterContentApi,
    deleteComicChapterContentApi,
    getComicChapterContentApi,
  } from '@/apis/chapter'
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

  const fileList = ref<GetComicChapterContentTypesRes>([])

  async function getContent() {
    fileList.value = await getComicChapterContentApi({
      id: props.chapterId,
    })
    console.log('🚀 ~ getContent ~ fileList.value:', fileList.value)
  }

  getContent()
  const showModel = defineModel('show', { default: false })

  async function remove(file: UploadFile) {
    const target = fileList.value?.find((item) => item.url === file.url)
    if (target?.id) {
      await deleteComicChapterContentApi({
        chapterId: props.chapterId,
        id: target.id,
      })
      useMessage.success(PromptsEnum.DELETED)
      await getContent()
    } else {
      useMessage.error(PromptsEnum.ERROR_DELETE)
    }
  }

  async function clearContent() {
    useConfirm('clear', async () => {
      await clearComicChapterContentApi({
        id: props.chapterId,
      })
      await getContent()
    })
  }

  async function handleFileChange(
    uploadFile: UploadFile,
    uploadFiles: UploadFiles,
  ) {
    await useUpload(uploadFile.raw!, { id: props.chapterId }, 'comic')
    await getContent()
  }
</script>

<template>
  <es-modal v-model="showModel">
    <!-- 上传和清空按钮 -->
    <div class="w-full flex justify-between mb-4">
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

    <!-- 自定义图片列表 -->
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(file, index) in fileList"
        :key="index"
        class="relative group"
      >
        <!-- 图片预览 -->
        <el-image
          :src="file.url"
          fit="cover"
          class="w-full h-40 rounded-md shadow-md"
          preview-teleported
        >
          <template #error>
            <div
              class="w-full h-full flex items-center justify-center text-red-500"
            >
              加载失败
            </div>
          </template>
        </el-image>

        <!-- 删除按钮 -->
        <el-button
          v-if="file.url"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          type="danger"
          size="mini"
          icon="el-icon-delete"
          circle
          @click="remove(file)"
        />
      </div>
    </div>
  </es-modal>
</template>

<style scoped lang="scss">
  .grid {
    display: grid;
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .gap-4 {
    gap: 1rem;
  }
  .group {
    position: relative;
  }
  .group-hover\:opacity-100 {
    transition: opacity 0.3s;
  }
</style>
