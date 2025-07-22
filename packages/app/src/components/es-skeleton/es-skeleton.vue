<script setup lang="ts">
  import type { SkeletonProps } from './types'

  /**
   * 骨架屏组件
   * 提供多种预设样式和自定义选项，支持动画效果
   */
  defineOptions({
    name: 'EsSkeleton',
    options: {
      virtualHost: true,
    },
  })

  // 组件属性定义
  const props = withDefaults(defineProps<SkeletonProps>(), {
    animated: true,
    avatar: false,
    avatarSize: 'default',
    avatarShape: 'circle',
    title: false,
    titleWidth: '40%',
    paragraph: false,
    paragraphRows: 3,
    paragraphWidths: () => ['100%', '80%', '60%'],
    image: false,
    imageWidth: '100%',
    imageHeight: '200rpx',
    imageShape: 'square',
    button: false,
    buttonCount: 1,
    buttonWidth: '120rpx',
    listItem: false,
    card: false,
  })

  /**
   * 获取段落行宽度
   * @param index 行索引
   * @returns 宽度值
   */
  const getLineWidth = (index: number): string => {
    if (Array.isArray(props.paragraphWidths) && props.paragraphWidths[index]) {
      return props.paragraphWidths[index]
    }
    // 默认宽度递减
    const widths = ['100%', '80%', '60%']
    return widths[index] || '60%'
  }
</script>

<template>
  <view
    class="flex items-start gap-6 p-6"
    :class="{ 'skeleton-animated': animated }"
  >
    <!-- 头像骨架 -->
    <view
      v-if="avatar"
      class="flex-shrink-0 bg-gray-100 dark:bg-gray-800 skeleton-item"
      :class="[
        avatarSize === 'small'
          ? 'w-16 h-16'
          : avatarSize === 'large'
            ? 'w-24 h-24'
            : 'w-20 h-20',
        avatarShape === 'circle' ? 'rounded-full' : 'rounded-2',
      ]"
    />

    <!-- 内容区域 -->
    <view
      v-if="title || paragraph || $slots.default"
      class="flex flex-1 flex-col gap-4"
    >
      <!-- 标题骨架 -->
      <view
        v-if="title"
        class="bg-gray-100 dark:bg-gray-800 skeleton-item h-8 rounded-1"
        :style="{ width: titleWidth }"
      />

      <!-- 段落骨架 -->
      <view v-if="paragraph" class="flex flex-col gap-3">
        <view
          v-for="(line, index) in paragraphRows"
          :key="index"
          class="bg-gray-100 dark:bg-gray-800 rounded-1 skeleton-item h-6"
          :style="{ width: getLineWidth(index) }"
        />
      </view>

      <!-- 自定义内容插槽 -->
      <slot />
    </view>

    <!-- 图片骨架 -->
    <view
      v-if="image"
      class="flex-shrink-0 bg-gray-100 dark:bg-gray-800 skeleton-item"
      :class="[
        imageShape === 'square'
          ? 'rounded-2'
          : imageShape === 'rounded'
            ? 'rounded-4'
            : imageShape === 'circle'
              ? 'rounded-full'
              : 'rounded-2',
      ]"
      :style="{ width: imageWidth, height: imageHeight }"
    />

    <!-- 按钮骨架 -->
    <view v-if="button" class="flex gap-4 mt-4">
      <view
        v-for="n in buttonCount"
        :key="n"
        class="bg-gray-100 dark:bg-gray-800 skeleton-item h-16 rounded-8"
        :style="{ width: buttonWidth }"
      />
    </view>

    <!-- 列表项骨架 -->
    <view v-if="listItem" class="flex gap-6 items-center w-full">
      <view
        class="bg-gray-100 dark:bg-gray-800 flex-shrink-0 skeleton-item w-20 h-20 rounded-full"
      />
      <view class="flex-1 flex flex-col gap-3">
        <view
          class="h-8 bg-gray-100 dark:bg-gray-800 rounded-1 skeleton-item w-3/5"
        />
        <view
          class="h-6 bg-gray-100 dark:bg-gray-800 rounded-1 skeleton-item w-4/5"
        />
      </view>
    </view>

    <!-- 卡片骨架 -->
    <view
      v-if="card"
      class="w-full bg-white dark:bg-gray-900 rounded-4 overflow-hidden shadow-lg dark:shadow-gray-800/30"
    >
      <view class="w-full bg-gray-100 dark:bg-gray-800 skeleton-item h-75" />
      <view class="p-6 flex flex-col gap-4">
        <view
          class="bg-gray-100 dark:bg-gray-800 rounded-1 skeleton-item h-9 w-7/10"
        />
        <view
          class="h-6 bg-gray-100 dark:bg-gray-800 rounded-1 skeleton-item w-9/10"
        />
        <view class="flex gap-4 mt-2">
          <view
            class="bg-gray-100 dark:bg-gray-800 skeleton-item h-12 w-30 rounded-6"
          />
          <view
            class="h-12 w-30 bg-gray-100 dark:bg-gray-800 rounded-6 skeleton-item"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
  /* 骨架屏动画效果 */
  .skeleton-animated .skeleton-item {
    position: relative;
    overflow: hidden;
  }

  .skeleton-animated .skeleton-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: skeleton-loading 1.5s ease-in-out infinite;
  }

  /* 暗色主题下的动画效果 */
  .dark .skeleton-animated .skeleton-item::after {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  /* 骨架屏动画关键帧 */
  @keyframes skeleton-loading {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
</style>
