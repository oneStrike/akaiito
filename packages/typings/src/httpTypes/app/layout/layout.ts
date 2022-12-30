/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取首页布局信息↗](https://yapi.pro/project/4727/interface/api/441743) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.pro/project/4727/interface/api/cat_77158)
 * @请求头 `GET /app/layout/layout`
 * @更新时间 `2022-12-25 18:15:08`
 */
export interface AppLayoutReq {}

/**
 * 接口 [获取首页布局信息↗](https://yapi.pro/project/4727/interface/api/441743) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.pro/project/4727/interface/api/cat_77158)
 * @请求头 `GET /app/layout/layout`
 * @更新时间 `2022-12-25 18:15:08`
 */
export interface AppLayoutRes {
	/**
	 * 主键id
	 */
	id: number;
	/**
	 * 是否使用
	 */
	use: number;
	/**
	 * 布局名称
	 */
	diyName: string;
	/**
	 * 布局数据
	 */
	diyData: string;
	/**
	 * 创建时间
	 */
	createdAt: string;
	/**
	 * 更新时间
	 */
	updatedAt: string;
}

/* prettier-ignore-end */
