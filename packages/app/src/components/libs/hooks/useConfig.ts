import type { Config, SizeScheme } from '@/components/libs/types/config'
import { config } from '@/components/libs/config/config.default'

const configRef = ref<Config>(config)

export function getConfig(field: keyof Config) {
  return configRef.value[field]
}

export function setConfig(conf: Partial<Config>) {
  configRef.value = Object.assign(configRef.value, conf)
}

// 获取颜色
export function getColor(color: any) {
  return configRef.value.colorScheme[color] || color
}

// 获取字体大小
export function getSize(size: keyof SizeScheme | string | number) {
  const target = Number(configRef.value.sizeScheme[size] || size)
  return addUnit(configRef.value.enlarge + target)
}

// 添加单位 px OR rpx
function addUnit(val: any) {
  if (!val) {
    return ''
  }
  if (typeof val !== 'number') {
    return val
  }
  return val + configRef.value.unit
}

export const useConfig = {
  addUnit,
  getConfig,
  getColor,
  getSize,
}
