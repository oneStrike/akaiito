import { dev } from '@/config/dev.config'
import { prod } from '@/config/prod.config'
import basic from '@/config/base.config'
const config = import.meta.env.PROD ? prod : dev
export default { ...config, ...basic }
