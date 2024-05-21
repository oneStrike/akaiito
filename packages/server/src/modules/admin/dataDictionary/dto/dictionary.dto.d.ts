import { BasicPageDto } from '@/basic/dto/basic.dto';
export declare class DictionaryDto {
    id: number;
    name: string;
    code: string;
    status: number;
    desc: string;
}
declare const CreateDictionaryDto_base: import("@midwayjs/validate").Dto<Omit<DictionaryDto, "id" | "status">>;
export declare class CreateDictionaryDto extends CreateDictionaryDto_base {
}
declare const UpdateDictionaryDto_base: import("@midwayjs/validate").Dto<Omit<DictionaryDto, "status">>;
export declare class UpdateDictionaryDto extends UpdateDictionaryDto_base {
}
declare const CreateDictionaryItemsDto_base: import("@midwayjs/validate").Dto<Omit<DictionaryDto, "id" | "status">>;
export declare class CreateDictionaryItemsDto extends CreateDictionaryItemsDto_base {
    dictionaryId: number;
}
export declare class FindDictionDto extends BasicPageDto {
    name?: string;
    code?: string;
    status?: number;
}
export declare class FindDictionItemsDto extends BasicPageDto {
    dictionaryId: number;
    name?: string;
    code?: string;
    status?: number;
}
export {};
