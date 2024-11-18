import fs from 'fs-extra'
import prettier from 'prettier'
import { apis } from './apis'
import { getConfig } from './config'
import { formatApiTree } from './formatApiTree'
import { formatSchema } from './formatSchema'
import prettierConfig from './prettier.config'

getConfig().then(async (attConfig) => {
  const apiFoxApi = apis(attConfig.key)

  // 数据模型
  console.log('数据模型生成中...')
  const dataModel = formatSchema(await apiFoxApi.getSchemas())
  console.log('数据模型生成完毕...')
  console.log('接口生成中...')
  const apiTree = await apiFoxApi.getApiTree()
  const apiList = await formatApiTree(
    apiTree.filter((item: any) => !attConfig?.exclude.includes(item.folder?.id)),
    attConfig,
    apiFoxApi,
    dataModel,
  )

  for (const apiListKey in apiList) {
    let handlerValue = ''
    let typesValue = ''
    const apis = apiList[apiListKey].apis
    const imports = apiList[apiListKey].import
    // 请求文件的导入内容
    const importContent = `
   ${attConfig.http.import}
   import type { ${imports.join(',')} } from './types/${apiListKey}.d'
  `

    for (const idx in apis) {
      const item = apis[idx]
      handlerValue += item.comments + item.handler
      typesValue += item.comments + item.types
      console.log(`******************${item.name}********************`)
    }
    const handlerPrettierValue = await prettier.format(
      importContent + handlerValue,
      {
        parser: 'typescript',
        ...prettierConfig,
      },
    )
    const typesPrettierValue = await prettier.format(typesValue, {
      parser: 'typescript',
      ...prettierConfig,
    })
    // 写入请求文件数据
    fs.outputFileSync(
      `${attConfig.apiPath}/${apiListKey}.ts`,
      handlerPrettierValue,
      'utf-8',
    )
    // 写入请求类型数据
    fs.outputFileSync(
      `${attConfig.typingsPath}/${apiListKey}.d.ts`,
      typesPrettierValue,
      'utf-8',
    )
  }

  console.log('文件写入完成...')
  return dataModel
})
