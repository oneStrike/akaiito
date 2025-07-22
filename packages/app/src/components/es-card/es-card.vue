<script setup lang="ts">
  import type { EsCardInstance, EsCardProps } from '@/components/es-card/types'

  /**
   * 组件属性
   */
  const props = withDefaults(defineProps<EsCardProps>(), {
    shadow: 'small',
    radius: 'medium',
    padding: 'medium',
    clickable: false,
    disabled: false,
    customStyle: '',
    customClass: '',
  })

  /**
   * 组件事件
   */
  const emits = defineEmits<{
    click: [event: Event]
  }>()

  /**
   * 计算卡片样式类名
   */
  const cardClasses = computed(() => {
    const classes = ['es-card']

    // 阴影
    switch (props.shadow) {
      case 'none':
        classes.push('shadow-none')
        break
      case 'small':
        classes.push('shadow-sm')
        break
      case 'medium':
        classes.push('shadow-md')
        break
      case 'large':
        classes.push('shadow-lg')
        break
    }

    // 圆角
    switch (props.radius) {
      case 'none':
        classes.push('rounded-none')
        break
      case 'small':
        classes.push('rounded-2')
        break
      case 'medium':
        classes.push('rounded-4')
        break
      case 'large':
        classes.push('rounded-6')
        break
    }

    // 内边距
    switch (props.padding) {
      case 'none':
        classes.push('p-0')
        break
      case 'small':
        classes.push('p-3')
        break
      case 'medium':
        classes.push('p-4')
        break
      case 'large':
        classes.push('p-6')
        break
    }

    // 可点击状态
    if (props.clickable && !props.disabled) {
      classes.push('cursor-pointer', 'transition-transform', 'duration-200', 'hover:translate-y-[-1rpx]')
    }

    // 禁用状态
    if (props.disabled) {
      classes.push('opacity-50', 'cursor-not-allowed')
    }

    // 自定义类名
    if (props.customClass) {
      classes.push(props.customClass)
    }

    return classes
  })

  /**
   * 处理卡片点击事件
   */
  const handleClick = (event: Event) => {
    if (props.disabled) {
      return
    }
    emits('click', event)
  }

  /**
   * 组件实例
   */
  const instance: EsCardInstance = {}

  defineExpose(instance)
</script>

<template>
  <view
    :class="cardClasses"
    :style="customStyle"
    class="bg-white w-full"
    @click="handleClick"
  >
    <!-- 默认插槽 - 完全由外部控制内容 -->
    <slot />
  </view>
</template>

<style scoped lang="scss">
  .es-card {
    transition: all 0.2s ease-in-out;

    &--small {
      .es-card__title {
        font-size: 28rpx;
      }

      .es-card__subtitle {
        font-size: 24rpx;
      }

      .es-card__description {
        font-size: 26rpx;
      }
    }

    &--medium {
      .es-card__title {
        font-size: 32rpx;
      }

      .es-card__subtitle {
        font-size: 26rpx;
      }

      .es-card__description {
        font-size: 28rpx;
      }
    }

    &--large {
      .es-card__title {
        font-size: 36rpx;
      }

      .es-card__subtitle {
        font-size: 28rpx;
      }

      .es-card__description {
        font-size: 30rpx;
      }
    }
  }
</style>
