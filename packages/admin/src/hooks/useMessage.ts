import { message } from 'ant-design-vue'
import type { NoticeType } from 'ant-design-vue/es/message'

const showMessage = (type: NoticeType, text: string) => {
  message[type](text)
}

export const useMessage = {
  info: (text: string) => showMessage('info', text),
  success: (text: string) => showMessage('success', text),
  warning: (text: string) => showMessage('warning', text),
  error: (text: string) => showMessage('error', text)
}
