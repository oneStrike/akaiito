// 检查指定条件的记录是否存在
export async function exists<T>(context: T, where: any) {
  // 在数据库中查找符合条件的第一条记录
  const result = await (context as any).findFirst({ where })
  // 如果找到了记录，返回 true；否则返回 false
  return result !== null
}
