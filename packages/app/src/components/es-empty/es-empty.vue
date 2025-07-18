<script setup lang="ts">
  export interface EsEmptyProps {
    text?: string
  }

  defineOptions({
    name: 'EsEmpty',
    options: {
      virtualHost: true,
    },
  })

  withDefaults(defineProps<EsEmptyProps>(), {
    text: '未找到相关内容',
  })
</script>

<template>
  <view class="w-full flex flex-col items-center">
    <image src="@/static/icons/empty.svg" class="w-40 h-40" />
    <es-text :text="text" class="mt" color="info" />
  </view>
</template>
