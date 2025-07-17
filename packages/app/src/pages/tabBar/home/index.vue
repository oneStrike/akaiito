<script setup lang="ts">
  import { indexLogoApi, indexSliderApi } from '@/apis/indexApi'

  defineOptions({
    name: 'HomePage',
  })

  // 轮播数据
  const swiperOptions = ref<any[]>([])

  // 当前轮播索引
  const currentSwiperIndex = ref(0)

  // 背景图片切换状态
  const isTransitioning = ref(false)

  // 处理轮播切换
  const handleSwiperChange = (index: number) => {
    if (index !== currentSwiperIndex.value) {
      isTransitioning.value = true

      // 延迟更新索引，创建淡入淡出效果
      setTimeout(() => {
        currentSwiperIndex.value = index
        setTimeout(() => {
          isTransitioning.value = false
        }, 150) // 淡入时间
      }, 150) // 淡出时间
    }
  }

  // 获取数据
  Promise.all([indexLogoApi(), indexSliderApi()]).then((res) => {
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
      value: '2',
    },
    {
      label: 'AI国漫',
      value: '3',
    },
    {
      label: '拍摄写真',
      value: '4',
    },
  ]
</script>

<template>
  <es-page :nav-bar="false">
    <!-- 顶部导航 -->
    <view class="px-4 pt-4 flex justify-between relative z-99">
      <es-icons name="menu" />
      <es-icons name="search" />
    </view>

    <!-- 动态背景图片容器 -->
    <view
      v-if="swiperOptions[currentSwiperIndex]?.image_url"
      class="fixed top-0 left-0 right-0 h-400rpx overflow-hidden z-1"
    >
      <image
        :src="$filePath(swiperOptions[currentSwiperIndex]?.image_url)"
        class="w-full h-full blur-10px transition-all duration-300 ease-out transform-origin-center"
        :class="[
          isTransitioning ? 'opacity-30 scale-100' : 'opacity-100 scale-105',
        ]"
        mode="aspectFill"
      />
      <!-- 白色蒙层 -->
      <view class="absolute inset-0 bg-white/30 pointer-events-none" />
      <!-- 渐变遮罩 -->
      <view
        class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"
      />
      <!-- 底部虚化效果 -->
      <view
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-sm pointer-events-none"
      />
    </view>

    <!-- 轮播图 -->
    <es-swiper
      v-model="currentSwiperIndex"
      :options="swiperOptions"
      field="image_url"
      :height="400"
      :indicator-mode="3"
      indicator-color="rgba(255,255,255,0.7)"
      indicator-active-color="white"
      class="relative z-10 rounded-xl mx-3 overflow-hidden mt-6"
      @change="handleSwiperChange"
    />

    <!-- 标签页 -->
    <view class="relative z-10 px-5 mt-5">
      <es-tabs :tabs="tabs" />
    </view>
  </es-page>
</template>
