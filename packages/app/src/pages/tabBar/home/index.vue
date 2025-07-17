<script setup lang="ts">
  import {
    indexCategoriesApi,
    indexLogoApi,
    indexPostApi,
    indexSliderApi,
  } from '@/apis/indexApi'
  import EsTag from '@/components/es-tag/es-tag.vue'

  defineOptions({
    name: 'HomePage',
  })

  // 轮播数据
  const swiperOptions = ref<any[]>([])

  // 当前轮播索引
  const currentSwiperIndex = ref(0)
  const currentTab = ref(0)

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
  Promise.all([indexLogoApi(), indexSliderApi(), indexCategoriesApi()]).then(
    async (res) => {
      const [logo, swiper, category] = res
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
      listRef.value.refresh()
    },
  )
</script>

<template>
  <es-page :nav-bar="false" background-color="#f2f3f4">
    <!-- 顶部导航 -->
    <view class="px-4 pt-4 flex justify-between relative z-99">
      <es-icons name="menu" />
      <es-icons name="search" />
    </view>

    <!-- 动态背景图片容器 -->
    <view
      v-if="swiperOptions[currentSwiperIndex]?.image"
      class="absolute top-0 left-0 right-0 h-400rpx overflow-hidden z-1"
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
      field="image"
      :height="400"
      :indicator-mode="3"
      mask-field="color"
      :auto-play="false"
      indicator-color="rgba(255,255,255,0.7)"
      indicator-active-color="white"
      class="relative overflow-hidden z-10 rounded-xl mx-3 mt-6"
      :arrows="true"
      :gap="30"
      @change="handleSwiperChange"
    />

    <!-- 标签页 -->
    <view v-if="categories" class="relative z-10 px-5 mt-5">
      <es-tabs v-model="currentTab" :scrollable="1" :tabs="categories" />
    </view>

    <!--  文章瀑布流  -->
    <es-list
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
          class="flex-1 flex flex-col gap-3"
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
                  <EsTag
                    :text="item.categories[0]"
                    type="primary"
                    plain
                    size="mini"
                    class="mt-0.5"
                  />
                  {{ item.title }}
                </es-text>
              </view>
              <!-- 底部信息栏 -->
              <view class="flex justify-between items-center p-2" />
            </view>
          </view>
        </view>
      </view>
    </es-list>
  </es-page>
</template>

<style scoped lang="scss">
  /* #ifdef APP */
  .es-page {
    padding-top: 60rpx;
  }
  /* #endif */
</style>
