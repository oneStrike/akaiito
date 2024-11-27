import { PromptsEnum } from '@/enum/prompts'

export const useMessage: typeof ElMessage = ElMessage

export type UseConfirm = (type: 'delete' | 'disable' | 'enable', handler: AsyncFn, callback?: () => void) => void

export const useConfirm: UseConfirm = (type, handler, callback) => {
  let message = ''
  let prompt = ''
  switch (type) {
    case 'delete':
      message = PromptsEnum.CONFIRM_DELETE
      prompt = PromptsEnum.DELETED
      break
    case 'enable':
      message = PromptsEnum.CONFIRM_ENABLED
      prompt = PromptsEnum.ENABLED
      break
    case 'disable':
      message = PromptsEnum.CONFIRM_DISABLED
      prompt = PromptsEnum.DISABLED
      break
  }

  ElMessageBox.confirm(message, '警告', {
    type: 'warning',
    draggable: true,
  }).then(async () => {
    await handler()
    useMessage.success(prompt)
    if (callback) {
      callback()
    }
  })
}
