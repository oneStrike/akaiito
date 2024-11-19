<script setup lang="ts">
defineOptions({
  name: 'EsIcon',
})

withDefaults(defineProps<EsIconProps>(), {})

export interface EsIconProps {
  name: string
  color?: string
  size?: number
}
</script>

<template>
  <icon-line-md-sun-rising-loop v-if="name === 'sun'" />
</template>

<style scoped lang="scss"></style>
