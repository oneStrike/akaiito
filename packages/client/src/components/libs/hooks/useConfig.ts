import { config } from '@/components/libs/config/config.default'
import type { Config } from '@/components/libs/typings/config'

const configRef = ref<Config>(config)

export const setConfig = (conf: Partial<Config>) => {
  configRef.value = Object.assign(configRef.value, conf)
}

//添加单位 px OR rpx
export const useAddUnit = (val: any) => {
  if (!val) return ''
  return val + configRef.value.unit
}
