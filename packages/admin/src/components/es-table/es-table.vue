<script setup lang="ts">
import type { dragEndEvent, EsTableProps } from '@/components/es-table/types'
import defaultImage from '@/assets/images/image.svg'
import Sortable from 'sortablejs'

const props = withDefaults(defineProps<EsTableProps>(), {
  tableIndex: true,
  defaultValue: '-',
  drag: false,
  total: 0,
})
const emits = defineEmits<{
  (event: 'link', data: any): void
  (
    event: 'sortChange',
    data: {
      field: string
      order: 'asc' | 'desc' | null
    },
  ): void
  (event: 'toolbarHandler', data: any): void
  (event: 'reset'): void
  (event: 'query', data: any): void
  (event: 'dragEnd', data: dragEndEvent): void
}>()
const params = defineModel('params', {
  type: Object,
  default: () => ({
    pageIndex: 0,
    pageSize: 15,
  }),
})
const pageIndex = computed({
  get() {
    return params.value.pageIndex + 1
  },
  set(newVal) {
    params.value.pageIndex = newVal - 1
  },
})
const paginationRef = useTemplateRef<HTMLDivElement>('paginationRef')
const tableBoxRef = useTemplateRef<HTMLDivElement>('tableBoxRef')
const toolbarRef = useTemplateRef<HTMLDivElement>('toolbarRef')
const tableRef = useTemplateRef('tableRef')

const tableHeight = ref(100)
const elHeight = ref({
  container: 0,
  pagination: 0,
  toolbar: 0,
})

function computedTableHeight() {
  useResizeObserver(tableBoxRef.value!.parentNode as HTMLElement, (entries) => {
    const entry = entries[0]
    elHeight.value.container = entry.contentRect.height
  })

  useResizeObserver(paginationRef.value, (entries) => {
    const entry = entries[0]
    const { height, y } = entry.contentRect
    elHeight.value.pagination = height + y
  })

  useResizeObserver(toolbarRef.value, (entries) => {
    const entry = entries[0]
    const { height, y, top } = entry.contentRect
    elHeight.value.toolbar = height + y + top
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
  if (props.tableIndex && props.columns[0].type !== 'index') {
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

const selectedRecords = defineModel<unknown[] | null>('selected', {
  default: () => [],
})

function handlerSelectionChange(val: any) {
  selectedRecords.value = val
}

function handlerSortChange(val: any) {
  emits('sortChange', {
    field: val.prop,
    order: val.order === 'descending' ? 'desc' : 'asc',
  })
}

const rowDrop = () => {
  const sortableInst = new Sortable(
    tableRef.value!.$el.querySelector('tbody'),
    {
      group: {
        name: 'table',
        pull: true,
        put: true,
      },
      animation: 150,
      async onEnd(e: any) {
        // 如果拖拽结束后顺序发生了变化，则对数据进行修改
        const { oldIndex, newIndex } = e
        if (oldIndex !== newIndex) {
          const targetData = props.data[newIndex]
          const originData = props.data[oldIndex]
          const dragParams = {
            originId: originData.id,
            originOrder: originData.order,
            targetId: targetData.id,
            targetOrder: targetData.order,
          }
          emits('dragEnd', dragParams)
        }
      },
    },
  )
}

onMounted(() => {
  if (props.drag) {
    rowDrop()
  }
  computedTableHeight()
})
defineExpose({
  computedTableHeight,
})
</script>

<template>
  <div ref="tableBoxRef" :style="{ height: `${tableHeight}px` }">
    <es-toolbar
      v-if="filter || toolbar"
      ref="toolbarRef"
      v-model="params"
      :toolbar="toolbar"
      :filter="filter"
      :selected="!!selectedRecords?.length"
      @reset="emits('reset')"
      @query="(val) => emits('query', val)"
      @handler="(val) => emits('toolbarHandler', val)"
    />

    <el-table
      ref="tableRef"
      :data="data"
      :height="tableHeight"
      :max-height="tableHeight"
      row-key="id"
      @selection-change="handlerSelectionChange"
      @sort-change="handlerSortChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        class-name="leading-9"
      />
      <el-table-column
        v-for="item in innerColumns"
        :key="item.columnKey"
        v-bind="item"
        class-name="leading-9"
      >
        <template #default="{ row, column, $index }">
          <template v-if="item.slotName">
            <slot
              :name="item.slotName"
              :row="row"
              :column="column"
              :index="$index"
            />
          </template>
          <template v-else-if="item.type === 'image'">
            <el-image
              fit="contain"
              class="w-10 align-middle"
              :src="row[item.prop] || defaultImage"
              :preview-src-list="row[item.prop] ? [row[item.prop]] : []"
              :z-index="999999"
              preview-teleported
            >
              <template #error>
                <el-text type="danger">加载失败</el-text>
              </template>
            </el-image>
          </template>
          <template v-else-if="item.type === 'link'">
            <el-tooltip
              :content="row[item.prop]"
              :show-after="200"
              placement="top"
            >
              <el-button type="primary" link @click="emits('link', row)">
                {{ row[item.prop] }}
              </el-button>
            </el-tooltip>
          </template>
          <template v-else-if="item.type !== 'index'">
            {{
              item.formatter
                ? item.formatter(
                  row,
                  column,
                  item.prop ? row[item.prop] : null,
                  $index,
                )
                : row[item.prop] || row[item.prop] === 0
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
    <div ref="paginationRef" class="flex justify-end pt-3 pr-3">
      <el-pagination
        v-model:current-page="pageIndex"
        v-model:page-size="params.pageSize"
        :hide-on-single-page="total < params.pageSize"
        :page-sizes="[15, 30, 45, 60, 100]"
        background
        :default-current-page="0"
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
