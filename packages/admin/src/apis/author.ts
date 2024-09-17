import { httpClient } from '@/utils/request'
import type {
  GetAuthorPageTypings,
  CreateAuthorTypings,
  UpdateAuthorTypings,
  DeleteAuthorTypings,
  UpdateAuthorStatusTypings
} from './author.d'

export const getAuthorPageApi = (
  params?: GetAuthorPageTypings['Request']
): Promise<GetAuthorPageTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/author/getAuthorPage',
    params
  })
}

export const createAuthorApi = (
  data: CreateAuthorTypings['Request']
): Promise<CreateAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/author/createAuthor',
    data
  })
}

export const updateAuthorApi = (
  data: UpdateAuthorTypings['Request']
): Promise<UpdateAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/author/updateAuthor',
    data
  })
}

export const deleteAuthorApi = (
  data: DeleteAuthorTypings['Request']
): Promise<DeleteAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/author/deleteAuthor',
    data
  })
}

export const updateAuthorStatusApi = (
  data: UpdateAuthorStatusTypings['Request']
): Promise<UpdateAuthorStatusTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/author/updateAuthorStatus',
    data
  })
}
