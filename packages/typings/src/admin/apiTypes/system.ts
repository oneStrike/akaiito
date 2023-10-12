/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取系统信息↗](https://yapi.pro/project/11787/interface/api/459222) 的 **请求类型**
 *
 * @分类 [管理端/系统↗](https://yapi.pro/project/11787/interface/api/cat_112852)
 * @标签 `管理端/系统`
 * @请求头 `GET /admin/system/systemInfo`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface AdminSystemInfoReq {}

/**
 * 接口 [获取系统信息↗](https://yapi.pro/project/11787/interface/api/459222) 的 **返回类型**
 *
 * @分类 [管理端/系统↗](https://yapi.pro/project/11787/interface/api/cat_112852)
 * @标签 `管理端/系统`
 * @请求头 `GET /admin/system/systemInfo`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface AdminSystemInfoRes {
  /**
   * 操作系统
   */
  platform: string
  /**
   * node版本号
   */
  node: string
  /**
   * v8引擎版本
   */
  v8: string
  /**
   * 服务器时间
   */
  serverTime: number
  /**
   * 系统运行时间
   */
  Uptime: number
  /**
   * cpu型号
   */
  cpu: string
  /**
   * cpu使用率
   */
  cpuUsage: string
  /**
   * 内存总大小
   */
  memoryTotal: string
  /**
   * 内存空闲大小
   */
  memoryFree: string
  /**
   * 内存已使用大小
   */
  memoryUsed: string
  /**
   * 磁盘标识符
   */
  diskPath: string
  /**
   * 磁盘剩余容量
   */
  diskFree: string
  /**
   * 磁盘总容量
   */
  diskTotal: string
  /**
   * 磁盘已使用容量
   */
  diskUsed: string
}

/* prettier-ignore-end */
