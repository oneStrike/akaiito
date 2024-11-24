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
  text: '暂无数据',
})
</script>

<template>
  <view class="mt-36 w-full flex flex-col items-center">
    <es-icons name="empty" :size="188" color="info" />
    <es-text :text="text" class="mt" color="info" />
  </view>
</template>
