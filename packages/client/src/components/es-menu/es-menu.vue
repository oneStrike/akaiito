<script setup lang="ts">
import type { IterateObject } from '@/types/global'

defineOptions({
  name: 'EsMenu',
  options: {
    virtualHost: true,
  },
})

withDefaults(defineProps<EsMenuProps>(), {})

const emits = defineEmits<{
  (event: 'click', data: IterateObject): void
}>()

export interface EsMenuProps {
  menus: IterateObject[]
}
</script>

<template>
  <view class="w-full flex flex-wrap">
    <view
      v-for="(item, idx) in menus"
      :key="item.id"
      class="w-1/4 flex flex-col items-center justify-center"
      :class="idx > 3 ? 'mt-4' : ''"
      @click="emits('click', item)"
    >
      <image :src="$filePath(item.menuIcon)" class="mb-1 h-10 w-10"></image>
      <es-text :text="item.menuName" />
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
