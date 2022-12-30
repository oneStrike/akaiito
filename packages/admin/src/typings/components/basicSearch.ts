import type { IFormItem } from '@/typings/components/basicForm'
export interface ISearchProps {
  options: (IFormItem & { fillAll?: boolean })[]
}
