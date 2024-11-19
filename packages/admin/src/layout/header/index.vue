<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/themeStore'
import { useUserStore } from '@/stores/modules/userStore'

defineOptions({
  name: 'HeaderLayout',
})

const route = useRoute()
const userStore = useUserStore()
const layoutStore = useThemeStore()
</script>

<template>
  <a-layout-header class="bg-transparent! h-12! leading-12! shadow-md"></a-layout-header>
</template>
