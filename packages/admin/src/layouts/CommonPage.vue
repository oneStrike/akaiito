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
  <a-layout class="w_full h_full bg_main">
    <aside-menu />
    <a-layout>
      <Header />
      <Tabs />
      <main-page />
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped></style>
