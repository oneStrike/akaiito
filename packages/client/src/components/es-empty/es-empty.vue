<script setup lang="ts">
export interface EsEmptyProps {
  text?: string
}

defineOptions({
  name: 'EsEmpty'
})

const props = withDefaults(defineProps<EsEmptyProps>(), {
  text: '暂无数据'
})
</script>

<template>
  <view class="flex flex-col items-center w-full">
    <es-icons name="empty" :size="188" color="info" />
    <es-text :text="text" class="mt" color="info" />
  </view>
</template>
