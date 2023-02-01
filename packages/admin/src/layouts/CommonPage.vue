<script setup lang="ts">
import AsideMenu from './components/AsideMenu/AsideMenu.vue'
import Header from './components/Header/Header.vue'
import MainPage from './components/MainPage/MainPage.vue'
import Tabs from './components/Tabs/Tabs.vue'
import useTabs from '@/hooks/useTabs'

const route = useRoute()
watch(
  route,
  () => {
    if (route.name) {
      useTabs.addTab(route)
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-container class="w_full h_full bg_main">
    <aside-menu />
    <el-container direction="vertical">
      <Header />
      <Tabs />
      <main-page />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped></style>
