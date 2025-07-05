<script lang="ts" setup>
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import { comicDetailApi, updateComicApi } from '@/apis/comic'
  import { PromptsEnum } from '@/enum/prompts'
  import AuthorDetail from '@/views/content-manage/author/AuthorDetail.vue'

  defineOptions({
    name: 'ComicDetail',
  })

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
  })
  const emits = defineEmits(['close', 'updateRule'])

  interface Props {
    visible?: boolean
    comicId: number
    dataDict?: IterateObject
  }

  const comicDetail = ref<ComicDetailResponse>({} as ComicDetailResponse)
  const authorModal = ref(false)
  const chapterModal = ref(false)
  const loading = ref(true)
  const switchLoading = ref(false)

  // 获取漫画详情
  const fetchComicDetail = async () => {
    try {
      comicDetail.value = await comicDetailApi({ id: props.comicId })
    } catch (error) {
      useMessage.error('获取漫画详情失败')
    } finally {
      loading.value = false
    }
  }

  fetchComicDetail()

  // 更新权限规则
  const updateRule = async (field: string, rule: boolean) => {
    switchLoading.value = true
    const params = {
      id: props.comicId,
      [field]: rule,
    }
    try {
      await updateComicApi(params)
      // 更新本地数据
      if (comicDetail.value) {
        ;(comicDetail.value as any)[field] = rule
      }
      emits('updateRule', rule)
      useMessage.success(PromptsEnum.UPDATED)
    } catch (error) {
      useMessage.error('更新失败')
    } finally {
      switchLoading.value = false
    }
  }

  // 格式化评分显示
  const formatRating = (rating?: number | null) => {
    return rating ? rating.toFixed(1) : '-'
  }

  // 格式化金额显示（分转元）
  const formatAmount = (amount?: number | null) => {
    return amount ? (amount / 100).toFixed(2) : '0.00'
  }

  // 获取连载状态文本
  const getSerialStatusText = (status: number) => {
    const statusMap: Record<number, string> = {
      0: '未开始',
      1: '连载中',
      2: '已完结',
      3: '暂停',
    }
    return statusMap[status] || '未知'
  }

  // 获取阅读规则文本
  const getReadRuleText = (rule: number, amount?: number | null) => {
    const ruleMap: Record<number, string> = {
      0: '公开',
      1: '登录',
      2: '会员',
      3: `购买（${formatAmount(amount)}元）`,
    }
    return ruleMap[rule] || '未知'
  }
</script>

