import dayjs from 'dayjs'
import { generateTypes, isEmptyQuery } from '@/generateTypes'

/**
 * 将字符串转换为驼峰命名格式
 * 将连字符和下划线后的字符转换为大写
 *
 * @param str - 需要转换的字符串
 * @param capitalize - 是否将首字母大写，默认为false
 * @returns 驼峰格式的字符串
 * @example
 * toCamelCase('user-name') // 'userName'
 * toCamelCase('user_id') // 'userId'
 * toCamelCase('user-profile', true) // 'UserProfile'
 */
export function toCamelCase(str: string, capitalize = false): string {
  const camelCase = str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
  return capitalize ? capitalizeFirstLetter(camelCase) : camelCase
}

/**
 * 将字符串首字母大写
 *
 * @param str - 需要转换的字符串
 * @returns 首字母大写的字符串
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 从API路径中提取并格式化名称（支持深度递归）
 * 根据指定深度从路径末尾提取段落，并格式化为驼峰命名
 *
 * @param path - API路径
 * @param depth - 提取深度，默认为1
 * @returns 格式化后的名称
 * @example
 * getName('/api/users/{id}') // 'id'
 * getName('/api/user-profile') // 'userProfile'
 * getName('/api/users/profile', 2) // 'usersProfile'
 */
export function getName(path: string, depth = 1): string {
  const pathArr = path.split('/').filter(Boolean) // 过滤空字符串
  const applyArr = pathArr.slice(-depth)
  const pathName = applyArr
    .map((item, idx) => {
      // 移除大括号
      const cleanItem = item.replace(/[{}]/g, '')
      // 第一个保持原样，后续首字母大写
      return idx === 0 ? toCamelCase(cleanItem) : capitalizeFirstLetter(toCamelCase(cleanItem))
    })
    .join('')

  // 如果路径名是纯数字，需要特殊处理
  if (!Number.isNaN(Number(pathName))) {
    if (pathArr.length === applyArr.length) {
      return `remedy${pathName}`
    } else {
      return getName(path, depth + 1)
    }
  }

  return pathName || 'api'
}

/**
 * API名称格式化结果接口
 */
interface ApiNameFormat {
  handler: string
  request: string
  response: string
}

/**
 * 根据API路径生成格式化的名称
 * 生成API处理函数、请求类型和响应类型的名称
 *
 * @param path - API路径，如 '/api/users/{id}'
 * @param nameDepth - 名称深度，用于确定从路径中提取多少段作为名称，默认为1
 * @returns 包含handler、request、response名称的对象
 * @example
 * formatName('/api/users', 1) // { handler: 'usersApi', request: 'UsersRequest', response: 'UsersResponse' }
 */
const formatName = (path: string, nameDepth = 1): ApiNameFormat => {
  const name = getName(path, nameDepth)
  const capitalizedName = capitalizeFirstLetter(name)

  return {
    handler: toCamelCase(`${name}-api`),
    request: `${capitalizedName}Request`,
    response: `${capitalizedName}Response`,
  }
}

/**
 * 生成API处理函数的代码字符串
 * 根据API详情生成对应的TypeScript函数代码
 *
 * @param api - API详情对象，包含路径、方法、参数等信息
 * @returns 生成的API处理函数代码字符串
 * @example
 * formatApiHandler({ path: '/api/users', method: 'get', ... })
 * // 返回: 'export const usersApi = (params: UsersRequest): Promise<UsersResponse> => { ... }'
 */
function formatApiHandler(api: IterateObject): string {
  const { handler, request, response } = formatName(api.path, api.nameDepth)
  let payload = ''
  let payloadParam = ''

  // 根据请求方法确定参数格式
  if (api.method === 'get') {
    if (Object.keys(api.parameters).length && api.parameters.query.length) {
      payload = `params: ${request}`
      payloadParam = 'params'
    }
  } else if (api.method === 'post' && !isEmptyQuery(api)) {
    payload = `data: ${request}`
    payloadParam = 'data'
  }

  // 设置请求头
  const hasContentType = api.requestBody?.type && api.requestBody.type !== 'none'
  const header = hasContentType
    ? `{
      'Content-Type': '${api.requestBody.type}'
    }`
    : '{}'

  // 生成API处理函数代码
  const functionParams = payload ? `${payload}` : ''
  const requestConfig = [
    `method: '${api.method.toUpperCase()}'`,
    `url: '${api.path}'`,
    `${api.headerField}: ${header}`,
    payloadParam ? `${payloadParam}` : '',
  ].filter(Boolean).join(',\n        ')

  return `
  export const ${handler} = (${functionParams}): Promise<${response}> => {
    return ${api.http.handler}({
        ${requestConfig}
      })
  }
  `
}

