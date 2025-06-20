<script setup lang="ts">
  import type { DetailTypesRes } from '@/apis/types/notice'
  import dayjs from 'dayjs'
  import * as noticeApi from '@/apis/notice.ts'
  import { noticePriority, noticeType } from './shared'

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
  const detail = ref<DetailTypesRes>()

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
    detail.value = await noticeApi.detailApi({ id: props.recordId })
    loading.value = false
  }

  // 监听 recordId 变化
  watch(() => props.recordId, fetchDetail, { immediate: true })

  // 计算属性
  const currentNoticeType = computed(() => {
    const typeItem =
      noticeType.find((item) => item.value === detail.value?.type) ||
      noticeType[0]
    return {
      label: typeItem.label,
      color:
        (noticeTypeColorMap[
          detail.value?.type as keyof typeof noticeTypeColorMap
        ] as 'primary' | 'success' | 'warning' | 'info' | 'danger') ||
        'primary',
    }
  })

  const currentPriority = computed(() => {
    const priorityItem =
      noticePriority.find((item) => item.value === detail.value?.priority) ||
      noticePriority[1]
    return {
      label: priorityItem.label,
      color:
        (priorityColorMap[
          detail.value?.priority as keyof typeof priorityColorMap
        ] as 'primary' | 'success' | 'warning' | 'info' | 'danger') ||
        'primary',
    }
  })

  const publishStatus = computed(() => {
    if (!detail.value) return { label: '未知', color: 'info' as const }

    const now = new Date()
    const endTime = detail.value.endTime ? new Date(detail.value.endTime) : null

    if (endTime && endTime < now) {
      return { label: '已下线', color: 'danger' as const }
    }

    return detail.value.isEnabled
      ? { label: '已发布', color: 'success' as const }
      : { label: '未发布', color: 'warning' as const }
  })

  const enabledPlatforms = computed(() => {
    if (!detail.value) return []
    const platforms = []
    if (detail.value.enableApplet) platforms.push('小程序')
    if (detail.value.enableWeb) platforms.push('H5')
    if (detail.value.enableApp) platforms.push('APP')
    return platforms
  })

  // 格式化时间
  const formatTime = (time?: string) => {
    return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '-'
  }
</script>

<template>
  <es-modal
    v-if="visible"
    :model-value="visible"
    :title="`【${detail?.title ?? '通知'}】详情`"
    :width="900"
    @closed="emits('close')"
  >
    <div v-loading="loading" class="p-3">
      <div v-if="detail" class="space-y-6">
        <!-- 头部信息 -->
        <div class="border-b border-gray-200 pb-4">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">
            {{ detail.title }}
          </h2>
          <div class="flex gap-2 flex-wrap">
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
          <h3 class="text-base font-medium text-gray-900 mb-3">基本信息</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="开始时间">
              {{ formatTime(detail.startTime) }}
            </el-descriptions-item>
            <el-descriptions-item label="结束时间">
              {{ formatTime(detail.endTime) }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ formatTime(detail.createdAt) }}
            </el-descriptions-item>
            <el-descriptions-item label="阅读次数">
              {{ detail.viewCount || 0 }}
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 发布设置 -->
        <div>
          <h3 class="text-base font-medium text-gray-900 mb-3">发布设置</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="是否置顶">
              {{ detail.isTop ? '是' : '否' }}
            </el-descriptions-item>
            <el-descriptions-item label="是否弹窗">
              {{ detail.isPopup ? '是' : '否' }}
            </el-descriptions-item>
            <el-descriptions-item label="排序权重">
              {{ detail.sortOrder || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="启用平台">
              {{
                enabledPlatforms.length > 0
                  ? enabledPlatforms.join('、')
                  : '暂无启用平台'
              }}
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 背景图片 -->
        <div v-if="detail.backgroundImage">
          <h3 class="text-base font-medium text-gray-900 mb-3">背景图片</h3>
          <div class="text-center">
            <el-image
              :src="detail.backgroundImage"
              :preview-src-list="[detail.backgroundImage]"
              class="max-w-md max-h-64 rounded-lg border border-gray-200"
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
              class="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-24"
              v-html="detail.content"
            />
            <el-empty v-else description="暂无内容" />
          </div>
        </div>

        <!-- 关联页面 -->
        <div v-if="detail.pageCode">
          <h3 class="text-base font-medium text-gray-900 mb-3">关联页面</h3>
          <div
            class="px-3 py-2 bg-gray-100 rounded-md font-mono text-sm text-gray-700"
          >
            {{ detail.pageCode }}
          </div>
        </div>
      </div>
    </div>
  </es-modal>
</template>

<style scoped lang="scss"></style>
