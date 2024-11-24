<script setup lang="ts">
import type { EsSwiperProps } from '@/components/es-swiper/types'
import type { SwiperOnChangeEvent } from '@uni-helper/uni-types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsSwiper',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

withDefaults(defineProps<EsSwiperProps>(), {
  mode: 'text',
  field: 'path',
  height: 360,
  autoPlay: true,
  textSize: 'base',
  textColor: 'base',
  indicator: true,
  indicatorMode: 1,
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
</script>

<template>
  <view class="relative">
    <swiper
      v-if="mode === 'default'"
      :autoplay="autoPlay"
      :current="modelValue"
      circular
      :style="{ height: useConfig.addUnit(height) }"
      @change="swiperChange"
    >
      <swiper-item v-for="item in options" :key="item.id" class="h-full w-full">
        <image
          class="h-full w-full"
          :src="$filePath(item[field])"
          mode="scaleToFill"
        ></image>
      </swiper-item>
    </swiper>
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
        ></image>

        <es-text :text="item[field]" :size="textSize" :color="textColor" />
      </swiper-item>
    </swiper>
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
    <es-swiper-indicator
      v-if="indicator && mode !== 'text'"
      v-model="modelValue"
      :color="indicatorColor"
      :mode="indicatorMode"
      :actice-color="indicatorActiveColor"
      :position="indicatorPosition"
      :length="options.length"
    />
  </view>
</template>

<style scoped lang="scss"></style>
