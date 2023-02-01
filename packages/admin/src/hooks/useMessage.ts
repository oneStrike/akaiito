import { ElMessage } from 'element-plus'

export function useMessage(
  type: 'success' | 'warning' | 'info' | 'error',
  message: string
) {
  ElMessage({
    type,
    message,
    duration: 2000
  })
}
