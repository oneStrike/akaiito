import type { DirectiveBinding } from 'vue'

export interface IBinding extends DirectiveBinding {
  value: {
    type: string
    delay?: number
    immediate?: boolean
    params?: any
    fn: (arg: IBinding['value']['params']) => any
  }
}

export default function (el: HTMLElement, binding: IBinding) {
  const { type, fn, delay, immediate, params } = binding.value
  if (!type || !fn) return
  let timeFlag: number | null = null
  let isInvoke = false
  el.addEventListener(type, function eventListener() {
    if (timeFlag !== null) clearTimeout(timeFlag)
    if (immediate && !isInvoke) {
      fn(params)
      isInvoke = true
    } else {
      timeFlag = window.setTimeout(() => {
        isInvoke = false
        timeFlag = null
        fn(params)
      }, delay)
    }
  })
}
