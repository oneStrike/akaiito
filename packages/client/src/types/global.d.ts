// 异步函数
export type AsyncFn<T = any> = (p?: T) => Promise<any>

// 获取函数的参数
type ResolveParameters<T> = T extends (arg: infer P) => void ? P : string

// 获取函数的返回值
export type InferReturnType<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : T

// 获取异步函数的解析值
export type ResolvedReturnType<T> =
  InferReturnType<T> extends Promise<infer R> ? R : InferReturnType<T>

type MakeRequired<T> = {
  [P in keyof T]-?: T[P] // 使用 -? 来移除属性后面的 ?
}

declare global {
  type IterateObject<T = any> = Record<string, T>
}
