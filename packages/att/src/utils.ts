import type { IterateObject } from '@akaiito/typings/src'

export const formatSchema = (
  schema: IterateObject | IterateObject[],
  dataSchema?: IterateObject,
) => {
  const schemaArr: IterateObject[] = []
  if (Array.isArray(schema)) {
    schema.forEach(item => {
      if (item.type === 'file') {
        item.type = 'string'
      }
      schemaArr.push(item)
    })
    return schemaArr
  }
  const {
    properties,
    required = [],
    'x-apifox-orders': apiOrders,
    'x-apifox-refs': refs,
  } = schema
  apiOrders?.forEach((item: string) => {
    if (refs && refs[item]) {
      const { $ref: ref, 'x-apifox-overrides': overrides } = refs[item]
      const refId = ref.split('/').pop()
      if (dataSchema && dataSchema[refId]) {
        if (overrides && Object.keys(overrides).length) {
          for (const overridesKey in overrides) {
            if (overrides[overridesKey]) {
              dataSchema[refId].forEach((item: IterateObject) => {
                if (item.name === overridesKey) schemaArr.push(item)
              })
            }
          }
        } else {
          schemaArr.push(...dataSchema[refId])
        }
      }
    }

    const type = properties[item]?.type
    if (type) {
      const schema = {
        name: item,
        type: Array.isArray(type) ? type.join(' | ') : type,
        description: properties[item].description,
        required: required.includes(item),
        array: false,
      }
      if (Array.isArray(type)) {
        schema.type = type.join(' | ')
      } else if (type === 'integer') {
        schema.type = 'number'
      } else if (type === 'object') {
        schema.type = [...formatSchema(properties[item], dataSchema)]
      } else if (type === 'array') {
        schema.type =
          properties[item].items.type === 'object'
            ? [...formatSchema(properties[item].items, dataSchema)]
            : properties[item].items.type
        schema.array = true
      }

      schemaArr.push(schema)
    }
  })
  return schemaArr
}

let tag: IterateObject[] = []
export const formatApi = (
  target: IterateObject[],
  tags: IterateObject,
  apis: IterateObject[],
  exclude: string[],
) => {
  apis.forEach(item => {
    if (item.type === 'apiDetailFolder' && !exclude.includes(item.folder?.id)) {
      tag.push({
        id: item.folder.id,
        name: item.name,
      })
    }
    if (!exclude.includes(item.folder?.id) && item.type === 'apiDetail') {
      const targetIdx = tag.findIndex(tag => tag.id === item.api.folderId)
      tag.splice(targetIdx + 1)
      tags[item.api.id] = `${tag.map(item => item.name).join('/')}/${item.name}`
      target.push(item)
    }
    if (
      item.type === 'apiDetailFolder' &&
      item.children.length &&
      !exclude.includes(item.folder?.id)
    ) {
      formatApi(target, tags, item.children, exclude)
      if (item.folder.parentId === 0) tag = []
    }
  })
  return {}
}

export const conversion = (api: IterateObject, config: IterateObject) => {
  const requestDoc = generateTyping(api.requestScheme)
  const requiredRequest = api.requestScheme?.find(
    (item: IterateObject) => item.required,
  )
  const responseScheme = api.responseScheme?.find(
    (item: IterateObject) => item.name === config.field,
  )

  const responseDoc = responseScheme?.type
    ? generateTyping(responseScheme.type)
    : null

  const options = shared(api, config)
  const typingsStr = `/**
 * 接口 [${api.name}↗](https://apifox.com/apidoc/shared-${config.key}/api-${
   api.id
 })
 * @标签 \`${api.tags}\`
 * @请求头 \`${api.method.toUpperCase()} ${api.path}\`
 * @更新时间 \`${api.updatedAt}\`
 */

export interface ${options.typingsName} {
  Request: ${requestDoc || null}
  ${
    responseScheme?.description
      ? `/*
          * ${responseScheme.description}
          */`
      : ''
  }
  Response: ${
    responseDoc
      ? responseScheme.array
        ? `${responseDoc}[]`
        : responseDoc
      : null
  }
}
`
  const payload = requestDoc
    ? `${options.payload}${requiredRequest ? '' : '?'}: ${
        options.typingsName
      }['Request']`
    : ''

  const apiStr = `
    export const ${options.apiName} = (${payload}):Promise<${
      options.typingsName
    }['Response']> =>{
      return ${config.http.client}({
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

export const getName = (path: string, typings = false) => {
  const name = path.split('/').pop()!
  if (typings) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}Typings`
  }
  return `${name}Api`
}
/**
 * 生成类型定义字符串
 * @param schema - 类型定义数组
 * @returns 类型定义字符串
 */
const generateTyping = (schema: IterateObject[] | string) => {
  if (!schema) {
    return ''
  }
  let str = ''
  if (Array.isArray(schema)) {
    schema.forEach(item => {
      str += `/*
      * ${item.description || ''}
      */
     ${item.name + (item.required ? '' : '?')}: ${
       typeof item.type !== 'string'
         ? `
         ${generateTyping(item.type)}${item.array ? '[]' : ''}
       `
         : item.type + (item.array ? '[]' : '')
     }
`
    })
    return str ? `{${str}}` : null
  } else {
    return schema
  }
}

/**
 * 获取文件名
 * @param path 文件路径
 * @param config 配置对象
 * @param isTyping 是否为类型文件
 * @returns 文件名
 */
export const getFileName = (
  path: string,
  config: IterateObject,
  isTyping = false,
) => {
  if (config.getFileName) {
    return config.getFileName(path, isTyping)
  }
  return `${path.split('/').slice(-2)[0]}${isTyping ? '.d' : ''}.ts`
}

/**
 * 公用函数：生成共享配置对象
 * @param api - API对象
 * @param config - 配置对象
 * @returns 共享配置对象
 */
export const shared = (api: IterateObject, config: IterateObject) => {
  const apiName = getName(api.path)
  const typingsName = getName(api.path, true)

  const apiFileName = config.apiFileName
    ? config.apiFileName(api)
    : api.path.split('/').slice(-2)[0]

  const typingsFileName = config.typingsFileName
    ? config.typingsFileName(api)
    : api.path.split('/').slice(-2)[0]

  const apiRootPath = config.apiPath || `${process.cwd()}/src/apis/`
  const typingsRootPath = config.typingsPath || `${process.cwd()}/src/apis/`

  const apiFullPath = `${apiRootPath + apiFileName}.ts`
  const typingsFullPath = `${typingsRootPath + typingsFileName}.d.ts`

  const importTypings = config.importTypings
    ? config.importTypings(api)
    : apiRootPath === typingsRootPath
      ? `./${typingsFileName}.d`
      : typingsFullPath.replace('.ts', '')

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
