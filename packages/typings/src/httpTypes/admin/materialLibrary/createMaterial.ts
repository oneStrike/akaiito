/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [添加素材↗](https://yapi.pro/project/4729/interface/api/427738) 的 **请求类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type AdminCreateMaterialReq = {
	/**
	 * 分组id
	 */
	groupId: number;
	/**
	 * 素材名称
	 */
	materialName: string;
	/**
	 * 素材类型
	 */
	materialType: string;
	/**
	 * 素材路径
	 */
	path: string;
}[];

/**
 * 接口 [添加素材↗](https://yapi.pro/project/4729/interface/api/427738) 的 **返回类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type AdminCreateMaterialRes = string;

/* prettier-ignore-end */
