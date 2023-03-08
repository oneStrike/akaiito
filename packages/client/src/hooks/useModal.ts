import GlobalModal from '@/utils/modal'
import { IGlobalModal } from '@/typings/utils/globalModal'

const defaultOptions = {
  title: '提示',
  content: '提示内容',
  showCancel: true,
  backButton: true,
  cancelText: '取消',
  cancelColor: '#000000',
  confirmText: '确定',
  confirmColor: '#3CC51F',
  complete: false
}
export class useModal {
  static show(options: IGlobalModal) {
    return new Promise((resolve, reject) => {
      options = Object.assign(defaultOptions, options)
      // #ifdef APP-PLUS
      if (this.appPlatform() === 'android') {
        const globalModalInstance = new GlobalModal(options)
        // android的使用自定义的模态框
        globalModalInstance.show()
      } else {
        // ios直接用原生的
        return this.uniShowModal(options)
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      }
      // #endif
      // #ifndef APP-PLUS
      return this.uniShowModal(options)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
      // #endif
    })
  }

  // 原生showModal
  static uniShowModal({
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    success,
    fail
  }: IGlobalModal) {
    return new Promise((resolve, reject) => {
      let appPlatform = this.appPlatform()
      // #ifdef APP-PLUS
      if (appPlatform === 'android' && showCancel) {
        // android的确认按钮在左边，需要统一到右边
        appPlatform = 'android'
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
        success: (data) => {
          success && success(data)
        },
        fail: (err) => {
          fail && fail(err)
        }
      })
    })
  }

  /**
   * @description 获取app平台(android | ios)
   * */
  static appPlatform(): 'android' | 'ios' {
    // #ifdef APP-PLUS
    // @ts-ignore
    return plus.os.name.toLowerCase()
    // #endif
  }
}
