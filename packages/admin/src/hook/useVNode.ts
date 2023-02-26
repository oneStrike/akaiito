import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
// @ts-ignore
import type { SvgIconProps } from '@/components/svgIcon/SvgIcon.vue'

export const useSvgIcon = (props: SvgIconProps) => {
  return h(SvgIcon, props)
}

export const useSvgIconFn = (props: SvgIconProps) => {
  return () => h(SvgIcon, props)
}
