import type { RecordPaginationOptions } from '@akaiito/typings'

export interface PrismaConfig {
  pagination: RecordPaginationOptions
  timeSerialize: boolean
  maxListItemLimit: number
  exclude: string[]
}
