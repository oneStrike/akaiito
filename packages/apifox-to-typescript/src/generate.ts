import fs from 'fs-extra'
import prettier from 'prettier'
import prettierConfig from './prettier.config'

import { getConfig } from './config'
import { apis } from './apis'
import { IterateObject } from '@akaiito/typings/src'
import { formatApi, formatSchema, conversion } from './utils'
export const generate = async () => {
  const config = await getConfig()

  //通用的schema
  const dataSchema: IterateObject = {}
  //api列表
  const apiList: IterateObject[] = []
  //api接口的tags
  const apiTags: IterateObject = {}

  const apifoxApi = await apis()
  const schema = await apifoxApi.getSchemas()
  schema.forEach((item: IterateObject) => {
    dataSchema[item.id] = formatSchema(item.jsonSchema, dataSchema)
  })
  const apiTree = await apifoxApi.getApiTree()
  formatApi(apiList, apiTags, apiTree, config.exclude)

  console.log(
    `************共抓取${apiList.length}条api，抓取详情信息中************`
  )

  const apiDetailArr = apiList.map((item: IterateObject) => {
    console.log(`************${item.name}************`)
    return apifoxApi.getApiDetail(item.api.id)
  })
  const apiDetail = await Promise.all(apiDetailArr)

  const api: IterateObject = {}
  const typings: IterateObject = {}

  apiDetail.forEach((item) => {
    item.tags = apiTags[item.id]
    if (item.method === 'get') {
      //请求
      item.requestScheme = item.parameters.query
    } else if (item.method === 'post') {
      //请求
      console.log(
        '🚀 ~ file:generate method: line:47 -----',
        item.requestBody.jsonSchema
      )
      if (item.requestBody.jsonSchema)
        item.requestScheme = formatSchema(
          item.requestBody.jsonSchema,
          dataSchema
        )
    }
    item.responseScheme = formatSchema(item.responses[0].jsonSchema, dataSchema)
    const options = conversion(item, config)
    if (!api[options.apiFullPath]) {
      api[options.apiFullPath] = {
        str: '',
        typings: [],
        importTypings: options.importTypings
      }
    }
    if (!typings[options.typingsFullPath]) {
      typings[options.typingsFullPath] = { str: '' }
    }
    api[options.apiFullPath].str += options.api
    api[options.apiFullPath].typings.push(options.typingsName)
    typings[options.typingsFullPath].str += options.typings
  })

  for (const apiKey in api) {
    const result =
      `
   ${config.http.import}
   import type { ${api[apiKey].typings.join(',')} } from '${
     api[apiKey].importTypings
   }'
  ` + api[apiKey].str

    const parse = await prettier.format(result, {
      parser: 'typescript',
      ...prettierConfig
    })

    fs.outputFileSync(apiKey, parse, 'utf-8')
  }

  for (const typingsKey in typings) {
    const parse = await prettier.format(typings[typingsKey].str, {
      parser: 'typescript',
      ...prettierConfig
    })
    fs.outputFileSync(typingsKey, parse, 'utf-8')
  }
  console.log('************api生成完毕************')
}
