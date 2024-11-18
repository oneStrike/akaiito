import { message } from 'ant-design-vue'

const [messageApi, contextHolder] = message.useMessage()

export const useMessage = {
  success: (msg: string) => messageApi.success(msg),
}
