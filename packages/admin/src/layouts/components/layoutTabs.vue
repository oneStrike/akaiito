<script setup lang="ts">
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import { StorageEnum } from '@/enum/storage'
import { useReloadRouterEventBus } from '@/hooks/useEventBus'

const route = useRoute()
const router = useRouter()
const currentRouter = ref()

const defaultHistory = { name: 'Dashboard', title: '工作台' }

const routerHistory = useSessionStorage<IterateObject[]>(StorageEnum.HISTORY_ROUTER, [defaultHistory])

// 移除指定路由
function removeRouter(name: any) {
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

// 移除左侧
function removeLeft() {
  const idx = findIdx(currentRouter.value)
  routerHistory.value.splice(1, idx - 1)
}

// 移除右侧
function removeRight() {
  const idx = findIdx(currentRouter.value)
  routerHistory.value.splice(idx + 1)
}

// 移除所有路由
function removeAllRouter() {
  routerHistory.value = [defaultHistory]
  navigation(defaultHistory.name)
}

// 查找当前所在的所以
function findIdx(name = route.name) {
  return routerHistory.value.findIndex((item) => item.name === name)
}

// 判断是否已经存在
function isExits(name: RouteRecordName) {
  return !!routerHistory.value.find((item) => item.name === name)
}

// 添加历史记录
function addRouter(route: RouteLocationNormalizedLoaded) {
  if (route.name === 'redirect') return
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

const dropdownRef = ref()
const visibleChange = (tab: routerHistory[number], idx: number) => {
  dropdownRef.value.forEach((item, index) => {
    if (idx !== index) {
      item.handleClose()
    }
  })
}

onMounted(() => {
  const inner = document.querySelector('.tab-box')
  inner.addEventListener('wheel', (event) => {
    const { scrollLeft, scrollWidth, clientWidth } = inner
    const { deltaY } = event
    const maxScrollLeft = scrollWidth - clientWidth
    const left = inner.scrollLeft + event.deltaY

    if ((deltaY < 0 && left >= 0) || (deltaY > 0 && left <= maxScrollLeft)) {
      event.preventDefault()
    }

    // event.preventDefault();
    inner.scrollLeft = left
  })
})
</script>

<template>
  <div class="h-42px main-center px-4">
    <el-scrollbar wrap-class="w-98% tab-box" class="w-98%">
      <div class="w-fit">
        <el-tabs
          v-model="currentRouter"
          type="card"
          class="flex-auto h-42px"
          @tab-remove="removeRouter"
          @tab-change="navigation"
        >
          <el-tab-pane
            v-for="(item, idx) in routerHistory"
            :key="item.name"
            :name="item.name"
            :closable="item.name !== defaultHistory.name"
          >
            <template #label>
              <el-dropdown
                ref="dropdownRef"
                class="flex-center"
                trigger="contextmenu"
                @visible-change="(e) => e && visibleChange(item, idx)"
              >
                {{ item.title }}
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      :disabled="currentRouter === defaultHistory.name"
                      @click="removeRouter(currentRouter)"
                    >
                      <es-icons name="multiply" />
                      <span>关闭当前</span>
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="currentRouter === defaultHistory.name || findIdx(currentRouter) === 1"
                      @click="removeLeft"
                    >
                      <es-icons name="chevronLeft" />
                      <span>关闭左侧</span>
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="findIdx(currentRouter) + 1 === routerHistory.length"
                      @click="removeRight"
                    >
                      <es-icons name="chevronRight" />
                      <span>关闭右侧</span>
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="currentRouter === defaultHistory.name" @click="removeAllRouter">
                      <es-icons name="code" />
                      <span>关闭所有</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-tab-pane>
        </el-tabs>
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
