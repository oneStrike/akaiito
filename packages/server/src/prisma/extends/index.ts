import { timeZoneExtends } from './timeZoneExtends'

export const prismaExtends = {
  // 查询结果扩展
  result: {
    $allModels: timeZoneExtends(),
  },
}
