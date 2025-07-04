/**
 * 类型字段接口
 */
interface TypeField {
  name: string
  type: string
  required: boolean
  array: boolean
  description?: string
}

/**
 * 将类型字段数组转换为TypeScript类型定义字符串
 *
 * @param types - 类型字段数组
 * @returns TypeScript类型定义字符串
 * @example
 * joinType([{name: 'id', type: 'number', required: true, array: false}])
 * // 返回: 'id: number'
 */
export function joinType(types: TypeField[]): string {
  return types
    .map((item) => {
      const { name, type, required, array, description } = item
      const isRequired = required ? '' : '?'
      const isArray = array ? '[]' : ''
      const comment = description ? `/** ${description} */\n  ` : ''
      return `${comment}${name}${isRequired}: ${type}${isArray}`
    })
    .join('\n  ')
}

function joinTypeSingle(item: IterateObject) {
  if (!item) {
    return ''
  }
  let type = ''
  if (Array.isArray(item?.type)) {
    if (Array.isArray(item.type[0])) {
      item.type[0].forEach((itemType) => {
        type += joinTypeSingle(itemType)
      })
      type = `{${type}}[]`
    } else if (typeof item?.type[0] !== 'string') {
      item.type.forEach((itemType) => {
        type += joinTypeSingle(itemType)
      })
      type = `{${type}}`
    } else if (item.type) {
      type = item.type.join(' | ')
    }
  } else if (item?.type) {
    type = item.type
  }
  if (item.array) {
    type += '[]'
  }
  return `
          /* ${item?.description || ''} */
          ${item?.name}${item?.required ? '' : '?'}: ${type}
        `
}

/**
 * 处理引用类型并生成TypeScript接口定义
 *
 * @param refs - 引用类型数组
 * @param dataModel - 数据模型对象
 * @returns TypeScript接口定义字符串
 */
export function handlerRefs(refs: IterateObject[], dataModel: IterateObject): string {
  let typesStr = ''

  refs.forEach((item: IterateObject) => {
    // 需要过滤的通用字段
    const overridesField = ['id', 'createdAt', 'updatedAt']

    if (dataModel[item.id]) {
      typesStr += `export interface ${item.name} {\n  `

      // 过滤掉通用字段，生成接口属性
      dataModel[item.id]
        .filter((item: IterateObject) => !overridesField.includes(item.name))
        .forEach((item: IterateObject) => {
          typesStr += joinTypeSingle({ ...item })
        })
    }

    typesStr += '}\n\n'
  })

  return typesStr
}

function handlerRefsOld(refs: string, dataModel: IterateObject, overrides?: IterateObject) {
  let typesStr = ''
  const schemaId = refs?.split('/').pop() || ''
  const commonSchema = dataModel[schemaId]
  if (Array.isArray(commonSchema)) {
    const overridesField = Object.keys(overrides || {})
    commonSchema
      .filter((item: IterateObject) => !overridesField.includes(item.name))
      .forEach((item: IterateObject) => {
        typesStr += joinTypeSingle({ ...item })
      })
  }

  return typesStr
}

/**
 * 提取并处理引用类型
 *
 * @param refs - 引用字符串或对象
 * @param dataModel - 数据模型对象
 * @returns 处理后的类型字符串
 */
export function extractRefs(refs: string | IterateObject, dataModel: IterateObject): string {
  let typesStr = ''
  if (typeof refs === 'string') {
    typesStr = handlerRefsOld(refs, dataModel)
  } else if (refs && Object.keys(refs).length) {
    for (const refKey in refs) {
      const { $ref, 'x-apifox-overrides': overrides = {} } = refs[refKey]
      typesStr += handlerRefsOld($ref || refs[refKey], dataModel, overrides)
    }
  }

  return typesStr
}

/**
 * 处理JSON Schema并生成TypeScript类型定义
 *
 * @param jsonSchema - JSON Schema对象
 * @param dataModel - 数据模型对象
 * @param isRes - 是否为响应类型，默认为false
 * @returns TypeScript类型定义字符串
 */
