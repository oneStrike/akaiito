<script setup lang="ts">
import type { EsButtonProps } from '@/components/es-button/types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsButton',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsButtonProps>(), {
  size: 'medium',
  type: 'default',
  fixed: false,
  round: true,
})
const emits = defineEmits<{
  (event: 'click'): void
}>()

const textAttr = reactive({
  color: 'base',
  size: 'base',
})

const buttonAttr: IterateObject = reactive({
  className: ['es-button'],
  styleSheet: {},
})

const sizeScheme = {
  mini: {
    textSize: 'xs',
    padding: `12rpx 20rpx`,
    fontSize: props.textSize ?? 'xs',
    width: '',
  },
  small: {
    textSize: 'sm',
    padding: `18rpx 40rpx`,
    fontSize: props.textSize ?? 'sm',
    width: '',
  },
  medium: {
    textSize: 'base',
    padding: `20rpx 40rpx`,
    fontSize: props.textSize ?? 'base',
    width: '',
  },
  large: {
    textSize: 'lg',
    padding: `24rpx 0`,
    fontSize: props.textSize ?? 'lg',
    width: 'auto',
  },
}

watch(
  () => [props.plain, props.type, props.size, props.textColor, props.round, props.disabled],
  ([plain, type, size, textColor, round, disabled]) => {
    if (textColor) {
      textAttr.color = textColor as string
    } else {
      if (!plain && type !== 'default') {
        textAttr.color = 'white'
      } else {
        textAttr.color = type === 'default' ? 'base' : (type as string)
      }
    }

    const { padding, textSize, fontSize, width } = sizeScheme[size as keyof typeof sizeScheme]
    textAttr.size = textSize
    const buttonColor = type === 'default' ? '#f0f0f0' : useConfig.getColor(type)
    const radius = typeof round === 'boolean' ? (round ? 40 : 8) : round
    buttonAttr.styleSheet = {
      padding,
      fontSize: useConfig.getSize(fontSize),
      backgroundColor: plain ? 'transparent' : buttonColor,
      borderRadius: useConfig.addUnit(radius),
      opacity: disabled ? 0.6 : 1,
      border: plain ? `1px solid ${buttonColor}` : 'none',
    }
    if (width) {
      buttonAttr.styleSheet.width = width
    }
    console.log(buttonAttr)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <view :class="fixed ? 'w-screen bg-white p-3 fixed left-0 bottom-0 border-top  z-10' : ''">
    <button
      :class="buttonAttr.className"
      :style="buttonAttr.styleSheet"
      :disabled="disabled"
      hover-class="opacity-65!"
      @click="!disabled && emits('click')"
    >
      <es-text :text="text" :bold="bold" :color="textAttr.color" :size="textSize || buttonAttr.styleSheet.fontSize" />
    </button>
  </view>
</template>

<style scoped lang="scss">
.es-button {
  margin: 0;
  padding: 0;
  background-color: inherit;
  position: static;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1 !important;
  width: fit-content;
  border-radius: 0;

  &:after {
    content: none;
    border: none;
  }
}
</style>
