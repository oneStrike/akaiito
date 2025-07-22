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
    mode: 'card',
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
              // 验证图片尺寸的有效性
              if (res.width > 0 && res.height > 0) {
                const size: ImageSize = { width: res.width, height: res.height }
                imageSizeCache.value.set(src, size)
                resolve({ src, size })
              } else {
                // 图片尺寸无效时使用默认尺寸
                const defaultSize: ImageSize = {
                  width: 300,
                  height: props.defaultImageHeight,
                }
                imageSizeCache.value.set(src, defaultSize)
                resolve({ src, size: defaultSize })
              }
            },
            fail: (error) => {
              console.warn(`图片加载失败: ${src}`, error)
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
    if (imageUrl && typeof imageUrl === 'string') {
      if (imageSize && imageSize.width > 0 && imageSize.height > 0) {
        // 有有效的图片尺寸信息
        const cardWidth =
          (uni.getSystemInfoSync().windowWidth -
            props.padding * 2 -
            props.columnGap) /
            2
        const imageHeight = (imageSize.height / imageSize.width) * cardWidth
        height += imageHeight
      } else {
        // 没有图片尺寸信息或尺寸无效时使用默认高度
        height += props.defaultImageHeight
      }
    } else {
      // 没有图片时也使用一个基础高度，避免高度为0
      height += props.defaultImageHeight * 0.6 // 使用较小的默认高度
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
    newItems.forEach((item, itemIndex) => {
      const imageUrl = get(item, props.imageField)
      const imageSize = imageUrl ? imageSizes.get(imageUrl) : undefined
      const cardHeight = calculateCardHeight(item, imageSize)

      // 选择高度较小的列，如果高度相同则交替分配
      const heightDiff = Math.abs(
        columnHeights.value.left - columnHeights.value.right,
      )
      const shouldUseLeft =
        columnHeights.value.left < columnHeights.value.right ||
        (heightDiff < 10 && itemIndex % 2 === 0) // 高度差小于10时交替分配

      if (shouldUseLeft) {
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
  <view class="w-full">
    <!-- 瀑布流容器 -->
    <view
      class="w-full flex box-border"
      :style="{
        padding: `0 ${padding}rpx`,
        gap: `${columnGap}rpx`,
      }"
    >
      <!-- 使用 v-for 渲染列 -->
      <view
        v-for="(columnData, columnKey) in waterfallData"
        :key="columnKey"
        class="flex flex-1 flex-col"
      >
        <view
          v-for="(item, index) in columnData"
          :key="get(item, idField) || index"
          class="w-full cursor-pointer transition-transform duration-200 hover:translate-y-[-1rpx]"
          :class="
            mode === 'card'
              ? 'rounded-2 overflow-hidden shadow-sm bg-white p-3'
              : ''
          "
          :style="{ marginBottom: `${rowGap}rpx` }"
          @click="handleItemClick(item, index)"
        >
          <view class="w-full">
            <slot name="image" :item="item">
              <image
                :src="get(item, imageField)"
                mode="widthFix"
                lazy-load
                class="w-full h-auto block"
              />
            </slot>
            <slot name="item" :item="item" />
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view
      v-if="!data || data.length === 0"
      class="flex justify-center items-center min-h-100"
    >
      <slot name="empty">
        <view class="text-gray-400 text-7">暂无数据</view>
      </slot>
    </view>
  </view>
</template>
