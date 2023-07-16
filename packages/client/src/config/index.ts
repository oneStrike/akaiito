import { dev } from './dev.config'
import { prod } from './prod.config'

// @ts-ignore
const config = !import.meta.env.PROD ? dev : prod

export default config
