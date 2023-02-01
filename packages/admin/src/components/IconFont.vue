<script setup lang="ts">
import type { TIconFontName } from '~@/iconfont'

interface IProps {
  type: TIconFontName
  size?: number
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 14,
  color: '#333'
})
</script>

<template>
  <i
    :style="{ fontSize: size + 'px', color: color }"
    class="iconfont"
    :class="'icon-' + type"
  ></i>
</template>
