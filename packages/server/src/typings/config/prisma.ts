import type { RecordPaginationOptions } from '@akaiito/types'

export interface PrismaConfig {
  pagination: Omit<RecordPaginationOptions, 'orderBy'>
  orderBy: IterateObject
  timeSerialize: boolean
  maxListItemLimit: number
}
