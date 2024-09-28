import { Prisma } from '@prisma/client/extension'
import { exists } from './exists'
import * as prismaFind from './find'
import { softDeletion as prismaSoftDeletion } from './softDeletion'

// 定义一个泛型类型别名，表示可以作为参数传入 Prisma.where 方法的参数类型
export type PrismaWhere<T> = Prisma.Args<T, 'findFirst'>['where']

// 异步函数，判断给定的 where 条件是否存在
export const isExists = async function <T>(this: T, where: PrismaWhere<T>) {
  if (!where) return false
  const context = Prisma.getExtensionContext(this)
  return await exists(context, where)
}

// 异步函数，根据给定的 where 条件查找数据，可选参数 timeSerialize 控制是否进行时间序列化
export const find = async function <T>(
  this: T,
  where: PrismaWhere<T>,
  timeSerialize = true,
) {
  const context = Prisma.getExtensionContext(this)
  return await prismaFind.find(context, where, timeSerialize)
}
// 异步函数，根据给定的 where 条件查找数据，可选参数 timeSerialize 控制是否进行时间序列化
export const findOne = async function <T>(
  this: T,
  where: PrismaWhere<T>,
  timeSerialize = true,
) {
  const context = Prisma.getExtensionContext(this)
  return await prismaFind.findOne(context, where, timeSerialize)
}

// 异步函数，执行软删除操作，根据给定的 where 条件进行软删除
export const softDeletion = async function <T>(this: T, where: PrismaWhere<T>) {
  const context = Prisma.getExtensionContext(this)
  return await prismaSoftDeletion(context, where)
}
