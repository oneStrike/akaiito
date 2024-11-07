import type { EsTextProps } from '@/components/es-text/types'

export interface EsTagProps {
  cn?: boolean
  text: EsTextProps['text']
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  plain?: boolean
  round?: number
  mark?: boolean
  size?: 'mini' | 'small' | 'medium' | 'large'
  disabled?: boolean
  color?: string
  bgColor?: string
  textColor?: string
  closeable?: boolean
  closeIcon?: string
  closeIconSize?: number
  closeIconColor?: string
}
