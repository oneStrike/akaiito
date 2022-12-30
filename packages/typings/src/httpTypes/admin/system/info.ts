/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取服务器信息↗](https://yapi.pro/project/4729/interface/api/378454) 的 **请求类型**
 *
 * @分类 [系统↗](https://yapi.pro/project/4729/interface/api/cat_98707)
 * @标签 `系统`
 * @请求头 `GET /admin/system/info`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminInfoReq {}

/**
 * 接口 [获取服务器信息↗](https://yapi.pro/project/4729/interface/api/378454) 的 **返回类型**
 *
 * @分类 [系统↗](https://yapi.pro/project/4729/interface/api/cat_98707)
 * @标签 `系统`
 * @请求头 `GET /admin/system/info`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface AdminInfoRes {
	/**
	 * 操作系统
	 */
	platform: string;
	/**
	 * node版本号
	 */
	node: string;
	/**
	 * v8引擎版本
	 */
	v8: string;
	/**
	 * 服务器时间
	 */
	serverTime: number;
	/**
	 * 系统运行时间
	 */
	Uptime: number;
	/**
	 * cpu型号
	 */
	cpu: string;
	/**
	 * cpu使用率
	 */
	cpuUsage: string;
	/**
	 * 内存总大小
	 */
	memoryTotal: string;
	/**
	 * 内存空闲大小
	 */
	memoryFree: string;
	/**
	 * 内存已使用大小i
	 */
	memoryUsed: string;
	/**
	 * 磁盘标识符
	 */
	diskPath: string;
	/**
	 * 磁盘剩余容量
	 */
	diskFree: string;
	/**
	 * 磁盘总容量
	 */
	diskTotal: string;
	/**
	 * 磁盘已使用容量
	 */
	diskUsed: string;
}

/* prettier-ignore-end */
