export interface IGlobalModalCallBackParams {
  confirm: boolean
  cancel: boolean
  mask?: boolean
}

export interface IGlobalModal {
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
  success?: (params: IGlobalModalCallBackParams) => Promise<any> | any
  fail?: (params: IGlobalModalCallBackParams | any) => Promise<any> | any
  complete?: boolean
}
