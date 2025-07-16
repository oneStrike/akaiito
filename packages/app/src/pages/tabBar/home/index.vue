<script setup lang="ts">
  import { getAppLogoApi, getAppSwiperApi } from '@/apis/home.ts'

  defineOptions({
    name: 'HomePage',
  })
  const swiperOptions = ref([])
  Promise.all([getAppLogoApi(), getAppSwiperApi()]).then((res) => {
    const [logo, swiper] = res
    swiperOptions.value = swiper
  })

  const tabs = [
    {
      label: '最新发布',
      value: '1',
    },
    {
      label: 'Pixiv插画',
      value: '1',
    },
    {
      label: 'AI国漫',
      value: '1',
    },
    {
      label: '拍摄写真',
      value: '1',
    },
  ]
</script>

<template>
  <es-page :nav-bar="false">
    <view class="px-4 pt-4 flex justify-between relative z-99">
      <es-icons name="menu" />

      <es-icons name="search" />
    </view>
    <image
      src="https://youke1.picui.cn/s1/2025/07/16/6877b6514dff2.jpg"
      class="fixed top-0 w-full h-400rpx blur-lg"
    />
    <es-swiper
      :options="swiperOptions"
      field="image_url"
      :height="400"
      indicator-active-color="white"
      class="rounded-xl mx-3 overflow-hidden mt-6"
    />

    <view class="px-5 mt-5">
      <es-tabs :tabs="tabs" />
    </view>
  </es-page>
</template>

<style scoped lang="scss"></style>
