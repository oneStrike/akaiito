import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'

// 定义组件类型常量提高可维护性
const COMPONENT_TYPES = {
  DATE: 'Date',
  DATETIME: 'DateTime',
  UPLOAD: 'Upload',
} as const

// 定义更精确的CustomConfig类型
type CustomConfigItem = Partial<Record<string, Partial<EsTableColumn[number]>>>
type CustomConfig = Partial<Record<string, Partial<EsTableColumn[number]>>>

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

  const columns: EsTableColumn = []

  // 直接使用原数组filter，避免深拷贝带来的性能损耗
  formOptions
    .filter((item) => item && !omitFields.includes(item.field))
    .forEach((item) => {
      if (!item) return

      const column: Partial<EsTableColumn[number]> = {
        label: item.props?.label ?? '',
        prop: item.field,
        align: 'center',
      }

      // 使用常量代替硬编码值提升可维护性
      if (
        item.component === COMPONENT_TYPES.DATE ||
        item.component === COMPONENT_TYPES.DATETIME
      ) {
        column.columnType = 'date'
      }

      if (item.component === COMPONENT_TYPES.UPLOAD) {
        column.columnType = 'image'
      }

      // 为选项创建Map以提高查找效率
      if (
        Array.isArray(item.componentProps?.options) &&
        item.componentProps.options.length > 0
      ) {
        const optionsMap = new Map(
          item.componentProps.options.map((option) => [
            option.value,
            option.label,
          ]),
        )

        column.formatter = (row, tableColumn, cellValue) => {
          return optionsMap.get(cellValue) ?? '-'
        }
      }

      // 合并自定义配置
      if (customConfig && item.field && customConfig[item.field]) {
        Object.assign(column, customConfig[item.field])
      }

      columns.push(column as EsTableColumn[number])
    })

  // 使用公共函数创建固定列
  function createFixedColumn(
    field: string,
    config: Partial<EsTableColumn[number]>,
  ) {
    if (!omitFields.includes(field)) {
      const baseConfig: Partial<EsTableColumn[number]> = {
        align: 'center',
        ...config,
      }

      if (customConfig?.[field]) {
        Object.assign(baseConfig, customConfig[field])
      }

      return baseConfig as EsTableColumn[number]
    }
    return null
  }

  // 创建创建时间列
  const createdAtColumn = createFixedColumn('createdAt', {
    label: '创建时间',
    prop: 'createdAt',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
    columnType: 'date',
  })

  if (createdAtColumn) {
    columns.push(createdAtColumn)
  }

  // 创建操作列
  const actionColumn = createFixedColumn('action', {
    label: '操作',
    prop: 'action',
    align: 'center',
    width: 150,
  })

  if (actionColumn) {
    columns.push(actionColumn)
  }

  return columns
}
