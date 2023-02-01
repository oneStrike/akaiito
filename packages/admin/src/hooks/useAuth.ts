import { useUserStore } from '@/stores'
import dayjs from 'dayjs'
import type { TokenType } from '@/typings/user/user'
import { UserEnum } from '@/enum/userEnum'

function status(type: TokenType): boolean {
  const { token, refreshToken, tokenExpiredAt, refreshTokenExpiredAt } =
    useUserStore().auth
  if (!token || !refreshToken) return false
  const timestamp = dayjs().unix()
  const expiredAt = type === 'token' ? tokenExpiredAt : refreshTokenExpiredAt
  return !!expiredAt && timestamp < expiredAt
}

function set(type: TokenType, value: string) {
  if (type === 'token') {
    const expiredAt = dayjs().add(100, 'm').unix()
    useUserStore().auth.token = value
    useUserStore().auth.tokenExpiredAt = expiredAt
  } else {
    const expiredAt = dayjs().add(6, 'd').unix()
    useUserStore().auth.refreshToken = value
    useUserStore().auth.refreshTokenExpiredAt = expiredAt
  }
}

function get(type: TokenType) {
  return useUserStore().auth[type]
}

function clear() {
  useUserStore().auth = {
    token: '',
    refreshToken: '',
    tokenExpiredAt: null,
    refreshTokenExpiredAt: null
  }
  sessionStorage.removeItem(UserEnum.TOKEN)
  sessionStorage.removeItem(UserEnum.REFRESH_TOKEN)
  sessionStorage.removeItem(UserEnum.TOKEN_EXPIRED_AT)
  sessionStorage.removeItem(UserEnum.REFRESH_TOKEN_EXPIRED_AT)
}

export const useAuth = {
  set,
  get,
  clear,
  status
}
