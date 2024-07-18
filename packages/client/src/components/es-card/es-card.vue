<script setup lang="ts">
defineOptions({
  name: 'EsCard'
})

export interface EsCardProps {
  flex?: boolean
}

const props = withDefaults(defineProps<EsCardProps>(), {
  flex: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const className = computed(() => {
  return [props.flex ? 'flex' : '']
})
</script>

<template>
  <view
    class="p-3 bg-white rounded shadow-md w-full"
    :class="className"
    @click="emits('click')"
  >
    <slot></slot>
  </view>
</template>
<style>
:host {
  display: block;
}
</style>
