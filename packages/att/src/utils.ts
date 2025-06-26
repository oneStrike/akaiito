import * as process from 'node:process'

/**
 * 通用对象接口
 */
interface IterateObject {
  [key: string]: any
}

/**
 * Schema字段定义接口
 */
interface SchemaField {
  name: string
  type: string | SchemaField[]
  description?: string
  required: boolean
  array: boolean
}

/**
 * 格式化Schema数据结构
 * 将ApiFox的Schema格式转换为内部使用的格式
 *
 * @param schema - 原始Schema对象
 * @param dataSchema - 数据Schema映射表
 * @returns 格式化后的Schema字段数组
 */
export function formatSchema(
  schema: IterateObject | IterateObject[],
  dataSchema?: IterateObject,
): SchemaField[] {
  const schemaArr: SchemaField[] = []

  // 处理数组类型的Schema
  if (Array.isArray(schema)) {
    schema.forEach((item) => {
      // 将file类型转换为string类型
      if (item.type === 'file') {
        item.type = 'string'
      }
      schemaArr.push(item)
    })
    return schemaArr
  }

  // 解构Schema属性
  const {
    properties,
    required = [],
    'x-apifox-orders': apiOrders,
    'x-apifox-refs': refs,
  } = schema

  // 按照ApiFox定义的顺序处理字段
  apiOrders?.forEach((fieldName: string) => {
    // 处理引用类型
    if (refs && refs[fieldName]) {
      const { $ref: ref, 'x-apifox-overrides': overrides } = refs[fieldName]
      const refId = ref.split('/').pop()

      if (dataSchema && dataSchema[refId]) {
        if (overrides && Object.keys(overrides).length) {
          // 处理覆盖字段
          for (const overrideKey in overrides) {
            if (overrides[overrideKey]) {
              dataSchema[refId].forEach((item: IterateObject) => {
                if (item.name === overrideKey) {
                  schemaArr.push(item as SchemaField)
                }
              })
            }
          }
        } else {
          // 直接引用整个Schema
          schemaArr.push(...dataSchema[refId])
        }
      }
    }

    // 处理普通字段
    const fieldType = properties[fieldName]?.type
    if (fieldType) {
      const schemaField: SchemaField = {
        name: fieldName,
        type: Array.isArray(fieldType) ? fieldType.join(' | ') : fieldType,
        description: properties[fieldName].description,
        required: required.includes(fieldName),
        array: false,
      }

      // 根据字段类型进行特殊处理
      if (Array.isArray(fieldType)) {
        schemaField.type = fieldType.join(' | ')
      } else if (fieldType === 'integer') {
        schemaField.type = 'number'
      } else if (fieldType === 'object') {
        schemaField.type = formatSchema(properties[fieldName], dataSchema)
      } else if (fieldType === 'array') {
        const itemType = properties[fieldName].items.type
        schemaField.type = itemType === 'object'
          ? formatSchema(properties[fieldName].items, dataSchema)
          : itemType === 'integer'
            ? 'number'
            : itemType
        schemaField.array = true
      }

      schemaArr.push(schemaField)
    }
  })

  return schemaArr
}

/**
 * 文件夹标签栈，用于追踪API的层级路径
 */
let folderTagStack: IterateObject[] = []

/**
 * 格式化API树结构
 * 递归遍历API树，提取API详情并构建标签路径
 *
 * @param target - 目标API数组，用于收集所有API
 * @param tags - 标签映射对象，API ID -> 标签路径
 * @param apis - 原始API树数组
 * @param exclude - 需要排除的文件夹ID列表
 */
export function formatApi(
  target: IterateObject[],
  tags: IterateObject,
  apis: IterateObject[],
  exclude: string[],
): void {
  apis.forEach((item) => {
    // 处理API文件夹
    if (item.type === 'apiDetailFolder' && !exclude.includes(item.folder?.id)) {
      folderTagStack.push({
        id: item.folder.id,
        name: item.name,
      })
    }

    // 处理API详情
    if (!exclude.includes(item.folder?.id) && item.type === 'apiDetail') {
      const targetIdx = folderTagStack.findIndex((tag) => tag.id === item.api.folderId)
      // 清理无效的标签栈
      folderTagStack.splice(targetIdx + 1)
      // 构建API标签路径
      tags[item.api.id] = `${folderTagStack.map((tag) => tag.name).join('/')}/${item.name}`
      target.push(item)
    }

    // 递归处理子文件夹
    if (item.type === 'apiDetailFolder' && item.children.length && !exclude.includes(item.folder?.id)) {
      formatApi(target, tags, item.children, exclude)
      // 重置根级文件夹的标签栈
      if (item.folder.parentId === 0) {
        folderTagStack = []
      }
    }
  })
}

/**
 * API转换结果接口
 */
interface ConversionResult {
  typings: string
  api: string
  [key: string]: any
}

/**
 * 将API数据转换为TypeScript代码
 * 生成类型定义和API调用函数
 *
 * @param api - API数据对象
 * @param config - 配置对象
 * @returns 转换后的代码字符串和配置信息
 */
