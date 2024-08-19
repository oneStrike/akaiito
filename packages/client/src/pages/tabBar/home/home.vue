<script setup lang="ts">
import { useSystemConfigStore } from '@/stores/modules/systemConfig'
import EsNavBar from '@/components/es-nav-bar/es-nav-bar.vue'
import { useRouter } from '@/hooks/useRouter'

const systemConfigStore = useSystemConfigStore()
defineOptions({
  name: 'TabBarHomePage'
})

onShow(() => {
  console.log(useRouter()?.getQuery())
})

const searchPage = () => {
  useRouter()?.navigateTo({
    name: 'search'
  })
}
</script>

<template>
  <es-page :border-top="false">
    <es-nav-bar>
      <template #content>
        <view class="flex items-center w-full px-4">
          <es-image
            :src="systemConfigStore.systemConfig.logo"
            class="w-20 h-8 mr-2 shrink-0"
          />
          <es-search mode="booth" @click="searchPage" />
        </view>
      </template>
    </es-nav-bar>
    <view></view>
  </es-page>
</template>

<style scoped></style>
