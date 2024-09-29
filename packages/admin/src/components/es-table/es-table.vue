<script setup lang="ts">
import type { IterateObject } from '@auy/types'
import type { TableColumnInstance } from 'element-plus'

export type EsTableColumn = (Partial<TableColumnInstance> & {
  prop: string
  slotName?: string
  defaultValue?: string
})[]

export interface EsTableProps<T = IterateObject> {
  data: T[]
  columns: EsTableColumn
  index?: boolean
  pageSize?: number
  pageIndex?: number
  total?: number
  selection?: boolean
  selectionItems?: T[] | null
  defaultValue?: string
}

const props = withDefaults(defineProps<EsTableProps>(), {
  index: true,
  defaultValue: '-',
  pageSize: 15,
  pageIndex: 0,
  total: 15,
})
const emits = defineEmits<{
  (event: 'link', data: any): void
  (event: 'update:selectionItems', data: any): void
  (event: 'update:pageIndex', data: number): void
  (event: 'update:pageSize', data: number): void
  (
    event: 'sortChange',
    data: {
      field: string
      order: 'asc' | 'desc' | null
    },
  ): void
}>()

const currentPageIndex = computed({
  get() {
    return props.pageIndex + 1
  },
  set(val) {
    emits('update:pageIndex', val - 1)
  },
})

const currentPageSize = useVModel(props, 'pageSize', emits)

const paginationRef = ref()
const tableBoxRef = ref()

const tableHeight = ref(100)
const elHeight = ref({
  container: 0,
  pagination: 0,
  toolbar: 0,
})

onMounted(() => {
  computedTableHeight()
})

function computedTableHeight() {
  useResizeObserver(tableBoxRef.value?.parentNode, (entries) => {
    const entry = entries[0]
    elHeight.value.container = entry.contentRect.height
  })

  useResizeObserver(paginationRef.value, (entries) => {
    const entry = entries[0]
    const { height, y } = entry.contentRect
    elHeight.value.pagination = height + y
  })

  useResizeObserver(document.getElementById('toolbar'), (entries) => {
    const entry = entries[0]
    const { height, y } = entry.contentRect
    elHeight.value.toolbar = height + y
  })
}

watch(
  elHeight,
  (val) => {
    tableHeight.value = val.container - val.pagination - val.toolbar
  },
  { deep: true, immediate: true },
)

const innerColumns = computed(() => {
  if (props.index && props.columns[0].type !== 'index') {
    return [
      {
        label: '序号',
        prop: 'index',
        align: 'center',
        type: 'index',
        width: 66,
      },
      ...props.columns,
    ]
  }
  return []
})

const selectionItems = computed({
  get() {
    return props.selectionItems
  },
  set(val) {
    emits('update:selectionItems', val)
  },
})

function handlerSelectionChange(val: any) {
  selectionItems.value = val
}

function handlerSortChange(val: any) {
  emits('sortChange', {
    field: val.prop,
    order: val.order === 'descending' ? 'desc' : 'asc',
  })
}

defineExpose({
  computedTableHeight,
})
</script>

<template>
  <div ref="tableBoxRef" :style="{ height: `${tableHeight}px` }">
    <el-table
      :data="data"
      :height="tableHeight"
      :max-height="tableHeight"
      @selection-change="handlerSelectionChange"
      @sort-change="handlerSortChange"
    >
      <el-table-column v-if="selection" type="selection" width="55" class-name="leading-9" />
      <el-table-column v-for="item in innerColumns" :key="item.columnKey" v-bind="item" class-name="leading-9">
        <template #default="{ row, column, $index }">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="row" :column="column" :index="$index" />
          </template>
          <template v-else-if="item.type === 'image'">
            <el-image
              class="w-10 align-middle"
              :src="row[item.prop]"
              :preview-src-list="[row[item.prop]]"
              :z-index="999999"
              preview-teleported
            />
          </template>
          <template v-else-if="item.type === 'link'">
            <el-tooltip :content="row[item.prop]" :show-after="200" placement="top">
              <el-button type="primary" link @click="emits('link', row)">
                {{ row[item.prop] }}
              </el-button>
            </el-tooltip>
          </template>
          <template v-else-if="item.type !== 'index'">
            {{
              item.formatter
                ? item.formatter(row, column, item.prop ? row[item.prop] : null, $index)
                : item.prop
                  ? row[item.prop]
                  : item.defaultValue || defaultValue
            }}
          </template>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div ref="paginationRef" class="w-full flex justify-end pt-3 pr-3">
      <el-pagination
        v-model:current-page="currentPageIndex"
        v-model:page-size="currentPageSize"
        :hide-on-single-page="total > currentPageSize"
        :page-sizes="[15, 30, 45, 50, 100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.cell) {
  line-height: 32px;
}
</style>
