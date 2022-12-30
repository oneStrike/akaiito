<script setup lang="ts">
import type { IDiyModule } from '@/typings/components/diyPage'
import { useDiyCommonStyleToString } from '@/hooks/useDiyCommonStyleToString'

const props = defineProps<{
  layout: IDiyModule
}>()

const commonStyle = computed(() =>
  useDiyCommonStyleToString(props.layout.commonAttr)
)
const searchStyle = computed(() => {
  const attr = props.layout.attr
  const flexDirection = attr.iconPosition === 'left' ? 'row' : 'row-reverse'
  return `background: ${attr.searchBoxColor}; border-radius: ${attr.searchBoxRadius}px; flex-direction: ${flexDirection};`
})
</script>

<template>
  <div :style="commonStyle" class="pt_1 pb_1 pl_2 pr_2">
    <div :style="searchStyle" class="flex cross_center search_box">
      <svg-icon
        icon-name="search"
        size="16"
        :class="layout.attr.iconPosition === 'left' ? 'pr_1' : 'pl_1'"
      ></svg-icon>
      <span class="flex1 fs14" :style="{ color: layout.attr.textColor }">{{
        layout.attr.searchBoxPlaceholder
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search_box {
  padding: 8px 14px;
}
</style>
