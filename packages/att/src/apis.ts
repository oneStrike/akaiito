import axios from 'axios'

export function apis(apiKey: string) {
  const baseUrl = `https://apifox.com/api/v1/shared-docs/${apiKey}`

  const api = {
    schemas: `${baseUrl}/data-schemas?locale=zh-CN`,
    apiTree: `${baseUrl}/http-api-tree?locale=zh-CN`,
    apiDetail: (id: string) => `${baseUrl}/http-apis/${id}?locale=zh-CN`,
  }
  // 获取通用schema
  const getSchemas = async () => {
    const { data: result } = await axios.get(api.schemas)
    return result.data
  }

  // 获取api树
  const getApiTree = async () => {
    const { data: result } = await axios.get(api.apiTree)
    return result.data
  }

  // 获取api详情
  const getApiDetail = async (id: string) => {
    const { data: result } = await axios.get(api.apiDetail(id))
    return result.data
  }

  return {
    getSchemas,
    getApiTree,
    getApiDetail,
  }
}
