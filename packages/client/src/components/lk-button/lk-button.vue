<script setup lang="ts">
import {
  ColorSchemeKey,
  SizeSchemeKey
} from '@/components/libs/typings/components'
import { useColor } from '@/components/libs/hooks/useConfig'

export interface ButtonProps {
  type?: ColorSchemeKey
  size?: SizeSchemeKey
  text?: string
  color?: ColorSchemeKey
  light?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  text: '',
  light: false,
  color: 'white'
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const buttonStyle = computed(() => ({
  backgroundColor: useColor(props.type),
  color: useColor(props.color)
}))
</script>

<template>
  <button class="clear_btn bd_radius_small" @click="emits('click')">
    <view
      :class="['flex_center', 'bd_radius_small', size + '_btn']"
      :style="buttonStyle"
    >
      <lk-text :text="text" :size="size" :color="color" />
    </view>
  </button>
</template>

<style scoped lang="scss">
/* #ifndef APP-PLUS-NVUE*/
text {
  display: block;
}

/* #endif*/

.small_btn {
  padding: 4px 8px !important;
}

.medium_btn {
  padding: 8px 24px !important;
}

.large_btn {
  padding: 12px 32px !important;
}
</style>
