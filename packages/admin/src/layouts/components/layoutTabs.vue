<script setup lang="ts">
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import { StorageEnum } from '@/enum/storage'
import { useReloadRouterEventBus } from '@/hooks/useEventBus'

const route = useRoute()
const router = useRouter()
const currentRouter = ref()

const defaultHistory = { name: 'Dashboard', title: '工作台' }

const routerHistory = useSessionStorage<IterateObject[]>(StorageEnum.HISTORY_ROUTER, [defaultHistory])

const dropdownRef = ref<any[]>()
const rightClickTab = ref('')
const rightClickIdx = ref(0)
const visibleChange = (tab: IterateObject, idx: number) => {
  dropdownRef.value?.forEach((item, index) => {
    if (idx !== index) {
      item.handleClose()
    }
    rightClickTab.value = tab.name
    rightClickIdx.value = idx
  })
}

// 移除指定路由
function removeRouter(name: any) {
  if (routerHistory.value.length === 2) {
    removeAllRoute()
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

// 移除左侧
function removeLeft() {
  const idx = findIdx(currentRouter.value)
  routerHistory.value.splice(1, rightClickIdx.value - 1)
  if (idx < rightClickIdx.value) {
    navigation(rightClickTab.value)
  }
}

// 移除右侧
function removeRight() {
  const idx = findIdx(currentRouter.value)
  routerHistory.value.splice(rightClickIdx.value + 1)
  if (idx > rightClickIdx.value) {
    navigation(rightClickTab.value)
  }
}

// 移除所有路由
function removeAllRoute() {
  routerHistory.value = [defaultHistory]
  navigation(defaultHistory.name)
}

// 移除其他路由
function removeOtherRoute() {
  const target = routerHistory.value[rightClickIdx.value]
  if (target.name === defaultHistory.name) {
    routerHistory.value = [defaultHistory]
  } else {
    routerHistory.value = [defaultHistory, target]
  }
  navigation(target.name)
}

// 查找当前所在的索引
function findIdx(name = route.name) {
  return routerHistory.value.findIndex((item) => item.name === name)
}

// 判断是否已经存在
function isExits(name: RouteRecordName) {
  return !!routerHistory.value.find((item) => item.name === name)
}

// 添加历史记录
function addRouter(route: RouteLocationNormalizedLoaded) {
  routerHistory.value.push({
    name: route.name!,
    title: route.meta.title,
  })
}

function navigation(name: any) {
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
  { deep: true, immediate: true },
)

onMounted(() => {
  const tabBoxEl = document.querySelector('.tab-box')!
  tabBoxEl.addEventListener('wheel', (event) => {
    const { scrollWidth, clientWidth } = tabBoxEl
    // @ts-expect-error ignore
    const { deltaY } = event
    const maxScrollLeft = scrollWidth - clientWidth
    const left = tabBoxEl.scrollLeft + deltaY

    if ((deltaY < 0 && left >= 0) || (deltaY > 0 && left <= maxScrollLeft)) {
      event.preventDefault()
    }

    // event.preventDefault();
    tabBoxEl.scrollLeft = left
  })
})
</script>

<template>
  <div class="main-center px-4">
    <el-scrollbar wrap-class="w-98% tab-box" class="w-98%">
      <div class="w-fit flex bg">
        <el-dropdown
          v-for="(item, idx) in routerHistory"
          :key="item.name"
          ref="dropdownRef"
          trigger="contextmenu"
          class="shrink-0"
          popper-class="z-99999"
          @visible-change="(e) => e && visibleChange(item, idx)"
        >
          <div
            class="px-4 py-3 border-left cursor-pointer flex items-center shrink-0"
            :class="item.name === route.name ? 'bg-[var(--el-fill-color-light)]' : ''"
            @click="navigation(item.name)"
          >
            {{ item.title }}
            <es-icons v-if="item.name !== 'Dashboard'" name="close" @click="removeRouter(item.name)" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :disabled="rightClickTab === defaultHistory.name" @click="removeRouter(currentRouter)">
                <es-icons name="multiply" />
                <span>关闭当前</span>
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="rightClickTab === defaultHistory.name || rightClickIdx < 2"
                @click="removeLeft"
              >
                <es-icons name="chevronLeft" />
                <span>关闭左侧</span>
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="rightClickIdx + 1 === routerHistory.length || routerHistory.length < 2"
                @click="removeRight"
              >
                <es-icons name="chevronRight" />
                <span>关闭右侧</span>
              </el-dropdown-item>
              <el-dropdown-item :disabled="routerHistory.length < 2" @click="removeOtherRoute">
                <es-icons name="code" />
                <span>关闭其他</span>
              </el-dropdown-item>
              <el-dropdown-item :disabled="routerHistory.length < 2" @click="removeAllRoute">
                <es-icons name="code" />
                <span>关闭全部</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-scrollbar>
    <div class="flex-center ml-4">
      <es-icons name="pinwheel" class="mr-4" rotate rotate-type="click" @click="useReloadRouterEventBus.emit" />
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0 !important;
  border-bottom: 0;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-scrollbar__bar) {
  height: 2px;
}
</style>
