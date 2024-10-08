<script lang="ts" setup>
import type icons from '@/components/es-icons/es-icons.json'

defineOptions({
  name: 'EsNavBar',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsNavBarProps>(), {
  leftIcon: 'arrowLeft',
  leftText: '',
  color: '#18191C',
  centerText: '',
  safeArea: true,
  backgroundColor: '#ffffff',
})

export interface EsNavBarProps {
  leftText?: string
  leftIcon?: keyof typeof icons
  centerText?: string
  color?: string
  safeArea?: boolean
  backgroundColor?: string
}

const safeAreaWidth = ref('')
const navBarStyle = computed(() => {
  const { top, height, left } = uni.$es.menuRectInfo
  const { windowWidth } = uni.$es.systemInfo
  let paddingTop = top || uni.$es.systemInfo.safeAreaInsets!.top
  if (uni.$es.platform === 'web') {
    paddingTop += 8
  }
  safeAreaWidth.value = `width:${windowWidth - left}px;`
  return {
    backgroundColor: props.backgroundColor,
    paddingTop: `${paddingTop}px`,
    height: `${height}px`,
  }
})
</script>

<template>
  <view
    :style="navBarStyle"
    class="flex justify-between sticky top-0 box-content pb-2"
  >
    <slot name="content">
      <view class="flex items-center w-60px">
        <slot name="left">
          <es-icons :name="leftIcon" :size="50" :color="color" />
          <es-text v-if="leftText" :text="leftText" :color="color" />
        </slot>
      </view>

      <view class="flex-1 text-center">
        <slot name="center">
          <es-text :text="centerText" :color="color" />
        </slot>
      </view>

      <view class="w-60px">
        <slot name="right" />
      </view>
    </slot>
    <view v-if="safeArea" class="safe-area shrink-0" :style="safeAreaWidth" />
  </view>
</template>

<style scoped></style>
