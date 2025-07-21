<script setup lang="ts">
import type { EsWaterfallProps, EsWaterfallInstance, ImageSize, ColumnHeights } from '@/components/es-waterfall/types'
import type { IterateObject } from '@/types/global'
import { debounce } from '@/components/es-waterfall/utils'

/**
 * 瀑布流组件
 * 支持图片预加载、高度缓存、增量更新等性能优化
 */
defineOptions({
  name: 'EsWaterfall',
  options: {
    virtualHost: true,
  },
})

// 组件属性定义
const props = withDefaults(defineProps<EsWaterfallProps>(), {
  autoLoad: true,
  columnGap: 24,
  rowGap: 24,
  padding: 24,
  defaultImageHeight: 240,
  titleCharsPerLine: 12,
  titleMaxLines: 2,
  titleLineHeight: 40,
  cardBaseHeight: 160,
  debounceDelay: 100,
})

// 组件事件定义
const emits = defineEmits<{
  (event: 'item-click', item: any): void
  (event: 'load-more'): void
  (event: 'refresh'): void
}>()

// 数据请求参数
const params = defineModel('params', {
  default: () => ({ page: 1, limit: 20 }),
  type: Object,
})

// 列表数据
const listData = defineModel('list', {
  type: Object,
  default: () => ({ data: [], total: 0, offset: 0, limit: 20 }),
})

// 图片尺寸缓存
const imageSizeCache = ref<Map<string, ImageSize>>(new Map())

// 卡片高度缓存
const cardHeightCache = ref<Map<string, number>>(new Map())

// 瀑布流数据状态
const waterfallData = ref<{ leftColumn: any[]; rightColumn: any[] }>({
  leftColumn: [],
  rightColumn: []
})

// 列高度缓存
const columnHeights = ref<ColumnHeights>({ left: 0, right: 0 })

// 已处理的数据项ID集合
const processedItemIds = ref<Set<string>>(new Set())

// 加载状态
const loading = ref(false)

// 是否跳过参数监听
let skipParamsWatch = false

/**
 * 批量预加载图片并获取尺寸
 * @param urls 图片URL数组
 * @returns 图片尺寸映射
 */
const preloadImages = async (urls: string[]): Promise<Map<string, ImageSize>> => {
  const results = new Map<string, ImageSize>()
  
  // 过滤出未缓存的图片
  const uncachedUrls = urls.filter(url => !imageSizeCache.value.has(url))
  
  if (uncachedUrls.length === 0) {
    // 所有图片都已缓存，直接返回
    urls.forEach(url => {
      const cachedSize = imageSizeCache.value.get(url)
      if (cachedSize) {
        results.set(url, cachedSize)
      }
    })
    return results
  }

  // 并行获取图片信息
  const promises = uncachedUrls.map(src => 
    new Promise<{ src: string; size: ImageSize }>((resolve) => {
      uni.getImageInfo({
        src,
        success: (res) => {
          const size: ImageSize = { width: res.width, height: res.height }
          imageSizeCache.value.set(src, size)
          resolve({ src, size })
        },
        fail: () => {
          // 图片加载失败时使用默认尺寸
          const defaultSize: ImageSize = { width: 300, height: props.defaultImageHeight }
          imageSizeCache.value.set(src, defaultSize)
          resolve({ src, size: defaultSize })
        }
      })
    })
  )

  const imageResults = await Promise.all(promises)
  
  // 合并结果
  imageResults.forEach(({ src, size }) => {
    results.set(src, size)
  })
  
  // 添加已缓存的结果
  urls.filter(url => imageSizeCache.value.has(url)).forEach(url => {
    const cachedSize = imageSizeCache.value.get(url)
    if (cachedSize) {
      results.set(url, cachedSize)
    }
  })

  return results
}

/**
 * 计算卡片实际高度（使用缓存）
 * @param item 数据项
 * @param imageSize 图片尺寸
 * @returns 卡片高度
 */
const calculateCardHeight = (item: any, imageSize?: ImageSize): number => {
  // 检查高度缓存
  const cacheKey = `${item.id}_${item.title?.length || 0}_${imageSize?.width || 0}_${imageSize?.height || 0}`
  if (cardHeightCache.value.has(cacheKey)) {
    return cardHeightCache.value.get(cacheKey)!
  }

  let height = props.cardBaseHeight // 基础高度

  // 标题高度计算
  if (item.title) {
    const titleLines = Math.min(Math.ceil(item.title.length / props.titleCharsPerLine), props.titleMaxLines)
    height += titleLines * props.titleLineHeight
  }

  // 图片高度计算
  if (item.thumbnail && typeof item.thumbnail === 'string' && imageSize) {
    const cardWidth = (uni.getSystemInfoSync().windowWidth - props.padding * 2 - props.columnGap) / 2
    const imageHeight = (imageSize.height / imageSize.width) * cardWidth
    height += imageHeight
  } else if (item.thumbnail) {
    // 没有图片尺寸信息时使用默认高度
    height += props.defaultImageHeight
  }

  // 缓存计算结果
  cardHeightCache.value.set(cacheKey, height)
  return height
}