<template>
  <EsModal
    v-if="visible"
    :model-value="visible"
    :title="`【${comicDetail?.name ?? '漫画'}】详情`"
    :width="900"
    @closed="emits('close')"
  >
    <div class="p-4 pt-0 space-y-6">
      <!-- 顶部：封面和基本信息卡片 -->
      <el-card>
        <div v-loading="loading" class="flex flex-col gap-8 lg:flex-row">
          <!-- 封面 -->
          <div class="flex flex-col w-full flex-shrink-0 lg:w-56">
            <div class="group relative">
              <el-image
                :src="comicDetail.cover"
                fit="cover"
                class="w-full lg:w-56 rounded-lg shadow-md h-72"
                :preview-src-list="[comicDetail.cover]"
              />
              <!-- 状态标签叠加 -->
              <div class="flex flex-col gap-1 absolute top-2 left-2">
                <el-tag
                  v-if="comicDetail.isRecommended"
                  type="danger"
                  size="small"
                  effect="dark"
                >
                  推荐
                </el-tag>
                <el-tag
                  v-if="comicDetail.isHot"
                  type="warning"
                  size="small"
                  effect="dark"
                >
                  热门
                </el-tag>
                <el-tag
                  v-if="comicDetail.isNew"
                  type="success"
                  size="small"
                  effect="dark"
                >
                  新作
                </el-tag>
              </div>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="flex flex-col flex-1">
            <!-- 标题区域 -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-3">
                <h3
                  class="font-bold text-2xl text-gray-900 dark:text-gray-100 m-0"
                >
                  {{ comicDetail.name }}
                </h3>
                <el-tag
                  :type="comicDetail.isPublished ? 'success' : 'info'"
                  size="small"
                >
                  {{ comicDetail.isPublished ? '已发布' : '未发布' }}
                </el-tag>
              </div>
            </div>

            <!-- 详细信息 -->
            <el-descriptions :column="2" label-width="90px" border size="small">
              <!-- 核心基础信息 -->
              <el-descriptions-item label="ID">
                <el-tag size="small" type="info" effect="plain">
                  {{ comicDetail.id }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item v-if="comicDetail.alias" label="别名">
                <span class="text-gray-700 dark:text-gray-300">
                  {{ comicDetail.alias }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="连载状态">
                <el-tag
                  :type="
                    comicDetail.serialStatus === 1
                      ? 'success'
                      : comicDetail.serialStatus === 2
                        ? 'info'
                        : 'warning'
                  "
                  size="small"
                >
                  {{ getSerialStatusText(comicDetail.serialStatus) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="阅读规则">
                <el-tag
                  :type="
                    comicDetail.readRule === 0
                      ? 'success'
                      : comicDetail.readRule === 1
                        ? 'info'
                        : comicDetail.readRule === 2
                          ? 'warning'
                          : 'danger'
                  "
                  size="small"
                >
                  {{
                    getReadRuleText(
                      comicDetail.readRule,
                      comicDetail.purchaseAmount,
                    )
                  }}
                </el-tag>
              </el-descriptions-item>

              <!-- 创作信息 -->
              <el-descriptions-item label="作者">
                <div class="flex flex-wrap gap-2">
                  <el-link
                    v-for="author in comicDetail.comicAuthors"
                    :key="author.id"
                    type="primary"
                    underline="never"
                    class="text-sm font-medium"
                    @click="authorModal = true"
                  >
                    {{ author.name }}
                    <el-tag
                      v-if="author.isPrimary"
                      size="small"
                      type="success"
                      class="ml-1"
                    >
                      主要
                    </el-tag>
                  </el-link>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="出版社">
                {{
                  comicDetail.publisher
                    ? dataDict?.work_publisher[comicDetail.publisher]
                    : '-'
                }}
              </el-descriptions-item>

              <!-- 作品属性 -->
              <el-descriptions-item label="地区">
                {{ dataDict?.work_region[comicDetail.region] || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="语言">
                {{ dataDict?.work_language[comicDetail.language] || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="年龄分级">
                {{ dataDict?.work_age_rating[comicDetail.ageRating] || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="原始来源">
                {{ comicDetail.originalSource || '-' }}
              </el-descriptions-item>

              <!-- 分类信息（独占一行） -->
              <el-descriptions-item label="分类" :span="2">
                <div class="flex flex-wrap gap-2">
                  <el-tag
                    v-for="category in comicDetail.comicCategories"
                    :key="category.id"
                    size="small"
                    type="primary"
                    effect="light"
                  >
                    {{ category.name }}
                  </el-tag>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>

      <!-- 数据统计与权重 -->
      <el-card v-loading="loading">
        <template #header>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
          >
            数据统计与权重
          </h3>
        </template>

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <!-- 章节数 -->
          <div
            class="text-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            @click="chapterModal = true"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              章节数
            </div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ comicDetail.totalChapters ?? 0 }}
            </div>
          </div>

          <!-- 总阅读 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              总阅读
            </div>
            <div
              class="text-2xl font-bold text-orange-600 dark:text-orange-400"
            >
              {{ comicDetail.totalViews ?? 0 }}
            </div>
          </div>

          <!-- 收藏数 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              收藏数
            </div>
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ comicDetail.favoriteCount ?? 0 }}
            </div>
          </div>

          <!-- 评分 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              评分
            </div>
            <div
              class="text-2xl font-bold text-purple-600 dark:text-purple-400"
            >
              {{ formatRating(comicDetail.rating) }}
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({{ comicDetail.ratingCount }}人)
              </span>
            </div>
          </div>
        </div>

        <!-- 权重数据 -->
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 mt-6">
          <!-- 热度值 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              热度值
            </div>
            <div
              class="text-2xl font-bold text-orange-600 dark:text-orange-400"
            >
              {{ comicDetail.popularity ?? 0 }}
            </div>
          </div>

          <!-- 虚拟热度权重 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              虚拟热度权重
            </div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ comicDetail.popularityWeight ?? 0 }}
            </div>
          </div>

          <!-- 推荐权重 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              推荐权重
            </div>
            <div
              class="text-2xl font-bold text-purple-600 dark:text-purple-400"
            >
              {{ comicDetail.recommendWeight ?? 0 }}
            </div>
          </div>

          <!-- 互动数据 -->
          <div
            class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
            >
              评论/点赞
            </div>
            <div class="text-lg font-bold text-green-600 dark:text-green-400">
              {{ comicDetail.commentCount ?? 0 }} /
              {{ comicDetail.likeCount ?? 0 }}
            </div>
          </div>
        </div>
      </el-card>

      <!-- 权限设置 -->
      <el-card v-loading="loading">
        <template #header>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
          >
            权限设置
          </h3>
        </template>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <!-- 允许下载 -->
          <div
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div class="flex flex-col">
              <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                允许下载
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                控制用户是否可以下载漫画
              </div>
            </div>
            <el-switch
              v-model="comicDetail.canDownload"
              :active-value="true"
              :inactive-value="false"
              :loading="switchLoading"
              size="large"
              @change="(rule) => updateRule('canDownload', rule as boolean)"
            />
          </div>

          <!-- 允许评论 -->
          <div
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div class="flex flex-col">
              <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                允许评论
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                控制用户是否可以发表评论
              </div>
            </div>
            <el-switch
              v-model="comicDetail.canComment"
              :active-value="true"
              :loading="switchLoading"
              :inactive-value="false"
              size="large"
              @change="(rule) => updateRule('canComment', rule as boolean)"
            />
          </div>
        </div>
      </el-card>

      <!-- 作品描述与备注 -->
      <el-card v-loading="loading">
        <template #header>
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
          >
            作品描述与备注
          </h3>
        </template>

        <div class="space-y-6">
          <div>
            <h4
              class="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 m-0"
            >
              作品描述
            </h4>
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-sm leading-relaxed"
            >
              <div class="text-gray-700 dark:text-gray-300">
                {{ comicDetail.description || '暂无描述' }}
              </div>
            </div>
          </div>

          <div v-if="comicDetail.remark">
            <h4
              class="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 m-0"
            >
              备注
            </h4>
            <div
              class="p-4 border border-orange-200 dark:border-orange-700 rounded-lg text-sm leading-relaxed bg-orange-50 dark:bg-orange-900/20"
            >
              <div class="text-gray-700 dark:text-gray-300">
                {{ comicDetail.remark }}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 技术性信息分组 -->
      <div class="space-y-6">
        <!-- SEO信息 -->
        <el-card v-loading="loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              SEO优化信息
            </h3>
          </template>

          <div class="space-y-4">
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                SEO标题
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{ comicDetail.seoTitle || '未设置' }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                SEO描述
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{ comicDetail.seoDescription || '未设置' }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                SEO关键词
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{ comicDetail.seoKeywords || '未设置' }}
              </div>
            </div>
          </div>
        </el-card>

        <!-- 版权与法律信息 -->
        <el-card v-loading="loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              版权与法律信息
            </h3>
          </template>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                版权信息
              </div>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                {{ comicDetail.copyright || '未设置' }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                免责声明
              </div>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                {{ comicDetail.disclaimer || '未设置' }}
              </div>
            </div>
          </div>
        </el-card>

        <!-- 时间信息 -->
        <el-card v-loading="loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              时间信息
            </h3>
          </template>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                发布日期
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  comicDetail.publishAt
                    ? $dayjs.utc(comicDetail.publishAt).format('YYYY-MM-DD')
                    : '未设置'
                }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                创建时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  $dayjs.utc(comicDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                更新时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  $dayjs.utc(comicDetail.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                }}
              </div>
            </div>

            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                章节最后更新时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  $dayjs
                    .utc(comicDetail.lastUpdated)
                    .format('YYYY-MM-DD HH:mm:ss')
                }}
              </div>
            </div>

            <div
              v-if="comicDetail.deletedAt"
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-red-600 dark:text-red-400 mb-2"
              >
                删除时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{ $dayjs(comicDetail.deletedAt).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <AuthorDetail
      v-if="authorModal && comicDetail.comicAuthors?.length > 0"
      :visible="authorModal"
      :author-id="comicDetail.comicAuthors[0].id"
      @close="authorModal = false"
    />
  </EsModal>
</template>

<style scoped lang="scss">
  // 组件样式已优化，使用 Tailwind CSS 类进行样式控制
</style>
