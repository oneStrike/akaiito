export interface EsIconProps {
  name: string
  size?: number
  color?: 'primary' | 'error' | 'info' | 'success' | 'warning' | string
  rotate?: boolean
  hover?: boolean
  unset?: boolean
  rotateType?: 'click' | 'always'
}
