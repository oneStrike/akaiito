import {
  ColorScheme,
  RadiusScheme,
  SizeScheme
} from '@/components/libs/typings/config'

export type SizeSchemeKey = keyof SizeScheme | number
export type ColorSchemeKey = keyof ColorScheme | string
export type RadiusSchemeKey = keyof RadiusScheme | number
