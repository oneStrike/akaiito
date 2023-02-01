import type { FormItem } from '@/typings/components/basicForm'
export interface SearchProps {
  options: (FormItem & { fillAll?: boolean })[]
}