/**
 * 批量处理瀑布流数据分配
 */
const redistributeWaterfallData = async () => {
  if (!listData.value?.data) {
    waterfallData.value = { leftColumn: [], rightColumn: [] }
    processedItemIds.value.clear()
    columnHeights.value = { left: 0, right: 0 }
    return
  }

  // 检查是否是全新的数据
  const currentItemIds = new Set(listData.value.data.map((item: any) => item.id))
  const isNewDataSet = Array.from(processedItemIds.value).some(id => !currentItemIds.has(id))
  
  if (isNewDataSet) {
    // 全新数据，重置所有状态
    waterfallData.value = { leftColumn: [], rightColumn: [] }
    processedItemIds.value.clear()
    columnHeights.value = { left: 0, right: 0 }
  }

  // 找出新增的数据项
  const newItems = listData.value.data.filter((item: any) => !processedItemIds.value.has(item.id))
  
  if (newItems.length === 0) {
    return
  }

  // 批量预加载所有新增项目的图片
  const imageUrls = newItems
    .filter(item => item.thumbnail && typeof item.thumbnail === 'string')
    .map(item => item.thumbnail)
  
  const imageSizes = await preloadImages(imageUrls)

  // 批量计算高度并分配
  newItems.forEach(item => {
    const imageSize = item.thumbnail ? imageSizes.get(item.thumbnail) : undefined
    const cardHeight = calculateCardHeight(item, imageSize)
    
    // 选择高度较小的列
    if (columnHeights.value.left <= columnHeights.value.right) {
      waterfallData.value.leftColumn.push(item)
      columnHeights.value.left += cardHeight
    } else {
      waterfallData.value.rightColumn.push(item)
      columnHeights.value.right += cardHeight
    }
    
    processedItemIds.value.add(item.id)
  })
}

// 防抖的重新分配函数
const debouncedRedistribute = debounce(redistributeWaterfallData, props.debounceDelay)

/**
 * 发送数据请求
 * @param p 额外参数
 */
const sendRequest = async (p?: IterateObject) => {
  loading.value = true
  skipParamsWatch = true
  
  if (p) {
    params.value = Object.assign(params.value, p)
  }
  
  try {
    params.value.page = params.value.page || 1
    const res = await props.api(params.value)
    
    if (params.value.page === 1) {
      // 第一页，重置数据
      listData.value = res
    } else {
      // 追加数据
      listData.value.data = [...(listData.value.data || []), ...(res.data || [])]
      listData.value.total = res.total
      listData.value.offset = res.offset
      listData.value.limit = res.limit
    }
    
    params.value.page++
  } catch (error) {
    console.error('瀑布流数据请求失败:', error)
  } finally {
    loading.value = false
    skipParamsWatch = false
  }
}

/**
 * 刷新数据
 */
const refresh = async () => {
  params.value.page = 1
  await sendRequest()
  emits('refresh')
}

/**
 * 加载更多数据
 */
const loadMore = async () => {
  if (loading.value) return
  await sendRequest()
  emits('load-more')
}

/**
 * 处理卡片点击事件
 * @param item 点击的数据项
 */
const handleItemClick = (item: any) => {
  emits('item-click', item)
}

/**
 * 处理图片加载完成事件
 * @param item 数据项
 */
const handleImageLoad = (item: any) => {
  // 图片加载完成后可以进行一些优化操作
  console.log('图片加载完成:', item.id)
}

/**
 * 处理图片加载失败事件
 * @param item 数据项
 */
const handleImageError = (item: any) => {
  console.warn('图片加载失败:', item.id, item.thumbnail)
}

// 监听数据变化，重新分配瀑布流
watch(
  () => listData.value?.data,
  async (newData) => {
    if (newData && newData.length > 0) {
      await debouncedRedistribute()
    }
  },
  { deep: true }
)

// 监听参数变化，重新请求数据
watch(
  () => params.value,
  async () => {
    if (!skipParamsWatch) {
      await refresh()
    }
  },
  { deep: true }
)

// 组件挂载时自动加载数据
onMounted(async () => {
  if (props.autoLoad) {
    await sendRequest()
  }
})

// 触底加载更多
onReachBottom(() => {
  if (!loading.value && listData.value.data.length < listData.value.total) {
    loadMore()
  }
})

