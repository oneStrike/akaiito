/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [修改用户信息↗](https://yapi.pro/project/4729/interface/api/331186) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/updateUserInfo`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminUpdateUserInfoReq {
	/**
	 * 用户id
	 */
	id: number;
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
	avatar: string;
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
	/**
	 * 创建时间
	 */
	createdAt: string;
	/**
	 * 更新时间
	 */
	updatedAt: string;
}

/**
 * 接口 [修改用户信息↗](https://yapi.pro/project/4729/interface/api/331186) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `POST /admin/user/updateUserInfo`
 * @更新时间 `2022-12-21 08:21:29`
 */
export type AdminUpdateUserInfoRes = number;

/* prettier-ignore-end */
