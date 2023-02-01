<script setup lang="ts">
import { userDateField } from '@/hooks/useDateField'
import type { SearchProps } from '@/typings/components/basicSearch'
import type { IBasicTable } from '@/typings/components/basicTable'
import { useResizeObserver } from '@vueuse/core'
import * as _ from 'lodash'
interface IListParams {
  pageSize: number
  pageIndex: number
  sort: 'asc' | 'desc'
  sortField: string
}
interface IBasicTableOp {
  modelValue?: any
  filters?: any
  listParams?: Partial<IListParams>
  options?: IBasicTable['options']
  columnOptions: IBasicTable['columnOptions']
  requestApi: IBasicTable['requestApi']
  searchOptions?: SearchProps['options']
  showSearch?: IBasicTable['showSearch']
}

const props = withDefaults(defineProps<IBasicTableOp>(), {
  columnOptions: () => [],
  options: () => ({}),
  showSearch: true
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'update:filters', data: any): void
  (event: 'update:listParams', data: IListParams): void
}>()

//计算table应得高度
const paginationHeight = ref(0)
const searchHeight = ref(0)
const mainHeight = ref(0)
onMounted(() => {
  useResizeObserver(document.getElementById('basic_pagination'), (entries) => {
    paginationHeight.value = entries[0].contentRect.height
  })
  useResizeObserver(document.getElementById('basic_search'), (entries) => {
    searchHeight.value = entries[0].contentRect.height
  })
  useResizeObserver(document.getElementById('basic_main'), (entries) => {
    mainHeight.value = entries[0].contentRect.height
  })
})
const tableHeight = computed(
  () => mainHeight.value - searchHeight.value - (paginationHeight.value || 24)
)

const tableLoading = ref(false)

const formatListParams = (): IListParams => {
  if (props.listParams) {
    const { pageSize, pageIndex, sort, sortField } = props.listParams
    return {
      pageSize: pageSize || 15,
      pageIndex: pageIndex || 1,
      sort: sort || 'asc',
      sortField: sortField || ''
    }
  } else {
    return {
      pageSize: 15,
      pageIndex: 1,
      sort: 'asc',
      sortField: ''
    }
  }
}
const interiorListParams = ref<IListParams>({
  pageSize: 15,
  pageIndex: 1,
  sort: 'asc',
  sortField: ''
})

watch(
  () => props.listParams,
  (val) => {
    if (!_.isEqual(val, interiorListParams.value)) {
      interiorListParams.value = formatListParams()
    }
  },
  { immediate: true, deep: true }
)

//表格的默认值
const defaultTableOptions = reactive({
  highlightCurrentRow: true,
  emptyText: '暂无数据'
})

//列选项的默认值
const defaultColumnOptions = reactive({
  showOverflowTooltip: true,
  align: 'center',
  headerAlign: 'center'
})

const searchData = ref(props.filters || {})
const tableData = computed(() => props.modelValue || interiorTableData.value)
const finalTableOptions = computed(() =>
  Object.assign(defaultTableOptions, props.options)
)
const finalColumnOptions = computed(() => {
  if (props.columnOptions.length) {
    return props.columnOptions.map((item) =>
      Object.assign(JSON.parse(JSON.stringify(defaultColumnOptions)), item)
    )
  }
  return []
})

const interiorTableData = ref({})
const runRequestApi = async () => {
  tableLoading.value = true
  const apiRes = await props.requestApi(
    userDateField({
      ...interiorListParams.value,
      ...searchData.value,
      pageIndex: interiorListParams.value.pageIndex - 1
    })
  )
  interiorTableData.value = Array.isArray(apiRes)
    ? { list: apiRes, total: apiRes.length }
    : apiRes
  emits('update:modelValue', apiRes)
  tableLoading.value = false
}

const searchEvent = async () => {
  if (interiorListParams.value.pageIndex === 1) {
    await runRequestApi()
    return
  }
  interiorListParams.value.pageIndex = 1
}

watch(
  interiorListParams,
  () => {
    if (!tableLoading.value) {
      runRequestApi()
      emits('update:listParams', interiorListParams.value)
    }
  },
  { immediate: true, deep: true }
)
const sortChange = async ({
  prop,
  order
}: {
  prop: string
  order: string | null
}) => {
  interiorListParams.value.sortField = prop
  interiorListParams.value.sort =
    order == 'descending' ? 'desc' : order === null ? 'asc' : 'asc'
}

const resetTable = async () => {
  await searchEvent()
}

defineExpose({
  resetTable,
  tableData
})
</script>

<template>
  <div class="flex_col over_hide">
    <div class="flex main_end">
      <slot name="header">
        <basic-search
          v-if="showSearch"
          v-model="searchData"
          :options="searchOptions"
          @search="searchEvent"
        >
          <slot name="searchHeader"></slot>
        </basic-search>
      </slot>
    </div>
    <el-table
      v-loading="tableLoading"
      :height="tableHeight"
      :data="tableData.list"
      v-bind="finalTableOptions"
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        header-align="center"
        :index="1"
      />
      <el-table-column
        v-bind="item"
        v-for="item in finalColumnOptions"
        :key="item.prop"
      >
        <template v-if="item.scoped" #default="scope">
          <slot
            :name="item.scoped"
            :value="scope.row[item.prop]"
            :row="scope.row"
            :scope="scope"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <div id="basic_pagination" class="mt_12 flex main_end">
      <el-pagination
        v-if="tableData.total"
        background
        :hide-on-single-page="tableData.total < interiorListParams.pageSize"
        layout="total, jumper, prev, pager, next"
        v-model:page-size="interiorListParams.pageSize"
        :total="tableData.total"
        v-model:current-page="interiorListParams.pageIndex"
      />
    </div>
  </div>
</template>

<style scoped></style>
