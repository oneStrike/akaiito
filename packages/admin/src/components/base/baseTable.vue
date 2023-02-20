<script setup lang="ts">
import { useListData } from '@/hooks/useListData'
import type { TableColumnData } from '@arco-design/web-vue'
interface BaseTableProps {
  modelValue?: Record<string | symbol, any>
  requestApi: (params: any) => Promise<any>
  columns: TableColumnData[]
  alignCenter?: boolean
  serialNumber?: boolean
}

const props = withDefaults(defineProps<BaseTableProps>(), {
  alignCenter: true,
  serialNumber: true
})

const { runApi, listData, total, currentPageIndex, reset, loading } =
  useListData({
    api: props.requestApi
  })
runApi()

if (props.alignCenter) {
  props.columns.forEach((item) => {
    if (props.alignCenter && !item.align) item.align = 'center'
  })
}
if (props.serialNumber) {
  props.columns.unshift({
    dataIndex: 'index',
    title: '序号',
    align: 'center',
    width: 60,
    render: ({ rowIndex }) => rowIndex + 1
  })
}

//计算table应得高度
const paginationHeight = ref(0)
const searchHeight = ref(0)
const mainHeight = ref(0)
onMounted(() => {
  useResizeObserver(
    document.getElementById('table_pagination'),
    ([entries]) => {
      paginationHeight.value = entries.borderBoxSize![0].blockSize
    }
  )
  useResizeObserver(
    document.getElementById('base_table')!.parentNode as HTMLElement,
    ([entries]) => {
      mainHeight.value = entries.contentRect.height
    }
  )
  // useResizeObserver(document.getElementById('basic_main'), (entries) => {
  // 	mainHeight.value = entries[0].contentRect.height
  // })
})
const tableHeight = computed(() => mainHeight.value - paginationHeight.value)
</script>

<template>
  <div id="base_table">
    <a-table
      :loading="loading"
      :bordered="false"
      :data="listData"
      :columns="columns"
      :pagination="false"
      :scroll="{ y: tableHeight - 40 }"
    >
      <template #columns>
        <a-table-column
          v-for="item in columns"
          :key="item.dataIndex"
          v-bind="item"
        >
          <template #cell="{ record, column, rowIndex }">
            <span v-if="item.render">{{
              item.render({ record, column, rowIndex })
            }}</span>
            <span v-else>{{ record[item.dataIndex] }}</span>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <div class="main_end pt_8" id="table_pagination">
      <a-pagination
        :total="total"
        size="small"
        show-total
        show-jumper
        show-page-size
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-table-th-title) {
  font-weight: 700;
}
:deep(.arco-scrollbar-thumb-bar) {
  width: 4px;
}
:deep(.arco-scrollbar-track-direction-vertical) {
  width: 4px;
}
:deep(.arco-typography) {
  margin-bottom: 0;
}
</style>
