import { config } from '@/components/libs/config/config.default'
import type {
  ColorSchemeKey,
  RadiusSchemeKey,
  SizeSchemeKey
} from '@/components/libs/typings/components'
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

export const useSize = (val: SizeSchemeKey, unit = false) => {
  const returnValue =
    typeof val === 'number' ? val : configRef.value.sizeScheme[val]
  return unit ? useAddUnit(returnValue) : returnValue
}

//颜色
export const useColor = (val: ColorSchemeKey): string => {
  const schemeValue = configRef.value.colorScheme[val]
  return schemeValue || (val as string)
}

export const useRadius = (
  val: RadiusSchemeKey,
  unit = true
): string | number => {
  if (val === 'circle') return '50%;'
  const radius = configRef.value.radius[val] || val
  return unit ? useAddUnit(radius) : (radius as string)
}