/**
 * API项接口
 */
interface ApiItem {
  comments: string
  handler: string
  types: string
  name: string
}

/**
 * API列表项接口
 */
interface ApiListItem {
  apis: ApiItem[]
  import: string[]
}

/**
 * 生成API介绍注释
 * 生成包含API详细信息的JSDoc格式注释
 *
 * @param api - API详情对象，包含名称、ID、路径等信息
 * @returns 格式化的API注释字符串
 * @example
 * formatApiIntroduce({ name: 'getUserInfo', id: '123', ... })
 * // 返回包含API链接、标签、方法等信息的注释
 */
function formatApiIntroduce(api: IterateObject): string {
  return `
             /**
              *  接口 [${api.name}](https://apifox.com/apidoc/shared-${api.config.key}/api-${api.id})
              *  @标签 ${api.folderPath}
              *  @方式 ${api.method.toUpperCase()}
              *  @地址 ${api.path}
              *  @更新时间 ${dayjs(api.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
              */
       `
}

/**
 * 格式化API树结构，生成API列表
 * 遍历API树结构，为每个API生成对应的处理函数、类型定义和注释
 *
 * @param apiTree - API树结构数组，包含文件夹和API详情
 * @param config - 配置对象，包含项目配置信息
 * @param apis - API函数集合，包含获取API详情的方法
 * @param dataModel - 数据模型对象，用于类型生成
 * @returns 格式化后的API列表，按文件夹分组
 * @example
 * const result = await formatApiTree(apiTree, config, apis, dataModel)
 * // 返回: { 'users': { apis: [...], import: [...] }, ... }
 */
export async function formatApiTree(
  apiTree: IterateObject[],
  config: IterateObject,
  apis: IterateObject<AsyncFn>,
  dataModel: IterateObject,
): Promise<Record<string, ApiListItem>> {
  const apiPath: string[] = []
  const apiList: Record<string, ApiListItem> = {}
  const { getApiDetail } = apis

  /**
   * 递归处理API树结构
   * 遍历API树，处理文件夹和API详情，生成对应的代码和类型
   *
   * @param apis - API数组，包含文件夹和API详情项
   */
  async function formatApi(apis: IterateObject[]): Promise<void> {
    for (let i = 0; i < apis.length; i++) {
      const currentItem = apis[i]
      const { type, folder, children, api } = currentItem

      try {
        // 处理API文件夹
        if (type === 'apiDetailFolder' && Array.isArray(children) && children.length > 0) {
          apiPath.push(folder?.name || 'unknown')
          await formatApi(children)
        }
        // 处理API详情
        else if (type === 'apiDetail' && api) {
          const pathSegments = api.path.split('/').filter(Boolean)
          const folderName = pathSegments[pathSegments.length - 2] || 'default'

          // 初始化文件夹对应的API列表
          if (!apiList[folderName]) {
            apiList[folderName] = {
              apis: [],
              import: [],
            }
          }

          // 获取接口类型的请求和响应类型名称
          const { request, response } = formatName(api.path, config.nameDepth || 1)

          // 获取接口的详细数据
          const detail = await getApiDetail(api.id)

          // 生成接口注释信息
          const comments = formatApiIntroduce({
            ...detail,
            folderPath: `${apiPath.join('/')}/${api.name}`,
            config,
          })

          // 生成接口的请求方法
          const handler = formatApiHandler({ ...detail, ...config })

          // 生成接口的类型信息
          const types = generateTypes(detail, request, response, dataModel, config)

          // 添加类型导入（避免重复导入）
          if (!apiList[folderName].import.includes(response)) {
            apiList[folderName].import.push(response)
          }
          if (!isEmptyQuery(detail) && !apiList[folderName].import.includes(request)) {
            apiList[folderName].import.push(request)
          }

          // 添加API项
          apiList[folderName].apis.push({
            comments,
            handler,
            types,
            name: api.name || 'unknown',
          })
        }
      } catch (error) {
        console.error(`处理API项时发生错误:`, error, currentItem)
        // 继续处理下一个项目，不中断整个流程
      }

      // 重置路径（当处理完当前层级的最后一个项目时）
      if (i + 1 === apis.length) {
        apiPath.length = 0
      }
    }
  }

  await formatApi(apiTree)
  return apiList
}
