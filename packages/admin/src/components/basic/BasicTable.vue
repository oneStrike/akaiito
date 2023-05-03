<script setup lang="ts">
import type {
  DataTableColumns,
  DataTableFilterState,
  DataTableProps,
  DataTableSortState,
  PaginationProps,
  DataTableRowKey
} from 'naive-ui'
import type { ListParamsData } from '@/typings/hook/useRequestList'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import config from '@/config'

interface BasicTableProps {
  modelValue?: Record<string | symbol, any>[]
  requestApi: (params: any) => Promise<any>
  listParams?: ListParamsData
  columns: DataTableColumns
  rowKey?: string
  filterOptions?: BasicFormOptions[]
  size?: DataTableProps['size']
  align?: DataTableColumns[number]['align']
  showIndex?: boolean
  container?: 'card'
}

const props = withDefaults(defineProps<BasicTableProps>(), {
  container: 'card',
  rowKey: 'id',
  size: 'small',
  showIndex: true,
  align: 'center'
})

const innerColumns = computed(() => {
  const columns: BasicTableProps['columns'] = JSON.parse(
    JSON.stringify(props.columns)
  )
  if (props.align) {
    columns.forEach((item) => {
      item.align = item.align ?? props.align
    })
  }
  //@ts-ignore
  if (props.showIndex && columns[0].key !== 'index') {
    const indexColumn: DataTableColumns[number] = {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 70,
      render: (row, index: number) => {
        return params.value.pageIndex
          ? params.value.pageIndex * params.value.pageSize! + index
          : index + 1
      }
    }
    if (columns[0].type === 'selection') {
      columns.splice(1, 0, indexColumn)
    } else {
      columns.unshift(indexColumn)
    }
  }
  return columns
})

const selectKeys = ref<DataTableRowKey[]>([])
const selectRows = ref<typeof props.modelValue>([])
//重置多选
const resetSelect = () => {
  selectKeys.value = []
  selectRows.value = []
}

//请求列表数据
const { sort, listData, total, refresh, loading, params } = useListData({
  api: props.requestApi,
  params: props.listParams,
  refreshHook: resetSelect
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

//多选发生变化
const updateCheck = (
  rowKeys: DataTableRowKey[],
  rows: typeof props.modelValue
) => {
  selectKeys.value = rowKeys
  selectRows.value = rows
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

defineExpose({
  refresh,
  selectKeys,
  selectRows,
  resetSelect
})
</script>

<template>
  <div id="basic_table">
    <basic-search
      v-if="filterOptions"
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
      :row-key="(row) => row[rowKey]"
      flex-height
      :size="size"
      :data="listData"
      :loading="loading"
      :columns="innerColumns"
      :pagination="pagination"
      v-model:checked-row-keys="selectKeys"
      @updateSorter="updateSorter"
      @updateFilters="updateFilters"
      @update:checked-row-keys="updateCheck"
      :style="{ height: `${tableHeight}px` }"
    ></n-data-table>
  </div>
</template>
