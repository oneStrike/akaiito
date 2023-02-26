import type { AdminUserInfoRes } from '~@/apiTypes/user'
import type { Fn } from '@vueuse/core'

export interface UserStore {
  userInfo: AdminUserInfoRes
  token: string
  role: 'admin'
  refreshToken: string
  tokenExpiredAt: number
  pauseRenewalToken: Fn | null
}
