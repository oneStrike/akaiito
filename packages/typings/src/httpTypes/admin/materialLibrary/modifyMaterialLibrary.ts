/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/4729/interface/api/427728) 的 **请求类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/modifyMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminModifyMaterialLibraryReq {
	/**
	 * 主键 id
	 */
	id: number;
	/**
	 * 分组新名称
	 */
	groupName: string;
}

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/4729/interface/api/427728) 的 **返回类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/modifyMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminModifyMaterialLibraryRes {
	/**
	 * 返回状态码
	 */
	code: number;
	/**
	 * 状态描述
	 */
	status: string;
	/**
	 * 主键id
	 */
	id: string;
}

/* prettier-ignore-end */
