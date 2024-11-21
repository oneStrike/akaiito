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
  useEventBus('reloadRoute').emit()
}

const closeOtherTab = () => {
  const currentTab = historyRoute.value[tabIndex()]
  historyRoute.value = [defaultTab, currentTab]
}
</script>

<template>
  <div class="w-full bg-white! dark:bg-[#141414]! flex px-4 justify-between">
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
</template>

<style scoped lang="scss">
:deep(.ant-tabs-nav) {
  margin: 0 !important;
  box-sizing: border-box;

  &::before {
    border-bottom: none !important;
  }
}
</style>