function handlerJsonScheme(
  jsonSchema: IterateObject,
  dataModel: IterateObject,
  isRes = false,
): string {
  let typesStr = ''
  if (jsonSchema) {
    const { properties, 'x-apifox-refs': apifoxRefs, $ref } = jsonSchema

    // 处理对象属性
    if (properties && Object.keys(properties).length) {
      for (const propertiesKey in properties) {
        const item = properties[propertiesKey]
        if (item.type === 'object') {
          // 处理嵌套对象
          if (item.properties && Object.keys(item.properties)) {
            typesStr += `
              /* ${item.description} */
              ${propertiesKey}: {
                ${handlerJsonScheme(item, dataModel, isRes)}
              }
            `
          } else {
            // 处理对象引用
            const subRefs = item['x-apifox-refs']
            if (subRefs && Object.keys(subRefs).length) {
              typesStr += extractRefs(subRefs, dataModel)
            }
          }
        } else if (item.type === 'array') {
          // 处理数组类型
          if (item.items.$ref) {
             typesStr += `${propertiesKey}:{${extractRefs(item.items.$ref, dataModel)}}[]`
          } else if (item.items.type === 'object') {
            typesStr += `${propertiesKey}:{${handlerJsonScheme(item.items, dataModel, isRes)}}[]`
          } else {
            typesStr += `
              /* ${item.description || ''} */
            ${propertiesKey}:${item.items.type}[]`
          }
        } else {
          // 处理基础类型
          typesStr += joinTypeSingle({
            name: propertiesKey,
            type: item.type,
            description: item.description,
            required: true,
            array: false,
          })
        }
      }
    }

    // 处理直接引用
    if ($ref) {
      typesStr += extractRefs($ref, dataModel)
    } else if (apifoxRefs && Object.keys(apifoxRefs).length) {
      typesStr += extractRefs(apifoxRefs, dataModel)
    }
  }

  return typesStr
}

/**
 * 处理表单参数并生成TypeScript类型定义
 *
 * @param parameters - 表单参数数组
 * @returns TypeScript类型定义字符串
 */
function handlerForm(parameters: any[]): string {
  let typeStr = ''

  parameters.forEach((item) => {
    typeStr += `
              /* ${item.description} */
              ${item.name + (item.required ? '' : '?')}: ${item.type}
            `
  })

  return typeStr
}

/**
 * 判断API是否为空查询（无参数的GET请求或无请求体的POST请求）
 *
 * @param api - API对象
 * @returns 是否为空查询
 */
export function isEmptyQuery(api: IterateObject): boolean {
  const { parameters, requestBody } = api
  return !!(requestBody.type === 'none' && Object.keys(parameters).length && !parameters.query.length)
}

/**
 * 生成API的TypeScript类型定义
 *
 * @param api - API对象
 * @param reqName - 请求类型名称
 * @param resName - 响应类型名称
 * @param dataModel - 数据模型对象
 * @param config - 配置对象
 * @returns TypeScript类型定义字符串
 */
export function generateTypes(
  api: IterateObject,
  reqName: string,
  resName: string,
  dataModel: IterateObject,
  config: IterateObject,
): string {
  const { parameters, method, requestBody, responses } = api
  let requestStr = ''
  let responseStr = ''

  // 处理请求参数类型
  if (method === 'get' && !isEmptyQuery(api)) {
    // GET请求，处理查询参数
    const { query } = parameters
    query.forEach((item: IterateObject) => {
      if (typeof item.enable !== 'boolean' || item.enable) {
        requestStr += joinTypeSingle(item)
      }
    })
  } else if (method === 'post' && requestBody.type !== 'none') {
    // POST请求，处理请求体
    const { jsonSchema, type, parameters } = requestBody
    if (type === 'application/x-www-form-urlencoded') {
      // 表单数据
      requestStr = handlerForm(parameters)
    } else {
      // JSON数据
      requestStr = handlerJsonScheme(jsonSchema, dataModel)
    }
  }

  // 处理响应类型
  if (Array.isArray(responses) && responses.length) {
    const { jsonSchema } = responses[0]
    const responseData = jsonSchema.properties[config.field]
    const dataType = responseData?.type
    if (!dataType && responseData && responseData.$ref) {
      // 引用类型
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = {${extractRefs(responseData.$ref, dataModel)}
      /** 任意合法数值 */
    [property: string]: any;
    }
      `
    } else if (Array.isArray(dataType)) {
      // 联合类型
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = ${dataType.join('|')}
      `
    } else if (dataType === 'array') {
      // 数组类型
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = {
      ${handlerJsonScheme(responseData.items, dataModel, true)}
      /** 任意合法数值 */
    [property: string]: any;
    }[]
      `
    } else if (dataType !== 'object') {
      // 基础类型
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = ${dataType || 'any'}
      `
    } else {
      // 对象类型
      responseStr = `
      export interface ${resName} {
      ${handlerJsonScheme(responseData, dataModel, true).replace('}[]', '\n/** 任意合法数值 */\n    [property: string]: any; }[] ')}
      /** 任意合法数值 */
    [property: string]: any;
    }
      `
    }
  }

  // 组合返回结果
  if (requestStr && responseStr) {
    return `
    export interface ${reqName} {
      ${requestStr}
    }

    ${responseStr}
  `
  } else if (requestStr) {
    return `
    export interface ${reqName} {
      ${requestStr}
    }
  `
  } else if (responseStr) {
    return `
    ${responseStr}
  `
  } else {
    return ''
  }
}
