import { dataDict } from '@/hooks/form/dataDict'
import { options } from '@/hooks/form/options'
import { parseIdCard } from '@/hooks/form/parseIdCard'
import { rules } from '@/hooks/form/rules'

export const useFormTools = {
  rules,
  options,
  dataDict,
  parseIdCard,
}
