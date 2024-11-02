<script setup lang="ts">
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsInputFixed',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<EsToastProps>(), {
  type: 'primary',
  duration: 2000,
})

export interface EsToastProps {
  message: string
  type?: 'primary' | 'success' | 'warning' | 'error'
  duration?: number
}

const popupRef = ref()
const modelShow = defineModel('show', {
  default: false,
  type: Boolean,
})

watch(
  modelShow,
  val => {
    if (val) {
      popupRef.value.closeMask()
      popupRef.value.open()
      const timer = setTimeout(() => {
        popupRef.value.close()
        modelShow.value = false
        clearTimeout(timer)
      }, props.duration)
    }
  },
  { immediate: true },
)
</script>

<template>
  <uni-popup ref="popupRef" type="top">
    <view class="p-3" :style="{ background: useConfig.getColor(type) }">
      <es-text :text="message" color="white" />
    </view>
  </uni-popup>
</template>

<style scoped lang="scss"></style>
