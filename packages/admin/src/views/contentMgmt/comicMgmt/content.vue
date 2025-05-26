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

  const fileList = ref<IterateObject[]>([])
  const isLoading = ref(false)
  const selectedItems = ref<Set<number>>(new Set())
  const isMultiSelectMode = ref(false)

  async function getContent() {
    isLoading.value = true
    try {
      const data = (await getComicChapterContentApi({
        id: props.chapterId,
      })) as IterateObject[]
      for (const item of data) {
        try {
          const imageInfo = await useImageInfo(item.url)
          Object.assign(item, imageInfo)
        } catch (error) {
          console.error('获取图片信息失败:', error)
        }
      }
      fileList.value = data
    } catch (error) {
    } finally {
      isLoading.value = false
    }
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

  // 拖拽排序
  async function drag(drag: IterateObject) {
    isLoading.value = true
    await updateComicChapterContentOrderApi({
      id: props.chapterId,
      originId: drag.originId,
      targetId: drag.targetId,
    })
  }
  async function deleteContent(params: IterateObject) {
    isLoading.value = true
    await deleteComicChapterContentApi({
      chapterId: props.chapterId,
      id: params.id,
    })
    await getContent()
    isLoading.value = false
  }

  async function clearContent() {
    useConfirm('clear', async () => {
      await clearComicChapterContentApi({
        id: props.chapterId,
      })
      await getContent()
    })
  }

  async function handleFileChange(uploadFile: UploadFile) {
    await useUpload(uploadFile.raw!, { id: props.chapterId }, 'comic')
    await getContent()
  }

  function toggleSelect(index: number) {
    if (selectedItems.value.has(index)) {
      selectedItems.value.delete(index)
    } else {
      selectedItems.value.add(index)
    }
  }

  function toggleMultiSelectMode() {
    isMultiSelectMode.value = !isMultiSelectMode.value
    if (!isMultiSelectMode.value) {
      selectedItems.value.clear()
    }
  }

  async function deleteSelected() {
    if (selectedItems.value.size === 0) {
      useMessage.warning('请先选择要删除的图片')
      return
    }

    useConfirm('delete', async () => {
      const deletePromises = Array.from(selectedItems.value).map((index) => {
        const file = fileList.value[index]
        if (file?.id) {
          return deleteComicChapterContentApi({
            chapterId: props.chapterId,
            id: file.id,
          })
        }
        return Promise.resolve()
      })

      await Promise.all(deletePromises)
      useMessage.success(PromptsEnum.DELETED)
      selectedItems.value.clear()
      await getContent()
    })
  }

  const selectAllChecked = computed(() => {
    return (
      fileList.value.length > 0 &&
      selectedItems.value.size === fileList.value.length
    )
  })

  function toggleSelectAll() {
    if (selectAllChecked.value) {
      selectedItems.value.clear()
    } else {
      for (let i = 0; i < fileList.value.length; i++) {
        selectedItems.value.add(i)
      }
    }
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
      </div>
    </div>
    <!-- 漫画内容列表 -->
    <es-table
      :data="fileList"
      :columns="contentColumn"
      drag
      selection
      @drag-end="drag"
    >
      <template #imagePreview="{ row }">
        <el-image :src="row.url" fit="contain" class="max-h-16 max-w-12" />
      </template>
      <template #imageInfo="{ row }">
        <div class="flex flex-col">
          <span>尺寸：{{ `${row.width}X${row.height}` }}</span>
          <span>比例：{{ row.ratio }}</span>
          <span>大小：{{ row.size }}MB</span>
        </div>
      </template>
      <template #createdAt="{ row }">
        <span>{{ row.uploadTime }}</span>
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
