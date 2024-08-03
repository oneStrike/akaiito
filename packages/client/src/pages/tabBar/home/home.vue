<script setup lang="ts">
import { useSystemConfigStore } from '@/stores/modules/systemConfig'
import EsNavBar from '@/components/es-nav-bar/es-nav-bar.vue'

const systemConfigStore = useSystemConfigStore()
defineOptions({
  name: 'TabBarHome'
})
</script>

<template>
  <es-page :border-top="false">
    <es-nav-bar center-text="首页">
      <template #content>
        <view class="flex items-center">
          <es-image
            :src="systemConfigStore.systemConfig.logo"
            class="w-24 h-8 mr-2"
          />
          <es-search />
        </view>
      </template>
    </es-nav-bar>
    <view></view>
  </es-page>
</template>

<style scoped></style>
