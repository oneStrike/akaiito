import type { EsFormOptions } from '@/components/es-form/types'
import { utils } from '@/utils'

/**
 * 将表单配置转换为筛选表单配置
 */
export function formOptionsToFilterOptions<T extends EsFormOptions>(
  formOptions: T[],
  selectFields: Record<Extract<T['field'], string>, number>,
): T[] {
  const filter: T[] = []

  // 深拷贝并过滤出在 selectFields 中存在的字段
  utils
    .deepCopy(formOptions)
    .filter((item): item is T => Object.hasOwn(selectFields, item.field))
    .forEach((item) => {
      // 移除校验规则
      // @ts-expect-error ignore
      item.props.rules = []

      // 初始化 componentProps 并设置 placeholder
      item.componentProps = item.componentProps ?? {}
      item.componentProps.placeholder = item.props?.label
      delete item.componentProps.defaultValue

      // 如果是 Radio 组件，替换为 Select 组件
      if (item.component === 'Radio') {
        item.component = 'Select'
      }

      // 如果是 Checkbox 组件，替换为 Select 组件
      if (item.component === 'Checkbox') {
        item.component = 'Select'
        item.componentProps.clearable = true
        item.componentProps.multiple = true
        item.componentProps.collapseTags = true
        item.componentProps.collapseTagsTooltip = true
      }

      // 更新 props，清除 label 并设置 span
      item.props = {
        ...item.props,
        label: '',
        span: selectFields[item.field as Extract<T['field'], string>] || 6,
      }

      // 添加到结果数组中
      filter.push(item)
    })

  // 根据 selectFields 的 key 顺序对 filter 数组排序
  const orderMap = new Map(
    Object.keys(selectFields).map((key, index) => [key, index]),
  )
  filter.sort((a, b) => {
    const keyA = a.field as string
    const keyB = b.field as string
    return (orderMap.get(keyA) ?? Infinity) - (orderMap.get(keyB) ?? Infinity)
  })

  return filter
}
