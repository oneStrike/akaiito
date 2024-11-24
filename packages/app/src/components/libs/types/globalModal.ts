export interface GlobalModalCallBackParams {
  confirm: boolean
  cancel: boolean
  mask?: boolean
}

export interface GlobalModalOptions {
  title?: string
  content: string
  opacity?: number
  align?: 'center' | 'left' | 'right'
  maskClick?: boolean
  cancelText?: string
  confirmText?: string
  cancelColor?: string
  confirmColor?: string
  showCancel?: boolean
  contentWidth?: number
  backButton?: boolean
  success?: (params: GlobalModalCallBackParams) => Promise<any> | void
  fail?: (params: GlobalModalCallBackParams | unknown) => Promise<any> | void
  complete?: boolean
}
