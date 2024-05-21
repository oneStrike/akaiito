import type { Context } from '@midwayjs/koa';
import { AdminLog, PrismaClient } from '@prisma/client';
import { HttpResponseResult, IterateObject } from '@akaiito/typings/src';
import { BasicService } from '../../../basic/service/basic.service';
import { RouterService } from '../router/router.service';
export declare class LogService extends BasicService<AdminLog> {
    prismaClient: PrismaClient;
    routerService: RouterService;
    protected get model(): import("@prisma/client").Prisma.AdminLogDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    recordLogs(context: Context, report: HttpResponseResult): Promise<void>;
    getRequestLogs(query: IterateObject): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            username: string;
            userId: number;
            mobile: string;
            method: string;
            ip: string;
            ipAddress: string;
            statusCode: number;
            statusDesc: string;
            path: string;
            summary: string;
            record: string;
            userAgent: string;
            params: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
