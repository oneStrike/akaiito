import type { FormItem } from '@/typings/components/basicForm'
export interface SearchProps {
  options: (FormItem & { batchBtn?: string[] })[]
  batchBtn: { label: string; value: any }[]
}
