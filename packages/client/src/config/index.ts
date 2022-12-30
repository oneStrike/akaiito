import { devEnum } from './dev.config'
import { prodEnum } from './prod.config'

export const configEnum = import.meta.env.PROD ? prodEnum : devEnum
