<script setup lang="ts">
import type { EsBackTopProps } from '@/components/es-back-top/types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsBackTop',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsBackTopProps>(), {
  top: 300,
  duration: 100,
  zIndex: 10,
  bottom: 200,
  right: 40,
})

const show = ref(false)
onPageScroll(e => {
  show.value = e.scrollTop >= props.top
})

const scroll = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration,
  })
}
</script>

<template>
  <view
    v-if="show"
    class="fixed h-10 w-10 rounded-full text-align-center leading-10"
    :style="{
      background: useConfig.getColor('primary'),
      zIndex,
      bottom: useConfig.getSize(bottom),
      right: useConfig.getSize(right),
    }"
    @click="scroll"
  >
    <es-icons type="uni" name="arrow-up" color="white" />
  </view>
</template>

<style scoped></style>
