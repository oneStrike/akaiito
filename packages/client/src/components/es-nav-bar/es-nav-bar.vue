<script setup lang="ts">
import type { EsNavBarProps } from '@/components/es-nav-bar/types'

defineOptions({
  name: 'EsNavBar',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsNavBarProps>(), {
  titleSize: 'base',
  titleColor: 'base',
  leftColor: 'base',
  titleAlign: 'center',
  leftIcon: 'left',
  leftSize: '5xl',
  left: true,
  back: true,
  borderBottom: true,
  background: '#ffffff',
})
const { safeArea } = uni.$es.systemInfo
const { top, width, height, right } = uni.$es.menuRectInfo

const navBarStyle = reactive({
  height: `${height}px`,
  padding: `${top || 8}px 0 8px 0`,
})

const backgroundStyle = reactive({
  background: `${props.background}`,
  opacity: props.fade ? 0 : 1,
})

// #ifdef H5
navBarStyle.height = '44px'
navBarStyle.padding = '0'
// #endif

onPageScroll((res) => {
  if (props.fade) {
    backgroundStyle.opacity = res.scrollTop / 100
  }
})

const rightAreaPosition = ref(
  `right: ${safeArea!.width - right + width || 15}px;`,
)

function back() {
  if (props.back) {
    uni.$es.router.back()
  }
}
</script>

<template>
  <view class="sticky top-0 z-99 box-content" :style="navBarStyle">
    <view
      v-if="borderBottom"
      class="absolute bottom-0 z-50 w-full border-bottom"
    />
    <view
      class="absolute left-0 top-0 z--1 h-full w-full"
      :style="backgroundStyle"
    />

    <view class="h-full w-full flex items-center justify-center px-3">
      <view
        v-if="left"
        class="absolute left-3 z-1 w-8 flex items-center justify-center"
      >
        <slot name="left">
          <es-icons
            :name="leftIcon"
            :size="leftSize"
            :color="leftColor"
            @click="back"
          />
        </slot>
      </view>
      <view class="px-8" :style="{ textAlign: titleAlign }">
        <view class="inline-block">
          <es-text :text="title" :color="titleColor" :size="titleSize" cn />
        </view>
      </view>
      <view class="absolute z-1" :style="rightAreaPosition">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
