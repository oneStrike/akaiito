import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
// @ts-ignore
import type { SvgIconProps } from '@/components/svgIcon/SvgIcon.vue'
import type {
  AvatarProps,
  ButtonProps,
  ImageProps,
  SwitchProps,
  TagProps
} from 'naive-ui'
import { NButton, NTag, NSwitch, NPopconfirm, NImage, NAvatar } from 'naive-ui'
import config from '@/config'
import type { FunctionArgs } from '@vueuse/core'
import type { UsePopConfirm } from '@/typings/hook/useTsx'
//图标
export const useSvgIcon = (props: SvgIconProps) => {
  return <SvgIcon {...props}></SvgIcon>
}

//图标fn
export const useSvgIconFn = (props: SvgIconProps) => {
  return () => useSvgIcon(props)
}

//按钮
export const useButton = (text: string, props?: ButtonProps) => {
  return <NButton {...props}>{{ default: () => text }}</NButton>
}

//标签
export const useTag = (text: string, props?: TagProps) => {
  return <NTag {...props}>{{ default: () => text }}</NTag>
}

//开关
export const useSwitch = (props: SwitchProps) => {
  props.checkedValue = props.checkedValue ?? 1
  props.uncheckedValue = props.uncheckedValue ?? 0
  props.onUpdateValue = useDebounceFn(
    props.onUpdateValue as FunctionArgs,
    config.DEBOUNCE
  )
  return <NSwitch {...props}></NSwitch>
}

//图片
export const useImage = (props: ImageProps) => {
  props.height = props.height ?? 40
  props.width = props.width ?? 40
  props.objectFit = props.objectFit ?? 'cover'
  return <NImage {...props}></NImage>
}
//头像
export const useAvatar = (props: AvatarProps) => {
  props.size = props.size ?? 40
  props.objectFit = props.objectFit ?? 'cover'
  props.round = props.round ?? true
  return <NAvatar {...props}></NAvatar>
}

//确认弹出框
export const usePopConfirm: UsePopConfirm = (options) => {
  const { props, cancel, confirm, tipField, text, source, btnProps } = options
  return (
    <NPopconfirm
      {...props}
      onPositiveClick={() => confirm(source)}
      onNegativeClick={() => cancel && cancel(source)}
    >
      {{
        trigger: () => (
          <NButton {...btnProps}>{{ default: () => text }}</NButton>
        ),
        default: () => `是否${text}【${source[tipField]}】？`
      }}
    </NPopconfirm>
  )
}
