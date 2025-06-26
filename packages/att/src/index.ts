import fs from 'fs-extra'
import prettier from 'prettier'
import { apis } from './apis'
import { getConfig } from './config'
import { formatApiTree } from './formatApiTree'
import { formatSchema } from './formatSchema'
import prettierConfig from './prettier.config'

/**
 * API代码生成器主入口
 * 从ApiFox获取API文档并生成TypeScript接口代码和类型定义
 */
async function generateApiCode() {
  try {
    // 获取配置信息
    const attConfig = await getConfig()
    const apiFoxApi = apis(attConfig.key!) as unknown as IterateObject<AsyncFn<any>>

    // 生成数据模型
    console.log('📦 数据模型生成中...')
    const dataModel = formatSchema(await apiFoxApi.getSchemas())
    console.log('✅ 数据模型生成完毕')

    // 获取并过滤API树
    console.log('🔄 接口生成中...')
    const apiTree = await apiFoxApi.getApiTree()
    const filteredApiTree = apiTree.filter(
      (item: any) => !attConfig?.exclude?.includes(item.folder.id),
    )

    // 格式化API树为代码结构
    const apiList = await formatApiTree(
      filteredApiTree,
      attConfig,
      apiFoxApi,
      dataModel,
    )

    // 生成并写入文件
    await generateFiles(apiList, attConfig)

    console.log('🎉 文件写入完成')
    return dataModel
  } catch (error) {
    console.error('❌ 生成过程中发生错误:', error)
    throw error
  }
}

/**
 * 生成API文件和类型定义文件
 * @param apiList - 格式化后的API列表
 * @param attConfig - 配置信息
 */
async function generateFiles(apiList: Record<string, any>, attConfig: any) {
  // 在写入文件之前先清空目录
  console.log('🧹 清空输出目录...')
  await fs.emptyDir(attConfig.apiPath)
  await fs.emptyDir(attConfig.typingsPath)
  console.log('✅ 目录清空完成')

  for (const [moduleKey, moduleData] of Object.entries(apiList)) {
    const { apis, import: imports } = moduleData

    // 构建文件内容
    const { handlerContent, typesContent } = buildFileContent(apis, imports, attConfig, moduleKey)

    // 格式化代码
    const formattedHandler = await formatCode(handlerContent)
    const formattedTypes = await formatCode(typesContent)

    // 写入文件
    await writeFiles(moduleKey, formattedHandler, formattedTypes, attConfig)

    // 输出进度信息
    console.log(`📝 已生成模块: ${moduleKey} (${apis.length} 个接口)`)
  }
}

/**
 * 构建文件内容
 * @param apis - API列表
 * @param imports - 导入类型列表
 * @param attConfig - 配置信息
 * @param moduleKey - 模块名称
 */
function buildFileContent(
  apis: any[],
  imports: string[],
  attConfig: any,
  moduleKey: string,
) {
  // 构建导入语句
  const importContent = `
    ${attConfig.http.import}
    import type { ${imports.join(', ')} } from './types/${moduleKey}.d'
  `

  // 构建处理器和类型内容
  let handlerValue = ''
  let typesValue = ''

  for (const api of apis) {
    handlerValue += api.comments + api.handler
    typesValue += api.comments + api.types
  }

  return {
    handlerContent: importContent + handlerValue,
    typesContent: typesValue,
  }
}

/**
 * 格式化代码
 * @param content - 待格式化的代码内容
 */
async function formatCode(content: string): Promise<string> {
  return prettier.format(content, {
    parser: 'typescript',
    ...prettierConfig,
  })
}

/**
 * 写入文件到磁盘
 * @param moduleKey - 模块名称
 * @param handlerContent - 处理器内容
 * @param typesContent - 类型定义内容
 * @param attConfig - 配置信息
 */
async function writeFiles(
  moduleKey: string,
  handlerContent: string,
  typesContent: string,
  attConfig: any,
) {
  // 写入API处理器文件
  fs.outputFileSync(
    `${attConfig.apiPath}/${moduleKey}.ts`,
    handlerContent,
    'utf-8',
  )

  // 写入类型定义文件
  fs.outputFileSync(
    `${attConfig.typingsPath}/${moduleKey}.d.ts`,
    typesContent,
    'utf-8',
  )
}

// 启动代码生成
generateApiCode().catch(console.error)
