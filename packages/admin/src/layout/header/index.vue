<script setup lang="ts">
import type { RouteLocationMatched, RouteRecordRaw } from 'vue-router'
import { useThemeStore } from '@/stores/modules/themeStore'
import { useUserStore } from '@/stores/modules/userStore'

defineOptions({
  name: 'HeaderLayout',
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const themeStore = useThemeStore()

const navigator = (val: RouteLocationMatched | RouteRecordRaw) => {
  if (!val.children?.length) {
    router.push({ name: val.name })
  }
}
const { isFullscreen, toggle } = useFullscreen(document.documentElement)
</script>

<template>
  <a-layout-header class="bg-white! dark:bg-[#141414]! h-14! leading-12! px-6! flex justify-between">
    <div class="flex items-center">
      <es-icon
        :name="themeStore.menuCollapsed ? 'unfoldLeft' : 'unfoldRight'"
        @click="themeStore.changeMenuCollapsed"
      />
      <a-breadcrumb class="ml-6">
        <a-breadcrumb-item v-for="(item, idx) in route.matched" :key="idx" @click="navigator(item)">
          <span v-if="idx + 1 === route.matched.length">{{ item.meta?.title }}</span>
          <a v-else>{{ item.meta?.title }}</a>
          <template v-if="item.children.length" #overlay>
            <a-menu>
              <a-menu-item v-for="menu in item.children" :key="menu.name" @click="navigator(menu)">
                <a>{{ menu.meta?.title }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="flex items-center">
      <es-icon :name="isFullscreen ? 'arrowsCollapseFull' : 'arrowsExpandFull'" @click="toggle()" />
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
