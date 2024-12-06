<script lang="ts" setup>
import type { GetComicDetailTypesRes } from '@/apis/types/comic'
import { getAuthorPageApi } from '@/apis/author'
import { getCategoryPageApi } from '@/apis/category'
import { createComicApi, deleteComicApi, getComicDetailApi, getComicPageApi, updateComicPublishApi } from '@/apis/comic'
import { PromptsEnum } from '@/enum/prompts'
import { filter, formOptions, tableColumn, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})
const formModal = reactive({
  show: false,
  loading: false,
})
const currentRow = ref<(GetComicDetailTypesRes & { categoryIds?: number[] }) | null>(null)

const { request, requestData, params, loading, sortChange } = useRequest(getComicPageApi)

const formTool = useFormTool(formOptions)
formTool.fillDict([
  { field: 'language', code: 'language' },
  { field: 'region', code: 'region' },
  { field: 'publisher', code: 'publisher' },
])
formTool.specificItem('authorId', (item) => {
  item.componentProps!.remoteMethod = async (val: string) => {
    if (val) {
      item.componentProps!.loading = true
      const data = await getAuthorPageApi({ name: val, pageSize: '500' })
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
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateComicPublishApi(val)
  } else {
    await createComicApi(val)
  }
  formModal.show = false
  formModal.loading = false
  ElMessage.success(currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED)
  currentRow.value = null
  request()
}

async function editRow(row: GetComicDetailTypesRes) {
  currentRow.value = await getComicDetailApi({ id: row.id })
  currentRow.value.categoryIds = currentRow.value.categories.map((item) => item.id)
  console.log(currentRow.value)
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
        <es-pop-confirm v-model:loading="loading" :request="deleteComicApi" :row="row" @success="request" />
      </template>
    </es-table>
    <es-modal-form
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :default-value="currentRow"
      :options="formTool.options"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
