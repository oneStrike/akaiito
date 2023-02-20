<script setup lang="ts">
import { useLayoutStore, useUserStore } from '@/stores'
import SvgIcon from '@/components/SvgIcon.vue'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
</script>

<template>
  <div class="h_100 pl_16 pr_16 main_between border_bottom main_block">
    <a-space size="large">
      <a-breadcrumb>
        <template v-for="(item, index) in $route.matched" :key="index">
          <a-breadcrumb-item v-if="!item.meta.hideParent">{{
            item.meta.title
          }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </a-space>
    <a-space size="large">
      <svg-icon
        border
        :icon-name="layoutStore.theme"
        @click="layoutStore.toggleTheme()"
      />
      <svg-icon
        border
        :icon-name="layoutStore.fullScreen ? 'contraction' : 'expand'"
        @click="layoutStore.toggleFullScreen()"
      />
      <a-dropdown trigger="hover">
        <div class="flex">
          <a-typography-text>{{
            userStore.userInfo.username
          }}</a-typography-text>
          <a-typography-text>
            <svg-icon icon-name="arrowDown" />
          </a-typography-text>
        </div>
        <template #content>
          <a-doption @click="$router.push({ name: 'profile' })"
            >个人信息</a-doption
          >
          <a-doption @click="userStore.logout()">退出登录</a-doption>
        </template>
      </a-dropdown>
      <a-avatar :image-url="$FILE_PATH + userStore.userInfo.avatar" />
    </a-space>
  </div>
</template>

<style lang="less">
.arco-layout-header {
  height: 56px;
  line-height: 64px;
}
</style>
