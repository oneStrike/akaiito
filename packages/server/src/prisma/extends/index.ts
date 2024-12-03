import { timeZoneExtends } from './result'
import { withOptimize } from '@prisma/extension-optimize'

export const prismaExtends = {
  // 性能记录
  withOptimize: withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY }),
  // 查询结果扩展
  result: {
    $allModels: timeZoneExtends(),
  },
}
