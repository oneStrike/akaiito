<script setup lang="ts">
import { tabBarStore } from '@/stores'

const useTabBarStore = tabBarStore()

//隐藏系统tabbar
uni.hideTabBar()
</script>

<template>
  <lk-page custom-nav-bar custom-tab-bar>
    <text class="fs16">我是友人</text>

    <lk-tab-bar
      :list="useTabBarStore.tabBar"
      :value="useTabBarStore.currentTab"
      @click="useTabBarStore.toggleTabBar"
    />
  </lk-page>
</template>
