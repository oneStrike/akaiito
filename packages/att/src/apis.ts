import axios from 'axios'

/**
 * ApiFox API响应数据结构
 */
interface ApiFoxResponse<T = any> {
  success: boolean
  data: T
  errorCode?: string
  errorMessage?: string
}

/**
 * API客户端接口
 */
interface ApiClient {
  getSchemas: () => Promise<any[]>
  getApiTree: () => Promise<any[]>
  getApiDetail: (id: string) => Promise<any>
}

/**
 * 创建ApiFox API客户端
 * 提供获取数据模型、API树和API详情的方法
 *
 * @param apiKey - ApiFox共享文档的API密钥
 * @returns API客户端实例
 */
export function apis(apiKey: string): ApiClient {
  // ApiFox API基础URL
  const baseUrl = `https://apifox.com/api/v1/shared-docs/${apiKey}`

  // API端点配置
  const endpoints = {
    schemas: `${baseUrl}/data-schemas?locale=zh-CN`,
    apiTree: `${baseUrl}/http-api-tree?locale=zh-CN`,
    apiDetail: (id: string) => `${baseUrl}/http-apis/${id}?locale=zh-CN`,
  }

  /**
   * 获取数据模型Schema列表
   * @returns 数据模型数组
   */
  const getSchemas = async (): Promise<any[]> => {
    try {
      const { data: result } = await axios.get<ApiFoxResponse>(endpoints.schemas)
      return result.data || []
    } catch (error) {
      console.error('获取数据模型失败:', error)
      throw new Error('Failed to fetch schemas')
    }
  }

  /**
   * 获取API树结构
   * @returns API树数组
   */
  const getApiTree = async (): Promise<any[]> => {
    try {
      const { data: result } = await axios.get<ApiFoxResponse>(endpoints.apiTree)
      return result.data || []
    } catch (error) {
      console.error('获取API树失败:', error)
      throw new Error('Failed to fetch API tree')
    }
  }

  /**
   * 获取指定API的详细信息
   * @param id - API的唯一标识符
   * @returns API详情对象
   */
  const getApiDetail = async (id: string): Promise<any> => {
    try {
      const { data: result } = await axios.get<ApiFoxResponse>(endpoints.apiDetail(id))
      return result.data
    } catch (error) {
      console.error(`获取API详情失败 (ID: ${id}):`, error)
      throw new Error(`Failed to fetch API detail for ID: ${id}`)
    }
  }

  return {
    getSchemas,
    getApiTree,
    getApiDetail,
  }
}
