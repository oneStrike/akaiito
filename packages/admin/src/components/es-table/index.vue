<script lang="ts" setup>
import type { EsTableProps } from '@/components/es-table/types'
import { utils } from '@/utils'

const props = withDefaults(defineProps<EsTableProps>(), {
  pageIndex: 0,
  pageSize: 25,
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
  <a-table
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="false"
    :scroll="{
      scrollToFirstRowOnChange: true,
      x: '1000px',
      y: '700px',
    }"
  >
    <template #bodyCell="slotData">
      <slot v-if="slotData.column.slotName" name="customRender" v-bind="slotData" />
      <template v-else>
        <span v-if="slotData.column.type === 'dateTime'">{{ utils.formatDate(slotData.text) }}</span>
      </template>
    </template>
  </a-table>
</template>
