import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClassTransformOptions, plainToInstance } from 'class-transformer'
import { Observable } from 'rxjs'
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
          if (Array.isArray(data)) {
            return data.map((item) => plainToInstance(classType, item, options))
          }
          return plainToInstance(classType, data, options)
        }),
      )
    },
  }
}
