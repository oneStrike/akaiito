import { useStorage } from '@/components/libs/hooks/useStorage'

const cookieStorage = useStorage<IterateObject<string>>('__cookie_store__', {})

function parseCookies(cookieString: string): { [key: string]: string } {
  const cookies: IterateObject<string> = {}
  const cookieArray = cookieString.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim()
    const index = cookie.indexOf('=')
    if (index > 0) {
      const name = cookie.substring(0, index).trim()
      cookies[name] = cookie.substring(index + 1).trim()
    }
  }

  return cookies
}

export const useCookies = {
  get: (key?: string) => {
    if (!key) return cookieStorage.storageValue.value
    return cookieStorage.storageValue.value![key]
  },
  set: (key: string, value: string) => {
    cookieStorage.storageValue.value![key] = value
  },
  parse: (cookie: string[]) => {
    if (cookie && !document) {
      const cookieData = {}
      cookie.forEach((item) => {
        Object.assign(cookieData, parseCookies(item))
      })
      cookieStorage.storageValue.value = {
        ...cookieStorage.storageValue.value,
        ...cookieData,
      }
    } else if (document) {
      cookieStorage.storageValue.value = {
        ...cookieStorage.storageValue.value,
        ...parseCookies(document.cookie),
      }
    }
  },
}
