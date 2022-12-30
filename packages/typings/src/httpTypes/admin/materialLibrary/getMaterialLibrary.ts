/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/4729/interface/api/427718) 的 **请求类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminGetMaterialLibraryReq {}

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/4729/interface/api/427718) 的 **返回类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminGetMaterialLibraryRes {
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
		 * 主键id
		 */
		id: number;
		/**
		 * 分组名称
		 */
		groupName: string;
		/**
		 * 排序号
		 */
		sort: number;
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