export function conversion(api: IterateObject, config: IterateObject): ConversionResult {
  // 生成请求参数类型
  const requestDoc = generateTyping(api.requestScheme)
  const requiredRequest = api.requestScheme?.find((item: IterateObject) => item.required)

  // 生成响应数据类型
  const responseScheme = api.responseScheme?.find((item: IterateObject) => item.name === config.field)
  const responseDoc = responseScheme?.type ? generateTyping(responseScheme.type) : null

  // 获取共享配置
  const options = shared(api, config)

  // 生成TypeScript接口定义
  const typingsStr = `/**
 * 接口 [${api.name}↗](https://apifox.com/apidoc/shared-${config.key}/api-${api.id})
 * @标签 \`${api.tags}\`
 * @请求头 \`${api.method.toUpperCase()} ${api.path}\`
 * @更新时间 \`${api.updatedAt}\`
 */
export interface ${options.typingsName} {
  Request: ${requestDoc || 'void'}
  ${
    responseScheme?.description
      ? `/**
          * ${responseScheme.description}
          */`
      : ''
  }
  Response: ${responseDoc ? (responseScheme.array ? `${responseDoc}[]` : responseDoc) : 'void'}
}
`

  // 生成参数定义
  const payload = requestDoc
    ? `${options.payload}${requiredRequest ? '' : '?'}: ${options.typingsName}['Request']`
    : ''

  // 生成API调用函数
  const apiStr = `
/**
 * ${api.name}
 * ${api.method.toUpperCase()} ${api.path}
 */
export const ${options.apiName} = (${payload}): Promise<${options.typingsName}['Response']> => {
  return ${config.http.handler}({
    method: '${api.method.toUpperCase()}',
    url: '${api.path}',
    ${payload ? options.payload : ''}
  })
}
`

  return {
    typings: typingsStr,
    api: apiStr,
    ...options,
  }
}

/**
 * 根据路径生成API或类型名称
 *
 * @param path - API路径
 * @param typings - 是否生成类型名称
 * @returns 生成的名称
 */
export function getName(path: string, typings = false): string {
  const name = path.split('/').pop()!
  if (typings) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}Typings`
  }
  return `${name}Api`
}

/**
 * 生成TypeScript类型定义字符串
 * 递归处理复杂类型结构
 *
 * @param schema - 类型定义数组或字符串
 * @returns TypeScript类型定义字符串
 */
function generateTyping(schema: IterateObject[] | string): string | null {
  if (!schema) {
    return null
  }

  // 处理字符串类型
  if (typeof schema === 'string') {
    return schema
  }

  // 处理数组类型
  if (Array.isArray(schema)) {
    let typeStr = ''

    schema.forEach((item) => {
      const fieldType = typeof item.type !== 'string'
        ? `${generateTyping(item.type)}${item.array ? '[]' : ''}`
        : `${item.type}${item.array ? '[]' : ''}`

      typeStr += `
  /**
   * ${item.description || ''}
   */
  ${item.name}${item.required ? '' : '?'}: ${fieldType}
`
    })

    return typeStr ? `{${typeStr}}` : null
  }

  return null
}

/**
 * 共享配置对象接口
 */
interface SharedConfig {
  apiName: string
  apiFileName: string
  typingsFileName: string
  typingsName: string
  apiRootPath: string
  typingsRootPath: string
  apiFullPath: string
  typingsFullPath: string
  importTypings: string
  payload: string
}

/**
 * 获取文件名
 * 支持自定义文件名生成函数
 *
 * @param path - 文件路径
 * @param config - 配置对象
 * @param isTyping - 是否为类型文件
 * @returns 生成的文件名
 */
export function getFileName(path: string, config: IterateObject, isTyping = false): string {
  if (config.getFileName) {
    return config.getFileName(path, isTyping)
  }

  const pathSegments = path.split('/')
  const fileName = pathSegments.slice(-2)[0]
  return `${fileName}${isTyping ? '.d' : ''}.ts`
}

/**
 * 生成共享配置对象
 * 包含API和类型文件的各种路径和名称信息
 *
 * @param api - API对象
 * @param config - 配置对象
 * @returns 共享配置对象
 */
export function shared(api: IterateObject, config: IterateObject): SharedConfig {
  // 生成API和类型名称
  const apiName = getName(api.path)
  const typingsName = getName(api.path, true)

  // 生成文件名（支持自定义函数）
  const apiFileName = config.apiFileName
    ? config.apiFileName(api)
    : api.path.split('/').slice(-2)[0]

  const typingsFileName = config.typingsFileName
    ? config.typingsFileName(api)
    : api.path.split('/').slice(-2)[0]

  // 生成根路径
  const apiRootPath = config.apiPath || `${process.cwd()}/src/apis/`
  const typingsRootPath = config.typingsPath || `${process.cwd()}/src/apis/`

  // 生成完整路径
  const apiFullPath = `${apiRootPath}${apiFileName}.ts`
  const typingsFullPath = `${typingsRootPath}${typingsFileName}.d.ts`

  // 生成类型导入路径
  const importTypings = config.importTypings
    ? config.importTypings(api)
    : apiRootPath === typingsRootPath
      ? `./${typingsFileName}.d`
      : typingsFullPath.replace('.ts', '')

  // 根据HTTP方法确定参数名称
  const payload = api.method === 'get' ? 'params' : 'data'

  return {
    apiName,
    apiFileName,
    typingsFileName,
    typingsName,
    apiRootPath,
    typingsRootPath,
    apiFullPath,
    typingsFullPath,
    importTypings,
    payload,
  }
}
