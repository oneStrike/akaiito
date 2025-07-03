<script lang="ts" setup>
  import type { AuthorDetailResponse } from '@/apis/types/author'
  import {
    authorDetailApi,
    authorPageApi,
    batchUpdateAuthorStatusApi,
    createAuthorApi,
    deleteAuthorApi,
    updateAuthorApi,
  } from '@/apis/author'
  import AuthorDetail from './AuthorDetail.vue'
  import { filter, formOptions, tableColumns, toolbar } from './shared'

  defineOptions({
    name: 'Author',
  })
  type Record = AuthorDetailResponse

  const modalFrom = reactive({
    show: false,
    loading: false,
  })
  const detailModel = ref(false)
  const currentRow = ref<IterateObject | null>(null)
  const formTool = useFormTool(formOptions)
  const tableRef = useTemplateRef('tableRef')
  formTool.fillDict([
    {
      field: 'nationality',
      code: 'nationality',
    },
  ])
  async function submitForm(val: any) {
    modalFrom.loading = true
    console.log(val.socialLinks)
    if (Array.isArray(val.socialLinks)) {
      val.socialLinks = JSON.stringify(val.socialLinks)
    }
    val.roles = useBitMask.set(val.roles)
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
    tableRef.value?.reset()
  }

  async function switchStatus(val: any) {
    await batchUpdateAuthorStatusApi(val)
    tableRef.value?.reset()
  }

  // 获取详情数据
  async function getDetail(val: Record) {
    currentRow.value = await authorDetailApi({ id: val.id })
  }

  const openFormModal = async (val?: Record) => {
    if (val) {
      await getDetail(val)
    } else {
      currentRow.value = null
    }
    modalFrom.show = true
  }
  const openDetailModal = async (val: { field: string; row: Record }) => {
    if (val.field === 'name') {
      currentRow.value = val.row
      detailModel.value = true
    }
  }
</script>

<template>
  <div class="main-page pb-6">
    <EsTable
      ref="tableRef"
      :columns="tableColumns"
      :request-api="authorPageApi"
      :filter="filter"
      :toolbar="toolbar"
      @link="openDetailModal"
      @toolbar-handler="openFormModal()"
    >
      <template #status="{ row }">
        <EsSwitch :request="switchStatus" :row="row" />
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <EsPopConfirm
          :request="deleteAuthorApi"
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <EsModalForm
      v-if="modalFrom.show"
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formTool.options"
      @submit="submitForm"
    />

    <AuthorDetail
      v-if="detailModel"
      :visible="detailModel"
      :author-id="currentRow?.id"
      @close="detailModel = false"
    />
  </div>
</template>

<style scoped></style>
