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
import { utils } from '@/utils/index'
import api from '@/api'

type BasicObject = Record<string | symbol, any>

interface BasicTableProps {
  modelValue?: BasicObject[]
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

const basicListParams = {
  pageIndex: 0,
  pageSize: 15,
  sort: '',
  sortField: ''
}

const props = withDefaults(defineProps<BasicTableProps>(), {
  container: 'card',
  rowKey: 'id',
  size: 'small',
  showIndex: true,
  align: 'center'
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: BasicObject): void
  (event: 'update:listParams', data: ListParamsData): void
}>()

const treeData = ref<BasicObject[]>([])
const apiParams = ref<ListParamsData>(basicListParams)

watch(
  () => props.modelValue,
  (val) => {
    val && (treeData.value = val)
  },
  { deep: true, immediate: true }
)

watch(
  treeData,
  (val) => {
    emits('update:modelValue', val!)
  },
  { deep: true }
)

watch(
  () => props.listParams,
  (val) => {
    val && (apiParams.value = { ...utils._.cloneDeep(basicListParams), ...val })
  },
  { deep: true, immediate: true }
)

watch(
  apiParams,
  (val) => {
    emits('update:listParams', val!)
  },
  { deep: true }
)

const innerColumns = computed(() => {
  const columns: BasicTableProps['columns'] = utils._.cloneDeep(props.columns)
  if (props.align) {
    columns.forEach((item) => {
      item.align = item.align ?? props.align
    })
  }
  //@ts-ignore
  if (props.showIndex && columns[0].key !== 'index') {
    const pageIndex = apiParams.value.pageIndex || 0
    const pageSize = apiParams.value.pageSize || 15
    const indexColumn: DataTableColumns[number] = {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 70,
      render: (row, index: number) => {
        return pageIndex ? pageIndex * pageSize + index : index + 1
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
const { total, loading } = useListData({
  data: treeData,
  api: props.requestApi,
  params: apiParams,
  refreshHook: resetSelect
})

//排序发生变化
const updateSorter = useDebounceFn(
  ({ columnKey, order }: DataTableSortState) => {
    apiParams.value.sortField = columnKey.toString()
    apiParams.value.sort = order ? order.toString() : 'ascend'
  },
  config.DEBOUNCE
)

//筛选发生变化
const updateFilters = (val: DataTableFilterState | ListParamsData) => {
  apiParams.value = val
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
  page: apiParams.value.pageIndex! + 1,
  pageSize: apiParams.value.pageSize,
  itemCount: total.value,
  pageSizes: [15, 30, 45, 60, 75, 90],
  showQuickJumper: true,
  showSizePicker: true,
  onUpdatePage: (val) => (apiParams.value.pageIndex = val - 1),
  onUpdatePageSize: (val) => (apiParams.value.pageSize = val)
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

//重置
const refresh = () => {
  apiParams.value = utils._.cloneDeep(basicListParams)
}

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
      :model-value="apiParams"
      :options="filterOptions"
      @update:model-value="updateFilters"
    >
      <template #left>
        <slot name="left"></slot>
      </template>
    </basic-search>
    <n-data-table
      remote
      :row-key="(row: any) => row[rowKey]"
      flex-height
      :size="size!"
      :data="treeData"
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
