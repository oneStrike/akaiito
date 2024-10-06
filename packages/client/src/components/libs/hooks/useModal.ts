import GlobalModal from '@/components/libs/utils/modal'
import type { GlobalModalOptions } from '@/components/libs/typings/globalModal'

const defaultOptions = {
  title: '提示',
  content: '提示内容',
  showCancel: true,
  backButton: true,
  cancelText: '取消',
  cancelColor: '#000000',
  confirmText: '确定',
  confirmColor: '#3CC51F',
  complete: false,
}

function showUniModal(options: GlobalModalOptions) {
  let { cancelText, cancelColor, confirmText, confirmColor } = options

  const { title, content, showCancel, success, fail } = options

  // #ifdef APP-PLUS
  if (uni.$es.platform === 'android') {
    const tempConfirmText = confirmText
    const tempConfirmColor = confirmColor
    confirmText = cancelText
    cancelText = tempConfirmText
    confirmColor = cancelColor
    cancelColor = tempConfirmColor
  }
  // #endif
  uni.showModal({
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    success: data => {
      if (success) {
        success(data)
      }
    },
    fail: err => {
      if (fail) {
        fail(err)
      }
    },
  })
}

export function useModal(options: GlobalModalOptions) {
  options = Object.assign(defaultOptions, options)

  // #ifndef APP-PLUS
  showUniModal(options)
  // #endif

  // #ifdef APP-PLUS
  if (uni.$es.platform === 'ios') {
    showUniModal(options)
  } else {
    new GlobalModal(options).show()
  }
  // #endif
}
