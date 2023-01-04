import { dev } from './dev.config'
import { prod } from './prod.config'
import { base } from '@/config/base.config'

const config = import.meta.env.PROD ? prod : dev

export default { ...config, ...base }
