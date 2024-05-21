import { BasicService } from '../../../basic/service/basic.service';
import { PrismaClient, DataDictionaryItems } from '@prisma/client';
import { CreateDictionaryItemsDto } from './dto/dictionary.dto';
import { PrismaFindOptions } from '../../../typings/service/base.service';
import { DictionaryService } from './dictionary.service';
export declare class DictionaryServiceItems extends BasicService<DataDictionaryItems> {
    prismaClient: PrismaClient;
    dictionaryService: DictionaryService;
    protected get model(): import("@prisma/client").Prisma.DataDictionaryItemsDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    getItems(items: PrismaFindOptions<DataDictionaryItems>): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            dictionaryId: number;
            dictionaryName: string;
            name: string;
            code: string;
            order: number;
            status: number;
            desc: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createItems(items: CreateDictionaryItemsDto): Promise<number | void>;
}
