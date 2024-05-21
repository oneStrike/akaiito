import { CreateFunPluginDto, FunPluginDto } from './dto/funPlugin.dto';
import { FunPluginService } from './funPlugin.service';
import { BasicIdStatusDto, BasicIdDto } from '@/basic/dto/basic.dto';
export declare class FunPluginController {
    funPluginService: FunPluginService;
    getFunPlugin(query: CreateFunPluginDto): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            name: string;
            avatar: string;
            type: number;
            status: number;
            desc: string;
            downloadCount: number;
            purchaseCount: number;
            assistPurchaseCount: number;
            price: import("@prisma/client/runtime/library").Decimal;
            sourceName: string;
            sourceUrl: string;
            isFree: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createFunPlugin(body: CreateFunPluginDto): Promise<number>;
    updateFunPlugin(body: FunPluginDto): Promise<any>;
    deleteFunPlugin(body: BasicIdDto): Promise<any>;
    updateFunPluginStatus(body: BasicIdStatusDto): Promise<any>;
}
