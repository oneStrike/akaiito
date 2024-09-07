import { httpClient } from '@/utils/request'
import type {
  CreateDataDictionaryItemsTypings,
  CreateDataDictionaryTypings,
  DeleteDataDictionaryItemsTypings,
  DeleteDataDictionaryTypings,
  GetDataDictionaryItemsTypings,
  GetDataDictionaryTypings,
  UpdateDataDictionaryItemsOrderTypings,
  UpdateDataDictionaryItemsStatusTypings,
  UpdateDataDictionaryItemsTypings,
  UpdateDataDictionaryStatusTypings,
  UpdateDataDictionaryTypings,
} from './dictionary.d'

export function getDataDictionaryApi(
  params?: GetDataDictionaryTypings['Request'],
): Promise<GetDataDictionaryTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionary',
    params,
  })
}

export function getDataDictionaryItemsApi(
  params?: GetDataDictionaryItemsTypings['Request'],
): Promise<GetDataDictionaryItemsTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionaryItems',
    params,
  })
}

export function createDataDictionaryApi(
  data: CreateDataDictionaryTypings['Request'],
): Promise<CreateDataDictionaryTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionary',
    data,
  })
}

export function createDataDictionaryItemsApi(
  data: CreateDataDictionaryItemsTypings['Request'],
): Promise<CreateDataDictionaryItemsTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionaryItems',
    data,
  })
}

export function deleteDataDictionaryApi(
  data: DeleteDataDictionaryTypings['Request'],
): Promise<DeleteDataDictionaryTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionary',
    data,
  })
}

export function deleteDataDictionaryItemsApi(
  data: DeleteDataDictionaryItemsTypings['Request'],
): Promise<DeleteDataDictionaryItemsTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionaryItems',
    data,
  })
}

export function updateDataDictionaryApi(
  data: UpdateDataDictionaryTypings['Request'],
): Promise<UpdateDataDictionaryTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionary',
    data,
  })
}

export function updateDataDictionaryItemsApi(
  data: UpdateDataDictionaryItemsTypings['Request'],
): Promise<UpdateDataDictionaryItemsTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItems',
    data,
  })
}

export function updateDataDictionaryStatusApi(
  data: UpdateDataDictionaryStatusTypings['Request'],
): Promise<UpdateDataDictionaryStatusTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryStatus',
    data,
  })
}

export function updateDataDictionaryItemsStatusApi(
  data: UpdateDataDictionaryItemsStatusTypings['Request'],
): Promise<UpdateDataDictionaryItemsStatusTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsStatus',
    data,
  })
}

export function updateDataDictionaryItemsOrderApi(
  data: UpdateDataDictionaryItemsOrderTypings['Request'],
): Promise<UpdateDataDictionaryItemsOrderTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsOrder',
    data,
  })
}
