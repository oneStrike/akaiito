import type { IterateObject, RecordPaginationOptions } from '@akaiito/typings/src';
export interface PrismaConfig {
    pagination: Omit<RecordPaginationOptions, 'orderBy'>;
    orderBy: IterateObject;
    timeSerialize: boolean;
    maxListItemLimit: number;
    excludes: string[];
}
