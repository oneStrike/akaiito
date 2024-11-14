function joinType(item: IterateObject) {
  return `
          /* ${item.description || ''} */
          ${item.name}${item.required ? '' : '?'}: ${Array.isArray(item.type) ? item.type.join('|') : item.type}
        `
}

function extractRefs(refs: IterateObject, dataModel: IterateObject) {
  let typesStr = ''
  if (refs && Object.keys(refs).length) {
    for (const refKey in refs) {
      const { $ref, 'x-apifox-overrides': overrides = {} } = refs[refKey]
      const schemaId = $ref.split('/').pop()
      const commonSchema = dataModel[schemaId]
      if (Array.isArray(commonSchema)) {
        const overridesField = Object.keys(overrides)
        commonSchema
          .filter((item: IterateObject) => !overridesField.includes(item.name))
          .forEach((item: IterateObject) => {
            typesStr += joinType(item)
          })
      }
    }
  }
  return typesStr
}

function handlerJsonScheme(jsonSchema: IterateObject, dataModel: IterateObject, isRes = false) {
  let typesStr = ''
  if (jsonSchema) {
    const { properties, 'x-apifox-refs': refs } = jsonSchema
    if (Object.keys(properties).length) {
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
          typesStr += `${propertiesKey}:{${handlerJsonScheme(item.items, dataModel, isRes)}}[]`
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
    if (refs && Object.keys(refs).length) {
      typesStr += extractRefs(refs, dataModel)
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
  if (method === 'get' && Object.keys(parameters).length) {
    const { query } = parameters
    query.forEach((item: IterateObject) => {
      if (item.enable) {
        requestStr += joinType(item)
      }
    })
  } else if (method === 'post' && requestBody.tyep !== 'none') {
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
    if (Array.isArray(dataType)) {
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
  return `
    export interface ${reqName} {
      ${requestStr}
    }

    ${responseStr}
  `
}
