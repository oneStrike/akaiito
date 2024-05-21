export declare class BasicPageDto {
    pageSize?: number;
    pageIndex?: number;
    orderBy?: string;
    startTime?: string;
    endTime?: string;
}
export declare class BasicIdDto {
    id: number;
}
export declare class BasicIdsDto {
    ids: number[];
}
export declare class BasicIdsStatusDto extends BasicIdsDto {
    status: number;
}
export declare class BasicIdStatusDto extends BasicIdDto {
    status: number;
}
export declare class BasicOrderDto {
    targetId: number;
    targetOrder: number;
    originId: number;
    originOrder: number;
}
