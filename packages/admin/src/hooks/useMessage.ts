import { Message, type MessageConfig } from '@arco-design/web-vue'

export const useMessage = {
  normal: (msg: string | MessageConfig) => Message.normal(msg),
  info: (msg: string | MessageConfig) => Message.info(msg),
  success: (msg: string | MessageConfig) => Message.success(msg),
  warning: (msg: string | MessageConfig) => Message.warning(msg),
  error: (msg: string | MessageConfig) => Message.error(msg)
}
