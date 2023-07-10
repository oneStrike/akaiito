import { ObjType } from '@/components/libs/typings'

export type ImageMode =
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

export type HttpResponse = {
  data: ObjType
  desc?: string
  code: number
  status: string
}
