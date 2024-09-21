import { httpClient } from '@/utils/request'
import type {
  GetDataDictionaryTypings,
  GetDataDictionaryItemsTypings,
  CreateDataDictionaryTypings,
  CreateDataDictionaryItemsTypings,
  DeleteDataDictionaryTypings,
  DeleteDataDictionaryItemsTypings,
  UpdateDataDictionaryTypings,
  UpdateDataDictionaryItemsTypings,
  UpdateDataDictionaryStatusTypings,
  UpdateDataDictionaryItemsStatusTypings,
  UpdateDataDictionaryItemsOrderTypings
} from './dictionary.d'

export const getDataDictionaryApi = (
  params?: GetDataDictionaryTypings['Request']
): Promise<GetDataDictionaryTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionary',
    params
  })
}

export const getDataDictionaryItemsApi = (
  params?: GetDataDictionaryItemsTypings['Request']
): Promise<GetDataDictionaryItemsTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionaryItems',
    params
  })
}

export const createDataDictionaryApi = (): Promise<
  CreateDataDictionaryTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionary'
  })
}

export const createDataDictionaryItemsApi = (): Promise<
  CreateDataDictionaryItemsTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionaryItems'
  })
}

export const deleteDataDictionaryApi = (
  data: DeleteDataDictionaryTypings['Request']
): Promise<DeleteDataDictionaryTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionary',
    data
  })
}

export const deleteDataDictionaryItemsApi = (
  data: DeleteDataDictionaryItemsTypings['Request']
): Promise<DeleteDataDictionaryItemsTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionaryItems',
    data
  })
}

export const updateDataDictionaryApi = (): Promise<
  UpdateDataDictionaryTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionary'
  })
}

export const updateDataDictionaryItemsApi = (): Promise<
  UpdateDataDictionaryItemsTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItems'
  })
}

export const updateDataDictionaryStatusApi = (): Promise<
  UpdateDataDictionaryStatusTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryStatus'
  })
}

export const updateDataDictionaryItemsStatusApi = (): Promise<
  UpdateDataDictionaryItemsStatusTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsStatus'
  })
}

export const updateDataDictionaryItemsOrderApi = (
  data: UpdateDataDictionaryItemsOrderTypings['Request']
): Promise<UpdateDataDictionaryItemsOrderTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsOrder',
    data
  })
}
