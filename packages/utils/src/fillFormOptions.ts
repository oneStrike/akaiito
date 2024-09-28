/**
 * 填充表单选项
 * @param options - 选项数组
 * @param field - 字段名
 * @param value - 填充值
 * @returns 填充后的选项数组
 */
export function fillFormOptions<T extends any[]>(options: T, field: string, value: any): T {
  options.forEach((item) => {
    // 如果选项的绑定路径与字段名相同
    if (item.bind.path === field) {
      // 设置选项的组件属性为填充值
      item.componentProps.options = value
    }
  })
  return options
}
