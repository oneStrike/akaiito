import { httpClient } from '@/utils/request'
import type {
  CreateAuthorTypings,
  UpdateAuthorTypings,
  GetAuthorPageTypings
} from './author.d'

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

export const getAuthorPageApi = (
  params?: GetAuthorPageTypings['Request']
): Promise<GetAuthorPageTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/author/getAuthorPage',
    params
  })
}
