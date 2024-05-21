import { Prisma } from '@prisma/client/extension';
export type PrismaWhere<T> = Prisma.Args<T, 'findFirst'>['where'];
export declare const isExists: <T>(this: T, where: PrismaWhere<T>) => Promise<boolean>;
export declare const find: <T>(this: T, where: PrismaWhere<T>, timeSerialize?: boolean) => Promise<unknown>;
export declare const findOne: <T>(this: T, where: PrismaWhere<T>, timeSerialize?: boolean) => Promise<unknown>;
export declare const softDeletion: <T>(this: T, where: PrismaWhere<T>) => Promise<any>;
