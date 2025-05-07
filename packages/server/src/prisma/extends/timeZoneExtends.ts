export function timeZoneExtends() {
  const filed = ['createdAt', 'updatedAt', 'publishAt', 'lastUpdated'],
    res = {}
  filed.forEach((item) => {
    res[item] = {
      needs: { [item]: true },
      compute(model: IterateObject) {
        if (!model[item]) {
          return model[item]
        }
        return new Date(new Date(model[item]).getTime() + 8 * 60 * 60 * 1000)
          .toISOString()
          .replace('T', ' ')
          .substring(0, 19)
      },
    }
  })
  return res
}
