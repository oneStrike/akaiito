<script setup lang="ts">
export interface EsTabsProps {
  tabs: string[]
  top?: string
  styleType?: 'button' | 'text'
  activeColor?: string
  inActiveColor?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<EsTabsProps>(), {
  top: 'var(--window-top)',
  styleType: 'text',
  activeColor: '#007aff',
  inActiveColor: '#000000',
  backgroundColor: '#ffffff'
})
const emits = defineEmits<{
  (event: 'change', val: number): void
}>()

const current = defineModel({ type: Number, default: 0 })

const tanChange = (val: { currentIndex: number }) => {
  emits('change', val.currentIndex)
}
</script>

<template>
  <view :style="{ backgroundColor, top }" class="pb-1 shadow-md sticky z-10">
    <uni-segmented-control
      :current="current"
      :values="tabs"
      :style-type="styleType"
      :active-color="activeColor"
      @clickItem="tanChange"
    />
  </view>
</template>

<style scoped></style>
