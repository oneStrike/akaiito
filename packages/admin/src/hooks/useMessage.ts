import { ElMessage, type ElMessageBoxOptions } from 'element-plus'

export const useMessage = {
  success: (config: ElMessageBoxOptions | string) => ElMessage.success(config),
  error: (config: ElMessageBoxOptions | string) => ElMessage.error(config),
  warning: (config: ElMessageBoxOptions | string) => ElMessage.warning(config),
  info: (config: ElMessageBoxOptions | string) => ElMessage.info(config)
}
