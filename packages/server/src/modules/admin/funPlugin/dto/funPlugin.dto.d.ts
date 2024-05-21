import type { Decimal } from '@prisma/client/runtime/library';
export declare class FunPluginDto {
    id: number;
    name: string;
    avatar: string;
    type: number;
    status: number;
    isFree: number;
    price?: Decimal;
    assistPurchaseCount: number;
    sourceName: string;
    sourceUrl: string;
    desc: string;
}
declare const CreateFunPluginDto_base: import("@midwayjs/validate").Dto<Omit<FunPluginDto, "id">>;
export declare class CreateFunPluginDto extends CreateFunPluginDto_base {
}
export {};
