import * as https from 'node:https'
import * as fs from 'node:fs'
import * as path from 'node:path'

import { iconMapping } from '../../es-icons/icon-mapping'
import type { IterateObject } from '@akaiito/typings/src'

const svgList: {
  local: boolean
  name: string
  sourceName: string
  data: string
  url: string
}[] = []

function encodeSvg(svg: string) {
  const res = svg
    .replace(
      '<svg',
      ~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
  return `url("data:image/svg+xml;utf8,${res}")`
}

//下载svg数据
const downloadSvg = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        // 初始化一个空的data字符串来存储响应数据
        let data = ''

        // 每当有数据块（chunk）可读时，就会触发'data'事件
        res.on('data', (chunk) => {
          data += chunk // 将接收到的数据块拼接到data字符串上
        })

        // 当所有数据都已接收完毕时，会触发'end'事件
        res.on('end', () => {
          resolve(data)
        })

        // 可以在这里检查状态码，例如：
        if (res.statusCode !== 200) {
          console.error(`请求失败，状态码: ${res.statusCode}`)
        }
      })
      .on('error', (err) => {
        // 处理请求过程中可能出现的错误
        console.error(`请求发生错误: ${err.message}`)
      })
  })
}

//解析远程svg数据
const parasRemoteSvg = async () => {
  if (!Object.keys(iconMapping).length) return
  for (const iconMappingKey in iconMapping) {
    const sourceName = iconMapping[iconMappingKey as keyof typeof iconMapping]
    const url = 'https://api.iconify.design/' + sourceName + '.svg'
    svgList.push({
      local: false,
      name: iconMappingKey,
      sourceName: sourceName,
      data: encodeSvg(await downloadSvg(url)),
      url
    })
  }
}

//获取本地svg数据
const parseLocalSvg = (iconPath: string) => {
  // 假设 iconPath 是相对于当前工作目录的文件夹路径
  const iconFolderPath = path.join(process.cwd(), iconPath)

  // 使用readdirSync同步读取文件夹，因为需要遍历文件
  const svgFiles = fs.readdirSync(iconFolderPath)

  svgFiles
    .filter((fileName) => path.extname(fileName) === '.svg')
    .forEach((fileName) => {
      const filePath = path.join(iconFolderPath, fileName)
      try {
        const svgContent = fs.readFileSync(filePath, 'utf-8')
        svgList.push({
          local: true,
          name: fileName.split('.')[0],
          sourceName: '',
          data: encodeSvg(svgContent),
          url: filePath
        })
      } catch (error) {
        console.error(`无法读取文件 ${filePath}:`, error)
        return null
      }
    })
}

const persistData = () => {
  const filePath = path.join(__dirname, '../../es-icons/es-icons.json')
  const jsonData: IterateObject = {}
  svgList.forEach((item) => {
    jsonData[item.name] = item
  })
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
}

export const generateIcon = async (iconPath: string) => {
  iconPath && parseLocalSvg(iconPath)
  await parasRemoteSvg()
  persistData()
}
