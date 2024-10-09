import type { AsyncFn, IterateObject } from '@auy/types'
import { generateTypes } from '@/generateTypes'
import dayjs from 'dayjs'

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatApiIntroduce(api: IterateObject) {
  return `
            /**
             *  接口 [${api.name}](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-${api.id})
             *  @标签 ${api.folderPath}
             *  @方式 ${api.method.toUpperCase()}
             *  @地址 ${api.path}
             *  @更新时间 ${dayjs(api.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
             */
      `
}

function formatName(path: string) {
  const pathArr = path.split('/')
  const lastPath = pathArr[pathArr.length - 1]
  const apiName = `${lastPath}Api`

  return {
    handler: apiName,
    request: `${capitalizeFirstLetter(lastPath)}TypesReq`,
    response: `${capitalizeFirstLetter(lastPath)}TypesRes`,
  }
}

function formatApiHandler(api: IterateObject) {
  const { handler, request, response } = formatName(api.path)

  let payload = ''
  if (api.method === 'get') {
    if (Object.keys(api.parameters).length) {
      payload = `params:${request}`
    }
  } else if (api.method === 'post') {
    payload = `data:${request}`
  }

  return `
  export const ${handler} = (${payload}):Promise<${response}> =>{
      return ${api.http.client}({
        method: '${api.method.toUpperCase()}',
        url: '${api.path}',
        ${payload ? (api.method === 'get' ? 'params' : 'data') : ''}
      })
    }
  `
}

export async function formatApiTree(
  apiTree: IterateObject[],
  config: IterateObject,
  apis: IterateObject<AsyncFn>,
  dataModel: IterateObject,
) {
  const apiPath: string[] = []
  const apiList: IterateObject = {}

  const { exclude } = config
  const { getApiDetail } = apis

  async function formatApi(apis: IterateObject[]) {
    for (const apisKey in apis) {
      const { type, folder, children, api } = apis[apisKey]
      if (exclude.includes(folder?.id)) return
      if (type === 'apiDetailFolder' && Array.isArray(children) && children.length) {
        apiPath.push(folder.name)
        if (Array.isArray(children) && children.length) {
          await formatApi(children)
        }
      } else if (type === 'apiDetail') {
        const folderName = api.path.split('/').at(-2)

        if (!apiList[folderName]) {
          apiList[folderName] = {
            apis: [],
            import: [],
          }
        }

        // 获取接口类型的请求和相应类型名称
        const { request, response } = formatName(api.path)
        // 获取接口的详细数据
        const detail = await getApiDetail(api.id)
        // 生成接口注释信息
        const comments = formatApiIntroduce({ ...detail, folderPath: `${apiPath.join('/')}/${api.name}` })
        // 生成接口的请求方法
        const handler = formatApiHandler({ ...detail, ...config })
        // 生成接口的类型信息
        const types = generateTypes(detail, request, response, dataModel, config)
        apiList[folderName].import.push(response)
        if (detail.method === 'post' || Object.keys(detail.parameters).length) {
          apiList[folderName].import.push(request)
        }
        apiList[folderName].apis.push({
          comments,
          handler,
          types,
          name: api.name,
        })
      }
      if (Number(apisKey) + 1 === apis.length) {
        apiPath.length = 0
      }
    }
  }

  await formatApi(apiTree)
  return apiList
}
