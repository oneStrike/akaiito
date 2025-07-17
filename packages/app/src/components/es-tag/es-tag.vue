<script setup lang="ts">
  import type { EsTagProps } from '@/components/es-tag/types'
  import { useConfig } from '@/components/libs/hooks/useConfig'

  defineOptions({
    name: 'EsTag',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared',
    },
  })

  const props = withDefaults(defineProps<EsTagProps>(), {
    size: 'small',
    type: 'default',
    round: 8,
    plain: false,
  })

  const textSize: IterateObject = {
    mini: 'xs',
    small: 'sm',
    medium: 'base',
    large: 'lg',
  }

  const colorColor = computed(() => {
    if (props.type === 'default') {
      return useConfig.getColor('info')
    } else if (props.plain) {
      return useConfig.getColor(props.type)
    } else {
      return 'white'
    }
  })

  const tagStyle = computed(() => {
    const typeColor =
      props.type === 'default' ? '#f6f6f6' : useConfig.getColor(props.type)

    const target: IterateObject = {
      'border-radius': useConfig.addUnit(props.round),
      'background': typeColor,
    }
    if (props.plain) {
      target.background = 'transparent'
      target.border = `2rpx solid ${typeColor}`
    }
    return target
  })
</script>

<template>
  <view class="es-tag h-fit shrink-0" :class="size" :style="tagStyle">
    <slot name="left" />
    <es-text :text="text" :color="colorColor" :cn="cn" :size="textSize[size]" />
    <slot name="right" />
  </view>
</template>

<style scoped lang="scss">
  .es-tag {
    width: fit-content;
    font-size: 0;
  }

  .mini {
    padding: 2rpx 4rpx;
  }

  .small {
    padding: 6rpx 14rpx;
  }

  .medium {
    padding: 8rpx 20rpx;
  }

  .large {
    padding: 16rpx 32rpx;
  }
</style>
