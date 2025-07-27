<script lang="ts" setup>
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import type { EsFormOptions } from '@/components/es-form/types.ts'
  import { authorPageApi } from '@/apis/author'
  import { categoryPageApi } from '@/apis/category'
  import {
    batchUpdateComicStatusApi,
    comicDetailApi,
    comicPageApi,
    createComicApi,
    deleteComicApi,
    updateComicApi,
  } from '@/apis/comic'
  import { PromptsEnum } from '@/enum/prompts'
  import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
  import AuthorDetailModal from '@/views/content-manage/author/AuthorDetail.vue'
  import ComicDetail from '@/views/content-manage/comic/ComicDetail.vue'
  import {
    formOptions,
    tableColumn,
    toolbar,
  } from '@/views/content-manage/comic/shared/comic.ts'
  import Version from '@/views/content-manage/comic/Version.vue'

  defineOptions({
    name: 'ContentMgmtPage',
  })

  const formModal = reactive({
    show: false,
    loading: false,
    defaultValue: {} as any,
  })
  const detailModal = ref(false)

  const currentComic = ref<ComicDetailResponse | null>(null)
  const authorModal = reactive({
    show: false,
    authorId: null,
  })

  const versionModal: {
    show: boolean
    comic: ComicDetailResponse | null
  } = reactive({
    show: false,
    comic: null,
  })

  const filter = ref<EsFormOptions[]>([])
  const tableRef = useTemplateRef('tableRef')
  const formTool = useFormTool(formOptions)
  formTool
    .fillDict([
      { field: 'language', code: 'work_language' },
      { field: 'region', code: 'work_region' },
      { field: 'publisher', code: 'work_publisher' },
      { field: 'ageRating', code: 'work_age_rating' },
    ])
    .then(() => {
      filter.value = [
        ...formOptionsToFilterOptions(formTool.options, {
          isNew: 9,
          isHot: 9,
          isRecommended: 9,
          readRule: 9,
          language: 9,
          ageRating: 9,
          serialStatus: 9,
          name: 9,
        }),
        {
          field: 'author',
          component: 'Input',
          props: {
            span: 9,
          },
          componentProps: {
            placeholder: '作者',
          },
        },
      ]
    })
  formTool.specificItem('authorIds', (item) => {
    item.componentProps!.remoteMethod = async (val: string) => {
      if (val) {
        item.componentProps!.loading = true
        const data = await authorPageApi({
          name: val,
          pageSize: 500,
          isEnabled: true,
        })
        item.componentProps!.options = data.list.map((item) => ({
          label: item.name,
          value: item.id,
        }))
        item.componentProps!.loading = false
      }
    }
  })
  categoryPageApi({ pageSize: 500 }).then(({ list }) => {
    formTool.specificItem('categoryIds', (item) => {
      item.componentProps!.options = list.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    })
  })

  function toolbarHandler(type: string) {
    if (type === 'add') {
      formModal.defaultValue = {
        canComment: true,
        canDownload: true,
        readRule: 0,
      }
      formModal.show = true
    }
  }

  async function submitForm(val: any) {
    if (currentComic.value?.id) {
      val.id = currentComic.value.id
      await updateComicApi(val)
    } else {
      await createComicApi(val)
    }
    formModal.show = false
    formModal.loading = false
    ElMessage.success(
      currentComic.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
    )
    currentComic.value = null
    tableRef.value?.refresh()
  }

  async function editRow(row: ComicDetailResponse) {
    currentComic.value = await comicDetailApi({ id: row.id })
    formModal.defaultValue = {
      ...currentComic.value,
      authorIds: currentComic.value.comicAuthors?.map((item) => item.id) || [],
      categoryIds:
        currentComic.value.comicCategories?.map((item) => item.id) || [],
    }
    formTool.specificItem('authorIds', (item) => {
      item.componentProps!.options = currentComic.value?.comicAuthors?.map(
        (item) => ({
          label: item.name,
          value: item.id,
        }),
      )
    })
    formModal.show = true
  }

  function formChange(val: ComicDetailResponse) {
    formTool.toggleDisplay(['purchaseAmount'], val.readRule === 3)
  }

  function openAuthorDetail(author: Record<any, any>) {
    authorModal.authorId = author.id
    authorModal.show = true
  }

  function openVersion(row: ComicDetailResponse) {
    versionModal.comic = row
    versionModal.show = true
  }
</script>

