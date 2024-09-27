import { httpClient } from '@/utils/request'
import type {
  GetAuthorPageTypings,
  CreateAuthorTypings,
  UpdateAuthorTypings,
  DeleteAuthorTypings,
  UpdateAuthorStatusTypings,
} from './author.d'

export const getAuthorPageApi = (
  params?: GetAuthorPageTypings['Request'],
): Promise<GetAuthorPageTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/contentMgmt/author/getAuthorPage',
    params,
  })
}

export const createAuthorApi = (): Promise<CreateAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/createAuthor',
  })
}

export const updateAuthorApi = (): Promise<UpdateAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/updateAuthor',
  })
}

export const deleteAuthorApi = (): Promise<DeleteAuthorTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/deleteAuthor',
  })
}

export const updateAuthorStatusApi = (): Promise<
  UpdateAuthorStatusTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/updateAuthorStatus',
  })
}
