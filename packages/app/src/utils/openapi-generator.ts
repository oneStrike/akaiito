import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

interface OpenAPISpec {
  openapi: string
  info: any
  paths: Record<string, Record<string, any>>
  components?: {
    schemas?: Record<string, any>
  }
}

interface GeneratedFile {
  fileName: string
  content: string
  types: string
}

/**
 * OpenAPI代码生成器
 */
export class OpenAPIGenerator {
  private spec: OpenAPISpec | null = null

  /**
   * 获取OpenAPI文档
   */
  async fetchOpenAPISpec(url: string): Promise<OpenAPISpec | null> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`)
      }
      this.spec = await response.json()
      return this.spec
    } catch (error) {
      console.error('Error fetching OpenAPI spec:', error)
      throw error
    }
  }

  /**
   * 生成API代码
   */
  generateAPICode(): GeneratedFile[] {
    if (!this.spec) {
      throw new Error('OpenAPI spec not loaded')
    }

    const files: GeneratedFile[] = []
    const groupedPaths = this.groupPathsByModule()

    for (const [moduleName, paths] of Object.entries(groupedPaths)) {
      const { apiContent, typesContent } = this.generateModuleCode(
        moduleName,
        paths,
      )

      files.push({
        fileName: `${moduleName}.ts`,
        content: apiContent,
        types: typesContent,
      })
    }

    return files
  }

  /**
   * 按模块分组路径
   */
  private groupPathsByModule(): Record<
    string,
    Array<{ path: string; method: string; operation: any }>
  > {
    const grouped: Record<
      string,
      Array<{ path: string; method: string; operation: any }>
    > = {}

    for (const [path, methods] of Object.entries(this.spec!.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (typeof operation !== 'object') continue

        const pathParts = path.split('/').filter(Boolean)
        if (pathParts.length < 1) continue

        // 使用倒数第二个路径段作为模块名
        const secondLast =
          pathParts[pathParts.length - 2] ||
          pathParts[pathParts.length - 1] ||
          'default'
        const moduleName = this.toCamelCase(secondLast)

        if (!grouped[moduleName]) {
          grouped[moduleName] = []
        }

        grouped[moduleName].push({
          path,
          method: method.toUpperCase(),
          operation,
        })
      }
    }

    return grouped
  }

  /**
   * 生成模块代码
   */
  private generateModuleCode(
    moduleName: string,
    paths: Array<{ path: string; method: string; operation: any }>,
  ) {
    const imports = new Set<string>()
    const apiMethods: string[] = []
    const typeDefinitions: string[] = []
    const referencedTypes = new Set<string>()

    for (const { path, method, operation } of paths) {
      const { methodName, requestType, responseType } = this.generateMethodInfo(
        path,
        method,
        operation,
      )

      // 检查是否需要参数
      const hasParams = this.hasRequestParams(method, operation)

      // 生成请求类型定义（仅当有参数时）
      if (hasParams) {
        const requestTypeDef = this.generateRequestType(requestType, operation)
        if (requestTypeDef) {
          typeDefinitions.push(requestTypeDef)
          imports.add(requestType)
          // 收集引用的类型
          this.collectReferencedTypes(
            operation.requestBody?.content?.['application/json']?.schema,
            referencedTypes,
          )
          if (operation.parameters) {
            operation.parameters.forEach((param: any) => {
              this.collectReferencedTypes(param.schema, referencedTypes)
            })
          }
        }
      }

      // 生成响应类型定义
      if (operation.responses && operation.responses['200']) {
        const responseTypeDef = this.generateResponseType(
          responseType,
          operation.responses['200'],
        )
        if (responseTypeDef) {
          typeDefinitions.push(responseTypeDef)
          imports.add(responseType)
          // 收集引用的类型
          this.collectReferencedTypes(
            operation.responses['200'].content?.['application/json']?.schema,
            referencedTypes,
          )
        }
      }

      // 生成API方法
      const apiMethod = this.generateAPIMethod(
        methodName,
        path,
        method,
        operation,
        hasParams ? requestType : null,
        responseType,
      )
      apiMethods.push(apiMethod)
    }

    // 生成引用的类型定义
    for (const typeName of referencedTypes) {
      const schemaTypeDef = this.generateSchemaType(typeName)
      if (schemaTypeDef) {
        typeDefinitions.push(schemaTypeDef)
        imports.add(typeName)
      }
    }

    // 生成导入语句
    const importStatements =
      Array.from(imports).length > 0
        ? `import type {\n  ${Array.from(imports).join(',\n  ')}\n} from './types/${moduleName}.d'\n\n`
        : ''

    const apiContent = `import { httpHandler } from '@/utils/request'\n${importStatements}${apiMethods.join('\n\n')}\n`

    const typesContent = typeDefinitions.join('\n\n')

    return { apiContent, typesContent }
  }

  /**
   * 收集引用的类型
   */
  private collectReferencedTypes(
    schema: any,
    referencedTypes: Set<string>,
  ): void {
    if (!schema) return

    if (schema.$ref) {
      const typeName = this.resolveRef(schema.$ref)
      referencedTypes.add(typeName)
    } else if (schema.type === 'array' && schema.items) {
      this.collectReferencedTypes(schema.items, referencedTypes)
    } else if (schema.type === 'object' && schema.properties) {
      for (const prop of Object.values(schema.properties)) {
        this.collectReferencedTypes(prop, referencedTypes)
      }
    }
  }

  /**
   * 生成 schema 类型定义
   */
  private generateSchemaType(typeName: string): string | null {
    if (!this.spec?.components?.schemas?.[typeName]) return null

    const schema = this.spec.components.schemas[typeName]

    // 检查是否是基础类型数组
    if (schema.type === 'array') {
      const itemType = this.mapSchemaToType(schema.items)
      const comment = `/**
 *  类型定义 [${typeName}]
 *  @来源 components.schemas
 *  @更新时间 ${new Date()
   .toLocaleString('zh-CN', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
   })
   .replace(/\//g, '-')}
 */`
      return `${comment}
export type ${typeName} = ${itemType}[]`
    }

    // 检查是否是基础类型
    if (schema.type && ['string', 'number', 'integer', 'boolean'].includes(schema.type)) {
      const baseType = this.mapSchemaToType(schema)
      const comment = `/**
 *  类型定义 [${typeName}]
 *  @来源 components.schemas
 *  @更新时间 ${new Date()
   .toLocaleString('zh-CN', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
   })
   .replace(/\//g, '-')}
 */`
      return `${comment}
export type ${typeName} = ${baseType}`
    }

    const properties = this.generatePropertiesFromSchema(schema)

    if (properties.length === 0) return null

    const comment = `/**
 *  类型定义 [${typeName}]
 *  @来源 components.schemas
 *  @更新时间 ${new Date()
   .toLocaleString('zh-CN', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
   })
   .replace(/\//g, '-')}
 */`

    // 只有对象类型才添加索引签名
    return `${comment}
export type ${typeName} = {
${properties.join('\n')}

  /** 任意合法数值 */
  [property: string]: any
}`
  }

  /**
   * 检查接口是否需要参数
   */
  private hasRequestParams(method: string, operation: any): boolean {
    // 检查是否有请求体
    if (operation.requestBody?.content?.['application/json']?.schema) {
      return true
    }

    // 检查是否有查询参数或路径参数
    if (operation.parameters && operation.parameters.length > 0) {
      return operation.parameters.some(
        (param: any) => param.in === 'query' || param.in === 'path',
      )
    }

    return false
  }

  /**
   * 生成方法信息
   */
  private generateMethodInfo(path: string, method: string, operation: any) {
    const pathParts = path.split('/').filter(Boolean)
    const secondLast = pathParts[pathParts.length - 2] || ''
    const last = pathParts[pathParts.length - 1] || ''

    // 方法名使用倒数第二个和最后一个路径段合并
    const methodName = this.toCamelCase(`${secondLast}-${last}`)
    const requestType = `${this.toPascalCase(methodName)}Request`
    const responseType = `${this.toPascalCase(methodName)}Response`

    return { methodName, requestType, responseType }
  }

  /**
   * 生成API方法
   */
  private generateAPIMethod(
    methodName: string,
    path: string,
    method: string,
    operation: any,
    requestType: string | null,
    responseType: string,
  ): string {
    const hasParams = requestType !== null
    const tag = operation.tags?.[0] || ''
    const summary = operation.summary || ''
    const updateTime = new Date()
      .toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\//g, '-')

    const comment = `/**
 *  @标签 ${tag}/${summary}
 *  @方式 ${method}
 *  @地址 ${path}
 *  @更新时间 ${updateTime}
 */`

    const paramType = hasParams ? `params: ${requestType}` : ''
    const returnType = `Promise<${responseType}>`

    let requestConfig = ''
    if (method === 'GET') {
      requestConfig = `{
    method: '${method}',
    url: '${path}',
    headers: {},${hasParams ? '\n    params,' : ''}
  }`
    } else {
      requestConfig = `{
    method: '${method}',
    url: '${path}',
    headers: {},${hasParams ? '\n    data: params,' : ''}
  }`
    }

    return `${comment}
export const ${methodName}Api = (${paramType}): ${returnType} => {
  return httpHandler(${requestConfig})
}`
  }

  /**
   * 生成请求类型
   */
  private generateRequestType(typeName: string, operation: any): string | null {
    const properties: string[] = []

    // 处理查询参数
    if (operation.parameters) {
      for (const param of operation.parameters) {
        if (param.in === 'query' || param.in === 'path') {
          const required = param.required ? '' : '?'
          const type = this.mapOpenAPIType(param.schema?.type || 'string')
          const description = param.description
            ? `/* ${param.description} */`
            : ''
          properties.push(
            `  ${description}\n  ${param.name}${required}: ${type}`,
          )
        }
      }
    }

    // 处理请求体
    if (operation.requestBody?.content?.['application/json']?.schema) {
      const schema = operation.requestBody.content['application/json'].schema
      const bodyProps = this.generatePropertiesFromSchema(schema)
      properties.push(...bodyProps)
    }

    if (properties.length === 0) return null

    const comment = `/**
 *  接口 [${operation.summary || ''}]
 *  @标签 ${operation.tags?.[0] || ''}/${operation.summary || ''}
 *  @方式 ${operation.method?.toUpperCase() || ''}
 *  @地址 ${operation.path || ''}
 *  @更新时间 ${new Date()
   .toLocaleString('zh-CN', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
   })
   .replace(/\//g, '-')}
 */`

    return `${comment}
export interface ${typeName} {
${properties.join('\n\n')}

