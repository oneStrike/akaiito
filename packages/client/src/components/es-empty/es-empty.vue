<script setup lang="ts">
export interface EsEmptyProps {
  text?: string
}

defineOptions({
  name: 'EsEmpty',
})

withDefaults(defineProps<EsEmptyProps>(), {
  text: '暂无数据',
})
</script>

<template>
  <view class="flex flex-col items-center w-full mt-36">
    <es-icons name="empty" :size="188" color="info" />
    <es-text :text="text" class="mt" color="info" />
  </view>
</template>
