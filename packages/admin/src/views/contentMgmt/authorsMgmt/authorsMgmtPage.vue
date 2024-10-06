<script lang="ts" setup>
import {
  createAuthorApi,
  deleteAuthorApi,
  getAuthorPageApi,
  updateAuthorApi,
  updateAuthorStatusApi,
} from '@/apis/author'
import { useMessage } from '@/hooks/useFeedback'
import { useFormTool } from '@/hooks/useForm'
import { useRequest } from '@/hooks/useRequest'
import {
  filter,
  formOptions,
  tableColumns,
  toolbar,
} from '@/views/contentMgmt/authorsMgmt/shared'
import type { GetAuthorPageTypings } from '@/apis/author.d'

defineOptions({
  name: 'AuthorsMgmtPage',
})
type Record = GetAuthorPageTypings['Response']['list'][number]

const formModal = ref(false)
const currentRow = ref<Record | null>(null)
const formScheme = useFormTool(formOptions)
const { request, loading, requestData, params, sortChange, reset } =
  useRequest(getAuthorPageApi)

const contentModel = ['', '小说', '漫画', '图片', '视频']

const submitForm = async (val: Record) => {
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateAuthorApi(val)
  } else {
    await createAuthorApi(val)
  }
  formModal.value = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！',
  })
  currentRow.value = null
  request()
}

async function switchStatus(val: any) {
  await updateAuthorStatusApi(val)
  await reset()
}
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <es-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @reset="reset"
      @query="request"
      @handler="formModal = true"
    />
    <es-table
      v-model:page-index="params.pageIndex"
      v-model:page-size="params.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #status="{ row }">
        <es-switch :request="switchStatus" :row="row" />
      </template>

      <template #contentModel="{ row }">
        <span>{{ contentModel[row.contentModel] }}</span>
      </template>

      <template #action="{ row }">
        <el-button type="primary" link> 详情</el-button>

        <el-button
          type="primary"
          link
          @click="(currentRow = row), (formModal = true)"
        >
          编辑
        </el-button>

        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteAuthorApi"
          :row="row"
          @success="reset()"
        />
      </template>
    </es-table>
    <es-modal-form
      v-model:modal="formModal"
      :title="currentRow?.id ? '修改插件' : '新增插件'"
      :options="formScheme.formOptions"
      :default-value="currentRow || { type: 1, isFree: 1 }"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
