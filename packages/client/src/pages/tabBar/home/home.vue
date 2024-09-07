<script setup lang="ts">
import EsNavBar from '@/components/es-nav-bar/es-nav-bar.vue'
import { useRouter } from '@/hooks/useRouter'
import { useSystemConfigStore } from '@/stores/modules/systemConfig'

defineOptions({
  name: 'TabBarHomePage',
})
const systemConfigStore = useSystemConfigStore()
function searchPage() {
  useRouter()?.navigateTo({
    name: 'search',
  })
}
</script>

<template>
  <es-page :border-top="false">
    <EsNavBar>
      <template #content>
        <view class="flex items-center w-full px-4">
          <es-image
            :src="systemConfigStore.systemConfig.logo"
            class="w-20 h-8 mr-2 shrink-0"
          />
          <es-search mode="booth" @click="searchPage" />
        </view>
      </template>
    </EsNavBar>
    <view />
  </es-page>
</template>

<style scoped></style>
