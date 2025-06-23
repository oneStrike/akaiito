<script lang="ts" setup>
  import type { GetAuthorPageTypesRes } from '@/apis/types/author'
  import {
    createAuthorApi,
    deleteAuthorApi,
    getAuthorDetailApi,
    getAuthorPageApi,
    updateAuthorApi,
    updateAuthorStatusApi,
  } from '@/apis/author'
  import AuthorDetail from './authorDetail.vue'
  import {
    authorRoles,
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from './shared'

  defineOptions({
    name: 'Author',
  })
  type Record = GetAuthorPageTypesRes['list'][number]

  const modalFrom = reactive({
    show: false,
    loading: false,
  })
  const detailModel = ref(false)
  const currentRow = ref<IterateObject | null>(null)
  const formTool = useFormTool(formOptions)
  formTool.fillDict([
    {
      field: 'nationality',
      code: 'nationality',
    },
  ])
  const { reset, request, loading, requestData, params, sortChange } =
    useRequest(async (params: IterateObject) => {
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
    if (Array.isArray(val.socialLinks)) {
      val.socialLinks = JSON.stringify(val.socialLinks)
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

  function identity(record: Record) {
    const identity: string[] = []
    record.roles.forEach((item) => {
      authorRoles.forEach((roles) => {
        if (roles.value === item) {
          identity.push(roles.label)
        }
      })
    })
    return identity.join('、') || '-'
  }

  // 获取详情数据
  async function getDetail(val: Record) {
    currentRow.value = await getAuthorDetailApi({ id: val.id })
  }

  const openFormModal = async (val?: Record) => {
    if (val) {
      await getDetail(val)
    } else {
      currentRow.value = null
    }
    modalFrom.show = true
  }
  const openDetailModal = async (val: Record) => {
    currentRow.value = val
    detailModel.value = true
  }
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <EsTable
      v-model:params="params"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      :filter="filter"
      :toolbar="toolbar"
      @link="openDetailModal"
      @reset="reset"
      @query="request"
      @sort-change="sortChange"
      @toolbar-handler="openFormModal()"
    >
      <template #status="{ row }">
        <EsSwitch :request="switchStatus" :row="row" />
      </template>

      <template #roles="{ row }">
        <span>{{ identity(row) }}</span>
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <EsPopConfirm
          v-model:loading="loading"
          :request="deleteAuthorApi"
          :row="row"
          @success="request()"
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
