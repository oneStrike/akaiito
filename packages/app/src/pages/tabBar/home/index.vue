<script setup lang="ts">
  import { indexCategoriesApi, indexSliderApi } from '@/apis/indexApi'
  import { useSystemStore } from '@/stores/modules/system'
  import { getSafeAreaTopRpx } from '@/utils/safeArea'

  defineOptions({
    name: 'HomePage',
  })

  const systemStore = useSystemStore()

  // 轮播数据
  const swiperOptions = ref<any[]>([])

  // 当前轮播索引
  const currentSwiperIndex = ref(0)
  const currentTab = ref(0)

  // Logo透明度
  const logoOpacity = ref(0)

  // 标签页背景透明度（用于平滑过渡）
  const tabsBgOpacity = ref(0)

  // 页面滚动监听
  onPageScroll((e) => {
    const scrollTop = e.scrollTop

    // 计算透明度 (0-100px范围内渐变)
    logoOpacity.value = Math.min(scrollTop / 100, 1)

    tabsBgOpacity.value = Math.max(0, Math.min(scrollTop - 200, 1))
  })

  // 分类数据
  const categories = ref()

  // 文章数据参数
  const listParams = ref({
    id: '',
  })

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

  // 处理瀑布流项目点击
  const handleItemClick = (item: any) => {
    console.log('点击了文章:', item)
    // 这里可以添加跳转到文章详情的逻辑
  }

  // 获取数据
  Promise.all([indexSliderApi(), indexCategoriesApi()]).then(async (res) => {
    const [swiper, category] = res
    swiperOptions.value = swiper
    categories.value = [
      {
        label: '最新文章',
        value: 'new',
      },
      ...category.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      }),
    ]
    listParams.value = {
      id: 'new',
    }
  })

  // 监听标签页切换
  watch(currentTab, (val) => {
    listParams.value = {
      id: categories.value[val].value,
    }
  })
</script>

<template>
  <es-page :nav-bar="false" background-color="#f2f3f4">
    <view
      class="fixed top-0 z-999 flex w-full flex items-center logo-fade h-14 box-content"
      :style="{
        paddingTop: `${getSafeAreaTopRpx()}rpx`,
        background: `rgba(255,255,255,${logoOpacity})`,
      }"
    >
      <es-icons name="menu" class="absolute left-4" />
      <image
        class="absolute w-252rpx h-72rpx left-1/2 -translate-x-1/2"
        :src="$filePath(systemStore.appConfig.logo)"
        mode="aspectFill"
        :style="{
          opacity: logoOpacity,
        }"
      />
      <es-icons name="search" class="absolute right-4" />
    </view>
    <!--  #ifndef APP   -->
    <view class="h-14" />
    <!--  #endif   -->
    <!-- 动态背景图片容器 -->
    <view
      v-if="swiperOptions[currentSwiperIndex]?.image"
      class="absolute top-0 left-0 right-0 h-500rpx overflow-hidden z-1"
    >
      <image
        :src="$filePath(swiperOptions[currentSwiperIndex]?.image)"
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
        class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40"
      />
      <!-- 底部虚化效果 -->
      <view
        class="absolute left-0 right-0 pointer-events-none bottom-0 h-20 bg-gradient-to-t from-[#f2f3f4] via-[#f2f3f4cc] to-transparent backdrop-blur-sm"
      />
    </view>

    <!-- 轮播图 -->
    <es-swiper
      v-model="currentSwiperIndex"
      :options="swiperOptions"
      field="image"
      :height="400"
      :indicator-mode="3"
      mask-field="color"
      :auto-play="false"
      indicator-color="rgba(255,255,255,0.7)"
      indicator-active-color="white"
      class="overflow-hidden relative z-10 rounded-xl mx-3"
      :arrows="true"
      :gap="30"
      @change="handleSwiperChange"
    />

    <!-- 标签页 -->
    <view
      v-if="categories"
      class="relative z-10 transition-all px-5 sticky top-14 py-2 mt-5 duration-200"
      :class="{
        'shadow-sm border-b border-gray-100': tabsBgOpacity > 0.5,
      }"
      :style="{
        backgroundColor: `rgba(255, 255, 255, ${tabsBgOpacity})`,
        backdropFilter: tabsBgOpacity > 0 ? 'blur(8px)' : 'none',
      }"
    >
      <!-- 背景层 -->
      <view
        class="absolute inset-0 -z-1"
        :style="{
          backgroundColor: '#f2f3f4',
          opacity: 1 - tabsBgOpacity,
        }"
      />
      <es-tabs v-model="currentTab" :scrollable="1" :tabs="categories" />
    </view>
  </es-page>
</template>

<style scoped lang="scss">
  .logo-fade {
    transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity;
    transform: translateZ(0); // 启用硬件加速
  }
</style>
