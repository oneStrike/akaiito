<script setup lang="ts" async>
  import type { UploadFile } from 'element-plus'
  import {
    clearComicChapterContentApi,
    deleteComicChapterContentApi,
    getComicChapterContentApi,
    updateComicChapterContentOrderApi,
  } from '@/apis/chapter'
  import { PromptsEnum } from '@/enum/prompts.ts'
  import { useImageInfo } from '@/hooks/useImageInfo'
  import { contentColumn } from './shared'

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
  const showModel = defineModel('show', { default: false })
  const fileList = ref<IterateObject[]>([])
  const isLoading = ref(false)

  async function getContent() {
    isLoading.value = true
    try {
      const data = (await getComicChapterContentApi({
        id: props.chapterId,
      })) as IterateObject[]
      fileList.value = []
      nextTick(() => {
        fileList.value = data
      })
    } catch (error) {
    } finally {
      isLoading.value = false
    }
  }

  getContent()

  // 拖拽排序
  async function drag(drag: IterateObject) {
    isLoading.value = true
    await updateComicChapterContentOrderApi({
      id: props.chapterId,
      originId: drag.originId,
      targetId: drag.targetId,
    })
    await getContent()
    useMessage.success(PromptsEnum.UPDATED)
    isLoading.value = false
  }

  // 删除内容
  async function deleteContent(params: IterateObject) {
    isLoading.value = true
    await deleteComicChapterContentApi({
      chapterId: props.chapterId,
      id: params.id,
    })
    await getContent()
    isLoading.value = false
  }

  // 显示详细信息
  async function showDetail() {
    isLoading.value = true
    for (const item of fileList.value) {
      try {
        const imageInfo = await useImageInfo(item.url)
        Object.assign(item, imageInfo)
      } catch (error) {
        console.error('获取图片信息失败:', error)
      }
    }
    isLoading.value = false
  }

  // 清空内容
  async function clearContent() {
    useConfirm('clear', async () => {
      await clearComicChapterContentApi({
        id: props.chapterId,
      })
      await getContent()
    })
  }

  // 上传文件
  let timer: number | null = null
  let waitFiles: any[] = []
  async function handleFileChange(uploadFile: UploadFile) {
    isLoading.value = true
    waitFiles.push(uploadFile)
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(async () => {
      await useUpload(waitFiles, { id: props.chapterId }, 'comic')
      await getContent()
      waitFiles = []
      isLoading.value = false
    }, 100)
  }
</script>

<template>
  <es-modal v-model="showModel" :width="1020">
    <div class="p-5">
      <!-- 工具栏 -->
      <div class="w-full flex justify-between">
        <div class="flex">
          <el-upload
            action=""
            :auto-upload="false"
            :on-change="handleFileChange"
            :multiple="true"
            :show-file-list="false"
            accept="image/*"
          >
            <el-button type="primary" :disabled="isLoading">
              <template #icon>
                <es-icon name="uploading" :size="20" />
              </template>
              上传
            </el-button>
          </el-upload>
        </div>
        <div>
          <el-link class="mr-4" type="primary" @click="showDetail">
            详细信息
          </el-link>
          <el-button @click="clearContent">清空内容</el-button>
        </div>
      </div>
    </div>
    <!-- 漫画内容列表 -->
    <es-table
      :data="fileList"
      :columns="contentColumn"
      drag
      selection
      :loading="isLoading"
      @drag-end="drag"
    >
      <template #imagePreview="{ row }">
        <el-image :src="row.url" fit="contain" class="max-h-16 max-w-12" />
      </template>
      <template #imageInfo="{ row }">
        <div class="flex flex-col">
          <template v-if="row.size">
            <span :class="row.size > 1 ? 'text-error' : 'text-success'">
              大小：{{ row.size }}MB
            </span>
            <span>尺寸：{{ `${row.width}X${row.height}` }}</span>
          </template>
          <span v-else>-</span>
        </div>
      </template>
      <template #createdAt="{ row }">
        <span v-if="row.uploadTime">{{ row.uploadTime }}</span>
        <span v-else>-</span>
      </template>
      <template #action="{ row }">
        <es-pop-confirm
          v-model:loading="isLoading"
          :request="deleteContent"
          :row="row"
        />
      </template>
    </es-table>
  </es-modal>
</template>
