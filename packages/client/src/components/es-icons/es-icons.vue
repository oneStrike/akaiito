<script setup lang="ts">
export interface EsIconProps {
  type?: 'uni' | 'iconify'
  name: string
}

defineOptions({
  name: 'EsIcon'
})

const props = withDefaults(defineProps<EsIconProps>(), {
  type: 'iconify'
})
</script>

<template>
  <view v-if="type === 'iconify'"></view>
  <uni-icons v-else :type="name" size="30"></uni-icons>
</template>

<style scoped></style>
