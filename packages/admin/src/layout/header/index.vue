<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/themeStore'
import { useUserStore } from '@/stores/modules/userStore'

defineOptions({
  name: 'HeaderLayout',
})

const route = useRoute()
const userStore = useUserStore()
const themeStore = useThemeStore()
</script>

<template>
  <a-layout-header class="bg-transparent! h-12! leading-12! px-6! shadow-md flex justify-between">
    <es-icon :name="themeStore.menuCollapsed ? 'unfoldLeft' : 'unfoldRight'" @click="themeStore.changeMenuCollapsed" />
    <div class="flex">
      <es-icon
        :name="themeStore.fullScreen ? 'arrowsCollapseFull' : 'arrowsExpandFull'"
        @click="themeStore.changeFullScreen()"
      />
      <es-icon
        class="ml-6"
        :name="themeStore.pageMode === 'light' ? 'sunLoop' : 'moonLoop'"
        @click="themeStore.changeTheme()"
      />
    </div>
  </a-layout-header>
</template>
