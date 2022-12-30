/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [创建管理员账户↗](https://yapi.pro/project/4729/interface/api/331132) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/create`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminCreateReq {
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 账号
	 */
	account: string;
	/**
	 * 头像
	 */
	avatar?: string;
	/**
	 * 密码
	 */
	password: string;
	/**
	 * 确认密码
	 */
	confirmPassword: string;
	/**
	 * 是否为超管
	 */
	isRoot: number;
	/**
	 * 状态
	 */
	status: number;
	/**
	 * 手机号
	 */
	mobile: string;
	/**
	 * 邮箱
	 */
	email: string;
}

/**
 * 接口 [创建管理员账户↗](https://yapi.pro/project/4729/interface/api/331132) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/create`
 * @更新时间 `2022-12-21 08:21:29`
 */
export type AdminCreateRes = number;

/* prettier-ignore-end */
