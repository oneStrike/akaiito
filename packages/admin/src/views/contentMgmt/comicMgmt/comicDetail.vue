<script lang="ts" setup>
  import type { GetComicDetailTypesRes } from '@/apis/types/comic'
  import { getComicDetailApi, updateComicRuleApi } from '@/apis/comic'
  import { PromptsEnum } from '@/enum/prompts'
  import AuthorDetail from '@/views/contentMgmt/author/authorDetail.vue'
  import { id } from 'element-plus/es/locales.mjs'

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
  const comicDetail = ref<GetComicDetailTypesRes | IterateObject>({})

  const authorModal = ref(false)
  const loading = ref(true)

  getComicDetailApi({ id: props.comicId }).then((data) => {
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
    // @ts-expect-error ignore
    await updateComicRuleApi(params)
    switchLoading.value = false
    emits('updateRule', rule)
    useMessage.success(PromptsEnum.UPDATED)
  }
</script>

<template>
  <es-modal
    v-if="visible"
    :model-value="visible"
    :title="`【${comicDetail?.name ?? '漫画'}】详情`"
    :width="820"
    @closed="emits('close')"
  >
    <div class="p-4 space-y-6 bg-gray-50 rounded-lg">
      <!-- 顶部：封面和基本信息卡片 -->
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div v-loading="loading" class="flex flex-col md:flex-row gap-8">
          <!-- 封面 -->
          <div class="w-full md:w-48 flex-shrink-0 flex flex-col">
            <div class="group relative">
              <el-image
                :src="comicDetail.cover"
                fit="cover"
                class="w-full md:w-48 h-64 rounded-lg shadow-sm"
                :preview-src-list="[comicDetail.cover]"
              />
            </div>
            <div class="flex flex-wrap gap-1.5 justify-center mt-4">
              <el-tag
                v-for="cat in comicDetail.categories"
                :key="cat.id"
                size="small"
                effect="plain"
                class="!mr-0"
              >
                {{ cat.name }}
              </el-tag>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="flex-1 flex flex-col">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="text-xl font-bold text-gray-800">
                {{ comicDetail.name }}
              </h3>
              <span v-if="comicDetail.alias" class="text-gray-400 text-sm">
                ({{ comicDetail.alias }})
              </span>
            </div>

            <el-descriptions :column="2" label-width="100px" border>
              <el-descriptions-item label="作者：">
                <el-link
                  type="primary"
                  underline="never"
                  class="text-base font-medium"
                  @click="authorModal = true"
                >
                  {{ comicDetail.author?.name }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="区域：">
                {{ dataDict?.work_region[comicDetail.region] }}
              </el-descriptions-item>
              <el-descriptions-item label="语言：">
                {{ dataDict?.work_language[comicDetail.language] }}
              </el-descriptions-item>
              <el-descriptions-item label="年龄分级：">
                {{ dataDict?.work_age_rating[comicDetail.ageRating] }}
              </el-descriptions-item>
              <el-descriptions-item label="出版社：">
                {{
                  comicDetail.publisher
                    ? dataDict?.work_publisher[comicDetail.publisher]
                    : '-'
                }}
              </el-descriptions-item>
            </el-descriptions>

            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">章节数</div>
                <div class="text-lg font-bold text-primary-600">
                  {{ comicDetail.chapterCount ?? 0 }}
                </div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">热度</div>
                <div class="text-lg font-bold text-orange-500">
                  {{ comicDetail.popularity ?? 0 }}
                </div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-xs text-gray-500 mb-1">辅助热度</div>
                <div class="text-lg font-bold text-blue-500">
                  {{ comicDetail.virtualPopularity ?? 0 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态与权限 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-5 bg-primary-500 rounded-sm" />
          <h3 class="text-lg font-medium text-gray-700">状态与权限</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 作品状态 -->
          <div
            class="flex flex-col items-center text-center bg-gray-50 rounded-lg p-4"
          >
            <div class="text-sm text-gray-500 mb-2">作品状态</div>
            <el-tag
              :type="comicDetail.isFinished ? 'success' : 'warning'"
              size="large"
              effect="light"
              class="w-full"
            >
              {{ comicDetail.isFinished ? '已完结' : '连载中' }}
            </el-tag>
          </div>

          <!-- 发布状态 -->
          <div
            class="flex flex-col items-center text-center bg-gray-50 rounded-lg p-4"
          >
            <div class="text-sm text-gray-500 mb-2">发布状态</div>
            <el-tag
              :type="comicDetail.isPublish ? 'success' : 'info'"
              size="large"
              effect="light"
              class="w-full"
            >
              {{ comicDetail.isPublish ? '已发布' : '未发布' }}
            </el-tag>
          </div>

          <!-- 查看规则 -->
          <div
            class="flex flex-col items-center text-center bg-gray-50 rounded-lg p-4"
          >
            <div class="text-sm text-gray-500 mb-2">查看规则</div>
            <el-tag
              :type="
                comicDetail.viewRule === 0
                  ? 'success'
                  : comicDetail.viewRule === 3
                    ? 'danger'
                    : 'warning'
              "
              size="large"
              effect="light"
              class="w-full"
            >
              {{
                comicDetail.viewRule === 3
                  ? `购买（需消耗 ${comicDetail.purchaseAmount || 0} 积分）`
                  : ['公开', '登录', '会员'][comicDetail.viewRule] || '-'
              }}
            </el-tag>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mt-6">
          <!-- 允许下载 -->
          <div
            class="flex items-center justify-between bg-gray-50 rounded-lg p-4"
          >
            <span class="text-sm text-gray-500">允许下载</span>
            <el-switch
              v-model="comicDetail.canDownload"
              :active-value="true"
              :inactive-value="false"
              :loading="switchLoading"
              @change="(rule) => updateRule('canDownload', rule as boolean)"
            />
          </div>

          <!-- 允许评论 -->
          <div
            class="flex items-center justify-between bg-gray-50 rounded-lg p-4"
          >
            <span class="text-sm text-gray-500">允许评论</span>
            <el-switch
              v-model="comicDetail.canComment"
              :active-value="true"
              :loading="switchLoading"
              :inactive-value="false"
              @change="(rule) => updateRule('canComment', rule as boolean)"
            />
          </div>
        </div>
      </div>

      <!-- 时间信息 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-4">时间信息</h3>

        <div class="grid grid-cols-2 gap-6">
          <!-- 作品发布日期 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <span>作品发布日期</span>
            <div class="mt-1 font-medium text-gray-800">
              {{ comicDetail.publishAt }}
            </div>
          </div>

          <!-- 最后更新时间 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <span>最后更新时间</span>
            <div class="mt-1 font-medium text-gray-800">
              {{ comicDetail.lastUpdated || '-' }}
            </div>
          </div>

          <!-- 创建时间 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <span>创建时间</span>
            <div class="mt-1 font-medium text-gray-800">
              {{ comicDetail.createdAt }}
            </div>
          </div>

          <!-- 更新时间 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <span>更新时间</span>
            <div class="mt-1 font-medium text-gray-800">
              {{ comicDetail.updatedAt }}
            </div>
          </div>
        </div>
      </div>

      <!-- 作品描述 -->
      <div v-loading="loading" class="bg-white rounded-lg shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-4">作品描述</h3>
        <div class="bg-gray-50 rounded-lg p-4 text-gray-800 min-h-24">
          {{ comicDetail.description || '暂无描述' }}
        </div>
      </div>
    </div>

    <AuthorDetail
      v-if="authorModal"
      :visible="authorModal"
      :author-id="comicDetail.author.id"
      @close="authorModal = false"
    />
  </es-modal>
</template>
