import { dev } from '@/config/dev'
import { prod } from '@/config/prod'
import basic from '@/config/basic'
const config = import.meta.env.PROD ? prod : dev
export default { ...config, ...basic }
