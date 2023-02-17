<script setup lang="ts">
defineProps<{
  loading: boolean
  tip?: string
}>()
</script>
<template>
  <a-spin :spinning="loading" :delay="60" wrapperClassName="w_100 h_100  ">
    <template #indicator>
      <svg-icon size="30" icon-name="loading" />
    </template>
    <div class="w_100 h_100">
      <slot></slot>
    </div>
  </a-spin>
</template>
