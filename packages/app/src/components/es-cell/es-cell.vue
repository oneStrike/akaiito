<script setup lang="ts">
import type { EsCellProps } from '@/components/es-cell/types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsCell',
  options: {
    virtualHost: true,
  },
})

withDefaults(defineProps<EsCellProps>(), {
  mode: 'between',
  labelWidth: 160,
})
</script>

<template>
  <view>
    <view
      v-for="(item, idx) in options"
      :key="idx"
      class="flex pb-4 pt-4 border-bottom"
      :class="[mode === 'follow' ? '' : 'justify-between']"
    >
      <view :style="{ width: useConfig.addUnit(labelWidth) }">
        <es-text :text="item.label" />
      </view>
      <view>
        <es-text :text="item.value ?? '-'" />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
