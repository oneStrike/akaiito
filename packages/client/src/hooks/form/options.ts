import type { EsFormOptions } from '@/components/es-form/types'
import type { IterateObject } from '@/types/global'
import { getEstateListApi, villageGroupApi } from '@/apis/regison'

export const options = async (
  options: EsFormOptions[],
): Promise<EsFormOptions[]> => {
  if (!Array.isArray(options)) {
    return []
  }
  const codes: string[] = []

  for (const option in options) {
    const props = options[option].props
    if (props?.dataDictCode) {
      codes.push(props.dataDictCode)
    }
    if (props?.villageGroup || props?.community) {
      const api = props?.villageGroup ? villageGroupApi : getEstateListApi
      const villageGroup = (await api()) as IterateObject[]
      props.options = villageGroup.map(item => ({
        text: item.name,
        value: item.id,
      }))
    }
  }

  if (!codes.length) {
    return options
  }
  const dataDict = await useFormTools.dataDict(codes, 'array')
  return options.map(item => {
    if (item.props?.dataDictCode) {
      item.props.options = dataDict[item.props?.dataDictCode]
    }
    return item
  })
}
