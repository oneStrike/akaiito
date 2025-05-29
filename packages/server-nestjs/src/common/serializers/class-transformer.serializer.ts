import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common'
import type { ClassTransformOptions } from 'class-transformer'
import type { Observable } from 'rxjs'
import {
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { plainToInstance } from 'class-transformer'
import { map } from 'rxjs/operators'

export function useClassSerializerInterceptor<T>(
  classType: Type<T>,
  options?: ClassTransformOptions,
): NestInterceptor {
  return {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      // 注入 Reflector 实例
      const reflector = new Reflector()

      // 正确传递依赖
      const baseInterceptor = new ClassSerializerInterceptor(reflector, {
        ...options,
        excludeExtraneousValues: true,
      })

      return baseInterceptor.intercept(context, next).pipe(
        map((data) => {
          if (data && Array.isArray(data.items)) {
            // 处理响应数据中的 items 数组
            data.items = data.items.map((item) =>
              plainToInstance(classType, item, options),
            )
          }
          return data
        }),
      )
    },
  }
}
