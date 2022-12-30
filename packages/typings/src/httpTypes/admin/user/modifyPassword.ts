/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [修改密码↗](https://yapi.pro/project/4729/interface/api/331195) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/modifyPassword`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminModifyPasswordReq {
	/**
	 * 密码
	 */
	password: string;
	/**
	 * 确认密码
	 */
	confirmPassword: string;
	/**
	 * 原密码
	 */
	originPassword: string;
}

/**
 * 接口 [修改密码↗](https://yapi.pro/project/4729/interface/api/331195) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/modifyPassword`
 * @更新时间 `2022-12-21 08:21:29`
 */
export type AdminModifyPasswordRes = null;

/* prettier-ignore-end */
