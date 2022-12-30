import config from '@/config'

import router from '@/router'
import { useAuth } from '@/hooks/useAuth'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'
import { useUserStore } from '@/stores'
import { WhiteListEnum } from '@/enum/whiteListEnum'
import { Ajax } from '@/utils/ajax'
import type { IInterceptor } from '@/typings/utils/ajax'

const requestInterceptor: IInterceptor['request'] = async (config) => {
  const tokenStatus = useAuth.status('token')
  const refreshTokenStatus = useAuth.status('refreshToken')

  const whiteList = []
  for (const key in WhiteListEnum) {
    whiteList.push(WhiteListEnum[key as keyof typeof WhiteListEnum])
  }
  const requestUrl: any = config.url
  if (requestUrl && !whiteList.includes(requestUrl)) {
    if (!tokenStatus && !refreshTokenStatus) {
      useMessage('error', Hint.LOGIN_ERR)
      await router.replace('/login')
      throw new Error(Hint.LOGIN_ERR)
    }
    if (!tokenStatus) {
      await useUserStore().refreshToken()
    }
  }

  const headerToken =
    requestUrl === WhiteListEnum.REFRESH_TOKEN
      ? useAuth.get('refreshToken')
      : useAuth.get('token')
  config.headers = {
    ['Authorization']: headerToken
  }
  return config
}

const kRequest = new Ajax({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
  showLoading: false,
  withCredentials: true,
  headers: {
    ['Content-Type']: 'application/json'
  },
  interceptor: {
    request: requestInterceptor
  },
  parseResponse: ({ data }) => {
    return {
      error: data.code !== 1,
      desc: data.code !== 1 ? data.desc : '',
      data: data.data
    }
  }
})

export default kRequest
