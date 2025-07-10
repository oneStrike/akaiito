<script setup lang="ts">
  import type { NoticeDetailResponse } from '@/apis/types/notice'
  import dayjs from 'dayjs'
  import * as noticeApi from '@/apis/notice.ts'
  import { useBitMask } from '@/hooks/useBitMask'
  import { enablePlatform, noticePriority, noticeType } from './shared'

  defineOptions({
    name: 'NoticeDetail',
  })

  const props = withDefaults(
    defineProps<{
      recordId: number
      visible?: boolean
    }>(),
    {
      visible: false,
    },
  )

  const emits = defineEmits(['close'])

  const loading = ref(true)
  const detail = ref<NoticeDetailResponse>()

  // 通知类型颜色映射
  const noticeTypeColorMap = {
    0: 'primary',
    1: 'success',
    2: 'warning',
    3: 'info',
  }

  // 优先级颜色映射
  const priorityColorMap = {
    0: 'info',
    1: 'primary',
    2: 'warning',
    3: 'danger',
  }

  // 获取通知详情
  const fetchDetail = async () => {
    if (!props.recordId) return
    loading.value = true
    detail.value = await noticeApi.noticeDetailApi({ id: props.recordId })
    loading.value = false
  }

  // 监听 recordId 变化
  watch(() => props.recordId, fetchDetail, { immediate: true })

  // 计算属性
  const currentNoticeType = computed(() => {
    const typeItem =
      noticeType.find((item) => item.value === detail.value?.noticeType) ||
      noticeType[0]
    return {
      label: typeItem.label,
      color:
        (noticeTypeColorMap[
          detail.value?.noticeType as keyof typeof noticeTypeColorMap
        ] as 'primary' | 'success' | 'warning' | 'info' | 'danger') ||
        'primary',
    }
  })

  const currentPriority = computed(() => {
    const priorityItem =
      noticePriority.find(
        (item) => item.value === detail.value?.priorityLevel,
      ) || noticePriority[1]
    return {
      label: priorityItem.label,
      color:
        (priorityColorMap[
          detail.value?.priorityLevel as keyof typeof priorityColorMap
        ] as 'primary' | 'success' | 'warning' | 'info' | 'danger') ||
        'primary',
    }
  })

  const publishStatus = computed(() => {
    if (!detail.value) return { label: '未知', color: 'info' as const }

    const now = new Date()
    const endTime = detail.value.publishEndTime
      ? new Date(detail.value.publishEndTime)
      : null

    if (endTime && endTime < now) {
      return { label: '已下线', color: 'danger' as const }
    }

    return detail.value.isPublished
      ? { label: '已发布', color: 'success' as const }
      : { label: '未发布', color: 'warning' as const }
  })

  const enabledPlatforms = computed(() => {
    if (!detail.value) return []
    return (
      useBitMask
        .getLabels(detail.value.enablePlatform, enablePlatform)
        .join('、') || '暂无启用的平台'
    )
  })

  // 格式化时间
  const formatTime = (time?: string) => {
    return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '-'
  }
</script>

<template>
  <EsModal
    v-if="visible"
    :model-value="visible"
    :title="`【${detail?.title ?? '通知'}】详情`"
    :width="900"
    @closed="emits('close')"
  >
    <div v-loading="loading" class="p-3">
      <div v-if="detail" class="space-y-6">
        <!-- 头部信息 -->
        <div class="pb-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">
            {{ detail.title }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <el-tag :type="currentNoticeType.color" size="small">
              {{ currentNoticeType.label }}
            </el-tag>
            <el-tag :type="currentPriority.color" size="small">
              {{ currentPriority.label }}
            </el-tag>
            <el-tag :type="publishStatus.color" size="small">
              {{ publishStatus.label }}
            </el-tag>
          </div>
        </div>

        <!-- 基本信息 -->
        <div>
          <h3 class="text-gray-900 mb-3 text-base font-medium">基本信息</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="开始时间">
              {{ formatTime(detail.publishStartTime!) }}
            </el-descriptions-item>
            <el-descriptions-item label="结束时间">
              {{ formatTime(detail.publishEndTime!) }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ formatTime(detail.createdAt) }}
            </el-descriptions-item>
            <el-descriptions-item label="阅读次数">
              {{ detail.readCount || 0 }}
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 发布设置 -->
        <div>
          <h3 class="text-base font-medium text-gray-900 mb-3">发布设置</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="是否置顶">
              {{ detail.isPinned ? '是' : '否' }}
            </el-descriptions-item>
            <el-descriptions-item label="是否弹窗">
              {{ detail.showAsPopup ? '是' : '否' }}
            </el-descriptions-item>
            <el-descriptions-item label="排序权重">
              {{ detail.order || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="启用平台">
              {{ enabledPlatforms }}
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 背景图片 -->
        <div v-if="detail.popupBackgroundImage">
          <h3 class="text-base font-medium text-gray-900 mb-3">背景图片</h3>
          <div class="text-center">
            <el-image
              :src="detail.popupBackgroundImage"
              :preview-src-list="[detail.popupBackgroundImage]"
              class="border border-gray-200 max-w-md max-h-64 rounded-lg"
              fit="contain"
            />
          </div>
        </div>

        <!-- 通知内容 -->
        <div>
          <h3 class="text-base font-medium text-gray-900 mb-3">通知内容</h3>
          <div>
            <div
              v-if="detail.content"
              class="rounded-lg border border-gray-200 p-4 min-h-24"
              v-html="detail.content"
            />
            <el-empty v-else description="暂无内容" />
          </div>
        </div>

        <!-- 关联页面 -->
        <div v-if="detail.pageCode">
          <h3 class="text-base font-medium text-gray-900 mb-3">关联页面</h3>
          <el-descriptions :column="2" border :label-width="100">
            <el-descriptions-item label="页面名称">
              {{ detail.clientPage.pageName }}
            </el-descriptions-item>
            <el-descriptions-item label="页面编码">
              {{ detail.clientPage.pageCode }}
            </el-descriptions-item>
            <el-descriptions-item label="页面路径">
              {{ detail.clientPage.pagePath }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </EsModal>
</template>

<style scoped lang="scss"></style>
