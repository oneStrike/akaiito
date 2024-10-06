import { useWx } from '@/hooks/useWx'

export const basicConfig = {
  appId: useWx.appId() || 'wx6649b38f7d246546',
  baseUrl: 'http://192.168.31.223:7001',
}
