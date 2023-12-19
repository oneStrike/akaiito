<script setup lang="ts">
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import type { IterateObject } from '@typings/index'
import { SessionCacheEnum } from '@/enum/cache'

const route = useRoute()
const router = useRouter()
const currentRouter = ref()

const defaultHistory = { name: 'Dashboard', title: '工作台' }

const routerHistory = useSessionStorage<IterateObject[]>(
  SessionCacheEnum.HISTORY_ROUTER,
  [defaultHistory]
)

//移除指定路由
const removeRouter = (name: any) => {
  if (routerHistory.value.length === 2) {
    removeAllRouter()
    return
  }
  const idx = findIdx(name)
  if (currentRouter.value === name) {
    const rightName = routerHistory.value[idx + 1]?.name
    const leftName = routerHistory.value[idx - 1]?.name
    router.push({ name: rightName || leftName || defaultHistory.name })
  }

  routerHistory.value.splice(idx, 1)
}

//移除左侧
const removeLeft = () => {
  const idx = findIdx(currentRouter.value)
  console.log('🚀 ~ file:LayoutTabs method:removeLeft line:36 -----', idx)
  routerHistory.value.splice(1, idx - 1)
}
//移除右侧
const removeRight = () => {
  const idx = findIdx(currentRouter.value)
  routerHistory.value.splice(idx + 1)
}

//移除所有路由
const removeAllRouter = () => {
  routerHistory.value = [defaultHistory]
  navigation(defaultHistory.name)
}

//查找当前所在的所以
const findIdx = (name = route.name) => {
  return routerHistory.value.findIndex((item) => item.name === name)
}
//判断是否已经存在
const isExits = (name: RouteRecordName) => {
  return !!routerHistory.value.find((item) => item.name === name)
}

//添加历史记录
const addRouter = (route: RouteLocationNormalizedLoaded) => {
  if (route.name === 'redirect') return
  routerHistory.value.push({
    name: route.name!,
    title: route.meta.title
  })
}

//刷新当前路由
const reloadFlag = ref(false)
const reload = () => {
  reloadFlag.value = true
  router.replace({
    name: 'redirect',
    query: {
      path: router.currentRoute.value.fullPath
    }
  })
  window.setTimeout(() => {
    reloadFlag.value = false
  }, 500)
}

const navigation = (name: any) => {
  router.push({ name })
}

watch(
  route,
  (val) => {
    if (isExits(val.name!)) {
      router.push({ name: val.name! })
    } else {
      addRouter(val)
    }
    currentRouter.value = val.name
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="h-40px main-center pr-4">
    <el-tabs
      v-model="currentRouter"
      type="card"
      class="flex-auto h-40px"
      @tab-remove="removeRouter"
      @tabChange="navigation"
    >
      <el-tab-pane
        v-for="item in routerHistory"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.name !== defaultHistory.name"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
    <el-dropdown>
      <as-icons name="dotsHorizontal" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="reload">
            <as-icons name="reload" />
            <span>刷新</span>
          </el-dropdown-item>
          <el-dropdown-item
            @click="removeRouter(currentRouter)"
            :disabled="currentRouter === defaultHistory.name"
          >
            <as-icons name="multiply" />
            <span>关闭当前</span>
          </el-dropdown-item>
          <el-dropdown-item
            @click="removeLeft"
            :disabled="
              currentRouter === defaultHistory.name ||
              findIdx(currentRouter) === 1
            "
          >
            <as-icons name="chevronLeft" />
            <span>关闭左侧</span>
          </el-dropdown-item>
          <el-dropdown-item
            @click="removeRight"
            :disabled="findIdx(currentRouter) + 1 === routerHistory.length"
          >
            <as-icons name="chevronRight" />
            <span>关闭右侧</span>
          </el-dropdown-item>
          <el-dropdown-item
            @click="removeAllRouter"
            :disabled="currentRouter === defaultHistory.name"
          >
            <as-icons name="code" />
            <span>关闭所有</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-tabs__header) {
  margin: 0 !important;
  border-bottom: 0;
}

::v-deep(.el-tabs__nav) {
  border: 0 !important;
}
</style>
