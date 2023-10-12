/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取验证码↗](https://yapi.pro/project/11787/interface/api/459198) 的 **请求类型**
 *
 * @分类 [开放接口↗](https://yapi.pro/project/11787/interface/api/cat_112892)
 * @标签 `开放接口`
 * @请求头 `GET /open/captcha/getCaptcha`
 * @更新时间 `2023-06-24 16:44:20`
 */
export interface OpenGetCaptchaReq {}

/**
 * 接口 [获取验证码↗](https://yapi.pro/project/11787/interface/api/459198) 的 **返回类型**
 *
 * @分类 [开放接口↗](https://yapi.pro/project/11787/interface/api/cat_112892)
 * @标签 `开放接口`
 * @请求头 `GET /open/captcha/getCaptcha`
 * @更新时间 `2023-06-24 16:44:20`
 */
export interface OpenGetCaptchaRes {
  /**
   * 验证码id
   */
  id: string
  /**
   * base64图片信息
   */
  data: string
}

/* prettier-ignore-end */
