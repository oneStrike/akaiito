function joinType(item: IterateObject) {
  if (!item) {
    return ''
  }
  let type = ''
  if (Array.isArray(item?.type)) {
    if (Array.isArray(item.type[0])) {
      item.type[0].forEach((itemType) => {
        type += joinType(itemType)
      })
      type = `{${type}}[]`
    } else if (typeof item?.type[0] !== 'string') {
      item.type.forEach((itemType) => {
        type += joinType(itemType)
      })
      type = `{${type}}`
    } else if (item.type) {
      console.log(item)
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

function handlerRefs(refs: string, dataModel: IterateObject, overrides?: IterateObject) {
  let typesStr = ''
  const schemaId = refs?.split('/').pop() || ''
  const commonSchema = dataModel[schemaId]
  if (Array.isArray(commonSchema)) {
    const overridesField = Object.keys(overrides || {})
    commonSchema
      .filter((item: IterateObject) => !overridesField.includes(item.name))
      .forEach((item: IterateObject) => {
        typesStr += joinType({ ...item })
      })
  }
  return typesStr
}

function extractRefs(refs: string | IterateObject, dataModel: IterateObject, isArray = false) {
  let typesStr = ''
  if (typeof refs === 'string') {
    typesStr = handlerRefs(refs, dataModel)
  } else if (refs && Object.keys(refs).length) {
    for (const refKey in refs) {
      const { $ref, 'x-apifox-overrides': overrides = {} } = refs[refKey]
      typesStr += typesStr = handlerRefs($ref, dataModel, overrides)
    }
  }
  return typesStr
}

function handlerJsonScheme(
  jsonSchema: IterateObject,
  dataModel: IterateObject,
  isRes = false,
) {
  let typesStr = ''
  if (jsonSchema) {
    const { properties, 'x-apifox-refs': apifoxRefs, $ref } = jsonSchema
    if (properties && Object.keys(properties).length) {
      for (const propertiesKey in properties) {
        const item = properties[propertiesKey]
        if (item.type === 'object') {
          if (item.properties && Object.keys(item.properties)) {
            typesStr += `
              /* ${item.description} */
              ${propertiesKey}: {
                ${handlerJsonScheme(item, dataModel, isRes)}
              }
            `
          } else {
            const subRefs = item['x-apifox-refs']
            if (subRefs && Object.keys(subRefs).length) {
              typesStr += extractRefs(subRefs, dataModel)
            }
          }
        } else if (item.type === 'array') {
          if (item.items.type === 'object') {
            typesStr += `${propertiesKey}:{${handlerJsonScheme(item.items, dataModel, isRes)}}[]`
          } else {
            typesStr += `
              /* ${item.description || ''} */
            ${propertiesKey}:${item.items.type}[]`
          }
        } else {
          typesStr += joinType({
            name: propertiesKey,
            type: item.type,
            description: item.description,
            required: true,
            array: false,
          })
        }
      }
    }
    if ($ref) {
      typesStr += extractRefs($ref, dataModel)
    } else if (apifoxRefs && Object.keys(apifoxRefs).length) {
      typesStr += extractRefs(apifoxRefs, dataModel)
    }
  }
  return typesStr
}

function handlerForm(parameters: any[]) {
  let typeStr = ''
  parameters.forEach((item) => {
    typeStr += `
              /* ${item.description} */
              ${item.name + (item.required ? '' : '?')}: ${item.type}
            `
  })
  return typeStr
}

export function isEmptyQuery(api: IterateObject) {
  const { parameters, method, requestBody } = api
  return !!(method === 'get' && requestBody.type === 'none' && Object.keys(parameters).length && !parameters.query.length)
}

export function generateTypes(
  api: IterateObject,
  reqName: string,
  resName: string,
  dataModel: IterateObject,
  config: IterateObject,
) {
  const { parameters, method, requestBody, responses } = api
  let requestStr = ''
  let responseStr = ''
  // get请求，并且有参数
  if (method === 'get' && !isEmptyQuery(api)) {
    const { query } = parameters
    query.forEach((item: IterateObject) => {
      if (item.enable) {
        requestStr += joinType(item)
      }
    })
  } else if (method === 'post' && requestBody.type !== 'none') {
    // 处理post请求
    const { jsonSchema, type, parameters } = requestBody
    if (type === 'application/x-www-form-urlencoded') {
      requestStr = handlerForm(parameters)
    } else {
      requestStr = handlerJsonScheme(jsonSchema, dataModel)
    }
  }

  // 处理响应结果
  if (Array.isArray(responses) && responses.length) {
    const { jsonSchema } = responses[0]
    const responseData = jsonSchema.properties[config.field]
    const dataType = responseData?.type
    if (resName === 'GetAdminUserPageTypesRes') {
      console.log(jsonSchema)
    }
    if (!dataType && responseData && responseData.$ref) {
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = {${extractRefs(responseData.$ref, dataModel)}}
      `
    } else if (Array.isArray(dataType)) {
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = ${dataType.join('|')}
      `
    } else if (dataType === 'array') {
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = {
      ${handlerJsonScheme(responseData.items, dataModel, true)}
    }[]
      `
    } else if (dataType !== 'object') {
      responseStr = `
      /* ${responseData?.description || ''} */
      export type ${resName} = ${dataType || 'any'}
      `
    } else {
      responseStr = `
      export interface ${resName} {
      ${handlerJsonScheme(responseData, dataModel, true)}
    }
      `
    }
  }

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
