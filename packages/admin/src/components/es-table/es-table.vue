<script setup lang="ts">
  /**
   * EsTable 通用表格组件
   *
   * 功能特性：
   * - 支持分页数据展示
   * - 支持多种列类型（文本、图片、链接、日期等）
   * - 支持拖拽排序
   * - 支持多选功能
   * - 支持工具栏和筛选器
   * - 自适应高度计算
   * - 支持自定义插槽
   *
   * @author EsTable Team
   * @version 1.0.0
   */
  import type {
    dragEndEvent,
    EsTableProps,
    PageResponse,
  } from '@/components/es-table/types'
  import Sortable from 'sortablejs'
  import defaultImage from '@/assets/images/image.svg'

  // ==================== 组件属性定义 ====================
  const props = withDefaults(defineProps<EsTableProps>(), {
    tableIndex: true, // 默认显示序号列
    defaultValue: '-', // 空值时的默认显示文本
    drag: false, // 默认不启用拖拽排序
    loading: false, // 默认不显示加载状态
  })
  // ==================== 事件定义 ====================
  const emits = defineEmits<{
    /** 链接列点击事件 */
    (event: 'link', data: any): void
    /** 表格排序变化事件 */
    (
      event: 'sortChange',
      data: {
        field: string
        order: 'asc' | 'desc' | null
      },
    ): void
    /** 工具栏操作事件 */
    (event: 'toolbarHandler', data: any): void
    /** 重置事件 */
    (event: 'reset'): void
    /** 查询事件 */
    (event: 'query', data: any): void
    /** 拖拽结束事件 */
    (event: 'dragEnd', data: dragEndEvent): void
  }>()
  // ==================== 响应式数据状态 ====================
  /** 表格数据列表 */
  const tableData = ref<any[]>([])
  /** 数据总条数 */
  const total = ref(0)
  /** 内部加载状态 */
  const internalLoading = ref(false)

  /** 外部传入的查询参数（双向绑定） */
  const params = defineModel('params', {
    type: Object,
    default: () => ({}),
  })

  /** 内部分页参数 */
  const otherParams = ref({
    pageIndex: 0, // 页码（0基索引）
    pageSize: 15, // 每页条数
  })

  /** 计算最终的loading状态（外部loading或内部loading） */
  const finalLoading = computed(() => props.loading || internalLoading.value)

  // ==================== 核心业务方法 ====================
  /**
   * 调用API获取表格数据
   * 合并内部分页参数和外部查询参数，调用API获取数据
   */
  const fetchTableData = async () => {
    try {
      internalLoading.value = true

      // 如果外部传入了分页参数，则使用外部参数
      if (typeof params.value.pageSize === 'number') {
        otherParams.value.pageSize = params.value.pageSize
      }
      if (typeof params.value.pageIndex === 'number') {
        otherParams.value.pageIndex = params.value.pageIndex
      }

      // 合并分页参数和查询参数
      const response: PageResponse = await props.requestApi({
        ...otherParams.value,
        ...params.value,
      })

      // 更新表格数据
      tableData.value = response.list || []
      total.value = response.total || 0
    } catch (error) {
      console.error('获取表格数据失败:', error)
      // 出错时清空数据
      tableData.value = []
      total.value = 0
    } finally {
      internalLoading.value = false
    }
  }

  /**
   * 页码计算属性（1基索引，用于分页组件显示）
   * get: 将内部0基索引转换为1基索引
   * set: 将1基索引转换为0基索引，并触发数据刷新
   */
  const pageIndex = computed({
    get() {
      return otherParams.value.pageIndex + 1
    },
    set(newVal: number) {
      otherParams.value.pageIndex = newVal - 1
      fetchTableData()
    },
  })

  /**
   * 刷新表格数据（保持当前分页）
   * @param subParams 可选的额外查询参数
   */
  const refresh = (subParams?: IterateObject) => {
    if (subParams) {
      // 如果传入了参数，则合并到查询参数中（会触发watch重新获取数据）
      params.value = {
        ...params.value,
        ...subParams,
      }
    } else {
      // 直接刷新数据
      fetchTableData()
    }
  }
  // ==================== 模板引用和高度计算 ====================
  /** 分页组件引用 */
  const paginationRef = useTemplateRef('paginationRef')
  /** 表格容器引用 */
  const tableBoxRef = useTemplateRef('tableBoxRef')
  /** 工具栏组件引用 */
  const toolbarRef = useTemplateRef('toolbarRef')
  /** 表格组件引用 */
  const tableRef = useTemplateRef('tableRef')

  /** 各元素高度记录 */
  const elHeight = ref({
    container: 0, // 容器总高度
    pagination: 0, // 分页组件高度
    toolbar: 0, // 工具栏高度
  })

  /** 计算表格可用高度（容器高度 - 分页高度 - 工具栏高度） */
  const tableHeight = computed(() => {
    return (
      elHeight.value.container -
      elHeight.value.pagination -
      elHeight.value.toolbar
    )
  })
  /** ResizeObserver实例数组，用于清理 */
  let observers: ResizeObserver[] = []

  /**
   * 计算表格高度
   * 监听容器、分页、工具栏的尺寸变化，动态计算表格可用高度
   */
  function computedTableHeight() {
    // 清除之前的观察者，避免内存泄漏
    observers.forEach((observer) => observer.disconnect())
    observers = []

    // 监听容器高度变化
    useResizeObserver(
      tableBoxRef.value!.parentNode as HTMLElement,
      (entries) => {
        const entry = entries[0]
        elHeight.value.container = entry.contentRect.height
      },
    )

    // 监听分页组件高度变化
    useResizeObserver(paginationRef.value, (entries) => {
      const entry = entries[0]
      const { height, y } = entry.contentRect
      elHeight.value.pagination = height + y
    })

    // 监听工具栏高度变化
    useResizeObserver(toolbarRef.value as unknown as HTMLElement, (entries) => {
      const entry = entries[0]
      const { height, y, top } = entry.contentRect
      elHeight.value.toolbar = height + y + top
    })
  }

  /**
   * 内部列配置
   * 如果启用了序号列且第一列不是序号列，则自动添加序号列
   */
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
    return props.columns
  })

  // ==================== 表格交互处理 ====================
  /** 选中的记录（双向绑定） */
  const selectedRecords = defineModel<unknown[] | null>('selected', {
    default: () => [],
  })

  /**
   * 处理表格选择变化
   * @param val 选中的行数据数组
   */
  function handlerSelectionChange(val: any) {
    selectedRecords.value = val
  }

  /**
   * 处理表格排序变化
   * @param val Element Plus表格排序事件对象
   */
  function handlerSortChange(val: any) {
    emits('sortChange', {
      field: val.prop,
      order: val.order === 'descending' ? 'desc' : 'asc',
    })
  }

  /**
   * 重置表格数据和分页
   * 回到第一页，保留每页条数设置，重置工具栏筛选条件
   */
  const reset = () => {
    // 重置分页参数，保留pageSize
    otherParams.value = {
      pageIndex: 0,
      pageSize: otherParams.value.pageSize || 15,
    }
    // 重置toolbar的筛选表单
    if (toolbarRef.value?.resetFilter) {
      toolbarRef.value.resetFilter()
    }
  }

  /**
   * 筛选查询处理
   * 重置到第一页并使用新的查询条件刷新数据
   * @param values 查询参数
   */
  function filterQuery(values: IterateObject) {
    console.log(values)
    if (values.dateTimePicker) {
      values.dateTimePicker = [
        (values.startDate = values.dateTimePicker[0]),
        (values.endDate = values.dateTimePicker[1]),
      ]
    }
    if (otherParams.value.pageIndex) {
      otherParams.value.pageIndex = 0
    }
    refresh(values)
  }

  // ==================== 拖拽排序功能 ====================
  /**
   * 初始化行拖拽功能
   * 使用SortableJS实现表格行的拖拽排序
   */
  const rowDrop = () => {
    const sortableInst = new Sortable(
      tableRef.value!.$el.querySelector('tbody'),
      {
        group: {
          name: 'table',
          pull: true,
          put: true,
        },
        animation: 150, // 拖拽动画时长
        async onEnd(e: any) {
          // 如果拖拽结束后顺序发生了变化，则触发dragEnd事件
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
  // ==================== 监听器设置 ====================
  /**
   * 监听查询参数变化，自动重新获取数据
   * 参数变化时重置到第一页
   */
  watch(
    () => params.value,
    () => {
      if (otherParams.value.pageIndex) {
        otherParams.value.pageIndex = 0
      } else {
        fetchTableData()
      }
    },
    { deep: true },
  )

  /**
   * 监听API函数变化，重新获取数据
   * 当传入的requestApi发生变化时，重新获取数据
   */
  watch(
    () => props.requestApi,
    () => {
      fetchTableData()
    },
  )

  /**
   * 监听每页条数变化，重置表格
   * 每页条数变化时重置到第一页
   */
  watch(
    () => otherParams.value.pageSize,
    () => {
      reset()
    },
  )

  // ==================== 生命周期钩子 ====================
  onMounted(() => {
    // 如果启用拖拽，初始化拖拽功能
    if (props.drag) {
      rowDrop()
    }
    // 计算表格高度
    computedTableHeight()
    // 初始化时获取数据
    fetchTableData()
  })

  onUnmounted(() => {
    // 清理ResizeObserver，防止内存泄漏
    observers.forEach((observer) => observer.disconnect())
  })

  // ==================== 组件对外暴露 ====================
  /**
   * 对外暴露的方法和属性
   * 供父组件通过ref调用
   */
  defineExpose({
    /** 重新计算表格高度 */
    computedTableHeight,
    /** 获取表格数据 */
    fetchTableData,
    /** 表格数据 */
    tableData,
    /** 数据总数 */
    total,
    /** 重置表格 */
    reset,
    /** 刷新数据 */
    refresh,
  })
</script>

<template>
  <!-- 表格容器，动态设置高度 -->
  <div ref="tableBoxRef" :style="{ height: `${tableHeight}px` }">
    <!-- 工具栏组件：包含筛选器和操作按钮 -->
    <es-toolbar
      v-if="filter || toolbar"
      ref="toolbarRef"
      :toolbar="toolbar"
      :filter="filter"
      :selected="!!selectedRecords?.length"
      @reset="filterQuery"
      @query="filterQuery"
      @handler="(val) => emits('toolbarHandler', val)"
    />

    <!-- 主表格组件 -->
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
      <!-- 多选列 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        class-name="leading-9"
      />
      <!-- 动态列渲染 -->
      <el-table-column
        v-for="item in innerColumns"
        :key="item.columnKey"
        v-bind="item"
        class-name="leading-9"
      >
        <template #default="{ row, column, $index }">
          <!-- 自定义插槽列 -->
          <template v-if="item.slotName">
            <slot
              :name="item.slotName"
              :row="row"
              :column="column"
              :index="$index"
            />
          </template>
          <!-- 图片列：支持预览功能 -->
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
          <!-- 链接列：可点击的链接按钮 -->
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
          <!-- 日期列：格式化日期显示 -->
          <template v-else-if="item.type === 'date'">
            <span>
              {{ $dayjs(row[item.prop]).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </template>
          <!-- 普通文本列：支持自定义格式化函数 -->
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

      <!-- 空数据状态 -->
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <!-- 分页组件 -->
    <div ref="paginationRef" class="flex justify-end pt-3 pr-3">
      <el-pagination
        v-model:current-page="pageIndex"
        v-model:page-size="otherParams.pageSize"
        :hide-on-single-page="total < otherParams.pageSize"
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
  // 设置表格单元格行高，提升视觉效果
  ::v-deep(.cell) {
    line-height: 32px;
  }
</style>
