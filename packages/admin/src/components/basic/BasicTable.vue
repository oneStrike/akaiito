<script setup lang="ts">
import type { BasicTableColumn } from '@/typings/components/basic/basicTable'
import type {
  DataTableProps,
  PaginationProps,
  DataTableSortState,
  DataTableFilterState
} from 'naive-ui'
import type { ListParamsData } from '@/typings/hook/useRequestList'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import config from '@/config'

interface BasicTableProps {
  modelValue?: Record<string | symbol, any>
  requestApi: (params: any) => Promise<any>
  listParams?: ListParamsData
  columns: BasicTableColumn[]
  filterOptions: BasicFormOptions[]
  size?: DataTableProps['size']
  align?: BasicTableColumn['align']
  showIndex?: boolean
  container?: 'card'
}

const props = withDefaults(defineProps<BasicTableProps>(), {
  container: 'card',
  size: 'small',
  showIndex: true,
  align: 'center'
})

const innerColumns = computed(() => {
  if (props.align) {
    props.columns.forEach((item) => {
      item.align = item.align ?? props.align
    })
  }
  if (props.showIndex && props.columns[0].key !== 'index') {
    props.columns.unshift({
      key: 'index',
      title: '序号',
      align: 'center',
      width: 70,
      render: (rowData, index) => {
        return params.value.pageIndex
          ? params.value.pageIndex * params.value.pageSize! + index
          : index + 1
      }
    })
  }
  return props.columns
})

//请求列表数据
const { sort, listData, total, reset, loading, params } = useListData({
  api: props.requestApi,
  params: props.listParams
})

//排序发生变化
const updateSorter = useDebounceFn(
  ({ columnKey, order }: DataTableSortState) => {
    sort(columnKey as string, order)
  },
  config.DEBOUNCE
)

//筛选发生变化
const updateFilters = (val: DataTableFilterState | ListParamsData) => {
  Object.assign(params.value, { ...val, pageIndex: 0 })
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
const searchHeight = ref(0)
const contentHeight = ref(0)
onMounted(() => {
  useResizeObserver(document.getElementById('basic_search'), ([entries]) => {
    searchHeight.value = entries.borderBoxSize![0].blockSize
  })

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
const tableHeight = computed(
  () => contentHeight.value - searchHeight.value - paginationHeight.value
)

defineExpose({ reset })
</script>

<template>
  <div id="basic_table">
    <basic-search
      :model-value="params"
      :options="filterOptions"
      @update:model-value="updateFilters"
    >
      <template #left>
        <slot name="left"></slot>
      </template>
    </basic-search>
    <n-data-table
      remote
      flex-height
      :size="size"
      :data="listData"
      :loading="loading"
      :columns="innerColumns"
      :pagination="pagination"
      @updateSorter="updateSorter"
      @updateFilters="updateFilters"
      :style="{ height: `${tableHeight}px` }"
    ></n-data-table>
  </div>
</template>
