/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [已删除用户列表↗](https://yapi.pro/project/4729/interface/api/331168) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `GET /admin/user/deleteUserList`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminDeleteUserListReq {
	/**
	 * 页码
	 */
	pageIndex?: string;
	/**
	 * 每页数量
	 */
	pageSize?: string;
	/**
	 * 排序方式 asc升序、desc倒序
	 */
	sort?: string;
	/**
	 * 排序字段
	 */
	sortField?: string;
}

/**
 * 接口 [已删除用户列表↗](https://yapi.pro/project/4729/interface/api/331168) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.pro/project/4729/interface/api/cat_95677)
 * @标签 `用户`
 * @请求头 `GET /admin/user/deleteUserList`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminDeleteUserListRes {
	/**
	 * 单页数量
	 */
	pageSize: number;
	/**
	 * 页码
	 */
	pageIndex: number;
	/**
	 * 排序方式
	 */
	sort: string;
	/**
	 * 排序的字段
	 */
	sortField: string;
	/**
	 * 符合条件的总数量
	 */
	total: number;
	/**
	 * 当前返回的数量
	 */
	count: number;
	list: {
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
		isRoot: number | number;
		/**
		 * 状态
		 */
		status: number | number;
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
	}[];
}

/* prettier-ignore-end */
