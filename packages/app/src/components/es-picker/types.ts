import type { BasicProps } from '@/components/libs/types/basicProps'

export interface EsPickerProps extends BasicProps {
  mode?: 'selector' | 'time' | 'date'
  options: {
    text: string | number
    value: string | number
    disabled?: boolean
  }[]
}
