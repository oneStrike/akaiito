<script setup lang="ts">
import Breadcrumb from '@/layout/components/Breadcrumb.vue'
import { layoutStore, userStore } from '@/stores'

const useUserStore = userStore()
const useLayoutStore = layoutStore()
const router = useRouter()

const dropdownOptions = reactive([
  {
    label: '个人信息',
    key: 1
  },
  {
    label: '退出登录',
    key: 2
  }
])

const dropdownSelected = (key: number) => {
  switch (key) {
    case 1:
      router.push({ name: 'profile' })
      break
    case 2:
      useUserStore.logout()
      break
  }
}
</script>

<template>
  <n-space align="center" justify="space-between" class="flex_1 pd_8 pr_32">
    <Breadcrumb />
    <n-space align="center" size="large" item-style="display:flex">
      <n-button circle @click="useLayoutStore.toggleThemeMode()">
        <svg-icon :icon-name="useLayoutStore.theme" />
      </n-button>
      <n-button circle @click="useLayoutStore.toggleFullScreen">
        <svg-icon
          :icon-name="useLayoutStore.fullScreen ? 'contraction' : 'expand'"
        />
      </n-button>

      <n-avatar
        :src="$FILE_PATH + useUserStore.userInfo.avatar"
        round
      ></n-avatar>

      <n-dropdown
        trigger="hover"
        :options="dropdownOptions"
        @select="dropdownSelected"
      >
        <div class="flex_center">
          <n-text>{{ useUserStore.userInfo.username }}</n-text>
          <svg-icon icon-name="arrowDown" />
        </div>
      </n-dropdown>
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped></style>
