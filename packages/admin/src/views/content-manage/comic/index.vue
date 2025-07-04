<script lang="ts" setup>
  import type { ComicDetailResponse } from '@/apis/types/comic'
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
  import {
    filter,
    formOptions,
    tableColumn,
    toolbar,
  } from '@/views/content-manage/comic/shared'

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

  const currentComic = ref<ComicDetailResponse | null>(null)
  const authorModal = reactive({
    show: false,
    authorId: null,
  })

  const tableRef = useTemplateRef('tableRef')
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

      <template #authorIds="{ row }">
        <div
          v-if="row.comicAuthors && row.comicAuthors.length > 0"
          class="flex flex-wrap gap-1 justify-center"
        >
          <el-tag
            v-for="comicAuthor in row.comicAuthors"
            :key="comicAuthor.authorId"
            size="small"
            class="ml-1 cursor-pointer"
            :type="comicAuthor.isPrimary ? 'primary' : 'info'"
            @click="openAuthorDetail(row)"
          >
            {{ comicAuthor?.name }}
          </el-tag>
        </div>
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
          @success="tableRef?.reset()"
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
                  :request="deleteComicApi"
                  :row="row"
                  @success="tableRef?.refresh()"
                />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
  </div>
</template>

<style scoped></style>
