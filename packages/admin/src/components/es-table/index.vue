<script lang="ts" setup>
import type { EsTableProps } from '@/components/es-table/types'
import { utils } from '@/utils'

const props = withDefaults(defineProps<EsTableProps>(), {
  pageIndex: 0,
  pageSize: 15,
  defaultParams: () => ({}),
})

const totalCount = ref(0)
const tableData = defineModel({ type: Object, default: () => [] })
const apiParams = defineModel('params', {
  type: Object,
  default: () => ({}),
})

const getParams = (refresh?: boolean) => {
  if (refresh) {
    apiParams.value = {}
  }
  return {
    ...props.defaultParams,
    ...apiParams.value,
    pageIndex: refresh ? 0 : props.pageIndex,
    pageSize: props.pageSize,
  }
}

const loading = ref(true)
const getTableData = async (refresh?: boolean) => {
  try {
    const { list, total } = await props.api(getParams(refresh))
    tableData.value = list
    totalCount.value = total
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}

getTableData()

const refreshTableData = () => {
  getTableData(true)
}
</script>

<template>
  <es-loading v-model="loading">
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.type === 'dateTime'">
          {{ utils.formatDate(text) }}
        </template>
        <template v-if="column.slotName">
          <slot :name="column.slotName" :column="column" :text="text" :record="record" :index="index"></slot>
        </template>
      </template>
    </a-table>
  </es-loading>
</template>