  /** 任意合法数值 */
  [property: string]: any
}`
  }

  /**
   * 生成响应类型
   */
  private generateResponseType(typeName: string, response: any): string | null {
    if (!response.content?.['application/json']?.schema) return null

    const schema = response.content['application/json'].schema

    // 只解析data字段的数据
    let dataSchema = schema
    if (schema.properties?.data) {
      dataSchema = schema.properties.data
    }

    // 检查是否是基础类型数组
    if (dataSchema.type === 'array') {
      const itemType = this.mapSchemaToType(dataSchema.items)
      // 对于基础类型数组，直接返回类型别名，不需要索引签名
      return `export type ${typeName} = ${itemType}[]`
    }

    // 检查是否是基础类型
    if (dataSchema.type && ['string', 'number', 'integer', 'boolean'].includes(dataSchema.type)) {
      const baseType = this.mapSchemaToType(dataSchema)
      return `export type ${typeName} = ${baseType}`
    }

    // 检查是否是引用类型
    if (dataSchema.$ref) {
      const refType = this.resolveRef(dataSchema.$ref)
      return `export type ${typeName} = ${refType}`
    }

    const properties = this.generatePropertiesFromSchema(dataSchema)

    if (properties.length === 0) return null

    // 只有对象类型才添加索引签名
    return `export type ${typeName} = {
${properties.join('\n\n')}

  /** 任意合法数值 */
  [property: string]: any
}`
  }

  /**
   * 从schema生成属性
   */
  private generatePropertiesFromSchema(schema: any): string[] {
    const properties: string[] = []

    // 处理 $ref 引用
    if (schema.$ref) {
      // 如果是引用类型，直接返回引用的类型名
      return [`  /* 引用类型 */\n  data: ${this.resolveRef(schema.$ref)}`]
    }

    if (schema.type === 'object' && schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const prop = propSchema as any
        const required = schema.required?.includes(propName) ? '' : '?'
        const type = this.mapSchemaToType(prop)
        const description = prop.description ? `/* ${prop.description} */` : ''
        properties.push(`  ${description}\n  ${propName}${required}: ${type}`)
      }
    } else if (schema.type === 'array') {
      // 处理数组类型
      const itemType = this.mapSchemaToType(schema.items)
      return [`  /* 数组数据 */\n  items: ${itemType}[]`]
    }

    return properties
  }

  /**
   * 映射schema到TypeScript类型
   */
  private mapSchemaToType(schema: any): string {
    if (!schema) return 'any'

    // 处理 $ref 引用
    if (schema.$ref) {
      return this.resolveRef(schema.$ref)
    }

    switch (schema.type) {
      case 'string':
        return 'string'
      case 'number':
      case 'integer':
        return 'number'
      case 'boolean':
        return 'boolean'
      case 'array':
        return `${this.mapSchemaToType(schema.items)}[]`
      case 'object':
        if (schema.properties) {
          const props = this.generatePropertiesFromSchema(schema)
          return `{\n${props.join('\n')}\n  }`
        }
        return 'Record<string, any>'
      default:
        return 'any'
    }
  }

  /**
   * 解析 $ref 引用
   */
  private resolveRef(ref: string): string {
    // 从 $ref 中提取类型名称
    // 例如: "#/components/schemas/AuthorDetailResponse" -> "AuthorDetailResponse"
    const parts = ref.split('/')
    const typeName = parts[parts.length - 1]
    return typeName
  }

  /**
   * 映射OpenAPI类型到TypeScript类型
   */
  private mapOpenAPIType(type: string): string {
    switch (type) {
      case 'string':
        return 'string'
      case 'number':
      case 'integer':
        return 'number'
      case 'boolean':
        return 'boolean'
      case 'array':
        return 'any[]'
      case 'object':
        return 'Record<string, any>'
      default:
        return 'any'
    }
  }

  /**
   * 转换为驼峰命名
   */
  private toCamelCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^[A-Z]/, (char) => char.toLowerCase())
  }

  /**
   * 转换为帕斯卡命名
   */
  private toPascalCase(str: string): string {
    const camelCase = this.toCamelCase(str)
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
  }
}

/**
 * 清空目录中的所有文件
 */
async function clearDirectory(dirPath: string): Promise<void> {
  try {
    const files = await fs.readdir(dirPath)
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stat = await fs.stat(filePath)
      if (stat.isDirectory()) {
        await clearDirectory(filePath)
        await fs.rmdir(filePath)
      } else {
        await fs.unlink(filePath)
      }
    }
    console.log(`已清空目录: ${dirPath}`)
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error('清空目录失败:', error)
    }
  }
}

/**
 * 确保目录存在
 */
async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    console.error('创建目录失败:', error)
  }
}

/**
 * 写入文件
 */
async function writeFile(filePath: string, content: string): Promise<void> {
  try {
    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`已生成文件: ${filePath}`)
  } catch (error) {
    console.error(`写入文件失败 ${filePath}:`, error)
  }
}

/**
 * 生成API代码的主函数
 */
export async function generateAPIFromOpenAPI(
  openApiUrl: string,
  outputDir: string,
): Promise<GeneratedFile[]> {
  const generator = new OpenAPIGenerator()

  try {
    // 获取OpenAPI文档
    console.log('正在获取OpenAPI文档...')
    await generator.fetchOpenAPISpec(openApiUrl)

    // 生成代码
    console.log('正在生成API代码...')
    const files = generator.generateAPICode()

    return files
  } catch (error) {
    console.error('生成API代码失败:', error)
    throw error
  }
}

/**
 * 生成API代码的主函数
 */
export async function generateAPI(): Promise<void> {
  const openApiUrl = 'http://127.0.0.1:4523/export/openapi/3?version=3.0'
  const outputDir = path.resolve(process.cwd(), 'src/apis')
  const typesDir = path.join(outputDir, 'types')

  try {
    console.log('开始生成API代码...')

    // 清空现有文件
    await clearDirectory(outputDir)

    // 确保目录存在
    await ensureDirectory(outputDir)
    await ensureDirectory(typesDir)

    // 生成代码
    const files = await generateAPIFromOpenAPI(openApiUrl, outputDir)

    // 写入文件
    for (const file of files) {
      // 写入API文件
      const apiFilePath = path.join(outputDir, file.fileName)
      await writeFile(apiFilePath, file.content)

      // 写入类型文件
      if (file.types) {
        const typeFileName = file.fileName.replace('.ts', '.d.ts')
        const typeFilePath = path.join(typesDir, typeFileName)
        await writeFile(typeFilePath, file.types)
      }
    }

    // 生成索引文件
    const indexContent = `${files
      .map((file) => `export * from './${file.fileName.replace('.ts', '')}'`)
      .join('\n')}\n`

    await writeFile(path.join(outputDir, 'index.ts'), indexContent)

    console.log(`✅ API代码生成完成！共生成 ${files.length} 个模块`)
  } catch (error) {
    console.error('❌ API代码生成失败:', error)
    throw error
  }
}

// 如果直接运行此脚本
if (process.argv[1] && process.argv[1].endsWith('openapi-generator.ts')) {
  generateAPI().catch(console.error)
}
