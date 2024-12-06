export function formatSchema(schemas: IterateObject[]) {
  const schemaArr: IterateObject = {}
  schemas.forEach((item) => {
    const { properties, required, 'x-apifox-orders': orders } = item.jsonSchema

    orders.forEach((field: string) => {
      let type = properties[field]?.type
      if (!Array.isArray(schemaArr[item.id])) {
        schemaArr[item.id] = []
      }
      if (type === 'object') {
        type = formatSchema([{ jsonSchema: properties[field] }]).undefined
      } else if (type === 'array') {
        type = [formatSchema([{ jsonSchema: properties[field].items }]).undefined]
      } else if (Array.isArray(type)) {
        type = type.join(' | ')
      }
      schemaArr[item.id].push({
        name: field,
        type,
        required: required.includes(field),
        array: false,
        description: properties[field].description,
      })
    })
  })
  return schemaArr
}