<template>
  <div class="main-page">
    <EsTable
      ref="tableRef"
      :toolbar="toolbar"
      :filter="filter"
      :columns="tableColumn"
      :request-api="comicPageApi"
      @toolbar-handler="toolbarHandler"
    >
      <template #name="{ row }">
        <div class="flex items-center justify-center gap-2">
          <el-button
            link
            type="primary"
            class="font-medium text-left hover:text-blue-600 transition-colors duration-200"
            @click="((currentComic = row), (detailModal = true))"
          >
            <span class="line-clamp-2 max-w-32">{{ row.name }}</span>
          </el-button>
          <div class="flex gap-1">
            <el-tag
              v-if="row.isNew"
              size="small"
              type="danger"
              effect="dark"
              class="text-xs px-1.5 py-0.5 rounded-full"
            >
              新
            </el-tag>
            <el-tag
              v-if="row.isHot"
              size="small"
              type="warning"
              effect="dark"
              class="text-xs px-1.5 py-0.5 rounded-full"
            >
              热
            </el-tag>
            <el-tag
              v-if="row.isRecommended"
              size="small"
              type="success"
              effect="dark"
              class="text-xs px-1.5 py-0.5 rounded-full"
            >
              荐
            </el-tag>
          </div>
        </div>
      </template>

      <template #isFinished="{ row }">
        <div class="flex items-center justify-center">
          <el-tag
            :type="row.isFinished ? 'success' : 'warning'"
            :effect="row.isFinished ? 'dark' : 'plain'"
            size="small"
            class="px-3 py-1 rounded-full font-medium shadow-sm"
          >
            <i
              :class="
                row.isFinished ? 'i-tabler-check-circle' : 'i-tabler-clock'
              "
              class="mr-1 text-xs"
            />
            {{ row.isFinished ? '已完结' : '连载中' }}
          </el-tag>
        </div>
      </template>

      <template #cover="{ row }">
        <el-image
          fit="cover"
          class="w-10 h-14 rounded-sm"
          :src="row.cover"
          :preview-src-list="row.cover ? [row.cover] : []"
          :z-index="999999"
          preview-teleported
        />
      </template>

      <template #authorIds="{ row }">
        <el-tag
          v-for="comicAuthor in row.comicAuthors"
          :key="comicAuthor.authorId"
          size="small"
          class="cursor-pointer"
          @click="openAuthorDetail(comicAuthor)"
        >
          <i
            :class="comicAuthor.isPrimary ? 'i-tabler-crown' : 'i-tabler-user'"
            class="mr-1 text-xs"
          />
          {{ comicAuthor?.name }}
        </el-tag>
      </template>

      <template #categoryIds="{ row }">
        <div
          v-if="row.comicCategories && row.comicCategories.length > 0"
          class="flex flex-wrap gap-1.5 justify-center items-center"
        >
          <el-tag
            v-for="comicCategory in row.comicCategories"
            :key="comicCategory.categoryId"
            size="small"
          >
            {{ comicCategory?.name }}
          </el-tag>
        </div>
      </template>

      <template #isPublished="{ row }">
        <div class="flex justify-center">
          <div class="relative">
            <EsSwitch
              :row="row"
              :request="batchUpdateComicStatusApi"
              field="isPublished"
              class="transition-all duration-200 hover:scale-105"
              @success="tableRef?.reset()"
            />
            <div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <span
                :class="{
                  'text-green-600 font-medium': row.isPublished,
                  'text-gray-400': !row.isPublished,
                }"
                class="text-xs whitespace-nowrap"
              >
                {{ row.isPublished ? '已发布' : '未发布' }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #action="{ row }">
        <div class="flex items-center justify-center">
          <el-button link type="primary" @click="openVersion(row)">
            版本
          </el-button>
          <el-divider direction="vertical" />

          <el-button link type="primary" @click="editRow(row)">编辑</el-button>
          <el-divider direction="vertical" />
          <es-pop-confirm
            :request="deleteComicApi"
            :row="row"
            @success="tableRef?.refresh()"
          >
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </es-pop-confirm>
        </div>
      </template>
    </EsTable>

    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :default-value="formModal.defaultValue"
      :options="formTool.options"
      @update:model-value="formChange"
      @submit="submitForm"
    />

    <ComicDetail
      v-if="detailModal"
      :visible="detailModal"
      :comic-id="currentComic!.id"
      :data-dict="formTool.getDictItem()"
      @close="detailModal = false"
    />

    <AuthorDetailModal
      v-if="authorModal.show && authorModal.authorId"
      :visible="authorModal.show"
      :author-id="authorModal.authorId"
      @close="authorModal.show = false"
    />

    <Version
      v-if="versionModal.show && versionModal.comic !== null"
      v-model="versionModal.show"
      :comic="versionModal.comic"
      :data-dict="formTool.getDictItem()"
    />
  </div>
</template>
