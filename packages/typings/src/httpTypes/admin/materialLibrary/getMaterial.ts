/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/4729/interface/api/427758) 的 **请求类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminGetMaterialReq {
	/**
	 * 分组id
	 */
	groupId?: string;
	/**
	 * 素材类型
	 */
	materialType?: string;
	/**
	 * 素材名称
	 */
	materialName?: string;
	/**
	 * 单页数量
	 */
	pageSize?: string;
	/**
	 * 页码
	 */
	pageIndex?: string;
	/**
	 * 排序
	 */
	sort?: string;
	/**
	 * 排序字段
	 */
	sortField?: string;
}

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/4729/interface/api/427758) 的 **返回类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminGetMaterialRes {
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
		id: string;
		/**
		 * 素材路径
		 */
		path: string;
		/**
		 * 分组id
		 */
		groupId: string;
		/**
		 * 素材名称
		 */
		materialName: string;
		/**
		 * 素材类型
		 */
		materialType: string;
	}[];
}

/* prettier-ignore-end */
