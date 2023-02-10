<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()
const viewProfile = () => {
  router.push({ name: 'profile' })
}
</script>
<template>
  <a-dropdown :hide-on-click="false">
    <a-avatar :src="$FILE_PATH + userStore.userInfo.avatar" />
    <template #overlay>
      <a-menu>
        <a-menu-item @click="viewProfile">个人信息</a-menu-item>
        <a-menu-item @click="userStore.logout()">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss"></style>
