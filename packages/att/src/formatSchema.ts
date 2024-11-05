export function formatSchema(schemas: IterateObject[]) {
  const schemaArr: IterateObject = {}
  schemas.forEach((item) => {
    const { properties, required, 'x-apifox-orders': orders } = item.jsonSchema

    orders.forEach((field: string) => {
      const type = properties[field]?.type
      if (!Array.isArray(schemaArr[item.id])) {
        schemaArr[item.id] = []
      }

      schemaArr[item.id].push({
        name: field,
        type: Array.isArray(type) ? type.join(' | ') : type,
        required: required.includes(field),
        array: false,
        description: properties[field].description,
      })
    })
  })
  return schemaArr
}
