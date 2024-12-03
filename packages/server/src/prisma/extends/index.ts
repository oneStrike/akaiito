import { timeZoneExtends } from './result'

export const prismaExtends = {
  // 查询结果扩展
  result: {
    $allModels: timeZoneExtends(),
  },
}
