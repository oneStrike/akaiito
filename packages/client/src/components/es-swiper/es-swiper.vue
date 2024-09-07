<script lang="ts" setup>
export interface EsSwiperProps {
  mode: 'text'
  text?: string[]
}

defineOptions({
  name: 'EsSwiper',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsSwiperProps>(), {
  mode: 'text',
})
</script>

<template>
  <!-- 文字竖向轮播 -->
  <swiper
    v-if="mode === 'text' && Array.isArray(text)"
    class="w-full h-full"
    disable-touch
    vertical
  >
    <swiper-item v-for="(item, idx) in text" :key="idx" class="flex items-center">
      <es-text :text="item" size="sm" color="info" :line-clamp="2" />
    </swiper-item>
  </swiper>
</template>

<style scoped></style>
