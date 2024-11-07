import type { RecordPaginationOptions } from '@auy/types'

export interface PrismaConfig {
  pagination: Omit<RecordPaginationOptions, 'orderBy'>
  orderBy: IterateObject
  timeSerialize: boolean
  maxListItemLimit: number
}
