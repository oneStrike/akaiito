<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const router = useRouter()
const viewProfile = () => {
  router.push({ name: 'profile' })
}
</script>
<template>
  <el-dropdown :hide-on-click="false">
    <el-avatar :src="$FILE_PATH + userStore.userInfo.avatar" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="viewProfile">个人信息</el-dropdown-item>
        <el-dropdown-item @click="userStore.logout()"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
