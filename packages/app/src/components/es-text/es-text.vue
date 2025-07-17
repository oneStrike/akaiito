<script setup lang="ts">
  import type { EsTextProps } from '@/components/es-text/types'
  import * as OpenCC from 'opencc-js'
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
    cn: false,
  })
  const emits = defineEmits<{
    (event: 'click'): void
  }>()

  const converter = OpenCC.Converter({ from: 'twp', to: 'cn' })

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
    <slot>
      {{ cn && typeof text === 'string' ? converter(text) : text }}
    </slot>
  </text>
</template>
