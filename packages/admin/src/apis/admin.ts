import { httpClient } from '@/utils/request'
import type { DictionaryupdateDataDictionaryItemsTypings } from './admin.d'

export const dictionaryupdateDataDictionaryItemsApi = (
  data: DictionaryupdateDataDictionaryItemsTypings['Request']
): Promise<DictionaryupdateDataDictionaryItemsTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/dictionaryupdateDataDictionaryItems',
    data
  })
}
