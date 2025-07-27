<script setup lang="ts">
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import type { ComicChapterDetailResponse } from '@/apis/types/comic-chapter'
  import type { ComicVersionDetailResponse } from '@/apis/types/comic-version'
  import {
    batchDeleteComicChapterApi,
    comicChapterDetailApi,
    comicChapterPageApi,
    createComicChapterApi,
    swapChapterNumbersApi,
    updateComicChapterApi,
  } from '@/apis/comic-chapter'
  import { PromptsEnum } from '@/enum/prompts'
  import {
    chapterColumn,
    chapterFilter,
    chapterFormOptions,
  } from '@/views/content-manage/comic/shared/chapter'

  import { toolbar } from '@/views/content-manage/comic/shared/comic'
  import Content from './Content.vue'

  type Row = ComicChapterDetailResponse

  defineOptions({
    name: 'ComicChapter',
  })

  const props = withDefaults(
    defineProps<{
      comic: ComicDetailResponse
      comicVersion: ComicVersionDetailResponse
    }>(),
    {},
  )
  const formTool = useFormTool(chapterFormOptions)

  const formModal = reactive({
    show: false,
    loading: false,
  })

  const showContentModal = ref(false)

  // 章节详情相关状态
  const detailModal = reactive({
    show: false,
    loading: false,
  })
  const chapterDetail = ref<ComicChapterDetailResponse>(
    {} as ComicChapterDetailResponse,
  )

  const currentRecord = ref<Row | null>()
  const tableRef = useTemplateRef('tableRef')
  const tableParams = reactive({
    comicId: props.comic?.id,
    versionId: props.comicVersion?.id,
  })

  const modalShow = defineModel('show', {
    type: Boolean,
    default: false,
  })

  async function submit(val: any) {
    val.comicId = props.comic?.id
    val.versionId = props.comicVersion?.id
    if (currentRecord.value?.id) {
      val.id = currentRecord.value.id
      await updateComicChapterApi(val)
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      await createComicChapterApi(val)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModal.show = false
    formModal.loading = false
  }

  async function editContent(row: Row) {
    currentRecord.value = row
    showContentModal.value = true
  }

  async function openForm(row?: Row) {
    if (row) {
      currentRecord.value = await comicChapterDetailApi({ id: row.id })
    } else {
      currentRecord.value = null
    }
    formModal.show = true
  }

  // 打开章节详情
  async function openChapterDetail({ row }: Row) {
    detailModal.loading = true
    detailModal.show = true
    try {
      chapterDetail.value = await comicChapterDetailApi({ id: row.id })
    } catch (error) {
      useMessage.error('获取章节详情失败')
      detailModal.show = false
    } finally {
      detailModal.loading = false
    }
  }

  function formChange(val: Row) {
    formTool.toggleDisplay('purchaseAmount', val.viewRule === 3)
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

  // 格式化内容数量
  const getContentCount = (contents?: string) => {
    if (!contents) return 0
    try {
      const parsed = JSON.parse(contents)
      return Array.isArray(parsed) ? parsed.length : 0
    } catch {
      return 0
    }
  }
</script>

<template>
  <EsModal v-model="modalShow" :title="`【${comic.name}】`">
    <EsTable
      ref="tableRef"
      v-model:params="tableParams"
      drag
      :toolbar="[toolbar![0]]"
      :filter="chapterFilter"
      :columns="chapterColumn"
      :request-api="comicChapterPageApi"
      :drag-api="swapChapterNumbersApi"
      @toolbar-handler="openForm()"
      @link="openChapterDetail"
    >
      <template #isPublish="{ row }">
        <EsSwitch
          :row="row"
          :request="updateComicChapterApi"
          field="isPublish"
          @success="tableRef?.refresh()"
        />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" @click="editContent(row)">
          内容
        </el-button>
        <el-divider direction="vertical" />
        <el-button link type="primary" @click="openForm(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <EsPopConfirm
          :request="batchDeleteComicChapterApi"
          ids
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <Content
      v-if="showContentModal && currentRecord?.id"
      v-model:show="showContentModal"
      :chapter-id="currentRecord.id"
    />

    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :default-value="currentRecord"
      title="章节"
      width="800"
      :options="formTool.options"
      @update:model-value="formChange"
      @submit="submit"
      @closed="currentRecord = null"
    />

    <!-- 章节详情模态框 -->
    <EsModal
      v-if="detailModal.show"
      :model-value="detailModal.show"
      :title="`【${chapterDetail?.title ?? '章节'}】详情`"
      :width="900"
      @closed="detailModal.show = false"
    >
      <div class="p-4 pt-0 space-y-6">
        <!-- 基本信息卡片 -->
        <el-card>
          <div v-loading="detailModal.loading" class="space-y-4">
            <!-- 标题区域 -->
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-3">
                <h3
                  class="font-bold text-2xl text-gray-900 dark:text-gray-100 m-0"
                >
                  {{ chapterDetail.title }}
                </h3>
                <el-tag
                  :type="chapterDetail.isPublished ? 'success' : 'info'"
                  size="small"
                >
                  {{ chapterDetail.isPublished ? '已发布' : '未发布' }}
                </el-tag>
                <el-tag
                  v-if="chapterDetail.isPreview"
                  type="warning"
                  size="small"
                >
                  试读章节
                </el-tag>
              </div>
              <div
                v-if="chapterDetail.subtitle"
                class="text-gray-600 dark:text-gray-400"
              >
                {{ chapterDetail.subtitle }}
              </div>
            </div>

            <!-- 详细信息 -->
            <el-descriptions
              :column="2"
              label-width="100px"
              border
              size="small"
            >
              <!-- 基础信息 -->
              <el-descriptions-item label="章节ID">
                <el-tag size="small" type="info" effect="plain">
                  {{ chapterDetail.id }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="章节序号">
                <el-tag size="small" type="primary" effect="plain">
                  第{{ chapterDetail.chapterNumber }}话
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="关联漫画">
                <el-link type="primary" underline="never">
                  {{ chapterDetail.relatedComic?.name }}
                  <el-tag size="small" type="info" class="ml-1">
                    ID: {{ chapterDetail.relatedComic?.id }}
                  </el-tag>
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="关联版本">
                <el-link
                  v-if="chapterDetail.relatedVersion"
                  type="primary"
                  underline="never"
                >
                  {{ chapterDetail.relatedVersion.versionName }}
                  <el-tag size="small" type="success" class="ml-1">
                    {{ comicVersion.versionName }}
                  </el-tag>
                </el-link>
                <span v-else class="text-gray-500">-</span>
              </el-descriptions-item>
              <el-descriptions-item label="阅读规则">
                <el-tag
                  :type="
                    chapterDetail.readRule === 0
                      ? 'success'
                      : chapterDetail.readRule === 1
                        ? 'info'
                        : chapterDetail.readRule === 2
                          ? 'warning'
                          : 'danger'
                  "
                  size="small"
                >
                  {{
                    getReadRuleText(
                      chapterDetail.readRule,
                      chapterDetail.purchaseAmount,
                    )
                  }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="内容数量">
                <el-tag size="small" type="primary">
                  {{ getContentCount(chapterDetail.contents) }} 页
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>

        <!-- 数据统计 -->
        <el-card v-loading="detailModal.loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              数据统计
            </h3>
          </template>

          <div class="grid grid-cols-3 gap-4">
            <!-- 阅读次数 -->
            <div
              class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
              >
                阅读次数
              </div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ chapterDetail.viewCount ?? 0 }}
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
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                {{ chapterDetail.likeCount ?? 0 }}
              </div>
            </div>

            <!-- 评论数 -->
            <div
              class="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                class="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium"
              >
                评论数
              </div>
              <div
                class="text-2xl font-bold text-purple-600 dark:text-purple-400"
              >
                {{ chapterDetail.commentCount ?? 0 }}
              </div>
            </div>
          </div>
        </el-card>

        <!-- 章节缩略图 -->
        <el-card v-if="chapterDetail.thumbnail" v-loading="detailModal.loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              章节缩略图
            </h3>
          </template>
          <div class="flex justify-center">
            <el-image
              :src="chapterDetail.thumbnail"
              fit="cover"
              class="w-48 h-64 rounded-lg shadow-md"
              :preview-src-list="[chapterDetail.thumbnail]"
            />
          </div>
        </el-card>

        <!-- 备注信息 -->
        <el-card v-if="chapterDetail.remark" v-loading="detailModal.loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              管理员备注
            </h3>
          </template>
          <div
            class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-sm leading-relaxed"
          >
            <div class="text-gray-700 dark:text-gray-300">
              {{ chapterDetail.remark }}
            </div>
          </div>
        </el-card>

        <!-- 时间信息 -->
        <el-card v-loading="detailModal.loading">
          <template #header>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0"
            >
              时间信息
            </h3>
          </template>

          <el-descriptions :column="2" label-width="100px" border size="small">
            <el-descriptions-item label="发布时间">
              <span class="text-gray-700 dark:text-gray-300">
                {{
                  chapterDetail.publishAt
                    ? new Date(chapterDetail.publishAt).toLocaleString()
                    : '未发布'
                }}
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              <span class="text-gray-700 dark:text-gray-300">
                {{ new Date(chapterDetail.createdAt).toLocaleString() }}
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="更新时间" :span="2">
              <span class="text-gray-700 dark:text-gray-300">
                {{ new Date(chapterDetail.updatedAt).toLocaleString() }}
              </span>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </EsModal>
  </EsModal>
</template>

<style scoped lang="scss"></style>
