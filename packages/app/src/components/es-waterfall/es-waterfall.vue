<script setup lang="ts">
  import type {
    ColumnHeights,
    EsWaterfallInstance,
    EsWaterfallProps,
    ImageSize,
  } from '@/components/es-waterfall/types'
  import { debounce, get } from 'lodash-es'

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
    data: () => [],
    columnGap: 24,
    rowGap: 24,
    padding: 24,
    imageField: 'thumbnail',
    defaultImageHeight: 240,
    debounceDelay: 100,
    idField: 'id',
  })

  // 组件事件定义
  const emits = defineEmits<{
    (event: 'itemClick', item: any, index: number): void
  }>()

  // 图片尺寸缓存
  const imageSizeCache = ref<Map<string, ImageSize>>(new Map())

  // 瀑布流数据状态
  const waterfallData = ref<{ leftColumn: any[]; rightColumn: any[] }>({
    leftColumn: [],
    rightColumn: [],
  })

  // 列高度缓存
  const columnHeights = ref<ColumnHeights>({ left: 0, right: 0 })

  // 已处理的数据项ID集合
  const processedItemIds = ref<Set<string>>(new Set())

  /**
   * 批量预加载图片并获取尺寸
   * @param urls 图片URL数组
   * @returns 图片尺寸映射
   */
  const preloadImages = async (
    urls: string[],
  ): Promise<Map<string, ImageSize>> => {
    const results = new Map<string, ImageSize>()

    // 过滤出未缓存的图片
    const uncachedUrls = urls.filter((url) => !imageSizeCache.value.has(url))

    if (uncachedUrls.length === 0) {
      // 所有图片都已缓存，直接返回
      urls.forEach((url) => {
        const cachedSize = imageSizeCache.value.get(url)
        if (cachedSize) {
          results.set(url, cachedSize)
        }
      })
      return results
    }

    // 并行获取图片信息
    const promises = uncachedUrls.map(
      (src) =>
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
              const defaultSize: ImageSize = {
                width: 300,
                height: props.defaultImageHeight,
              }
              imageSizeCache.value.set(src, defaultSize)
              resolve({ src, size: defaultSize })
            },
          })
        }),
    )

    const imageResults = await Promise.all(promises)

    // 合并结果
    imageResults.forEach(({ src, size }) => {
      results.set(src, size)
    })

    // 添加已缓存的结果
    urls
      .filter((url) => imageSizeCache.value.has(url))
      .forEach((url) => {
        const cachedSize = imageSizeCache.value.get(url)
        if (cachedSize) {
          results.set(url, cachedSize)
        }
      })

    return results
  }

  /**
   * 计算卡片实际高度
   * @param item 数据项
   * @param imageSize 图片尺寸
   * @returns 卡片高度
   */
  const calculateCardHeight = (item: any, imageSize?: ImageSize): number => {
    let height = 0

    // 图片高度计算
    const imageUrl = get(item, props.imageField)
    if (imageUrl && typeof imageUrl === 'string' && imageSize) {
      const cardWidth =
        (uni.getSystemInfoSync().windowWidth -
          props.padding * 2 -
          props.columnGap) /
          2
      const imageHeight = (imageSize.height / imageSize.width) * cardWidth
      height += imageHeight
    } else if (imageUrl) {
      // 没有图片尺寸信息时使用默认高度
      height += props.defaultImageHeight
    }

    return height
  }

  /**
   * 批量处理瀑布流数据分配
   */
  const redistributeWaterfallData = async () => {
    if (!props.data || props.data.length === 0) {
      waterfallData.value = { leftColumn: [], rightColumn: [] }
      processedItemIds.value.clear()
      columnHeights.value = { left: 0, right: 0 }
      return
    }

    // 检查是否是全新的数据
    const currentItemIds = new Set(
      props.data.map((item: any) => get(item, props.idField)),
    )
    const isNewDataSet = Array.from(processedItemIds.value).some(
      (id) => !currentItemIds.has(id),
    )

    if (isNewDataSet) {
      // 全新数据，重置所有状态
      waterfallData.value = { leftColumn: [], rightColumn: [] }
      processedItemIds.value.clear()
      columnHeights.value = { left: 0, right: 0 }
    }

    // 找出新增的数据项
    const newItems = props.data.filter(
      (item: any) => !processedItemIds.value.has(get(item, props.idField)),
    )

    if (newItems.length === 0) {
      return
    }

    // 批量预加载所有新增项目的图片
    const imageUrls = newItems
      .map((item) => get(item, props.imageField))
      .filter((url) => url && typeof url === 'string')

    const imageSizes = await preloadImages(imageUrls)

    // 批量计算高度并分配
    newItems.forEach((item) => {
      const imageUrl = get(item, props.imageField)
      const imageSize = imageUrl ? imageSizes.get(imageUrl) : undefined
      const cardHeight = calculateCardHeight(item, imageSize)

      // 选择高度较小的列
      if (columnHeights.value.left <= columnHeights.value.right) {
        waterfallData.value.leftColumn.push(item)
        columnHeights.value.left += cardHeight
      } else {
        waterfallData.value.rightColumn.push(item)
        columnHeights.value.right += cardHeight
      }

      processedItemIds.value.add(get(item, props.idField))
    })
  }

  // 防抖的重新分配函数
  const debouncedRedistribute = debounce(
    redistributeWaterfallData,
    props.debounceDelay,
  )

  /**
   * 重新计算瀑布流布局
   */
  const recalculate = async () => {
    // 清空所有缓存，重新计算
    processedItemIds.value.clear()
    waterfallData.value = { leftColumn: [], rightColumn: [] }
    columnHeights.value = { left: 0, right: 0 }
    await redistributeWaterfallData()
  }

  /**
   * 处理卡片点击事件
   * @param item 点击的数据项
   * @param index 索引
   */
  const handleItemClick = (item: any, index: number) => {
    emits('itemClick', item, index)
  }

  // 监听数据变化，重新分配瀑布流
  watch(
    () => props.data,
    async (newData) => {
      if (newData && newData.length > 0) {
        await debouncedRedistribute()
      } else {
        waterfallData.value = { leftColumn: [], rightColumn: [] }
        processedItemIds.value.clear()
        columnHeights.value = { left: 0, right: 0 }
      }
    },
    { deep: true, immediate: true },
  )

  // 暴露组件实例方法
  const instance: EsWaterfallInstance = {
    recalculate,
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
        gap: `${columnGap}rpx`,
      }"
    >
      <!-- 左列 -->
      <view class="waterfall-column">
        <view
          v-for="(item, index) in waterfallData.leftColumn"
          :key="get(item, idField) || index"
          class="waterfall-item"
          :style="{ marginBottom: `${rowGap}rpx` }"
          @click="handleItemClick(item, index)"
        >
          <slot name="item" :item="item" :index="index">
            <!-- 默认只显示图片 -->
            <view v-if="get(item, imageField)" class="default-image">
              <image :src="get(item, imageField)" mode="widthFix" lazy-load />
            </view>
          </slot>
        </view>
      </view>

      <!-- 右列 -->
      <view class="waterfall-column">
        <view
          v-for="(item, index) in waterfallData.rightColumn"
          :key="get(item, idField) || index"
          class="waterfall-item"
          :style="{ marginBottom: `${rowGap}rpx` }"
          @click="handleItemClick(item, index)"
        >
          <slot name="item" :item="item" :index="index">
            <!-- 默认只显示图片 -->
            <view v-if="get(item, imageField)" class="default-image">
              <image :src="get(item, imageField)" mode="widthFix" lazy-load />
            </view>
          </slot>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-if="!data || data.length === 0" class="empty-state">
      <slot name="empty">
        <view class="default-empty">暂无数据</view>
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

          .default-image {
            width: 100%;
            border-radius: 16rpx;
            overflow: hidden;
            box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

            :deep(image) {
              width: 100%;
              height: auto;
              display: block;
            }
          }
        }
      }
    }

    .empty-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400rpx;

      .default-empty {
        color: #999;
        font-size: 28rpx;
      }
    }
  }
</style>
