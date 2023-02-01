<script setup lang="ts">
import BreadCrumb from '../BreadCrumb/BreadCrumb.vue'
import FullScreen from '../FullScreen/FullScreen.vue'
import Theme from '../Theme/Theme.vue'

import { useLayout } from '@/stores'
import Avatar from '../Avatar/Avatar.vue'
const useLayoutStore = useLayout()

const menuIconRotate = computed(() =>
  useLayoutStore.menuStatus === 'open' ? 'rotate(0)' : 'rotate(-180deg)'
)
</script>

<template>
  <div class="h_100 flex cross_center main_between">
    <div class="flex center">
      <svg-icon
        class="menu_status tt_tf mr_16"
        icon-name="menu"
        @click="useLayoutStore.changeMenuStatus"
      />
      <bread-crumb />
    </div>
    <div class="flex center">
      <Theme />
      <full-screen />
      <Avatar />
    </div>
  </div>
</template>
<style scoped lang="scss">
.menu_status {
  transform: v-bind(menuIconRotate);
}
</style>
