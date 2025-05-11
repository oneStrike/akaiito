<script lang="ts" setup>
import type { GetAuthorPageTypesRes } from '@/apis/types/author'
import {
  createAuthorApi,
  deleteAuthorApi,
  getAuthorPageApi,
  updateAuthorApi,
  updateAuthorStatusApi,
} from '@/apis/author'
import { filter, formOptions, tableColumns, toolbar } from './shared'

defineOptions({
  name: 'Author',
})
type Record = GetAuthorPageTypesRes['list'][number] & { contentModel: string }

const modalFrom = reactive({
  show: false,
  loading: false,
})
const currentRow = ref<Record | null>(null)
const formTool = useFormTool(formOptions)
formTool.fillDict([
  {
    field: 'nationality',
    code: 'nationality',
  },
])
const { reset, request, loading, requestData, params, sortChange } = useRequest(async (params: IterateObject) => {
  if (Array.isArray(params.roles)) {
    params.roles = JSON.stringify(params.roles)
  }
  return await getAuthorPageApi(params)
})

async function submitForm(val: any) {
  modalFrom.loading = true
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

const roles = {
  MODEL: '模特',
  WRITER: '作家',
  ILLUSTRATOR: '画师',
  COMIC_ARTIST: '漫画家',
}

// 函数实现
function identityHandler(row: Record) {
  const identity: string[] = []
  row.roles.forEach((item) => {
    identity.push(roles[item as keyof typeof roles])
  })
  return identity.join('、') || '-'
}

function blank(record: Record) {
  window.open(record.website!, '_blank')
}

const openModal = (val?: Record) => {
  currentRow.value = null
  if (val) {
    currentRow.value = val
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

      <template #roles="{ row }">
        <span>{{ identityHandler(row) }}</span>
      </template>

      <template #website="{ row }">
        <el-link v-if="row.website" type="primary" @click="blank(row)">外部主页</el-link>
        <div v-else>-</div>
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
