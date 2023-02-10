<script lang="ts">
import type { ListParams } from '@/typings/components/basicTable'

const defaultListParams: Partial<ListParams> = {
  pageSize: 15,
  pageIndex: 1,
  sort: '',
  sortField: ''
}
</script>
<script setup lang="ts">
import { userDateField } from '@/hooks/useDateField'
import type { SearchProps } from '@/typings/components/basicSearch'
import type { IBasicTable } from '@/typings/components/basicTable'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import * as _ from 'lodash'

interface IBasicTableOp {
  modelValue?: any[]
  filters?: any
  listParams?: Partial<ListParams>
  options?: IBasicTable['options']
  columnOptions: IBasicTable['columnOptions']
  requestApi: IBasicTable['requestApi']
  searchOptions?: SearchProps['options']
  showSearch?: IBasicTable['showSearch']
  batchBtn?: SearchProps['batchBtn']
}

const props = withDefaults(defineProps<IBasicTableOp>(), {
  columnOptions: () => [],
  options: () => ({
    highlightCurrentRow: true,
    emptyText: '暂无数据'
  }),
  showSearch: true,
  listParams: () => _.cloneDeep(defaultListParams)
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'update:filters', data: any): void
  (event: 'update:listParams', data: ListParams): void
  (event: 'batch', data: any): void
  (event: 'handlerLink', data: any): void
  (event: 'handlerOpera', data: any): void
  (event: 'operaConfirm', data: any): void
  (event: 'operaCancel', data: any): void
}>()

const tableRef = ref()
const interTableData = ref({})
const tableData = computed({
  get(val) {
    return props.modelValue || {}
  },
  set(val) {
    interTableData.value = val
    emits('update:modelValue', val)
  }
})

const searchData = computed({
  get() {
    return props.filters || {}
  },
  set(val) {
    emits('update:filters', val)
  }
})

const listParams = computed({
  get() {
    return props.listParams
  },
  set(val) {
    emits('update:listParams', val as ListParams)
  }
})

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

//列选项的默认值
const defaultColumnOptions = reactive({
  showOverflowTooltip: true,
  align: 'center',
  headerAlign: 'center'
})

const finalColumnOptions = computed(() => {
  if (props.columnOptions.length) {
    return props.columnOptions.map((item) =>
      Object.assign(_.cloneDeep(defaultColumnOptions), item)
    )
  }
  return []
})
const runRequestApi = async () => {
  tableLoading.value = true
  const apiRes = await props.requestApi(
    userDateField({
      ...listParams.value,
      ...searchData.value,
      pageIndex: listParams.value.pageIndex! - 1
    })
  )
  tableData.value = Array.isArray(apiRes)
    ? { list: apiRes, total: apiRes.length }
    : apiRes
  tableLoading.value = false
}
runRequestApi()
const searchEvent = async () => {
  if (listParams.value.pageIndex === 1) {
    await runRequestApi()
    return
  }
  listParams.value.pageIndex = 1
}

const sortChange = async ({
  prop,
  order
}: {
  prop: string
  order: string | null
}) => {
  listParams.value.sortField = prop
  switch (order) {
    case 'descending':
      listParams.value.sort = 'desc'
      break
    case 'ascending':
      listParams.value.sort = 'asc'
      break
    case null:
      listParams.value.sort = ''
      break
  }
}

const resetTable = async () => {
  await searchEvent()
}

//重置搜索条件
const resetSearch = () => {
  listParams.value = _.cloneDeep(defaultListParams)
  runRequestApi()
}

//获取已经选择row
const getSelectionRowsAndIds = () => {
  const rows = tableRef.value?.getSelectionRows()
  const ids = rows.map((item: any) => item.id)
  return {
    rows,
    ids
  }
}
type emitType =
  | 'handlerLink'
  | 'handlerOpera'
  | 'operaConfirm'
  | 'operaCancel'
  | 'batch'
const handlerEmits = useDebounceFn((event: emitType, data: any) => {
  emits(event, data)
})

defineExpose({
  resetTable,
  getSelectionRowsAndIds
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
          :batch-btn="batchBtn"
          @search="searchEvent"
          @reset="resetSearch"
          @dropdown="(val) => handlerEmits('batch', val)"
        >
          <slot name="searchHeader"></slot>
        </basic-search>
      </slot>
    </div>
    <el-table
      ref="tableRef"
      v-loading="tableLoading"
      :height="tableHeight"
      :data="interTableData.list"
      v-bind="options"
      @sort-change="sortChange"
    >
      <el-table-column type="selection" width="30" />
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
        <template v-if="item.scoped || item.type" #default="scope">
          <slot
            :name="item.scoped"
            :value="scope.row[item.prop]"
            :row="scope.row"
            :scope="scope"
          >
            <el-link
              v-if="item.type === 'link'"
              type="primary"
              :underline="false"
              @click="handlerEmits('handlerLink', scope.row)"
              >{{ scope.row[item.prop] }}</el-link
            >

            <template v-if="item.type === 'action'">
              <template v-for="(opera, index) in item.operateBtn" :key="index">
                <el-popconfirm
                  v-if="opera.tipsField"
                  :width="opera.popConfirm?.width || 200"
                  :title="`确定${opera.label}${scope.row[opera.tipsField]}？`"
                  v-bind="opera.popConfirm"
                >
                  <template #reference>
                    <el-button
                      :size="opera.btn?.size || 'small'"
                      :type="opera.btn?.size || 'primary'"
                      :plain="opera.btn?.plain || true"
                      v-bind="opera.btn"
                    >
                      {{ opera.label }}
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button
                  v-else
                  :size="opera.btn?.size || 'small'"
                  :type="opera.btn?.size || 'primary'"
                  :plain="opera.btn?.plain || true"
                  v-bind="opera.btn"
                  @click="handlerEmits('handlerOpera', { opera, index })"
                  >{{ opera.label }}</el-button
                >
              </template>
            </template>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div id="basic_pagination" class="mt_12 flex main_end">
      <el-pagination
        v-if="tableData.total"
        background
        :hide-on-single-page="tableData.total < listParams.pageSize"
        layout="total, jumper, prev, pager, next"
        v-model:page-size="listParams.pageSize"
        :total="tableData.total"
        v-model:current-page="listParams.pageIndex"
      />
    </div>
  </div>
</template>

<style scoped></style>
