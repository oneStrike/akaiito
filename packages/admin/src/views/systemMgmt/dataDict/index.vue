<script setup lang="ts">
  import type { PageTypesRes } from '@/apis/types/dictionary'
  import {
    createApi,
    deleteApi,
    pageApi,
    updateApi,
    updateEnableStatusApi,
  } from '@/apis/dictionary'
  import { PromptsEnum } from '@/enum/prompts'
  import RecordDetails from '@/views/systemMgmt/dataDict/record.vue'
  import {
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from '@/views/systemMgmt/dataDict/shared'

  defineOptions({
    name: 'DataDict',
  })

  type TableItem = ResolveListItem<PageTypesRes>

  const tableRef = useTemplateRef('tableRef')
  const detailModalShow = ref(false)
  const currentRow = ref<TableItem | null>(null)
  const selectionItems = ref<TableItem[] | null>(null)
  const formModal = reactive({
    show: false,
    loading: false,
  })

  async function handlerToolbar(val: string) {
    if (val === 'add') {
      formModal.show = true
      return
    }
    const ids = selectionItems.value?.map((item) => item.id)
    if (Array.isArray(ids)) {
      switch (val) {
        case 'delete':
          useConfirm('delete', () => deleteApi({ ids }), tableRef.value?.reset)
          break
        case 'enable':
          useConfirm(
            'enable',
            () => updateEnableStatusApi({ ids, isEnabled: true }),
            tableRef.value?.refresh,
          )
          break
        case 'disable':
          useConfirm(
            'disable',
            () => updateEnableStatusApi({ ids, isEnabled: false }),
            tableRef.value?.refresh,
          )
          break
      }
    }
  }

  async function addDictionary(value: any) {
    formModal.loading = true
    if (currentRow.value) {
      await updateApi({ ...value, id: currentRow.value.id })
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      await createApi(value)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModal.show = false
    formModal.loading = false
    currentRow.value = null
    tableRef.value?.reset()
  }

  function edit(val: TableItem) {
    currentRow.value = val
    formModal.show = true
  }

  function showDetail(row: TableItem) {
    detailModalShow.value = true
    currentRow.value = row
  }
</script>

<template>
  <div class="main-page">
    <es-table
      ref="tableRef"
      v-model:selected="selectionItems"
      :filter="filter()"
      :toolbar="toolbar"
      :columns="tableColumns"
      :selection="true"
      :request-api="pageApi"
      @toolbar-handler="handlerToolbar"
    >
      <template #name="{ row }">
        <el-link type="primary" @click="showDetail(row)">
          {{ row.name }}
        </el-link>
      </template>
      <template #isEnabled="{ row }">
        <es-switch
          :request="updateEnableStatusApi"
          :row="row"
          ids
          @success="tableRef?.refresh()"
        />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="edit(row)">编辑</el-button>
        <es-pop-confirm
          :request="deleteApi"
          :row="row"
          ids
          @success="tableRef?.refresh()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="formModal.show"
      :default-value="currentRow"
      :title="currentRow ? '添加' : '编辑'"
      :options="formOptions"
      :loading="formModal.loading"
      @submit="addDictionary"
      @closed="currentRow = null"
    />

    <RecordDetails
      v-model="detailModalShow"
      :record="currentRow"
      :title="currentRow?.name"
      :width="1200"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
