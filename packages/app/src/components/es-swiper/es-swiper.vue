<script setup lang="ts">
  import type { SwiperOnChangeEvent } from '@uni-helper/uni-types'
  import type { EsSwiperProps } from '@/components/es-swiper/types'
  import { useConfig } from '@/components/libs/hooks/useConfig'

  defineOptions({
    name: 'EsSwiper',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared',
    },
  })

  const props = withDefaults(defineProps<EsSwiperProps>(), {
    mode: 'default',
    field: 'path',
    height: 360,
    autoPlay: true,
    textSize: 'base',
    textColor: 'base',
    indicator: true,
    indicatorMode: 1,
    arrows: false,
    gap: 0,
  })

  const emits = defineEmits<{
    (event: 'change', data: number): void
  }>()

  const modelValue = defineModel({
    type: Number,
    default: 0,
  })

  const swiperChange = (e: SwiperOnChangeEvent) => {
    modelValue.value = e.detail.current
    emits('change', e.detail.current)
  }

  // 上一页
  const handlePrevious = () => {
    if (props.options.length === 0) return

    const newIndex =
      modelValue.value === 0 ? props.options.length - 1 : modelValue.value - 1

    modelValue.value = newIndex
    emits('change', newIndex)
  }

  // 下一页
  const handleNext = () => {
    if (props.options.length === 0) return

    const newIndex =
      modelValue.value === props.options.length - 1 ? 0 : modelValue.value + 1

    modelValue.value = newIndex
    emits('change', newIndex)
  }
</script>

<template>
  <view class="relative">
    <swiper
      v-if="mode === 'default'"
      :autoplay="autoPlay"
      :current="modelValue"
      circular
      :style="{ height: useConfig.addUnit(height) }"
      class="relative"
      @change="swiperChange"
    >
      <swiper-item v-for="item in options" :key="item.id" class="h-full w-full">
        <image
          class="h-full w-full"
          :src="$filePath(item[field])"
          mode="scaleToFill"
        />
        <view
          v-if="maskField"
          class="absolute bottom-0 left-0 right-0 h-24 z-999 flex items-end"
          :style="{
            background: `linear-gradient(to bottom, transparent 0%, ${item[maskField]} 100%)`,
          }"
        >
          <view class="w-full py-4 px-6">
            <es-text :text="item.title" color="white" />
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- Default 模式的固定箭头按钮 -->
    <view
      v-if="arrows && mode === 'default'"
      class="flex absolute right-6 bottom-8 z-1000"
    >
      <view
        class="flex rounded-md items-center justify-center bg-white/10 w-7 h-7"
        @click="handlePrevious"
      >
        <es-icons name="left" color="white" size="4xl" />
      </view>
      <view
        class="bg-white/10 w-7 h-7 rounded-md flex items-center justify-center ml-3"
        @click="handleNext"
      >
        <es-icons name="right" color="white" size="4xl" />
      </view>
    </view>
    <swiper
      v-if="mode === 'zoom'"
      :autoplay="autoPlay"
      :current="modelValue"
      circular
      previous-margin="60rpx"
      next-margin="60rpx"
      :style="{ height: useConfig.addUnit(height) }"
      @change="swiperChange"
    >
      <swiper-item
        v-for="(item, idx) in options"
        :key="item.id"
        class="h-full w-full flex justify-center"
      >
        <image
          class="h-full w-full rounded-xl bg-black transition-transform"
          :class="modelValue === idx ? '' : 'scale-90'"
          :src="$filePath(item[field])"
          mode="scaleToFill"
        />
        <es-text :text="item[field]" :size="textSize" :color="textColor" />
      </swiper-item>
    </swiper>

    <!-- Zoom 模式的固定箭头按钮 -->
    <template v-if="arrows && mode === 'zoom'">
      <!-- 左箭头 -->
      <view
        class="absolute left-4 top-1/2 z-1000 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)] text-white transition-all hover:bg-[rgba(0,0,0,0.5)]"
        @click="handlePrevious"
      >
        <text class="i-tabler-chevron-left text-lg" />
      </view>
      <!-- 右箭头 -->
      <view
        class="absolute right-4 top-1/2 z-1000 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)] text-white transition-all hover:bg-[rgba(0,0,0,0.5)]"
        @click="handleNext"
      >
        <text class="i-tabler-chevron-right text-lg" />
      </view>
    </template>
    <swiper
      v-if="mode === 'text'"
      :autoplay="autoPlay"
      :current="modelValue"
      circular
      vertical
      :style="{ height: useConfig.addUnit(height) }"
      @change="swiperChange"
    >
      <swiper-item
        v-for="item in options"
        :key="item.id"
        class="h-full w-full flex items-center"
      >
        <es-text :text="item[field]" :size="textSize" :color="textColor" />
      </swiper-item>
    </swiper>

    <!-- Text 模式的固定箭头按钮 -->
    <template v-if="arrows && mode === 'text'">
      <!-- 上箭头 -->
      <view
        class="absolute left-1/2 top-4 z-1000 flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)] text-white transition-all hover:bg-[rgba(0,0,0,0.5)]"
        @click="handlePrevious"
      >
        <text class="i-tabler-chevron-up text-lg" />
      </view>
      <!-- 下箭头 -->
      <view
        class="absolute left-1/2 bottom-4 z-1000 flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)] text-white transition-all hover:bg-[rgba(0,0,0,0.5)]"
        @click="handleNext"
      >
        <text class="i-tabler-chevron-down text-lg" />
      </view>
    </template>
    <es-swiper-indicator
      v-if="indicator && mode !== 'text'"
      v-model="modelValue"
      :color="indicatorColor"
      :mode="indicatorMode"
      :active-color="indicatorActiveColor"
      :position="indicatorPosition"
      :length="options.length"
    />
  </view>
</template>

<style scoped lang="scss"></style>
