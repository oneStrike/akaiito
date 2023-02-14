<script setup lang="ts">
import { useLayoutStore, useUserStore } from '@/stores'
const route = useRoute()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
</script>
<template>
  <a-layout-header class="bg_primary pd_0 h_auto">
    <div class="flex main_between pd_12">
      <div class="flex">
        <svg-icon
          icon-name="menu"
          class="mr_16 tt_tf"
          :style="{
            transform: `rotate(${
              layoutStore.menuCollapsed ? '-180deg' : '0deg'
            })`
          }"
          @click.stop="layoutStore.changeMenuCollapsed()"
        ></svg-icon>
        <a-breadcrumb class="flex cross_center">
          <template v-for="(item, index) in route.matched" :key="index">
            <a-breadcrumb-item v-if="!item.meta.hideParent">{{
              item.meta.title
            }}</a-breadcrumb-item>
          </template>
        </a-breadcrumb>
      </div>
      <div class="flex cross_center">
        <svg-icon
          :icon-name="layoutStore.theme"
          class="mr_16"
          @click="layoutStore.changeTheme"
        ></svg-icon>
        <svg-icon
          :icon-name="layoutStore.fullScreen ? 'contraction' : 'expand'"
          class="mr_16"
          @click="layoutStore.changeFullScreenStatus"
        ></svg-icon>
        <a-avatar :src="$FILE_PATH + userStore.userInfo.avatar"> </a-avatar>
        <div class="ml_16">
          <a-dropdown>
            <div class="flex center">
              <span class="cursor_pointer" style="line-height: normal">{{
                userStore.userInfo.account
              }}</span>
              <svg-icon icon-name="arrowDown" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="$router.push({ name: 'profile' })"
                  >个人信息
                </a-menu-item>
                <a-menu-item @click="userStore.logout()">退出登录 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>
