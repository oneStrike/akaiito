export interface IClassConstructor {
  new (...args: any[]): object
}

/**
 * 内存信息
 */
export interface IMemory {
  memoryTotal: string
  memoryFree: string
  memoryUsed: string
}

/**
 * 磁盘信息
 */
export interface IDisk {
  diskPath: string
  diskFree: string
  diskTotal: string
  diskUsed: string
}

/**
 * 上传配置信息
 */
export interface IUploadConfigYaml {
  use: string
  local?: null
  azure?: null
  oss?: null
  cos?: null
}
