/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [切换使用状态↗](https://yapi.pro/project/4729/interface/api/435088) 的 **请求类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `POST /admin/diy/switchDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface AdminSwitchDiyReq {
	/**
	 * 主键id
	 */
	id: number;
	/**
	 * 1启用，0停用
	 */
	use: number;
}

/**
 * 接口 [切换使用状态↗](https://yapi.pro/project/4729/interface/api/435088) 的 **返回类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `POST /admin/diy/switchDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type AdminSwitchDiyRes = number;

/* prettier-ignore-end */
