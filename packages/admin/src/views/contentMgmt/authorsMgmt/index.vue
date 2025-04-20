<script lang="ts" setup>
import type { GetAuthorPageTypesRes } from '@/apis/types/author'
import {
  createAuthorApi,
  deleteAuthorApi,
  getAuthorPageApi,
  updateAuthorApi,
  updateAuthorStatusApi,
} from '@/apis/author'
import { filter, formOptions, tableColumns, toolbar } from '@/views/contentMgmt/authorsMgmt/shared'

defineOptions({
  name: 'AuthorsMgmt',
})
type Record = GetAuthorPageTypesRes['list'][number] & { contentModel: string }

const modalFrom = reactive({
  show: false,
  loading: false,
})
const currentRow = ref<Record | null>(null)
const formTool = useFormTool(formOptions)
const { reset, request, loading, requestData, params, sortChange } = useRequest(getAuthorPageApi)

async function submitForm(val: any) {
  modalFrom.loading = true
  val.isWriter = val.contentModel.includes('1') ? 1 : 0
  val.isCartoonist = val.contentModel.includes('2') ? 1 : 0
  val.isIllustrator = val.contentModel.includes('3') ? 1 : 0
  val.isModel = val.contentModel.includes('4') ? 1 : 0
  if (val.website) {
    val.website = encodeURIComponent(val.website)
  }
  if (!val.avatar) {
    delete val.avatar
  }
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateAuthorApi(val)
  } else {
    await createAuthorApi(val)
  }
  modalFrom.show = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！',
  })
  currentRow.value = null
  modalFrom.loading = false
  request()
}

async function switchStatus(val: any) {
  await updateAuthorStatusApi(val)
  await request()
}

// 函数重载签名
function identityHandler(row: Record, type?: 'text'): string
function identityHandler(row: Record, type?: 'code'): number[]
// 函数实现
function identityHandler(row: Record, type: 'text' | 'code' = 'text') {
  const identity = []
  if (row.isWriter) {
    identity.push(type === 'text' ? '作家' : 1)
  }
  if (row.isCartoonist) {
    identity.push(type === 'text' ? '漫画家' : 2)
  }
  if (row.isIllustrator) {
    identity.push(type === 'text' ? '插画师' : 3)
  }
  if (row.isModel) {
    identity.push(type === 'text' ? '模特' : 4)
  }

  return type === 'text' ? identity.join('、') : identity
}

function blank(record: Record) {
  window.open(record.website, '_blank')
}

const openModal = (val?: Record) => {
  currentRow.value = null
  if (val) {
    currentRow.value = val
    currentRow.value.contentModel = identityHandler(val, 'code').join(',')
    if (val.website) {
      currentRow.value.website = decodeURIComponent(val.website) || ''
    }
  }
  modalFrom.show = true
}
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <es-table
      v-model:params="params"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      :filter="filter"
      :toolbar="toolbar"
      @reset="reset"
      @query="request"
      @sort-change="sortChange"
      @toolbar-handler="openModal()"
    >
      <template #status="{ row }">
        <es-switch :request="switchStatus" :row="row" />
      </template>

      <template #contentModel="{ row }">
        <span>{{ identityHandler(row) }}</span>
      </template>

      <template #website="{ row }">
        <el-link type="primary" @click="blank(row)">外部主页</el-link>
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openModal(row)"> 编辑</el-button>
        <es-pop-confirm v-model:loading="loading" :request="deleteAuthorApi" :row="row" @success="request()" />
      </template>
    </es-table>

    <es-modal-form
      v-if="modalFrom.show"
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formTool.options"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
