<script setup lang="ts">
import type { BasicTableColumn } from '@/typings/components/basic/basicTable'
import type { PaginationProps, DataTableSortState } from 'naive-ui'
import type { ListParamsData } from '@/typings/hook/useRequestList'

interface BasicTableProps {
  modelValue?: Record<string | symbol, any>
  requestApi: (params: any) => Promise<any>
  listParams?: ListParamsData
  columns: BasicTableColumn[]
  container?: 'card'
}

const props = withDefaults(defineProps<BasicTableProps>(), {
  container: 'card'
})

const { runApi, sort, listData, total, reset, loading, params } = useListData({
  api: props.requestApi,
  params: props.listParams
})

//排序发生变化
const updateSorter = ({ columnKey, order }: DataTableSortState) => {
  sort(columnKey as string, order)
}

//分页配置
const pagination = computed<PaginationProps>(() => ({
  page: params.value.pageIndex! + 1,
  pageSize: params.value.pageSize,
  itemCount: total.value,
  pageSizes: [15, 30, 45, 60, 75, 90],
  showQuickJumper: true,
  showSizePicker: true,
  onUpdatePage: (val) => (params.value.pageIndex = val - 1),
  onUpdatePageSize: (val) => (params.value.pageSize = val)
}))

//计算table应得高度
const paginationHeight = ref(0)
const contentHeight = ref(0)
onMounted(() => {
  // useResizeObserver(
  //   document.getElementById('table_pagination'),
  //   ([entries]) => {
  //     paginationHeight.value = entries.borderBoxSize![0].blockSize
  //   }
  // )

  const tableParent = document.getElementById('basic_table')!.parentNode
  const observer =
    props.container === 'card' ? tableParent!.parentNode : tableParent
  useResizeObserver(observer as HTMLElement, ([entries]) => {
    let tableParentPadding = 0
    if (props.container === 'card') {
      const { paddingTop, paddingBottom } = getComputedStyle(
        tableParent as Element,
        null
      )
      tableParentPadding = parseFloat(paddingTop) + parseFloat(paddingBottom)
    }
    contentHeight.value = entries.contentRect.height - tableParentPadding
  })
})
const tableHeight = computed(() => contentHeight.value - paginationHeight.value)
</script>

<template>
  <div id="basic_table">
    <n-data-table
      remote
      :columns="columns"
      :data="listData"
      :loading="loading"
      flex-height
      :style="{ height: `${tableHeight}px` }"
      :pagination="pagination"
      @updateSorter="updateSorter"
    ></n-data-table>
  </div>
</template>
