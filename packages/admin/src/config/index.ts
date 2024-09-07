import auth from '@/config/auth'
import { utils } from '@/utils'

export const config = {
  auth,
  ...utils.getProjectConfig(),
}
