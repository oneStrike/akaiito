<script lang="ts" setup>
import type { GetComicDetailTypesRes } from '@/apis/types/comic'
import { getAuthorPageApi } from '@/apis/author'
import { getCategoryPageApi } from '@/apis/category'
import {
  createComicApi,
  deleteComicApi,
  getComicDetailApi,
  getComicPageApi,
  updateComicApi,
  updateComicPublishApi,
} from '@/apis/comic'
import { PromptsEnum } from '@/enum/prompts'
import ComicChapter from '@/views/contentMgmt/comicMgmt/chapter.vue'
import { filter, formOptions, tableColumn, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})
const formModal = reactive({
  show: false,
  loading: false,
  defaultValue: {} as any,
})

const chapterModal = reactive({
  show: false,
})

const currentComic = ref<(GetComicDetailTypesRes) | null>(null)

const { request, requestData, params, loading, sortChange } = useRequest(getComicPageApi)
const formTool = useFormTool(formOptions)
formTool.fillDict([
  { field: 'language', code: 'work_language' },
  { field: 'region', code: 'work_region' },
  { field: 'publisher', code: 'work_publisher' },
  { field: 'ageRating', code: 'work_age_rating' },
])
formTool.specificItem('authorId', (item) => {
  item.componentProps!.remoteMethod = async (val: string) => {
    if (val) {
      item.componentProps!.loading = true
      const data = await getAuthorPageApi({ name: val, pageSize: 500, status: true })
      item.componentProps!.options = data.list.map((item) => ({
        label: item.name,
        value: item.id,
      }))
      item.componentProps!.loading = false
    }
  }
})
getCategoryPageApi({ pageSize: 500 }).then(({ list }) => {
  formTool.specificItem('categoryIds', (item) => {
    item.componentProps!.options = list.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  })
})

function toolbarHandler(type: string) {
  if (type === 'add') {
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
  ElMessage.success(currentComic.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED)
  currentComic.value = null
  request()
}

async function editRow(row: GetComicDetailTypesRes) {
  currentComic.value = await getComicDetailApi({ id: row.id })
  formModal.defaultValue = {
    ...currentComic.value,
    categoryIds: currentComic.value.categories.map((item) => item.id),
  }
  formModal.show = true
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-table
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
        <el-button link type="primary">{{ row.name }}</el-button>
      </template>
      <template #isFinished="{ row }">
        <el-text :type="row.isFinished ? 'success' : 'danger'">{{ row.isFinished ? '已完结' : '连载中' }}</el-text>
      </template>
      <template #author="{ row }">
        <el-button link type="primary">{{ row.author.name }}</el-button>
      </template>
      <template #isPublish="{ row }">
        <es-switch :row="row" :request="updateComicPublishApi" field="isPublish" @success="request" />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" @click="editRow(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-dropdown class="contents!">
          <el-button type="primary" link>更多</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <es-pop-confirm v-model:loading="loading" :request="deleteComicApi" :row="row" @success="request" />
              </el-dropdown-item>
              <el-dropdown-item @click="currentComic = row, chapterModal.show = true">
                <span>章节</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </es-table>

    <ComicChapter v-if="chapterModal.show" v-model:show="chapterModal.show" :comic="currentComic!" />

    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :default-value="formModal.defaultValue"
      :options="formTool.options"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
