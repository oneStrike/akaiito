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

const current = defineModel({ type: Number, default: 0 })
</script>

<template>
  <view :style="{ backgroundColor, top }" class="pb-1 shadow-md sticky z-10">
    <uni-segmented-control
      :current="current"
      :values="tabs"
      :style-type="styleType"
      :active-color="activeColor"
    />
  </view>
</template>

<style scoped></style>
