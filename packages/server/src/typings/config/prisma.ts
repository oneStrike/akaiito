import type { RecordPaginationOptions } from '@akaiito/typings/src'

export interface PrismaConfig {
  pagination: RecordPaginationOptions
  timeSerialize: boolean
  maxListItemLimit: number
  exclude: string[]
}
