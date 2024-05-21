import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto, CreateDictionaryItemsDto, FindDictionDto, FindDictionItemsDto, UpdateDictionaryDto } from './dto/dictionary.dto';
import { DictionaryServiceItems } from './dictionary-items.service';
import { BasicIdsDto, BasicIdsStatusDto, BasicOrderDto } from '@/basic/dto/basic.dto';
export declare class DictionaryController {
    dictionaryService: DictionaryService;
    dictionaryItemsService: DictionaryServiceItems;
    getDataDictionary(query: FindDictionDto): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            name: string;
            code: string;
            status: number;
            desc: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getDataDictionaryItems(query: FindDictionItemsDto): Promise<{
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
    createDataDictionary(body: CreateDictionaryDto): Promise<number>;
    createDataDictionaryItems(body: CreateDictionaryItemsDto): Promise<number | void>;
    deleteDataDictionary(body: BasicIdsDto): Promise<any>;
    deleteDataDictionaryItems(body: BasicIdsDto): Promise<any>;
    updateDataDictionary(body: UpdateDictionaryDto): Promise<any>;
    updateDataDictionaryItems(body: UpdateDictionaryDto): Promise<any>;
    updateDataDictionaryStatus(body: BasicIdsStatusDto): Promise<any>;
    updateDataDictionaryItemsStatus(body: BasicIdsStatusDto): Promise<any>;
    updateDataDictionaryItemsOrder(body: BasicOrderDto): Promise<number>;
}
