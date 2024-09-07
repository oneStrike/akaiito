<script setup lang="ts">
defineOptions({
  name: 'EsCard',
})

const props = withDefaults(defineProps<EsCardProps>(), {
  flex: false,
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

export interface EsCardProps {
  flex?: boolean
}

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
    <slot />
  </view>
</template>

<style>
:host {
  display: block;
}
</style>
