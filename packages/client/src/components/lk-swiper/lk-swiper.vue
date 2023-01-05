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

const emits = defineEmits<{
  (event: 'click', index: number): void
}>()

const textClick = (index: number) => {
  emits('click', index)
}
</script>

<template>
  <!--	文本 -->
  <swiper class="text_swiper h_100" :autoplay="autoplay" vertical circular>
    <swiper-item
      v-for="(text, index) in renderData"
      :key="index"
      class="flex cross_center"
      @click="textClick(index)"
    >
      <view :style="textStyle" class="u-line-1 fs_14 fc_3">{{ text }}</view>
    </swiper-item>
  </swiper>
</template>
<style scoped lang="scss"></style>
