<script setup lang="ts">
  import type { UploadFile } from 'element-plus'
  import type { DeleteChapterContentRequest } from '@/apis/types/comic-chapter'
  import { onMounted, ref } from 'vue'
  import {
    batchUpdateChapterContentsApi,
    chapterContentsApi,
    clearChapterContentsApi,
    deleteChapterContentApi,
  } from '@/apis/comic-chapter'
  import { useUpload } from '@/hooks/useUpload'
  import { contentColumn } from './shared/content'

  defineOptions({
    name: 'Content',
  })

  const props = defineProps<Props>()

  interface Props {
    chapterId: number
  }

  const showModel = defineModel('show', { default: false })
  const fileList = ref<any[]>([])
  const isLoading = ref(false)
  const selected = ref<any[]>([])

  // 获取章节内容
  async function getContent() {
    if (!props.chapterId) return

    isLoading.value = true
    try {
      const contents = await chapterContentsApi({
        id: props.chapterId,
      })
      formatFileList(contents)

      console.log(fileList.value)
    } catch (error) {
      console.error('获取章节内容失败:', error)
      useMessage.error('获取章节内容失败')
    } finally {
      isLoading.value = false
    }
  }
  // 删除内容
  async function deleteContent(params?: any) {
    if (!params && selected.value.length === 0) {
      useMessage.error('请选择要删除的内容')
      return
    }

    const index = params
      ? fileList.value.findIndex((item) => item === params)
      : selected.value[0]
    const deleteParams: DeleteChapterContentRequest = {
      id: props.chapterId,
      index: typeof index === 'number' ? index : 0,
    }

    useConfirm(
      'delete',
      () => deleteChapterContentApi(deleteParams),
      getContent,
    )
  }

  // 清空内容
  async function clearContent() {
    useConfirm(
      'clear',
      () => clearChapterContentsApi({ id: props.chapterId }),
      getContent,
    )
  }

  // 格式化文件大小
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  // 上传文件
  let timer: number | null = null
  let waitFiles: UploadFile[] = []
  function handleFileChange(file: UploadFile) {
    if (!file.raw) return

    waitFiles.push(file)
    isLoading.value = true

    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(async () => {
      try {
        const uploadResult = await useUpload(waitFiles, {}, 'common')
        const files: string[] = []

        if (uploadResult.success && Array.isArray(uploadResult.success)) {
          for (const result of uploadResult.success) {
            files.push(result.filePath)
          }
        }
        files.unshift(...fileList.value.map((item) => item.paht))
        const contents = await batchUpdateChapterContentsApi({
          id: props.chapterId,
          contents: files,
        })
        formatFileList(contents)
      } catch (error) {
        console.error('上传失败:', error)
        useMessage.error('上传失败')
      } finally {
        waitFiles = []
        isLoading.value = false
      }
    }, 100)
  }

  function formatFileList(files: string[]) {
    fileList.value = files.map((item: any, index: number) => ({
      path: item,
    }))
  }

  onMounted(() => {
    getContent()
  })
</script>

<template>
  <EsModal v-model="showModel" title="章节内容">
    <div class="flex flex-col gap-4 h-full">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">
            共 {{ fileList.length }} 张图片
          </span>
          <el-button
            v-if="fileList.length > 0"
            type="danger"
            size="small"
            @click="clearContent"
          >
            清空内容
          </el-button>
        </div>
        <div class="flex items-center gap-2">
          <el-upload
            :show-file-list="false"
            :before-upload="() => false"
            :on-change="handleFileChange"
            multiple
            accept="image/*"
          >
            <el-button type="primary" size="small">上传图片</el-button>
          </el-upload>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <EsTable
          v-model:selected="selected"
          :table-data="fileList"
          :columns="contentColumn"
          :loading="isLoading"
          drag
          selection
          class="h-full"
        >
          <template #imagePreview="{ row }">
            <div class="flex justify-center">
              <el-image
                :src="row.url"
                :preview-src-list="[row.url]"
                class="w-16 h-16 object-cover rounded cursor-pointer"
                fit="cover"
                @click="showDetail(row)"
              />
            </div>
          </template>

          <template #imageInfo="{ row }">
            <div class="text-center">
              <div class="text-sm">
                {{ row.width || 0 }} × {{ row.height || 0 }}
              </div>
              <div class="text-xs text-gray-500">
                {{ formatFileSize(row.size || 0) }}
              </div>
            </div>
          </template>

          <template #createdAt="{ row }">
            <div class="text-center text-sm">
              {{ row.createdAt || '-' }}
            </div>
          </template>

          <template #action="{ row }">
            <div class="flex justify-center gap-2">
              <el-button type="danger" size="small" @click="deleteContent(row)">
                删除
              </el-button>
            </div>
          </template>
        </EsTable>
      </div>
    </div>
  </EsModal>
</template>
