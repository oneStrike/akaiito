<script setup lang="ts">
import router from '@/router'

defineOptions({
  name: 'TabsLayout',
})

const defaultTab = {
  title: '工作台',
  name: 'Dashboard',
  icon: 'dashboard',
}

const historyRoute = useSessionStorage('history_route', [defaultTab])
const route = useRoute()
const tabsRef = ref()
const activeKey = ref<string>(route.name as string)
const tabsLayoutRef = ref()
const rightClickTab = ref('')
const rightClickMenu = ref('')

watch(route, (val) => {
  activeKey.value = val.name as string
})

const tabIndex = (name?: string) => {
  name = name || activeKey.value
  return historyRoute.value.findIndex((item) => item.name === name)
}

const besideTab = (name?: string) => {
  const idx = tabIndex(name)
  return historyRoute.value[idx - 1].name
}
const navigator = (val: any) => {
  router.push({ name: val })
}

const edit = (val: any) => {
  if (val === activeKey.value) {
    navigator(besideTab(val))
  }
  historyRoute.value.splice(tabIndex(val), 1)
}

const reloadRoute = () => {
  rightClickTab.value = ''
  useEventBus('reloadRoute').emit()
}

const closeOtherTab = () => {
  const currentTab = historyRoute.value[tabIndex()]
  historyRoute.value = [defaultTab, currentTab]
}

onMounted(() => {
  const contextmenuEl = tabsLayoutRef.value.querySelector('.ant-tabs-nav-list')
  contextmenuEl.oncontextmenu = (e: Event) => {
    e.preventDefault()
    rightClickTab.value = ''
    // @ts-expect-error ignore
    const tabName = e.target.innerText
    if (!tabName) {
      return
    }
    const targetTab = historyRoute.value.find((item) => item.title === tabName)
    if (targetTab?.name) {
      rightClickTab.value = targetTab.name
      nextTick(() => {
        // @ts-expect-error ignore
        rightClickMenu.value.$el.style.left = e.pageX + 'px'
        // @ts-expect-error ignore
        rightClickMenu.value.$el.style.top = e.pageY + 'px'
      })
    }
  }

  window.onclick = () => {
    rightClickTab.value = ''
  }
})

const rightClickHandler = (val) => {
  // rightClickTab.value = ''
}
</script>

<template>
  <div class="w-full bg-white! dark:bg-[#141414]! flex px-4 justify-between" ref="tabsLayoutRef">
    <a-tabs
      ref="tabsRef"
      v-model:active-key="activeKey"
      type="editable-card"
      hide-add
      :tab-bar-gutter="0"
      class="w-97%"
      @edit="edit"
      @tab-click="navigator"
    >
      <a-tab-pane v-for="(item, idx) in historyRoute" :key="item.name" :tab="item.title" :closable="idx !== 0" />
    </a-tabs>

    <es-icon name="pinwheel" rotate @click="reloadRoute" />
  </div>
  <Transition name="fade-transform">
    <a-menu
      v-if="rightClickTab"
      ref="rightClickMenu"
      dir="rtl"
      class="absolute z-9999 shadow-2xl! border-e-0! border-slate-200 border-solid border-px rounded-2"
      @click="rightClickHandler"
    >
      <a-menu-item key="1">
        <div class="flex items-center">
          <es-icon name="refresh" :size="14" />
          重新加载
        </div>
      </a-menu-item>
      <a-menu-item key="2">
        <div class="flex items-center">
          <es-icon name="chevronsLeft" :size="14" />
          关闭左侧
        </div>
      </a-menu-item>
      <a-menu-item key="3">
        <div class="flex items-center">
          <es-icon name="chevronsRight" :size="14" />
          关闭右侧
        </div>
      </a-menu-item>
      <a-menu-item key="4">
        <div class="flex items-center">
          <es-icon name="close" :size="16" />
          关闭其他
        </div>
      </a-menu-item>
      <a-menu-item key="5">
        <div class="flex items-center">
          <es-icon name="closeCircle" :size="16" />
          关闭全部
        </div>
      </a-menu-item>
    </a-menu>
  </Transition>
</template>

<style scoped lang="scss">
:deep(.ant-tabs-nav) {
  margin: 0 !important;
  box-sizing: border-box;

  &::before {
    border-bottom: none !important;
  }
}

/*渐变过渡*/
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.2s ease;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
}
</style>
