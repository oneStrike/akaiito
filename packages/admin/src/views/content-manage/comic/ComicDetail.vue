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
      const data = await comicDetailApi({ id: props.comicId })
      comicDetail.value = data
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
    <div class="p-4 space-y-6">
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
            <!-- 分类标签 -->
            <div class="flex flex-wrap justify-center gap-1.5 mt-4">
              <el-tag
                v-for="cat in comicDetail.comicCategories"
                :key="cat.id"
                size="small"
                effect="plain"
                type="primary"
                class="!mr-0"
              >
                {{ cat.name }}
              </el-tag>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="flex flex-col flex-1">
            <!-- 标题区域 -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="font-bold text-2xl el-text-primary">
                  {{ comicDetail.name }}
                </h3>
                <el-tag
                  :type="comicDetail.isPublished ? 'success' : 'info'"
                  size="small"
                >
                  {{ comicDetail.isPublished ? '已发布' : '未发布' }}
                </el-tag>
              </div>
              <p v-if="comicDetail.alias" class="text-sm mb-2 el-text-regular">
                别名：{{ comicDetail.alias }}
              </p>
              <div class="flex items-center gap-4 text-sm el-text-regular">
                <span>ID: {{ comicDetail.id }}</span>
                <span>
                  连载状态: {{ getSerialStatusText(comicDetail.serialStatus) }}
                </span>
                <span>
                  阅读规则:
                  {{
                    getReadRuleText(
                      comicDetail.readRule,
                      comicDetail.purchaseAmount,
                    )
                  }}
                </span>
              </div>
            </div>

            <!-- 详细信息 -->
            <el-descriptions :column="2" label-width="90px" border size="small">
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
                {{ comicDetail.publisher || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="地区">
                {{
                  dataDict?.work_region[comicDetail.region]
                  || comicDetail.region
                }}
              </el-descriptions-item>
              <el-descriptions-item label="语言">
                {{
                  dataDict?.work_language[comicDetail.language]
                  || comicDetail.language
                }}
              </el-descriptions-item>
              <el-descriptions-item label="年龄分级">
                {{
                  dataDict?.work_age_rating[comicDetail.ageRating]
                  || comicDetail.ageRating
                }}
              </el-descriptions-item>
              <el-descriptions-item label="原始来源">
                {{ comicDetail.originalSource || '-' }}
              </el-descriptions-item>
            </el-descriptions>

            <!-- 统计数据 -->
            <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <el-card
                class="text-center cursor-pointer hover:shadow-md transition-shadow"
                @click="chapterModal = true"
              >
                <div class="text-xs mb-1 el-text-primary">章节数</div>
                <div class="font-bold text-xl el-text-primary">
                  {{ comicDetail.totalChapters ?? 0 }}
                </div>
              </el-card>
              <el-card class="text-center">
                <div class="text-xs mb-1 el-text-warning">总阅读</div>
                <div class="text-xl font-bold el-text-warning">
                  {{ comicDetail.totalViews ?? 0 }}
                </div>
              </el-card>
              <el-card class="text-center">
                <div class="text-xs mb-1 el-text-success">收藏数</div>
                <div class="text-xl font-bold el-text-success">
                  {{ comicDetail.favoriteCount ?? 0 }}
                </div>
              </el-card>
              <el-card class="text-center">
                <div class="text-xs mb-1 el-text-info">评分</div>
                <div class="text-xl font-bold el-text-info">
                  {{ formatRating(comicDetail.rating) }}
                  <span class="text-xs el-text-regular">
                    ({{ comicDetail.ratingCount }}人)
                  </span>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 数据统计与权重 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-primary" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">
              数据统计与权重
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <!-- 热度值 -->
          <div class="text-center p-4">
            <div class="text-sm mb-2 font-medium el-text-warning">热度值</div>
            <div class="text-2xl font-bold el-text-warning">
              {{ comicDetail.popularity ?? 0 }}
            </div>
          </div>

          <!-- 虚拟热度权重 -->
          <div class="text-center p-4">
            <div class="text-sm mb-2 font-medium el-text-primary">
              虚拟热度权重
            </div>
            <div class="text-2xl font-bold el-text-primary">
              {{ comicDetail.popularityWeight ?? 0 }}
            </div>
          </div>

          <!-- 推荐权重 -->
          <div class="text-center p-4">
            <div class="text-sm mb-2 font-medium el-text-info">推荐权重</div>
            <div class="text-2xl font-bold el-text-info">
              {{ comicDetail.recommendWeight ?? 0 }}
            </div>
          </div>

          <!-- 互动数据 -->
          <div class="text-center p-4">
            <div class="text-sm mb-2 font-medium el-text-success">
              评论/点赞
            </div>
            <div class="text-lg font-bold el-text-success">
              {{ comicDetail.commentCount ?? 0 }} /
              {{ comicDetail.likeCount ?? 0 }}
            </div>
          </div>
        </div>
      </el-card>

      <!-- 权限设置 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-success" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">权限设置</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <!-- 允许下载 -->
          <div
            class="flex items-center justify-between p-4 border rounded el-border-light"
          >
            <div class="flex flex-col">
              <span class="text-sm font-medium el-text-primary">允许下载</span>
              <span class="text-xs el-text-regular">
                控制用户是否可以下载漫画
              </span>
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
            class="flex items-center justify-between p-4 border rounded el-border-light"
          >
            <div class="flex flex-col">
              <span class="text-sm font-medium el-text-primary">允许评论</span>
              <span class="text-xs el-text-regular">
                控制用户是否可以发表评论
              </span>
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

      <!-- SEO信息 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-primary" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">
              SEO优化信息
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-primary">SEO标题</div>
            <div class="el-text-primary">
              {{ comicDetail.seoTitle || '未设置' }}
            </div>
          </div>

          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-success">SEO描述</div>
            <div class="el-text-primary">
              {{ comicDetail.seoDescription || '未设置' }}
            </div>
          </div>

          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-info">SEO关键词</div>
            <div class="el-text-primary">
              {{ comicDetail.seoKeywords || '未设置' }}
            </div>
          </div>
        </div>
      </el-card>

      <!-- 版权与法律信息 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-warning" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">
              版权与法律信息
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-warning">版权信息</div>
            <div class="text-sm el-text-primary">
              {{ comicDetail.copyright || '未设置' }}
            </div>
          </div>

          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-danger">免责声明</div>
            <div class="text-sm el-text-primary">
              {{ comicDetail.disclaimer || '未设置' }}
            </div>
          </div>
        </div>
      </el-card>

      <!-- 时间信息 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-regular" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">时间信息</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-primary">发布日期</div>
            <div class="el-text-primary">
              {{ comicDetail.publishAt || '未设置' }}
            </div>
          </div>

          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-success">创建时间</div>
            <div class="el-text-primary">
              {{ comicDetail.createdAt }}
            </div>
          </div>

          <div class="p-4 border rounded el-border-light">
            <div class="text-sm font-medium mb-2 el-text-info">更新时间</div>
            <div class="el-text-primary">
              {{ comicDetail.updatedAt }}
            </div>
          </div>

          <div
            v-if="comicDetail.deletedAt"
            class="p-4 border rounded el-border-light"
          >
            <div class="text-sm font-medium mb-2 el-text-danger">删除时间</div>
            <div class="el-text-primary">
              {{ comicDetail.deletedAt }}
            </div>
          </div>
        </div>
      </el-card>

      <!-- 作品描述与备注 -->
      <el-card v-loading="loading">
        <template #header>
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 rounded el-bg-primary" />
            <h3 class="text-lg font-semibold m-0 el-text-primary">
              作品描述与备注
            </h3>
          </div>
        </template>

        <div class="space-y-6">
          <div>
            <h4 class="text-base font-medium mb-3 el-text-primary">作品描述</h4>
            <div
              class="p-4 border rounded text-sm leading-relaxed el-border-light el-text-regular"
            >
              {{ comicDetail.description || '暂无描述' }}
            </div>
          </div>

          <div v-if="comicDetail.remark">
            <h4 class="text-base font-medium mb-3 el-text-primary">
              管理员备注
            </h4>
            <div
              class="p-4 border rounded text-sm leading-relaxed el-border-warning el-bg-warning-light el-text-primary"
            >
              {{ comicDetail.remark }}
            </div>
          </div>
        </div>
      </el-card>
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
  /* Element Plus 颜色类 */
  .el-text-primary {
    color: var(--el-color-primary);
  }

  .el-text-warning {
    color: var(--el-color-warning);
  }

  .el-text-success {
    color: var(--el-color-success);
  }

  .el-text-info {
    color: var(--el-color-info);
  }

  .el-text-danger {
    color: var(--el-color-danger);
  }

  .el-text-regular {
    color: var(--el-text-color-regular);
  }

  /* Element Plus 背景色类 */
  .el-bg-primary {
    background-color: var(--el-color-primary);
  }

  .el-bg-warning {
    background-color: var(--el-color-warning);
  }

  .el-bg-success {
    background-color: var(--el-color-success);
  }

  .el-bg-regular {
    background-color: var(--el-text-color-regular);
  }

  .el-bg-warning-light {
    background-color: var(--el-color-warning-light-9);
  }

  /* Element Plus 边框色类 */
  .el-border-light {
    border-color: var(--el-border-color-light);
  }

  .el-border-warning {
    border-color: var(--el-color-warning);
  }
</style>
