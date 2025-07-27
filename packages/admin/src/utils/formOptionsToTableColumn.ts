import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'

// 定义组件类型常量提高可维护性
const COMPONENT_TYPES = {
  DATE: 'Date',
  DATETIME: 'DateTime',
  UPLOAD: 'Upload',
} as const

type CustomConfig = Partial<
  Record<string, Partial<EsTableColumn[number]> | boolean>
>

export function formOptionsToTableColumn(
  formOptions: EsFormOptions[],
  omitFields: string[] = [],
  customConfig?: CustomConfig,
): EsTableColumn {
  // 参数校验
  if (!Array.isArray(formOptions)) {
    throw new TypeError('formOptions must be an array')
  }

  if (!Array.isArray(omitFields)) {
    throw new TypeError('omitFields must be an array')
  }

  // 合并默认配置，避免重复Object.assign
  const config: Required<CustomConfig> = {
    action: true,
    createdAt: false,
    ...customConfig,
  }
  const columns: EsTableColumn = []
  // 使用Set提高查找效率
  const omitFieldsSet = new Set(omitFields)

  // 单次遍历，避免filter+forEach的双重遍历
  for (const item of formOptions) {
    if (!item || omitFieldsSet.has(item.field)) continue

    const column: Partial<EsTableColumn[number]> = {
      label: item.props?.label ?? '',
      prop: item.field,
      align: 'center',
    }

    // 合并自定义配置（先合并，避免被默认配置覆盖）
    const fieldConfig = config[item.field]
    if (fieldConfig) {
      Object.assign(column, fieldConfig)
      delete config[item.field]
    }

    // 使用常量代替硬编码值提升可维护性（只在没有自定义columnType时设置默认值）
    const { component } = item
    if (!column.columnType) {
      if (
        component === COMPONENT_TYPES.DATE ||
        component === COMPONENT_TYPES.DATETIME
      ) {
        column.columnType = 'date'
      } else if (component === COMPONENT_TYPES.UPLOAD) {
        column.columnType = 'image'
      }
    }

    // 为选项创建Map以提高查找效率（只在没有自定义formatter时设置默认formatter）
    if (!column.formatter) {
      const options = item.componentProps?.options
      if (Array.isArray(options) && options.length > 0) {
        const optionsMap = new Map(
          options.map((option) => [option.value, option.label]),
        )
        column.options = optionsMap
        column.formatter = (row, tableColumn, cellValue) => {
          return optionsMap.get(cellValue) ?? '-'
        }
      }
    }

    columns.push(column as EsTableColumn[number])
  }

  // 处理固定列
  if (config.createdAt) {
    const createdAtConfig =
      typeof config.createdAt === 'object' ? config.createdAt : {}
    columns.push({
      label: '创建时间',
      prop: 'createdAt',
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      sortBy: 'createdAt',
      columnType: 'date',
      width: 160,
      index: 998,
      align: 'center',
      ...createdAtConfig,
    } as EsTableColumn[number])
    delete config.createdAt
  }

  if (config.action) {
    const actionConfig = typeof config.action === 'object' ? config.action : {}
    columns.push({
      label: '操作',
      prop: 'action',
      align: 'center',
      width: 150,
      index: 999,
      ...actionConfig,
    } as EsTableColumn[number])
    delete config.action
  }

  // 处理剩余的自定义配置
  for (const [key, element] of Object.entries(config)) {
    if (element && typeof element === 'object') {
      columns.push({
        prop: key,
        ...element,
      } as EsTableColumn[number])
    }
  }
  // 优化排序逻辑：有index的列按数值排序，固定列排在最后
  return columns.sort((a, b) => {
    const aIndex = 'index' in a ? (a as any).index : undefined
    const bIndex = 'index' in b ? (b as any).index : undefined
    const aIsFixedColumn =
      (a as any).prop === 'action' || (a as any).prop === 'createdAt'
    const bIsFixedColumn =
      (b as any).prop === 'action' || (b as any).prop === 'createdAt'

    // 检查是否有有效的数字index（包括0）
    const aHasIndex = typeof aIndex === 'number'
    const bHasIndex = typeof bIndex === 'number'

    // 固定列始终排在最后
    if (aIsFixedColumn && !bIsFixedColumn) return 1
    if (!aIsFixedColumn && bIsFixedColumn) return -1
    if (aIsFixedColumn && bIsFixedColumn) {
      // 两个都是固定列，按index排序
      return (aIndex || 0) - (bIndex || 0)
    }

    // 都不是固定列的情况
    // 有index的列排在前面，按index数值排序
    if (aHasIndex && bHasIndex) {
      return aIndex - bIndex
    }

    // 有index的排在没有index的前面
    if (aHasIndex && !bHasIndex) return -1
    if (!aHasIndex && bHasIndex) return 1

    // 两个都没有index，保持原有顺序
    return 0
  })
}
