import { ElMessageBox } from 'element-plus'
interface UseConfirm {
  content?: string
  title?: string
  confirm?: () => unknown
  cancel?: () => unknown
  type?: '' | 'success' | 'warning' | 'info' | 'error'
  confirmButtonText?: string
  cancelButtonText?: string
}

export const useConfirm = (config: UseConfirm) => {
  ElMessageBox.confirm(config.content, config.title || '提示', {
    confirmButtonText: config.confirmButtonText || '确认',
    cancelButtonText: config.cancelButtonText || '取消',
    type: config.type || 'warning'
  })
    .then(() => {
      config.confirm && config.confirm()
    })
    .catch(() => {
      config.cancel && config.cancel()
    })
}
