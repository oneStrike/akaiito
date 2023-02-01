// src/decorator/logging.decorator.ts
import {
  createCustomMethodDecorator,
  IMethodAspect,
  JoinPoint
} from '@midwayjs/decorator'

import Utils from '../utils'
import { IClassConstructor } from '../types/utils'
const { lodash } = new Utils()

// 装饰器内部的唯一 id
export const SERIALIZE_KEY = 'decorator:serialize'

export function Serialize(
  field = '',
  pure?: IClassConstructor
): MethodDecorator {
  return createCustomMethodDecorator(SERIALIZE_KEY, { pure, field })
}

export function SerializeHandle(options): IMethodAspect {
  return {
    afterReturn: async (point: JoinPoint, responseData) => {
      let { pure } = options.metadata
      const { field } = options.metadata
      if (!pure) {
        pure = point.target.constructor.pure
      }

      const fields = field?.split('.') ?? []
      let handleData: any
      fields.forEach((item) => {
        if (item) {
          handleData = handleData ? handleData[item] : responseData[item]
        }
      })
      handleData = handleData || responseData
      if (lodash.isArray(handleData)) {
        handleData = handleData.map((item) => {
          return lodash.omit(item, pure)
        })
      } else {
        handleData = lodash.omit(handleData, pure)
      }

      if (!field) {
        responseData = handleData
      } else if (fields.length === 1) {
        responseData[field] = handleData
      }
      return responseData
    }
  }
}
