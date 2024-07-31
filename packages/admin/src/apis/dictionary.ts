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

export const createDataDictionaryApi = (
  data: CreateDataDictionaryTypings['Request']
): Promise<CreateDataDictionaryTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionary',
    data
  })
}

export const createDataDictionaryItemsApi = (
  data: CreateDataDictionaryItemsTypings['Request']
): Promise<CreateDataDictionaryItemsTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionaryItems',
    data
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

export const updateDataDictionaryApi = (
  data: UpdateDataDictionaryTypings['Request']
): Promise<UpdateDataDictionaryTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionary',
    data
  })
}

export const updateDataDictionaryItemsApi = (
  data: UpdateDataDictionaryItemsTypings['Request']
): Promise<UpdateDataDictionaryItemsTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItems',
    data
  })
}

export const updateDataDictionaryStatusApi = (
  data: UpdateDataDictionaryStatusTypings['Request']
): Promise<UpdateDataDictionaryStatusTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryStatus',
    data
  })
}

export const updateDataDictionaryItemsStatusApi = (
  data: UpdateDataDictionaryItemsStatusTypings['Request']
): Promise<UpdateDataDictionaryItemsStatusTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsStatus',
    data
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
