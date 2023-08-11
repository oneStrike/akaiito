export const fillFormOptions = <T extends any[]>(
  options: T,
  field: string,
  value: any
): T => {
  options.forEach((item) => {
    if (item.bind.path === field) {
      item.componentProps.options = value
    }
  })
  return options
}
