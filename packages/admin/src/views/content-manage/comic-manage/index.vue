<script lang="ts" setup>
  import type { GetComicDetailTypesRes } from '@/apis/types/comic'
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
  import AuthorDetail from '@/views/content-manage/author/AuthorDetail.vue'
  import ComicChapter from '@/views/content-manage/comic-manage/Chapter.vue'
  import ComicDetail from '@/views/content-manage/comic-manage/ComicDetail.vue'
  import {
    filter,
    formOptions,
    tableColumn,
    toolbar,
  } from '@/views/content-manage/comic-manage/shared'

  defineOptions({
    name: 'ContentMgmtPage',
  })
  const formModal = reactive({
    show: false,
    loading: false,
    defaultValue: {} as any,
  })
  const detailModal = ref(false)

  const chapterModal = reactive({
    show: false,
  })

  const currentComic = ref<GetComicDetailTypesRes | null>(null)
  const authorModal = reactive({
    show: false,
    authorId: null,
  })

  const { request, requestData, params, loading, sortChange } =
    useRequest(comicPageApi)
  const formTool = useFormTool(formOptions)
  formTool.fillDict([
    { field: 'language', code: 'work_language' },
    { field: 'region', code: 'work_region' },
    { field: 'publisher', code: 'work_publisher' },
    { field: 'ageRating', code: 'work_age_rating' },
  ])
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
        viewRule: 0,
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
    request()
  }

  async function editRow(row: GetComicDetailTypesRes) {
    currentComic.value = await comicDetailApi({ id: row.id })
    formModal.defaultValue = {
      ...currentComic.value,
      authorIds:
        currentComic.value.comicAuthors?.map((item) => item.authorId) || [],
      categoryIds:
        currentComic.value.comicCategories?.map((item) => item.categoryId) ||
        [],
    }
    formModal.show = true
  }

  function formChange(val: GetComicDetailTypesRes) {
    formTool.toggleDisplay(['purchaseAmount'], val.viewRule === 3)
  }

  function openAuthorDetail(author: Record<any, any>) {
    authorModal.authorId = author.id
    authorModal.show = true
  }
</script>

<template>
  <div v-loading="loading" class="main-page">
    <EsTable
      v-model:params="params"
      :toolbar="toolbar"
      :filter="filter"
      :columns="tableColumn"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @toolbar-handler="toolbarHandler"
      @query="request"
      @sort-change="sortChange"
    >
      <template #name="{ row }">
        <el-button
          link
          type="primary"
          @click="((currentComic = row), (detailModal = true))"
        >
          {{ row.name }}
        </el-button>
      </template>
      <template #isFinished="{ row }">
        <el-text :type="row.isFinished ? 'success' : 'danger'">
          {{ row.isFinished ? '已完结' : '连载中' }}
        </el-text>
      </template>

      <template #author="{ row }">
        <div
          v-if="row.comicAuthors && row.comicAuthors.length > 0"
          class="flex flex-wrap gap-1"
        >
          <el-button
            v-for="comicAuthor in row.comicAuthors"
            :key="comicAuthor.authorId"
            link
            type="primary"
            size="small"
            @click="openAuthorDetail(comicAuthor.author)"
          >
            {{ comicAuthor.author?.name }}
            <el-tag
              v-if="comicAuthor.isPrimary"
              size="small"
              type="success"
              class="ml-1"
            >
              主
            </el-tag>
          </el-button>
        </div>
        <span v-else class="text-gray-400">暂无作者</span>
      </template>

      <template #categories="{ row }">
        <div
          v-if="row.comicCategories && row.comicCategories.length > 0"
          class="flex flex-wrap gap-1"
        >
          <el-tag
            v-for="comicCategory in row.comicCategories"
            :key="comicCategory.categoryId"
            size="small"
            :type="comicCategory.isPrimary ? 'primary' : 'info'"
          >
            {{ comicCategory.category?.name }}
          </el-tag>
        </div>
        <span v-else class="text-gray-400">暂无分类</span>
      </template>

      <template #isPublish="{ row }">
        <EsSwitch
          :row="row"
          :request="batchUpdateComicStatusApi"
          field="isPublish"
          @success="request"
        />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" @click="editRow(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-button
          link
          type="primary"
          @click="((currentComic = row), (chapterModal.show = true))"
        >
          章节
        </el-button>
        <el-divider direction="vertical" />
        <el-dropdown class="contents!">
          <el-button type="primary" link>更多</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <es-pop-confirm
                  v-model:loading="loading"
                  :request="deleteComicApi"
                  :row="row"
                  @success="request"
                />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </EsTable>

    <ComicDetail
      v-if="detailModal"
      :visible="detailModal"
      :comic-id="currentComic!.id"
      :data-dict="formTool.getDictItem()"
      @close="detailModal = false"
    />

    <ComicChapter
      v-if="chapterModal.show"
      v-model:show="chapterModal.show"
      :comic="currentComic!"
    />

    <AuthorDetail
      v-if="authorModal.show && authorModal.authorId"
      :author-id="authorModal.authorId"
      :visible="authorModal.show"
      @close="authorModal.show = false"
    />

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
  </div>
</template>

<style scoped></style>
