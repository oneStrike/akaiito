import { Context } from '@midwayjs/core';
import { Application } from '@midwayjs/koa';
import type { PrismaConfig } from '../../typings/config/prisma';
import { FindPageResponse, PrismaFindOptions } from '../../typings/service/base.service';
import type { IterateObject } from '@akaiito/typings/src';
import { BasicOrderDto } from '../dto/basic.dto';
export declare abstract class BasicService<T = IterateObject> {
    protected app: Application;
    prismaConfig: PrismaConfig;
    protected ctx: Context;
    protected abstract model: any;
    throwError(message: string): void;
    getCount(where?: PrismaFindOptions<T>): Promise<number>;
    exists(options: PrismaFindOptions<T>): Promise<boolean>;
    create(data: Partial<T>): Promise<number>;
    update(options: PrismaFindOptions<T>, data: IterateObject): Promise<any>;
    updateBatch(options: PrismaFindOptions<T>, data: IterateObject): Promise<any>;
    updateOrder(info: BasicOrderDto): Promise<number>;
    softDeletion(options?: PrismaFindOptions<T>): Promise<any>;
    delete(options?: PrismaFindOptions<T>): Promise<any>;
    deleteBatch(options?: PrismaFindOptions<T>): Promise<any>;
    findUnique(options?: PrismaFindOptions<T>): Promise<T | null>;
    findPage(options?: PrismaFindOptions<T>): FindPageResponse<T>;
    findList(options?: PrismaFindOptions<T>): Promise<{
        data: any;
        total: any;
    }>;
    handlerExcludeField<T>(excludes: string[], data: T): T;
    handlerWhere(options: PrismaFindOptions<T>, page?: boolean): IterateObject;
    pagination(options: IterateObject): {
        pageSize: any;
        pageIndex: any;
    };
    orderBy(orderBy?: string): any[];
    /**
     * 模糊查询函数
     *
     * @param options - 查询选项的模糊匹配部分
     * @param where - 查询条件
     * @returns 返回模糊查询条件
     */
    fuzzyQuery(options: PrismaFindOptions<T>['fuzzy'], where: PrismaFindOptions<T>['where']): import("../../typings/service/base.service").WhereOptions<T>;
    excludeField(field?: string[]): string[];
}
