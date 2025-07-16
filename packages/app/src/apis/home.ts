import { httpHandler } from '@/utils/request'

/**
 * 获取app的logo
 */
export const getAppLogoApi = (): Promise<any> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/home_logo',
  })
}

/**
 * 获取首页轮播图
 */
export const getAppSwiperApi = (): Promise<any> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/home_banner',
  })
}
