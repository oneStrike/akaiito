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
  success?: (params: GlobalModalCallBackParams) => Promise<any> | any
  fail?: (params: GlobalModalCallBackParams | any) => Promise<any> | any
  complete?: boolean
}
