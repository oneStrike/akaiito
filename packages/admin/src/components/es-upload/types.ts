import type { UploadProps, UploadUserFile } from 'element-plus'
import type { FileTypesRes } from '@/apis/types/upload'

/**
 * ES Upload 组件属性接口
 * 基于 Element Plus Upload 组件的封装，提供更丰富的功能
 */
export interface EsUploadProps {
  /**
   * v-model 绑定值，支持多种数据格式
   * - FileTypesRes: 服务器返回的文件信息对象
   * - UploadUserFile[]: Element Plus 文件对象数组
   * - string: 单个文件路径字符串
   * - string[]: 多个文件路径字符串数组
   */
  modelValue?: FileTypesRes | UploadUserFile[] | string | string[]

  /**
   * 文件类型限制
   * - image: 图片文件
   * - video: 视频文件
   * - audio: 音频文件
   * - compressed: 压缩文件
   */
  fileType?: 'image' | 'video' | 'audio' | 'compressed'

  /**
   * 文件列表的类型
   * 继承自 Element Plus Upload 组件的 listType 属性
   */
  listType?: UploadProps['listType']

  /**
   * 是否支持多选文件
   * 继承自 Element Plus Upload 组件的 multiple 属性
   */
  multiple?: UploadProps['multiple']

  /**
   * 最大允许上传个数
   * @default 1
   */
  maxCount?: number

  /**
   * 最大允许上传文件大小（MB）
   * @default config.upload.maxUploadFileSize
   */
  maxSize?: number

  /**
   * 是否启用素材库功能
   * 启用后可以从素材库选择文件或本地上传
   * @default false
   */
  assetLibrary?: boolean

  /**
   * 上传时附带的额外参数
   * 会传递给上传接口
   */
  data?: IterateObject

  /**
   * 输出数据结构格式
   * - json: JSON 字符串格式
   * - object: 对象数组格式
   * - string: 单个文件路径字符串格式
   * @default 'string'
   */
  structure?: 'json' | 'object' | 'string'

  /**
   * 内容类型标识
   * 用于区分不同业务场景的上传
   */
  contentType?: 'comic'
}
