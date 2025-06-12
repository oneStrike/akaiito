<script setup lang="ts">
  import type {
    dragEndEvent,
    EsTableProps,
    PageResponse,
  } from '@/components/es-table/types'
  import Sortable from 'sortablejs'
  import defaultImage from '@/assets/images/image.svg'

  const props = withDefaults(defineProps<EsTableProps>(), {
    tableIndex: true,
    defaultValue: '-',
    drag: false,
    loading: false,
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
  // 内部数据状态
  const tableData = ref<any[]>([])
  const total = ref(0)
  const internalLoading = ref(false)

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
    set(newVal: number) {
      params.value.pageIndex = newVal - 1
    },
  })

  // 计算最终的loading状态
  const finalLoading = computed(() => props.loading || internalLoading.value)

  /**
   * 调用API获取表格数据
   */
  const fetchTableData = async () => {
    try {
      internalLoading.value = true
      const response: PageResponse = await props.requestApi(params.value)
      tableData.value = response.list || []
      total.value = response.total || 0
    } catch (error) {
      console.error('获取表格数据失败:', error)
      tableData.value = []
      total.value = 0
    } finally {
      internalLoading.value = false
    }
  }

  /**
   * 刷新表格数据（保持当前分页）
   */
  const refresh = () => {
    fetchTableData()
  }
  const paginationRef = useTemplateRef('paginationRef')
  const tableBoxRef = useTemplateRef('tableBoxRef')
  const toolbarRef = useTemplateRef('toolbarRef')
  const tableRef = useTemplateRef('tableRef')

  const elHeight = ref({
    container: 0,
    pagination: 0,
    toolbar: 0,
  })
  const tableHeight = computed(() => {
    return (
      elHeight.value.container -
      elHeight.value.pagination -
      elHeight.value.toolbar
    )
  })
  let observers: ResizeObserver[] = []
  function computedTableHeight() {
    // 清除之前的观察者
    observers.forEach((observer) => observer.disconnect())
    observers = []
    useResizeObserver(
      tableBoxRef.value!.parentNode as HTMLElement,
      (entries) => {
        const entry = entries[0]
        elHeight.value.container = entry.contentRect.height
      },
    )

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

  /**
   * 重置表格数据和分页
   */
  const reset = () => {
    // 重置分页参数，保留pageSize
    const currentPageSize = params.value.pageSize || 15
    params.value = {
      pageIndex: 0,
      pageSize: currentPageSize,
    }
    // 重置toolbar的筛选表单
    if (toolbarRef.value?.resetFilter) {
      toolbarRef.value.resetFilter()
    }
    // 不需要手动调用fetchTableData，因为params的watch会自动触发
  }
  function filterQuery() {
    if (!params.value.pageIndex) {
      refresh()
    } else {
      params.value.pageIndex = 0
    }
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
            const targetData = tableData.value[newIndex]
            const originData = tableData.value[oldIndex]
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

  // 监听参数变化，自动重新获取数据
  watch(
    () => params.value,
    (newParams, oldParams) => {
      // 如果不是pageIndex或pageSize的变化，则重置pageIndex
      if (
        oldParams &&
        newParams.pageIndex === oldParams.pageIndex &&
        newParams.pageSize === oldParams.pageSize
      ) {
        // 其他参数发生变化时，重置pageIndex
        const hasOtherChanges = Object.keys(newParams).some(
          (key) =>
            key !== 'pageIndex' &&
            key !== 'pageSize' &&
            newParams[key] !== oldParams[key],
        )
        if (hasOtherChanges && newParams.pageIndex !== 0) {
          // 使用nextTick避免重复触发watch
          nextTick(() => {
            params.value.pageIndex = 0
          })
          return
        }
      }
      fetchTableData()
    },
    { deep: true },
  )

  // 监听requestApi变化，重新获取数据
  watch(
    () => props.requestApi,
    () => {
      fetchTableData()
    },
  )

  onMounted(() => {
    if (props.drag) {
      rowDrop()
    }
    computedTableHeight()
    // 初始化时获取数据
    fetchTableData()
  })

  onUnmounted(() => {
    observers.forEach((observer) => observer.disconnect())
  })

  defineExpose({
    computedTableHeight,
    fetchTableData,
    tableData,
    total,
    reset,
    refresh,
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
      @query="filterQuery"
      @handler="(val) => emits('toolbarHandler', val)"
    />

    <el-table
      ref="tableRef"
      v-loading="finalLoading"
      :data="tableData"
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
