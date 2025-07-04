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
  export interface Props {
    visible?: boolean
    comicId: number
    dataDict?: IterateObject
  }
  const comicDetail = ref<ComicDetailResponse>({} as ComicDetailResponse)

  const authorModal = ref(false)
  const chapterModal = ref(false)
  const loading = ref(true)

  comicDetailApi({ id: props.comicId }).then((data) => {
    comicDetail.value = data
    loading.value = false
  })

  const switchLoading = ref(false)
  async function updateRule(field: string, rule: boolean) {
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
    <div class="p-4 space-y-6 bg-gray-50 rounded-lg">
      <!-- 顶部：封面和基本信息卡片 -->
      <div class="rounded-lg bg-white shadow-sm p-6">
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
                <h3 class="font-bold text-gray-800 text-2xl">
                  {{ comicDetail.name }}
                </h3>
                <el-tag
                  :type="comicDetail.isPublished ? 'success' : 'info'"
                  size="small"
                >
                  {{ comicDetail.isPublished ? '已发布' : '未发布' }}
                </el-tag>
              </div>
              <p v-if="comicDetail.alias" class="text-sm text-gray-500 mb-2">
                别名：{{ comicDetail.alias }}
              </p>
              <div class="flex items-center gap-4 text-sm text-gray-600">
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
                  dataDict?.work_region[comicDetail.region] ||
                  comicDetail.region
                }}
              </el-descriptions-item>
              <el-descriptions-item label="语言">
                {{
                  dataDict?.work_language[comicDetail.language] ||
                  comicDetail.language
                }}
              </el-descriptions-item>
              <el-descriptions-item label="年龄分级">
                {{
                  dataDict?.work_age_rating[comicDetail.ageRating] ||
                  comicDetail.ageRating
                }}
              </el-descriptions-item>
              <el-descriptions-item label="原始来源">
                {{ comicDetail.originalSource || '-' }}
              </el-descriptions-item>
            </el-descriptions>

            <!-- 统计数据 -->
            <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div
                class="rounded-lg text-center p-4 cursor-pointer border bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-md transition-shadow"
                @click="chapterModal = true"
              >
                <div class="text-xs mb-1 text-blue-600">章节数</div>
                <div class="font-bold text-xl text-blue-700">
                  {{ comicDetail.totalChapters ?? 0 }}
                </div>
              </div>
              <div
                class="bg-gradient-to-r rounded-lg text-center p-4 border from-orange-50 to-orange-100"
              >
                <div class="text-xs mb-1 text-orange-600">总阅读</div>
                <div class="text-xl font-bold text-orange-700">
                  {{ comicDetail.totalViews ?? 0 }}
                </div>
              </div>
              <div
                class="bg-gradient-to-r rounded-lg text-center p-4 border from-green-50 to-green-100"
              >
                <div class="text-xs mb-1 text-green-600">收藏数</div>
                <div class="text-xl font-bold text-green-700">
                  {{ comicDetail.favoriteCount ?? 0 }}
                </div>
              </div>
              <div
                class="bg-gradient-to-r rounded-lg text-center p-4 border from-purple-50 to-purple-100"
              >
                <div class="text-xs mb-1 text-purple-600">评分</div>
                <div class="text-xl font-bold text-purple-700">
                  {{ formatRating(comicDetail.rating) }}
                  <span class="text-xs text-purple-500">
                    ({{ comicDetail.ratingCount }}人)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据统计与权重 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 rounded-sm h-6 bg-gradient-to-b from-blue-500 to-purple-500"
          />
          <h3 class="text-lg text-gray-700 font-semibold">数据统计与权重</h3>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 热度值 -->
          <div
            class="from-orange-50 rounded-lg p-4 border bg-gradient-to-br to-red-50 border-orange-100"
          >
            <div class="text-sm text-orange-600 mb-2 font-medium">热度值</div>
            <div class="text-2xl font-bold text-orange-700">
              {{ comicDetail.popularity ?? 0 }}
            </div>
          </div>

          <!-- 虚拟热度权重 -->
          <div
            class="bg-gradient-to-br from-blue-50 rounded-lg p-4 border to-indigo-50 border-blue-100"
          >
            <div class="text-sm text-blue-600 mb-2 font-medium">
              虚拟热度权重
            </div>
            <div class="text-2xl font-bold text-blue-700">
              {{ comicDetail.popularityWeight ?? 0 }}
            </div>
          </div>

          <!-- 推荐权重 -->
          <div
            class="bg-gradient-to-br from-purple-50 rounded-lg p-4 border to-pink-50 border-purple-100"
          >
            <div class="text-sm text-purple-600 mb-2 font-medium">推荐权重</div>
            <div class="text-2xl font-bold text-purple-700">
              {{ comicDetail.recommendWeight ?? 0 }}
            </div>
          </div>

          <!-- 互动数据 -->
          <div
            class="bg-gradient-to-br from-green-50 rounded-lg p-4 border to-emerald-50 border-green-100"
          >
            <div class="text-sm text-green-600 mb-2 font-medium">评论/点赞</div>
            <div class="text-lg font-bold text-green-700">
              {{ comicDetail.commentCount ?? 0 }} /
              {{ comicDetail.likeCount ?? 0 }}
            </div>
          </div>
        </div>
      </div>

      <!-- 权限设置 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 h-6 bg-gradient-to-b rounded-sm from-green-500 to-blue-500"
          />
          <h3 class="text-lg font-semibold text-gray-700">权限设置</h3>
        </div>

        <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <!-- 允许下载 -->
          <div
            class="flex items-center justify-between bg-gradient-to-r rounded-lg p-4 border from-gray-50 to-gray-100"
          >
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-700">允许下载</span>
              <span class="text-xs text-gray-500">
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
            class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border"
          >
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-700">允许评论</span>
              <span class="text-xs text-gray-500">
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
      </div>

      <!-- SEO信息 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 h-6 bg-gradient-to-b to-purple-500 rounded-sm from-indigo-500"
          />
          <h3 class="text-lg font-semibold text-gray-700">SEO优化信息</h3>
        </div>

        <div class="space-y-4">
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100"
          >
            <div class="text-sm font-medium text-blue-700 mb-2">SEO标题</div>
            <div class="text-gray-800">
              {{ comicDetail.seoTitle || '未设置' }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100"
          >
            <div class="text-sm font-medium text-green-700 mb-2">SEO描述</div>
            <div class="text-gray-800">
              {{ comicDetail.seoDescription || '未设置' }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100"
          >
            <div class="text-sm font-medium text-purple-700 mb-2">
              SEO关键词
            </div>
            <div class="text-gray-800">
              {{ comicDetail.seoKeywords || '未设置' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 版权与法律信息 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 h-6 bg-gradient-to-b rounded-sm from-yellow-500 to-orange-500"
          />
          <h3 class="text-lg font-semibold text-gray-700">版权与法律信息</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            class="bg-gradient-to-r rounded-lg p-4 border from-yellow-50 to-orange-50 border-yellow-100"
          >
            <div class="text-sm font-medium mb-2 text-yellow-700">版权信息</div>
            <div class="text-gray-800 text-sm">
              {{ comicDetail.copyright || '未设置' }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r to-pink-50 rounded-lg p-4 border from-red-50 border-red-100"
          >
            <div class="text-sm font-medium mb-2 text-red-700">免责声明</div>
            <div class="text-gray-800 text-sm">
              {{ comicDetail.disclaimer || '未设置' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 时间信息 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 h-6 bg-gradient-to-b rounded-sm from-gray-500 to-gray-700"
          />
          <h3 class="text-lg font-semibold text-gray-700">时间信息</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            class="bg-gradient-to-r from-blue-50 rounded-lg p-4 border border-blue-100 to-cyan-50"
          >
            <div class="text-sm font-medium text-blue-700 mb-2">发布日期</div>
            <div class="text-gray-800">
              {{ comicDetail.publishAt || '未设置' }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-green-50 rounded-lg p-4 border border-green-100 to-teal-50"
          >
            <div class="text-sm font-medium text-green-700 mb-2">创建时间</div>
            <div class="text-gray-800">
              {{ comicDetail.createdAt }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-purple-50 rounded-lg p-4 border border-purple-100 to-violet-50"
          >
            <div class="text-sm font-medium text-purple-700 mb-2">更新时间</div>
            <div class="text-gray-800">
              {{ comicDetail.updatedAt }}
            </div>
          </div>

          <div
            v-if="comicDetail.deletedAt"
            class="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-100"
          >
            <div class="text-sm font-medium text-red-700 mb-2">删除时间</div>
            <div class="text-gray-800">
              {{ comicDetail.deletedAt }}
            </div>
          </div>
        </div>
      </div>

      <!-- 作品描述与备注 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center mb-6 gap-2">
          <div
            class="w-1 h-6 bg-gradient-to-b rounded-sm from-emerald-500 to-green-500"
          />
          <h3 class="text-lg font-semibold text-gray-700">作品描述与备注</h3>
        </div>

        <div class="space-y-6">
          <div>
            <h4 class="text-base font-medium text-gray-700 mb-3">作品描述</h4>
            <div
              class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border text-gray-800 min-h-24 leading-relaxed"
            >
              {{ comicDetail.description || '暂无描述' }}
            </div>
          </div>

          <div v-if="comicDetail.remark">
            <h4 class="text-base font-medium text-gray-700 mb-3">管理员备注</h4>
            <div
              class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border text-gray-800 min-h-24 leading-relaxed border-yellow-200"
            >
              -50 rounded-lg p-4 border border-yellow-200 text-gray-800 min-h-24
              leading-relaxed" >
              {{ comicDetail.remark }}
            </div>
          </div>
        </div>
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
