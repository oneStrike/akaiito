<script setup lang="ts">
import { useLayoutStore } from '@/stores/modules/layout'
import { useUserStore } from '@/stores/modules/user'
import { getAssetsFile } from '@/utils/getAssetsFile'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const layoutStore = useLayoutStore()
const { userInfo } = storeToRefs(userStore)

const breadcrumbNavigator = (val) => {
  router.push({ name: val })
}
</script>

<template>
  <div class="h-60px pl-4 pr-4 flex items-center justify-between border-bottom">
    <div class="flex items-center">
      <es-icons
        :name="layoutStore.collapsed ? 'chevronDoubleRight' : 'chevronDoubleLeft'"
        color="!text-info"
        class="mr-4"
        @click="layoutStore.toggleMenuCollapsed"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, idx) in route.matched" :key="idx">
          <el-text v-if="item.name === route.name" tag="b" size="large">{{ item.meta?.title }}</el-text>
          <el-dropdown v-else-if="item.children?.length" @command="breadcrumbNavigator" popper-class="z-99999!">
            <span class="flex items-center">
              <el-text>{{ item.meta?.title }}</el-text>
              <es-icons name="chevronDown" color="#606266" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="menu in item.children" :key="menu.name" :command="menu.name">
                  <es-icons :name="menu.meta?.icon" />
                  {{ menu.meta?.title }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-text v-else>{{ item.meta?.title }}</el-text>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-space size="large">
      <es-icons
        :name="layoutStore.fullScreen ? 'arrowsCollapseFull' : 'arrowsExpandFull'"
        @click="layoutStore.toggleFullScreen"
      />
      <es-icons :name="layoutStore.theme === 'light' ? 'sunLoop' : 'moonLoop'" @click="layoutStore.toggleThemeMode" />
      <el-dropdown>
        <div class="cursor-pointer flex items-center">
          <el-avatar
            :size="30"
            :src="userInfo?.avatar ? userInfo.avatar : getAssetsFile('images/default-avatar.png')"
          />
          <es-icons name="chevronDown" color="#606266" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span>登录角色：{{ userInfo?.isRoot ? '超级管理员' : '普通管理员' }}</span>
            </el-dropdown-item>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="userStore.signOut"> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </div>
</template>
