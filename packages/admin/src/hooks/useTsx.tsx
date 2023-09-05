// @ts-ignore
import SvgIcon, { type SvgIconProps } from '@/components/svgIcon/SvgIcon.vue'
import type {
  AvatarProps,
  ButtonProps,
  ImageProps,
  SpaceProps,
  SwitchProps,
  TagProps
} from 'naive-ui'
import {
  NButton,
  NTag,
  NSwitch,
  NPopconfirm,
  NImage,
  NAvatar,
  NSpace
} from 'naive-ui'
import config from '@/config'
import type { FunctionArgs } from '@vueuse/core'
import type { UsePopConfirm } from '@/typings/hook/useTsx'

// 间隔
export const useSpace = (slots: JSX.Element[], props?: SpaceProps) => {
  return (
    <NSpace
      wrap={false}
      justify={'center'}
      item-style={{ display: 'flex', alignItems: 'center' }}
      {...props}
    >
      {{ default: () => slots }}
    </NSpace>
  )
}

// 图标
export const useSvgIcon = (
  props: SvgIconProps & { onClick?: (e: any) => any }
) => {
  return <SvgIcon {...props} onClick={props.onClick}></SvgIcon>
}

// 图标函数
export const useSvgIconFn = (props: SvgIconProps) => {
  return () => useSvgIcon(props)
}

// 按钮
export const useButton = (text: string, props?: ButtonProps) => {
  return <NButton {...props}>{{ default: () => text }}</NButton>
}

// 标签
export const useTag = (text: string, props?: TagProps) => {
  return <NTag {...props}>{{ default: () => text }}</NTag>
}

// 开关
export const useSwitch = (props: SwitchProps) => {
  // 设置默认值
  props.checkedValue = props.checkedValue ?? 1
  props.uncheckedValue = props.uncheckedValue ?? 0
  // 使用防抖函数
  props.onUpdateValue = useDebounceFn(
    props.onUpdateValue as FunctionArgs,
    config.DEBOUNCE
  )
  return <NSwitch {...props}></NSwitch>
}

// 图片
export const useNImage = (props: ImageProps) => {
  // 设置默认值
  props.height = props.height ?? 40
  props.width = props.width ?? 40
  props.objectFit = props.objectFit ?? 'cover'
  return <NImage {...props}></NImage>
}

// 头像
export const useAvatar = (props: AvatarProps) => {
  // 设置默认值
  props.size = props.size ?? 40
  props.objectFit = props.objectFit ?? 'cover'
  props.round = props.round ?? true
  return <NAvatar {...props}></NAvatar>
}

// 确认弹出框
export const usePopConfirm: UsePopConfirm = (options) => {
  const { props, cancel, confirm, tipField, text, source, btnProps, trigger } =
    options
  return (
    <NPopconfirm
      {...props}
      onPositiveClick={() => confirm(source)}
      onNegativeClick={() => cancel && cancel(source)}
    >
      {{
        trigger: () => {
          if (trigger) {
            return trigger()
          } else {
            return <NButton {...btnProps}>{{ default: () => text }}</NButton>
          }
        },
        default: () => `是否${text}【${source[tipField]}】？`
      }}
    </NPopconfirm>
  )
}
