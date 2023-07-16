<script setup lang="ts">
import { tabBarStore } from '@/stores'
import LkButton from '@/components/lk-button/lk-button.vue'

const useRouter = uni.$lk.router

const useTabBarStore = tabBarStore()
//隐藏系统tabbar
onMounted(() => {
  uni.hideTabBar()
})

const changeTheme = () => {
  console.log(uni.$lk.config.colorScheme.primary)
  uni.$lk.setConfig({
    colorScheme: {
      primary: '#000000'
    }
  })
  console.log(uni.$lk.config.colorScheme.primary)
}
</script>

<template>
  <lk-page custom-nav-bar custom-tab-bar>
    <lk-text text="我是首页" />

    <lk-button
      text="foo"
      @click="
        useRouter.navigateTo({ path: 'foo/foo', params: { foo: 1, code: 2 } })
      "
    ></lk-button>

    <lk-button text="修改主题色" @click="changeTheme" />

    <lk-tab-bar
      :list="useTabBarStore.tabBar"
      :value="useTabBarStore.currentTab"
      @click="useTabBarStore.toggleTabBar"
    />
  </lk-page>
</template>
