export type IFiles = {
  filename: string
  mimeType: string
  path: string
  _ext: string
}[]

export type IImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
