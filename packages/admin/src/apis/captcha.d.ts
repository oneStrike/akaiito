/**
 * 接口 [获取验证码↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-116799073)
 * @标签 `open/获取验证码`
 * @请求头 `GET /open/captcha/getCaptcha`
 * @更新时间 `2023-10-14T14:59:48.000Z`
 */

export interface GetCaptchaTypings {
  Request: null

  Response: {
    /*
     * 验证码id
     */
    id: string
    /*
     * base64格式图片
     */
    data: string
  }
}
