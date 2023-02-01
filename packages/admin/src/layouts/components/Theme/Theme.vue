<script setup lang="ts">
import { useLayout } from '@/stores'

const layoutStore = useLayout()
</script>
<template>
  <svg-icon
    @click="layoutStore.changeThemeStatus()"
    class="pr_16"
    :icon-name="layoutStore.theme"
  />
</template>