// 计算加载状态
const loadMoreStatus = computed(() => {
  if (loading.value) {
    return 'loading'
  }
  if (listData.value.data.length >= listData.value.total) {
    return 'noMore'
  }
  return 'more'
})

// 暴露组件实例方法
const instance: EsWaterfallInstance = {
  refresh,
  sendRequest,
  listData: listData.value,
  waterfallData: waterfallData.value,
}

defineExpose(instance)
</script>

<template>
  <view class="es-waterfall">
    <!-- 瀑布流容器 -->
    <view 
      class="waterfall-container"
      :style="{
        padding: `0 ${padding}rpx`,
        gap: `${columnGap}rpx`
      }"
    >
      <!-- 左列 -->
      <view class="waterfall-column">
        <view
          v-for="(item, index) in waterfallData.leftColumn"
          :key="item.id || index"
          class="waterfall-item"
          :style="{ marginBottom: `${rowGap}rpx` }"
          @click="handleItemClick(item)"
        >
          <slot name="item" :item="item" :index="index">
            <!-- 默认卡片样式 -->
            <view class="default-card">
              <!-- 图片 -->
              <view v-if="item.thumbnail && typeof item.thumbnail === 'string'" class="card-image">
                <image
                  :src="item.thumbnail"
                  mode="widthFix"
                  lazy-load
                  @load="handleImageLoad(item)"
                  @error="handleImageError(item)"
                />
              </view>
              
              <!-- 标题 -->
              <view v-if="item.title" class="card-title">
                <es-text :text="item.title" />
              </view>
              
              <!-- 底部信息 -->
              <view class="card-footer">
                <view class="author-info">
                  <es-text v-if="item.author" :text="item.author" size="sm" color="info" />
                </view>
                <view class="stats-info">
                  <es-text v-if="item.likes" :text="`${item.likes}`" size="sm" color="info" />
                </view>
              </view>
            </view>
          </slot>
        </view>
      </view>

      <!-- 右列 -->
      <view class="waterfall-column">
        <view
          v-for="(item, index) in waterfallData.rightColumn"
          :key="item.id || index"
          class="waterfall-item"
          :style="{ marginBottom: `${rowGap}rpx` }"
          @click="handleItemClick(item)"
        >
          <slot name="item" :item="item" :index="index">
            <!-- 默认卡片样式 -->
            <view class="default-card">
              <!-- 图片 -->
              <view v-if="item.thumbnail && typeof item.thumbnail === 'string'" class="card-image">
                <image
                  :src="item.thumbnail"
                  mode="widthFix"
                  lazy-load
                  @load="handleImageLoad(item)"
                  @error="handleImageError(item)"
                />
              </view>
              
              <!-- 标题 -->
              <view v-if="item.title" class="card-title">
                <es-text :text="item.title" />
              </view>
              
              <!-- 底部信息 -->
              <view class="card-footer">
                <view class="author-info">
                  <es-text v-if="item.author" :text="item.author" size="sm" color="info" />
                </view>
                <view class="stats-info">
                  <es-text v-if="item.likes" :text="`${item.likes}`" size="sm" color="info" />
                </view>
              </view>
            </view>
          </slot>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="load-status">
      <view v-if="loadMoreStatus === 'loading'" class="loading">
        <es-text text="加载中..." size="sm" color="info" />
      </view>
      <view v-else-if="loadMoreStatus === 'noMore'" class="no-more">
        <es-text text="没有更多了" size="sm" color="info" />
      </view>
    </view>

    <!-- 空状态 -->
    <view v-if="!loading && (!listData.data || listData.data.length === 0)" class="empty-state">
      <slot name="empty">
        <es-empty text="暂无数据" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.es-waterfall {
  width: 100%;
  
  .waterfall-container {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    
    .waterfall-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      
      &:first-child {
        margin-right: calc(var(--column-gap, 24rpx) / 2);
      }
      
      &:last-child {
        margin-left: calc(var(--column-gap, 24rpx) / 2);
      }
      
      .waterfall-item {
        width: 100%;
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: translateY(-2rpx);
        }
        
        .default-card {
          background: #fff;
          border-radius: 16rpx;
          overflow: hidden;
          box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
          
          .card-image {
            width: 100%;
            
            :deep(image) {
              width: 100%;
              height: auto;
              display: block;
            }
          }
          
          .card-title {
            padding: 24rpx 24rpx 16rpx;
            
            :deep(.es-text) {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              line-height: 1.4;
            }
          }
          
          .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24rpx 24rpx;
            
            .author-info,
            .stats-info {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  
  .load-status {
    display: flex;
    justify-content: center;
    padding: 40rpx 0;
    
    .loading,
    .no-more {
      display: flex;
      align-items: center;
    }
  }
  
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400rpx;
  }
}
</style>