<script setup lang="ts">
import type { EsTextProps } from '@/components/es-text/types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsText',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsTextProps>(), {
  color: 'base',
  size: 'base',
})
const emits = defineEmits<{
  (event: 'click'): void
}>()

const textStyle = computed(() => {
  const style = [
    `color: ${useConfig.getColor(props.color)}`,
    `font-size:${useConfig.getSize(props.size)}`,
  ]

  if (props.lineClamp) {
    style.push(
      `display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: ${props.lineClamp};overflow: hidden;text-overflow: ellipsis`,
    )
  }

  return style.join(';')
})
</script>

<template>
  <text
    :class="{ 'font-bold': bold, block }"
    :style="textStyle"
    @click="emits('click')"
  >
    {{ text }}
  </text>
</template>
