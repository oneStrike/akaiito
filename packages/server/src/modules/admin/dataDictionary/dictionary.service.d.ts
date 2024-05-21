import { BasicService } from '@/basic/service/basic.service';
import { PrismaClient, DataDictionary } from '@prisma/client';
export declare class DictionaryService extends BasicService<DataDictionary> {
    prismaClient: PrismaClient;
    protected get model(): import("@prisma/client").Prisma.DataDictionaryDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
}
