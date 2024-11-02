import type { IterateObject } from '@/types/global'

export const useQuery = {
  serialization(query: IterateObject): string {
    // 序列化查询参数
    return Object.entries(query)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
        } else if (value) {
          return `${key}=${encodeURIComponent(value)}`
        } else {
          return ''
        }
      })
      .filter(item => item)
      .join('&')
  },

  deserialization(queryString: string): IterateObject {
    const res: IterateObject = {}
    const url = queryString || location.href

    // 安全性检查：过滤掉可能的恶意数据
    const safeUrl = url.replace(/<script>[\s\S]*<\/script>/gi, '')

    const query = (safeUrl.split('?')[1] || '').trim().replace(/^([?#&])/, '')
    if (!query) {
      return res
    }

    try {
      query.split('&').forEach(param => {
        const parts = param.replace(/\+/g, ' ').split('=')
        const key = decodeURIComponent(parts.shift() || '')
        const val: string | null =
          parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

        if (res[key] === undefined) {
          res[key] = val
        } else if (Array.isArray(res[key])) {
          res[key].push(val)
        } else {
          res[key] = [res[key], val]
        }
      })
    } catch (error) {
      console.error('Error parsing query:', error)
      return {} // 返回空对象作为异常处理
    }

    return res
  },
}
