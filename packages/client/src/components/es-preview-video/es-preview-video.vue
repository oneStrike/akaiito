<script setup lang="ts">
defineOptions({
  name: 'EsPreviewVideo',
})

withDefaults(defineProps<EsPreviewVideoProps>(), {})

export interface EsPreviewVideoProps {
  path: string
}

const popupRef = ref()
const modelValue = defineModel('show')
watch(
  modelValue,
  val => {
    if (val) {
      popupRef.value?.open()
    } else {
      popupRef.value?.close()
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <uni-popup ref="popupRef" type="center" @mask-click="modelValue = false">
    <video
      v-if="modelValue"
      class="w-100vw"
      :src="$filePath(path)"
      :autoplay="true"
    ></video>
  </uni-popup>
</template>

<style scoped lang="scss"></style>
