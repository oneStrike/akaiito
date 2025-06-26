import { extractRefs } from '@/generateTypes'

/**
 * Schema项接口
 */
interface SchemaItem {
  id: string
  jsonSchema: {
    'properties': Record<string, any>
    'required'?: string[]
    'x-apifox-orders'?: string[]
  }
}

/**
 * 字段定义接口
 */
interface FieldDefinition {
  name: string
  type: any
  required: boolean
  array: boolean
  description?: string
}

/**
 * 格式化Schema数据
 * 将ApiFox的Schema数据转换为内部使用的格式
 * 采用两阶段处理解决引用依赖问题
 *
 * @param schemas - Schema数组
 * @returns 格式化后的Schema映射对象
 */
export function formatSchema(schemas: SchemaItem[]): Record<string, FieldDefinition[]> {
  const schemaMap: Record<string, FieldDefinition[]> = {}
  const pendingRefs: Array<{
    schemaKey: string
    fieldIndex: number
    refs: string[]
  }> = []

  // 第一阶段：处理所有非引用字段
  schemas.forEach((schemaItem) => {
    const { properties, required = [], 'x-apifox-orders': fieldOrders } = schemaItem.jsonSchema
    const fields: FieldDefinition[] = []

    // 按照ApiFox定义的字段顺序处理
    fieldOrders?.forEach((fieldName: string) => {
      const fieldProperty = properties[fieldName]
      if (!fieldProperty) return

      let fieldType = fieldProperty.type
      let isArray = false

      // 处理不同类型的字段
      if (fieldProperty.allOf) {
        // 延迟处理引用
        const refs = fieldProperty.allOf
          .map((item: any) => item.$ref)
          .filter(Boolean)
          .map((ref: string) => ref.replace('#/components/schemas/', ''))
        if (refs.length > 0) {
          pendingRefs.push({
            schemaKey: schemaItem.id,
            fieldIndex: fields.length,
            refs,
          })
          fieldType = 'pending' // 临时占位符
        }
      } else if (fieldType === 'object') {
        // 处理对象类型
        const nestedSchema = formatSchema([{
          id: 'temp',
          jsonSchema: fieldProperty,
        }])
        fieldType = nestedSchema.temp
      } else if (fieldType === 'array') {
        // 处理数组类型
        const itemType = fieldProperty.items.type
        isArray = true

        if (['array', 'object'].includes(itemType)) {
          const nestedSchema = formatSchema([{
            id: 'temp',
            jsonSchema: fieldProperty.items,
          }])
          fieldType = nestedSchema.temp
        } else {
          fieldType = itemType === 'integer' ? 'number' : itemType
        }
      } else if (Array.isArray(fieldType)) {
        // 处理联合类型
        fieldType = fieldType.join(' | ')
      } else if (fieldType === 'integer') {
        // 将integer转换为number
        fieldType = 'number'
      }

      // 添加字段定义
      fields.push({
        name: fieldName,
        type: fieldType,
        required: required.includes(fieldName),
        array: isArray,
        description: fieldProperty.description,
      })
    })

    schemaMap[schemaItem.id] = fields
  })

  // 第二阶段：解析延迟的引用
  for (const { schemaKey, fieldIndex, refs } of pendingRefs) {
    const typeString = extractRefs(refs[0], schemaMap)
    schemaMap[schemaKey][fieldIndex].type = `{${typeString}}`
  }

  return schemaMap
}
