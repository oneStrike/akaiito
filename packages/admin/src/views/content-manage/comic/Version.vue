<script setup lang="ts">
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import type { ComicVersionDetailResponse } from '@/apis/types/comic-version'
  import {
    comicVersionDetailApi,
    comicVersionPageApi,
    createComicVersionApi,
    deleteComicVersionApi,
    updateComicVersionApi,
  } from '@/apis/comic-version.ts'
  import { PromptsEnum } from '@/enum/prompts.ts'
  import { toolbar } from '@/views/content-manage/comic/shared/comic.ts'
  import {
    versionColumn,
    versionForm,
  } from '@/views/content-manage/comic/shared/version.ts'
  import Chapter from './Chapter.vue'

  defineOptions({
    name: 'ComicChapter',
  })
  const props = withDefaults(
    defineProps<{
      comic: ComicDetailResponse
      dataDict: IterateObject
    }>(),
    {},
  )

  console.log(props.dataDict)

  const tableRef = useTemplateRef('table')
  const tableParams = ref({
    comicId: props.comic.id,
  })
  const chapterModal = ref(false)
  const currentRow = ref<ComicVersionDetailResponse | null>(null)
  const formTool = useFormTool(versionForm)
  formTool.fillDict([{ field: 'language', code: 'work_language' }])
  function formChange(val: ComicDetailResponse) {
    formTool.toggleDisplay(['purchaseAmount'], val.readRule === 3)
  }

  const modalShow = defineModel({
    type: Boolean,
    default: false,
  })
  const formModal = reactive({
    show: false,
    loading: false,
    defaultValue: {
      isRecommended: false,
    },
  })

  // 版本详情相关状态
  const detailModal = ref(false)
  const versionDetail = ref<ComicVersionDetailResponse>(
    {} as ComicVersionDetailResponse,
  )
  const detailLoading = ref(false)

  async function openForm(row?: ComicDetailResponse) {
    if (row) {
      currentRow.value = await comicVersionDetailApi({ id: row.id })
    }
    formModal.show = true
  }

  async function submitForm(data: any) {
    data.comicId = props.comic.id
    if (currentRow.value?.id) {
      data.id = currentRow.value.id
      await updateComicVersionApi(data)
    } else {
      await createComicVersionApi(data)
    }
    useMessage.success(PromptsEnum.CREATED)
    tableRef.value?.reset()
    formModal.show = false
    formModal.loading = false
  }

  // 打开版本详情
  async function openVersionDetail({ row }: ComicVersionDetailResponse) {
    detailLoading.value = true
    try {
      versionDetail.value = await comicVersionDetailApi({ id: row.id })
      detailModal.value = true
    } catch (error) {
      useMessage.error('获取版本详情失败')
    } finally {
      detailLoading.value = false
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
  <EsModal v-model="modalShow" :title="`【${comic.name}】`" width="1080">
    <EsTable
      ref="table"
      v-model:params="tableParams"
      :request-api="comicVersionPageApi"
      :columns="versionColumn"
      :toolbar="[toolbar![0]]"
      @toolbar-handler="openForm()"
      @link="openVersionDetail"
    >
      <template #language="{ row }">
        <span>{{ dataDict.work_language[row.language] }}</span>
      </template>

      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="((currentRow = row), (chapterModal = true))"
        >
          章节
        </el-button>
        <el-divider direction="vertical" />
        <el-button link type="primary" @click="openForm(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm
          :request="deleteComicVersionApi"
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <Chapter v-if="chapterModal" v-model:show="chapterModal" :comic="comic" />

    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :default-value="currentRow ? currentRow : formModal.defaultValue"
      :options="formTool.options"
      @update:model-value="formChange"
      @submit="submitForm"
      @closed="currentRow = null"
    />

    <!-- 版本详情模态框 -->
    <EsModal
      v-if="detailModal"
      :model-value="detailModal"
      :title="`【${versionDetail?.versionName ?? '版本'}】详情`"
      :width="800"
      @closed="detailModal = false"
    >
      <div class="p-4 pt-0 space-y-6">
        <!-- 基本信息卡片 -->
        <el-card v-loading="detailLoading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              基本信息
            </h3>
          </template>

          <div class="space-y-4">
            <!-- 版本标题区域 -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-3">
                <h3
                  class="font-bold text-xl text-gray-900 dark:text-gray-100 m-0"
                >
                  {{ versionDetail.versionName }}
                </h3>
                <el-tag
                  v-if="versionDetail.isRecommended"
                  type="danger"
                  size="small"
                >
                  推荐版本
                </el-tag>
                <el-tag
                  :type="versionDetail.isPublished ? 'success' : 'info'"
                  size="small"
                >
                  {{ versionDetail.isPublished ? '已发布' : '未发布' }}
                </el-tag>
                <el-tag
                  :type="versionDetail.isEnabled ? 'success' : 'danger'"
                  size="small"
                >
                  {{ versionDetail.isEnabled ? '已启用' : '已禁用' }}
                </el-tag>
              </div>
            </div>

            <!-- 详细信息 -->
            <el-descriptions
              :column="2"
              label-width="120px"
              border
              size="small"
            >
              <el-descriptions-item label="版本ID">
                <el-tag size="small" type="info" effect="plain">
                  {{ versionDetail.id }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="关联漫画">
                <el-tag size="small" type="primary" effect="plain">
                  {{ comic.name }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="语言">
                {{
                  dataDict.work_language?.[versionDetail.language]
                  || versionDetail.language
                }}
              </el-descriptions-item>
              <el-descriptions-item label="翻译组">
                {{ versionDetail.translatorGroup || '-' }}
              </el-descriptions-item>
              <el-descriptions-item label="阅读规则">
                <el-tag
                  :type="
                    versionDetail.readRule === 0
                      ? 'success'
                      : versionDetail.readRule === 1
                        ? 'info'
                        : versionDetail.readRule === 2
                          ? 'warning'
                          : 'danger'
                  "
                  size="small"
                >
                  {{
                    getReadRuleText(
                      versionDetail.readRule,
                      versionDetail.purchaseAmount,
                    )
                  }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="排序权重">
                {{ versionDetail.sortOrder || 0 }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>

        <!-- 数据统计 -->
        <el-card v-loading="detailLoading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              数据统计
            </h3>
          </template>

          <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                {{ versionDetail.totalViews ?? 0 }}
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
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                {{ versionDetail.favoriteCount ?? 0 }}
              </div>
            </div>

            <!-- 点赞数 -->
            <div
              class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
              >
                点赞数
              </div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ versionDetail.likeCount ?? 0 }}
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
                {{ formatRating(versionDetail.rating) }}
                <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({{ versionDetail.ratingCount }}人)
                </span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 版本描述与备注 -->
        <el-card v-loading="detailLoading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              版本描述与备注
            </h3>
          </template>

          <div class="space-y-6">
            <div>
              <h4
                class="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 m-0"
              >
                版本描述
              </h4>
              <div
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-sm leading-relaxed"
              >
                <div class="text-gray-700 dark:text-gray-300">
                  {{ versionDetail.description || '暂无描述' }}
                </div>
              </div>
            </div>

            <div v-if="versionDetail.remark">
              <h4
                class="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 m-0"
              >
                备注
              </h4>
              <div
                class="p-4 border border-orange-200 dark:border-orange-700 rounded-lg text-sm leading-relaxed bg-orange-50 dark:bg-orange-900/20"
              >
                <div class="text-gray-700 dark:text-gray-300">
                  {{ versionDetail.remark }}
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 版权与法律信息 -->
        <el-card v-loading="detailLoading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              版权与法律信息
            </h3>
          </template>

          <div class="grid grid-cols-1 gap-4">
            <div
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                版权信息
              </div>
              <div class="text-sm text-gray-700 dark:text-gray-300">
                {{ versionDetail.copyright || '未设置' }}
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
                {{ versionDetail.disclaimer || '未设置' }}
              </div>
            </div>
          </div>
        </el-card>

        <!-- 时间信息 -->
        <el-card v-loading="detailLoading">
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
                发布时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  versionDetail.publishAt
                    ? $dayjs
                        .utc(versionDetail.publishAt)
                        .format('YYYY-MM-DD HH:mm:ss')
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
                最后更新时间
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{
                  versionDetail.lastUpdated
                    ? $dayjs
                        .utc(versionDetail.lastUpdated)
                        .format('YYYY-MM-DD HH:mm:ss')
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
                  $dayjs
                    .utc(versionDetail.createdAt)
                    .format('YYYY-MM-DD HH:mm:ss')
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
                  $dayjs
                    .utc(versionDetail.updatedAt)
                    .format('YYYY-MM-DD HH:mm:ss')
                }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </EsModal>
  </EsModal>
</template>

<style scoped lang="scss"></style>
