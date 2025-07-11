<script setup lang="ts">
  import type { UploadFile } from 'element-plus'
  import type {
    AddChapterContentRequest,
    DeleteChapterContentRequest,
  } from '@/apis/types/comic-chapter'
  import { computed, onMounted, ref } from 'vue'
  import {
    addChapterContentApi,
    batchUpdateChapterContentsApi,
    chapterContentsApi,
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
  const showModal = ref(false)
  const currentImage = ref<any>(null)

  // 获取章节内容
  async function getContent() {
    if (!props.chapterId) return

    isLoading.value = true
    try {
      const contents = await chapterContentsApi({
        id: props.chapterId,
      })
      fileList.value = contents.map((item: any, index: number) => ({
        ...item,
        index: index + 1,
        imagePreview: item.url,
        imageInfo: `${item.width || 0} x ${item.height || 0}`,
        createdAt: new Date().toLocaleString(),
      }))
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

    try {
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
      useMessage.success('删除成功')
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除失败:', error)
        useMessage.error('删除失败')
      }
    }
  }

  // 显示详细信息
  function showDetail(item: any) {
    currentImage.value = item
    showModal.value = true
  }

  // 清空内容
  async function clearContent() {
    try {
      const params = {
        id: props.chapterId,
        contents: '[]',
      }

      useConfirm(
        'clear',
        () => batchUpdateChapterContentsApi(params),
        () => (fileList.value = []),
      )
    } catch (error) {
      if (error !== 'cancel') {
        console.error('清空失败:', error)
        useMessage.error('清空失败')
      }
    }
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

        if (uploadResult.success && Array.isArray(uploadResult.success)) {
          for (const result of uploadResult.success) {
            const params: AddChapterContentRequest = {
              id: props.chapterId,
              content: result.filePath,
            }

            await addChapterContentApi(params)
          }
        }

        // 重新获取数据以确保同步
        await getContent()
        useMessage.success('上传成功')
      } catch (error) {
        console.error('上传失败:', error)
        useMessage.error('上传失败')
      } finally {
        waitFiles = []
        isLoading.value = false
      }
    }, 100)
  }

  // 计算属性
  const hasContent = computed(() => fileList.value.length > 0)

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
              <el-button type="primary" size="small" @click="showDetail(row)">
                查看
              </el-button>
              <el-button type="danger" size="small" @click="deleteContent(row)">
                删除
              </el-button>
            </div>
          </template>
        </EsTable>
      </div>
    </div>

    <!-- 图片详情弹窗 -->
    <EsModal v-model="showModal" title="图片详情" width="80%">
      <div v-if="currentImage" class="flex flex-col items-center gap-4">
        <el-image
          :src="currentImage.url"
          :preview-src-list="[currentImage.url]"
          class="max-w-full max-h-96 object-contain"
          fit="contain"
        />
        <div class="gap-4 grid grid-cols-2 w-full max-w-md">
          <div class="text-center">
            <div class="text-sm text-gray-600">尺寸</div>
            <div class="font-medium">
              {{ currentImage.width || 0 }} × {{ currentImage.height || 0 }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-600">文件大小</div>
            <div class="font-medium">
              {{ formatFileSize(currentImage.size || 0) }}
            </div>
          </div>
          <div class="text-center col-span-2">
            <div class="text-sm text-gray-600">URL</div>
            <div class="font-medium text-xs break-all">
              {{ currentImage.url }}
            </div>
          </div>
        </div>
      </div>
    </EsModal>
  </EsModal>
</template>
