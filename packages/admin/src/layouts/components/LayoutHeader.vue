<script setup lang="ts">
import { useLayoutStore } from '@/stores/modules/layout'
import { useUserStore } from '@/stores/modules/user'
import { getAssetsFile } from '@/utils/getAssetsFile'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const { userInfo } = storeToRefs(userStore)
const toggleMenuStatus = () => {
  layoutStore.collapsed = !layoutStore.collapsed
}
</script>

<template>
  <div class="h-full flex items-center justify-between">
    <div class="flex items-center">
      <as-icons
        :name="
          layoutStore.collapsed ? 'chevronDoubleRight' : 'chevronDoubleLeft'
        "
        color="!text-info"
        class="mr-4"
        @click="toggleMenuStatus"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in route.matched"
          :key="item.name"
          :to="{ path: route.path }"
          >{{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-space size="large">
      <as-icons
        @click="layoutStore.toggleFullScreen"
        :name="
          layoutStore.fullScreen ? 'arrowsCollapseFull' : 'arrowsExpandFull'
        "
      />
      <as-icons
        @click="layoutStore.toggleThemeMode"
        :name="layoutStore.theme === 'light' ? 'sunLoop' : 'moonLoop'"
      />
      <el-dropdown>
        <div class="cursor-pointer flex items-center">
          <el-avatar
            :size="30"
            :src="
              userInfo.avatar
                ? userInfo.avatar
                : getAssetsFile('images/default-avatar.png')
            "
          />
          <as-icons name="chevronDown" color="#606266" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span
                >登录角色：{{
                  userInfo.isRoot ? '超级管理员' : '普通管理员'
                }}</span
              >
            </el-dropdown-item>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="userStore.signOut"
              >退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </div>
</template>

<style scoped></style>
