import { httpHandler } from '@/utils/request'

/**
 * 获取app的logo
 */
export const getAppLogoApi = () => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/home_logo',
  })
}

/**
 * 获取首页轮播图
 */
export const getAppSwiperApi = () => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/home_banner',
  })
}
