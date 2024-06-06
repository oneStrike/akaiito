<script lang="ts" setup>
export interface EsImageProps {
  src: string
  mode?:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
}

defineOptions({
  name: 'EsImage',
  options: {
    virtualHost: true
  }
})

const props = withDefaults(defineProps<EsImageProps>(), {
  mode: 'scaleToFill'
})

const imageSrc = computed(() => {
  return uni.$es.systemInfo.uniPlatform === 'web'
    ? props.src
    : import.meta.env.VITE_PROXY_PATH + props.src
})
</script>

<template>
  <image :src="imageSrc" :mode="mode"></image>
</template>

<style scoped></style>
