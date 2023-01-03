import devConfig from './dev.config'
import prodConfig from './prod.config'

const config = import.meta.env.PROD ? prodConfig : devConfig

export default { ...config }
