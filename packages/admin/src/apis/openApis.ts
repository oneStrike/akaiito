import { httpClient } from '@/utils/request'

/* <openApis.ts> open */
/* @util <api-refs@1.1.5> */
/* @datasouce apifox */
/* @total 1 */
/* @projects
   - [Aakiito2.0](https://www.apifox.cn/web/project/3418649)
 */

/**
 * response | 获取验证码
 *
 * @function getCaptcha
 * @status (200) 成功l
 * @responseType json
 */
export interface IGetCaptchaResponse {
  data: {
    /**
     * 验证码id
     */
    id: string
    /**
     * base64格式图片
     */
    data: string
  }
}

/**
 * 获取验证码
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-116799073
 * @updateAt 2023-10-14T14:59:48.000Z
 * @author Akaiito
 */
export const getCaptcha = (): Promise<IGetCaptchaResponse['data']> => {
  return httpClient({
    method: 'GET',
    url: '/open/captcha/getCaptcha'
  })
}
