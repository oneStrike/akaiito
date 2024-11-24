import type icons from '@/components/es-icons/es-icons.json'

type EsIconName = keyof typeof icons

export interface EsIconProps {
  name: EsIconName | string
  size?: string | number
  width?: number
  height?: number
  color?: string
  colored?: boolean
  type?: 'svg' | 'uni'
}
