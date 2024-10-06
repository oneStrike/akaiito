<script setup lang="ts">
export interface EsTabsProps {
  tabs: string[]
  top?: string
  modelValue?: number
  styleType?: 'button' | 'text'
  activeColor?: string
  inActiveColor?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<EsTabsProps>(), {
  top: 'var(--window-top)',
  styleType: 'text',
  modelValue: 0,
  activeColor: '#007aff',
  inActiveColor: '#000000',
  backgroundColor: '#ffffff',
})
const emits = defineEmits<{
  (event: 'change', val: number): void
  (event: 'update:modelValue', val: number): void
}>()

const current = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

function tanChange(val: { currentIndex: number }) {
  emits('change', val.currentIndex)
}
</script>

<template>
  <view :style="{ backgroundColor, top }" class="shadow-md sticky z-10">
    <uni-segmented-control
      :current="current"
      :values="tabs"
      :style-type="styleType"
      :active-color="activeColor"
      @click-item="tanChange"
    />
  </view>
</template>

<style scoped></style>
