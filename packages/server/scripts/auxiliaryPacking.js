// 导入必要的模块
import { join } from 'node:path'
import fs from 'fs-extra'
import project from 'config/config.project.json'

// 定义辅助函数用于 Docker 部署
export default async function deployHelper() {
  // 设置目标和源目录路径
  const target = join(import.meta.url, '../dist/').replace(/\\/g, '/')
  const source = join(import.meta.url, '../').replace(/\\/g, '/')

  // 需要复制的文件列表
  const dependencies = ['src', 'prisma', 'package.json', 'bootstrap.js', '.env']

  // 复制指定文件到目标目录
  dependencies.forEach(item => {
    fs.copySync(`${source}${item}`, `${target}${item}`)
  })

  // 读取 dist 目录下的 package.json 文件
  let packageJson = await fs.readJson(join(target, 'package.json'))

  // 删除 package.json 中本地包的依赖项
  for (const key in packageJson.dependencies) {
    if (key.includes('@' + project.appName)) {
      delete packageJson.dependencies[key]
    }
  }
  for (const key in packageJson.devDependencies) {
    if (key.includes('@' + project.appName)) {
      delete packageJson.devDependencies[key]
    }
  }

  // 写回更新后的 package.json 文件
  await fs.writeJson(join(target, 'package.json'), packageJson, { spaces: 2 })
}
