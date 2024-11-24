<script setup lang="ts">
import type { EsTableProps } from '@/components/es-table/types'
import { getAssetsFile } from '@/utils/getAssetsFile'

const props = withDefaults(defineProps<EsTableProps>(), {
  tableIndex: true,
  defaultValue: '-',
  total: 15,
})
const emits = defineEmits<{
  (event: 'link', data: any): void
  (event: 'update:selectionItems', data: any): void
  (
    event: 'sortChange',
    data: {
      field: string
      order: 'asc' | 'desc' | null
    },
  ): void
}>()

const params = defineModel('params', {
  type: Object,
  default: () => ({
    pageIndex: 0,
    pageSize: 15,
  }),
})

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
    <es-toolbar v-if="filter && filter.length" v-model="params" :toolbar="toolbar" :filter="filter" />

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
              fit="contain"
              class="w-10 align-middle"
              :src="row[item.prop] || getAssetsFile('images/image.svg')"
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
        v-model:current-page="params.pageIndex"
        v-model:page-size="params.pageSize"
        :hide-on-single-page="total > params.pageSize"
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
