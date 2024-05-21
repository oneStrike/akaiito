import { BasicService } from '@/basic/service/basic.service';
import { PrismaClient, FunPlugin } from '@prisma/client';
export declare class FunPluginService extends BasicService<FunPlugin> {
    prismaClient: PrismaClient;
    protected get model(): import("@prisma/client").Prisma.FunPluginDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
}
