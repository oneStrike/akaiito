<script setup lang="ts">
  import type { DetailByIdTypesRes } from '@/apis/types/page-config'
  import * as pageConfigApi from '@/apis/page-config.ts'
  import { PromptsEnum } from '@/enum/prompts'
  import {
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from '@/views/appMgmt/pageMgmt/shared'

  defineOptions({
    name: 'PageMgmt',
  })

  const modalFrom = reactive({
    show: false,
    loading: false,
  })

  const tableRef = useTemplateRef('tableRef')
  const currentRow = ref<DetailByIdTypesRes | null>(null)

  const openFormModal = (row?: DetailByIdTypesRes) => {
    if (row) {
      currentRow.value = row
    }
    modalFrom.show = true
  }
  const submitForm = async (value: DetailByIdTypesRes) => {
    modalFrom.loading = true
    if (currentRow.value?.id) {
      value.id = currentRow.value.id
      await pageConfigApi.updateApi(value)
    } else {
      await pageConfigApi.createApi(value)
    }
    useMessage.success(
      currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
    )
    currentRow.value = null
    modalFrom.loading = false
    modalFrom.show = false
    tableRef.value?.reset()
  }
</script>

<template>
  <div class="main-page">
    <es-table
      ref="tableRef"
      :columns="tableColumns"
      :toolbar="toolbar"
      :filter="filter"
      :request-api="pageConfigApi.pageApi"
      @toolbar-handler="openFormModal()"
    >
      <template #pageRule="{ row }">
        <el-text v-if="row.pageRule === 1" type="info">普通</el-text>
        <el-text v-if="row.pageRule === 2" type="primary">登录</el-text>
        <el-text v-if="row.pageRule === 3" type="danger">会员</el-text>
      </template>

      <template #status="{ row }">
        <el-text v-if="row.status === 0" type="info">禁用</el-text>
        <el-text v-if="row.status === 1" type="primary">正常</el-text>
        <el-text v-if="row.status === 2" type="warning">开发</el-text>
        <el-text v-if="row.status === 3" type="danger">维护</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <es-pop-confirm
          :request="pageConfigApi.detailByIdApi"
          :row="row"
          @success="tableRef?.reset()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formOptions"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
