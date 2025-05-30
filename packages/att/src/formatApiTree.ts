import dayjs from 'dayjs'
import { generateTypes, isEmptyQuery } from '@/generateTypes'

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

const getName = (path: string, depth = 1): string => {
  const pathArr = path.split('/')
  const applyArr = pathArr.slice(-depth)
  const pathName = applyArr.map((item, idx) => (idx === 0 ? item : capitalizeFirstLetter(item))).join('')
  if (Number.isNaN(Number(pathName))) {
    return pathName
  } else if (pathArr.length === applyArr.length) {
    return `remedy${pathName}`
  } else {
    return getName(path, depth + 1)
  }
}

function formatName(path: string, nameDepth: number) {
  const name = getName(path, nameDepth)
  const apiName = `${name}Api`

  return {
    handler: apiName,
    request: `${capitalizeFirstLetter(name)}TypesReq`,
    response: `${capitalizeFirstLetter(name)}TypesRes`,
  }
}

function formatApiHandler(api: IterateObject) {
  const { handler, request, response } = formatName(api.path, api.nameDepth)
  let payload = ''
  if (api.method === 'get') {
    if (Object.keys(api.parameters).length && api.parameters.query.length) {
      payload = `params:${request}`
    }
  } else if (api.method === 'post') {
    payload = `data:${request}`
  }
  let header = '{}'
  if (api.requestBody.type !== 'none') {
    header = `{
      'Content-Type':'${api.requestBody.type}'
    }`
  }
  return `
  export const ${handler} = (${payload}):Promise<${response}> =>{
      return ${api.http.handler}({
        method: '${api.method.toUpperCase()}',
        url: '${api.path}',
        ${api.headerField}:${header},
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
  const { getApiDetail } = apis

  async function formatApi(apis: IterateObject[]) {
    for (let i = 0; i < apis.length; i++) {
      const { type, folder, children, api } = apis[i]
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
        const { request, response } = formatName(api.path, config.nameDepth)
        // 获取接口的详细数据
        const detail = await getApiDetail(api.id)
        // 生成接口注释信息
        const comments = formatApiIntroduce({
          ...detail,
          folderPath: `${apiPath.join('/')}/${api.name}`,
        })
        // 生成接口的请求方法
        const handler = formatApiHandler({ ...detail, ...config })
        // 生成接口的类型信息
        const types = generateTypes(detail, request, response, dataModel, config)
        apiList[folderName].import.push(response)
        if (!isEmptyQuery(detail)) {
          apiList[folderName].import.push(request)
        }
        apiList[folderName].apis.push({
          comments,
          handler,
          types,
          name: api.name,
        })
      }
      if (Number(i) + 1 === apis.length) {
        apiPath.length = 0
      }
    }
  }

  await formatApi(apiTree)
  return apiList
}
