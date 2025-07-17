import { httpHandler } from '@/utils/request'
import type {
  IndexLogoResponse,
  IndexSliderResponse,
  IndexCategoriesResponse,
  IndexPostRequest,
  IndexPostResponse
} from './types/indexApi.d'

/**
 *  @标签 首页部分/LOGO
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/index/logo
 *  @更新时间 2025-07-17 21:47:34
 */
export const indexLogoApi = (): Promise<IndexLogoResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/index/logo',
    headers: {},
  })
}

/**
 *  @标签 首页部分/幻灯片
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/index/slider
 *  @更新时间 2025-07-17 21:47:34
 */
export const indexSliderApi = (): Promise<IndexSliderResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/index/slider',
    headers: {},
  })
}

/**
 *  @标签 首页部分/分类
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/index/categories
 *  @更新时间 2025-07-17 21:47:34
 */
export const indexCategoriesApi = (): Promise<IndexCategoriesResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/index/categories',
    headers: {},
  })
}

/**
 *  @标签 首页部分/文章
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/index/post
 *  @更新时间 2025-07-17 21:47:34
 */
export const indexPostApi = (params: IndexPostRequest): Promise<IndexPostResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/index/post',
    headers: {},
    params,
  })
}
