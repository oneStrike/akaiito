<script setup lang="ts">
  import type { EsSwiperIndicatorProps } from '@/components/es-swiper-indicator/types'
  import { useConfig } from '@/components/libs/hooks/useConfig'

  defineOptions({
    name: 'EsSwiperIndicator',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared',
    },
  })

  const props = withDefaults(defineProps<EsSwiperIndicatorProps>(), {
    mode: 1,
    color: '#ffffff',
    position: 'center',
    activeColor: 'primary',
  })
  const modelValue = defineModel({
    type: Number,
    default: 0,
  })
  console.log(props)
  const getBackgroundColor = (target: number) => {
    return target - 1 === modelValue.value
      ? useConfig.getColor(props.activeColor)
      : useConfig.getColor(props.color)
  }
  const positionClassName = computed(() => {
    switch (props.position) {
      case 'left':
        return 'justify-start'
      case 'center':
        return 'justify-center'
      case 'right':
        return 'justify-end'
      default:
        return ''
    }
  })
</script>

<template>
  <view
    class="absolute bottom-2 z-50 w-full flex flex px-2"
    :class="positionClassName"
  >
    <template v-if="mode === 5">
      <view
        class="rounded-full bg-black/[.4] px-2 py-0.5 text-align-center text-sm leading-4 tracking-0.5"
      >
        <es-text :text="modelValue + 1" size="sm" :color="activeColor" />
        <es-text :text="`/${length}`" size="xs" :color="color" />
      </view>
    </template>
    <template v-else>
      <view v-for="item in length" :key="item">
        <template v-if="mode === 1">
          <view
            class="ml-1 h-2 w-2 rounded-full"
            :style="{
              background: getBackgroundColor(item),
            }"
          />
        </template>

        <template v-if="mode === 2">
          <view
            class="ml-1 h-1 w-7 rounded-full"
            :style="{
              background: getBackgroundColor(item),
            }"
          />
        </template>
        <template v-if="mode === 3">
          <view
            class="h-2 w-7 rounded-full ml-2 transition-all shrink-0"
            :style="{
              background: getBackgroundColor(item),
              width: modelValue === item - 1 ? '38rpx' : '16rpx',
            }"
          />
        </template>
        <template v-if="mode === 4">
          <view
            class="ml-1 rounded-full text-align-center text-sm leading-4 transition-all h-4 w-4 bg-gray-300"
          >
            <es-text
              :text="item"
              size="xs"
              :color="modelValue === item - 1 ? activeColor : color"
            />
          </view>
        </template>
      </view>
    </template>
  </view>
</template>

<style scoped lang="scss"></style>
