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
  <a-layout-header class="bg-transparent! h-12! leading-12! px-6! shadow-md">
    <es-icon
      :name="layoutStore.menuCollapsed ? 'unfoldLeft' : 'unfoldRight'"
      @click="layoutStore.changeMenuCollapsed"
    />
  </a-layout-header>
</template>
