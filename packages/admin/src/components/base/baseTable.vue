<script setup lang="ts">
import type { TableProps, TableColumnProps } from 'ant-design-vue'
import type { BaseForm } from '@/typings/components/base/baseForm'
import type {
  BaseTableRibbon,
  ListParams
} from '@/typings/components/base/baseTable'
import dayjs from 'dayjs'

interface BaseTable {
  modelValue?: Record<string | symbol, any>
  filterValue?: Record<string | symbol, any>
  columns: TableColumnProps[]
  requestParams?: Record<string | symbol, any>
  requestApi: (params?: any) => Promise<any>
  requestBefore?: (params: any) => any
  showFilter?: boolean
  listParams?: ListParams
  ribbon?: BaseTableRibbon[]
  filterOptions?: BaseForm['options']
  tableOptions?: Omit<TableProps, 'columns'>
  align?: TableColumnProps['align'] //表单元是否居中
  showIndex?: boolean //是否展示序号
  sorter?: ListParams['sort'] //默认的排序方式，仅在使有排序功能时有效
}

const props = withDefaults(defineProps<BaseTable>(), {
  showFilter: true,
  showIndex: true,
  sorter: 'desc',
  modelValue: () => []
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'update:filterValue', data: any): void
  (event: 'handleRibbon', data: any): void
}>()

//默认的表格配置
const innerTableOptions: TableProps = Object.assign(
  {
    rowKey: 'id'
  },
  props.tableOptions
)

//默认的列表参数配置项
const innerListParams = Object.assign(
  {
    pageSize: 15,
    pageIndex: 0
  },
  props.listParams
)

//分页
const paginationIndex = ref(1)

//配置序号
if (props.showIndex && props.columns[0].dataIndex !== 'index') {
  props.columns.unshift({
    title: '序号',
    width: 70,
    dataIndex: 'index',
    customRender: ({ index }) => index + 1
  })
}

//处理表格align属性
if (props.align) {
  props.columns.forEach((item) => {
    item.align = props.align
  })
}

//表格数据
const tableData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

//筛选数据
const innerFilterData = ref<BaseTable['filterValue']>(props.filterValue)
const filterData = computed({
  get() {
    return props.filterValue
  },
  set(val) {
    innerFilterData.value = val
    runRequestApi()
    emits('update:filterValue', val)
  }
})

//计算table应得高度
const paginationHeight = ref(0)
const filterHeight = ref(0)
const tableHeaderHeight = ref(0)
const mainHeight = ref(0)
onMounted(() => {
  useResizeObserver(document.getElementById('table_pagination'), ([layout]) => {
    if (layout.borderBoxSize) {
      paginationHeight.value = layout.borderBoxSize[0].blockSize
    } else {
      paginationHeight.value = layout.contentRect.height
    }
  })
  useResizeObserver(document.getElementById('base_filter'), ([layout]) => {
    if (layout.borderBoxSize) {
      filterHeight.value = layout.borderBoxSize[0].blockSize
    } else {
      filterHeight.value = layout.contentRect.height
    }
  })
  useResizeObserver(
    document.querySelector('.ant-table-header') as HTMLElement,
    ([layout]) => {
      if (layout.borderBoxSize) {
        tableHeaderHeight.value = layout.borderBoxSize[0].blockSize
      } else {
        tableHeaderHeight.value = layout.contentRect.height
      }
    }
  )

  useResizeObserver(document.getElementById('main_page'), ([layout]) => {
    mainHeight.value = layout.contentRect.height
  })
})
const tableHeight = computed(
  () =>
    mainHeight.value -
    tableHeaderHeight.value -
    filterHeight.value -
    (paginationHeight.value || 24)
)

const loading = ref(false)
//内部tableData,解决外部未绑定v-model时tableData无法赋值
const innerTableData = ref<TableProps['dataSource']>([])
const tableDataTotalCount = ref<number>(0)
//请求接口
const runRequestApi = async () => {
  loading.value = true

  if (innerFilterData.value?.dateTime) {
    const [startDate, endDate] = innerFilterData.value.dateTime
    innerFilterData.value.startDate = dayjs(startDate).format(
      'YYYY-MM-DD hh:mm:ss'
    )
    innerFilterData.value.endDate = dayjs(endDate).format('YYYY-MM-DD hh:mm:ss')
  } else {
    delete innerFilterData.value?.startDate
    delete innerFilterData.value?.endDate
  }
  let requestParams = {
    ...innerListParams,
    ...props.requestParams,
    ...innerFilterData.value
  }
  if (props.requestBefore) requestParams = props.requestBefore(requestParams)
  const { total, list } = await props.requestApi(requestParams)
  innerTableData.value = tableData.value = list
  tableDataTotalCount.value = total
  loading.value = false
}

runRequestApi()

//分页变化
const paginationChange = (page: number, pageSize: number) => {
  if (innerListParams.pageSize === pageSize) {
    innerListParams.pageIndex = page - 1
  } else {
    innerListParams.pageSize = pageSize
    innerListParams.pageIndex = 0
  }
  runRequestApi()
}

//排序
const tableSorter = (sorter: any) => {
  innerListParams.sortField = sorter.field
  const sort = sorter.order
  innerListParams.sort = sort
    ? sort === 'ascend'
      ? 'asc'
      : 'desc'
    : props.sorter
}

//表格change事件
const tableChange = (pagination: any, filters: any, sorter: any) => {
  //排序
  if (sorter.field) tableSorter(sorter)
  runRequestApi()
}
</script>

<template>
  <base-loading :loading="loading">
    <div id="base_filter" class="pt_4 flex main_between">
      <div v-if="ribbon" class="ribbon flex flex_nowrap">
        <template v-for="item in ribbon" :key="item.value">
          <a-button
            type="primary"
            class="mr_12"
            v-if="item.type === 'button'"
            @click="emits('handleRibbon', item)"
            >{{ item.label }}</a-button
          >
          <a-dropdown v-if="item.type === 'menu'">
            <a-button ghost type="primary">{{ item.label }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  v-for="menu in item.options"
                  :key="menu.value"
                  @click="emits('handleRibbon', menu)"
                >
                  {{ menu.label }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </div>
      <base-filter
        :options="filterOptions"
        v-model:value="filterData"
        @filter="runRequestApi"
      />
    </div>
    <a-table
      :columns="columns"
      v-bind="innerTableOptions"
      :data-source="innerTableData"
      :pagination="false"
      :scroll="{ y: tableHeight }"
      @change="tableChange"
    >
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.slot">
          <slot
            :name="column.slot"
            :text="text"
            :record="record"
            :index="index"
            :column="column"
          ></slot>
        </template>
        <span v-else-if="column.customRender">{{
          column.customRender({ text, record, index, column })
        }}</span>
        <span v-else>{{ text }}</span>
      </template>
    </a-table>
    <div class="pt_12 flex main_end" id="table_pagination">
      <a-pagination
        v-if="tableDataTotalCount > innerListParams.pageSize"
        v-model:current="paginationIndex"
        show-quick-jumper
        :total="tableDataTotalCount"
        @change="paginationChange"
      />
    </div>
  </base-loading>
</template>
