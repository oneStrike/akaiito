<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/themeStore'
import { useUserStore } from '@/stores/modules/userStore'

defineOptions({
  name: 'HeaderLayout',
})

const router = useRouter()
const route = useRoute()
console.log(route)
const userStore = useUserStore()
const themeStore = useThemeStore()
</script>

<template>
  <a-layout-header class="bg-transparent! h-12! leading-12! px-6! shadow-md flex justify-between">
    <div class="flex items-center">
      <es-icon
        :name="themeStore.menuCollapsed ? 'unfoldLeft' : 'unfoldRight'"
        @click="themeStore.changeMenuCollapsed"
      />
      <a-breadcrumb class="ml-6">
        <a-breadcrumb-item v-for="(item, idx) in route.matched">{{ item.meta?.title}}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="flex items-center">
      <es-icon
        :name="themeStore.fullScreen ? 'arrowsCollapseFull' : 'arrowsExpandFull'"
        @click="themeStore.changeFullScreen()"
      />
      <es-icon
        class="ml-6"
        :name="themeStore.pageMode === 'light' ? 'sunLoop' : 'moonLoop'"
        @click="themeStore.changeTheme()"
      />
      <a-dropdown class="ml-6 flex items-center">
        <div>
          <a-avatar :src="userStore.userInfo?.avatar" />
          <span>{{ userStore.userInfo?.username }}</span>
          <es-icon name="chevronDown" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="router.push({ name: 'Profile' })">
              <span>个人中心</span>
            </a-menu-item>
            <a-menu-item @click="userStore.signOut()">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
