import {
  createCustomMethodDecorator,
  type IMethodAspect,
  type JoinPoint,
} from '@midwayjs/core'

export const SORT_QUERY = 'decorator:sort_query'

/**
 * 当数据库中有排序字段且前端没传排序参数时，使用此参数来添加默认排序规则
 * @constructor
 */

export function SortQuery(): MethodDecorator {
  return createCustomMethodDecorator(SORT_QUERY, {})
}

export function sortQueryHandler(): IMethodAspect {
  return {
    async before(joinPoint: JoinPoint) {
      if (joinPoint.args[0] && !joinPoint.args[0].orderBy) {
        joinPoint.args[0].orderBy = '[{ "order": "desc" },{ "updatedAt": "desc" }]'
      }
    },
  }
}
