<script setup lang="ts">
  import {
    indexCategoriesApi,
    indexPostApi,
    indexSliderApi,
  } from '@/apis/indexApi'
  import { useConfig } from '@/components/libs/hooks/useConfig'
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

    // 计算标签页背景透明度（180-220px范围内渐变）
    const bgStartThreshold = 180
    const bgEndThreshold = 220
    tabsBgOpacity.value = Math.max(
      0,
      Math.min(
        (scrollTop - bgStartThreshold) / (bgEndThreshold - bgStartThreshold),
        1,
      ),
    )
  })

  // 分类数据
  const categories = ref()

  // 文章数据
  const listParams = ref({
    id: '',
  })
  const listData = ref()
  const listRef = ref()

  // 背景图片切换状态
  const isTransitioning = ref(false)

  // 瀑布流数据分组 - 将数据分成左右两列
  const waterfallData = computed(() => {
    if (!listData.value?.data) {
      return { leftColumn: [], rightColumn: [] }
    }

    const leftColumn: any[] = []
    const rightColumn: any[] = []
    let leftHeight = 0
    let rightHeight = 0

    // 智能分配策略：根据内容长度和图片估算高度
    listData.value.data.forEach((item: any) => {
      // 估算卡片高度（基础高度 + 标题长度 + 图片高度估算）
      let estimatedHeight = 100 // 基础padding和边距

      // 标题高度估算（假设每行约20px，最多2行）
      if (item.title) {
        const titleLines = Math.min(Math.ceil(item.title.length / 15), 2)
        estimatedHeight += titleLines * 20
      }

      // 图片高度估算（如果有图片，假设平均高度150px）
      if (item.thumbnail) {
        estimatedHeight += 150
      }

      // 时间信息高度
      if (item.created_at) {
        estimatedHeight += 20
      }

      // 选择高度较小的列
      if (leftHeight <= rightHeight) {
        leftColumn.push(item)
        leftHeight += estimatedHeight
      } else {
        rightColumn.push(item)
        rightHeight += estimatedHeight
      }
    })

    return { leftColumn, rightColumn }
  })

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
    nextTick(() => {
      listRef.value.refresh()
    })
  })

  watch(currentTab, (val) => {
    listParams.value = {
      id: categories.value[val].value,
    }
  })
</script>

<template>
  <es-page :nav-bar="false" background-color="#f2f3f4">
    <view
      class="fixed top-0 z-999 flex justify-center w-full flex justify-between items-center logo-fade h-14 px-4"
      :style="{
        paddingTop: `${getSafeAreaTopRpx()}rpx`,
        background: `rgba(255,255,255,${logoOpacity})`,
      }"
    >
      <es-icons name="menu" />
      <image
        class="w-252rpx h-72rpx"
        :src="$filePath(systemStore.appConfig.logo)"
        mode="aspectFill"
        :style="{
          opacity: logoOpacity,
        }"
      />
      <es-icons name="search" />
    </view>

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
    <view class="h-14" />

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
      class="relative overflow-hidden z-10 rounded-xl mx-3"
      :arrows="true"
      :gap="30"
      @change="handleSwiperChange"
    />

    <!-- 标签页 -->
    <view
      v-if="categories"
      class="relative z-10 px-5 sticky top-14 py-2 mt-5 transition-all duration-200"
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

    <!--  文章瀑布流  -->
    <es-list
      v-if="listParams.id"
      ref="listRef"
      v-model:params="listParams"
      v-model:list="listData"
      :api="indexPostApi"
      :auto-load="false"
      class="p-3"
    >
      <!-- 瀑布流容器 -->
      <view class="flex gap-3">
        <!-- 动态渲染左右两列 -->
        <view
          v-for="(column, columnIndex) in [
            waterfallData.leftColumn,
            waterfallData.rightColumn,
          ]"
          :key="`column-${columnIndex}`"
          class="flex gap-3 flex-1 flex-col"
        >
          <view
            v-for="item in column"
            :key="`${columnIndex}-${item.id}`"
            class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
          >
            <!-- 图片容器 -->
            <view v-if="item.thumbnail" class="relative overflow-hidden">
              <image
                :src="$filePath(item.thumbnail)"
                class="w-full duration-300 transition-transform hover:scale-105"
                mode="widthFix"
                :style="{ height: 'auto' }"
              />
              <!-- 图片遮罩渐变 -->
              <view
                class="absolute inset-0 bg-gradient-to-t to-transparent from-black/10 opacity-0"
              />
            </view>
            <!-- 内容区域 -->
            <view class="p-4">
              <view class="inline-flex">
                <es-text :line-clamp="2">
                  <es-text
                    class="border relative rounded-6rpx px-1.5 bottom-0.5 font-medium"
                    color="primary"
                    size="xs"
                    :style="{ borderColor: useConfig.getColor('primary') }"
                  >
                    {{ item.categories[0] }}
                  </es-text>
                  {{ item.title }}
                </es-text>
              </view>
              <!-- 底部信息栏 -->
              <view class="flex justify-between items-center mt-2">
                <image
                  :src="$filePath(item.author.avatar)"
                  mode="scaleToFill"
                  class="w-5 h-5 rounded-full mr-1 bg-red"
                />
                <view class="flex items-center justify-between flex-1">
                  <es-text color="minor" size="sm">
                    {{ item.author.name }}
                  </es-text>
                  <view class="flex items-center">
                    <es-icons color="minor" name="thumb" size="sm" />
                    <es-text color="minor" size="sm" class="ml-1">
                      {{ item.like_count }}
                    </es-text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </es-list>
    <!-- 页面底部虚化背景 -->
    <view class="h-200" />
  </es-page>
</template>

<style scoped lang="scss">
  .logo-fade {
    transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity;
    transform: translateZ(0); // 启用硬件加速
  }
</style>
