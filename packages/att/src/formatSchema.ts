export function formatSchema(schemas: IterateObject[]) {
  const schemaArr: IterateObject = {}
  schemas.forEach((item) => {
    const { properties, required, 'x-apifox-orders': orders } = item.jsonSchema
    if (!orders) {
      console.log(item.jsonSchema)
    }
    orders.forEach((field: string) => {
      let type = properties[field]?.type
      let isArray = false
      if (!Array.isArray(schemaArr[item.id])) {
        schemaArr[item.id] = []
      }

      if (type === 'object') {
        type = formatSchema([{ jsonSchema: properties[field] }]).undefined
      } else if (type === 'array') {
        const itemType = properties[field].items.type

        isArray = true
        if (['array', 'object'].includes(itemType)) {
          type = formatSchema([
            { jsonSchema: properties[field].items },
          ]).undefined
        } else {
          type = [itemType]
        }
      } else if (Array.isArray(type)) {
        type = type.join(' | ')
      }
      schemaArr[item.id].push({
        name: field,
        type,
        required: required.includes(field),
        array: isArray,
        description: properties[field].description,
      })
    })
  })
  return schemaArr
}
