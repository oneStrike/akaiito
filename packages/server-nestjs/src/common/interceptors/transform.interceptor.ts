import type { CallHandler, ExecutionContext } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'

export interface Response<T> {
  code: number
  data: T
  message: string
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        data,
        message: 'success',
      })),
    )
  }
}
