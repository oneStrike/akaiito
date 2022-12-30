<script setup lang="ts">
interface ISwiperProps {
  mode: 'text'
  renderData: string[] | Record<string, any>[]
  keyName?: string
  autoplay?: boolean
  duration?: number
  textStyle?: string | Record<string, any>
}

const props = withDefaults(defineProps<ISwiperProps>(), {
  mode: 'text',
  autoplay: true,
  duration: 500
})
console.log('🚀 ~ file:lk-swiper method: line:16 -----', props)
</script>

<template>
  <!--	文本 -->
  <swiper class="text_swiper" :autoplay="autoplay" vertical>
    <swiper-item v-for="(text, index) in renderData" :key="index">
      <text :style="textStyle" class="u-line-1">{{ text }}</text>
    </swiper-item>
  </swiper>
</template>
<style scoped lang="scss">
.text_swiper {
  height: 40px;
}
</style>
