<script setup lang="ts">
import { CacheSessionEnum } from '@/enum/cache'
import config from '@/config'
import type { RouteRecordName } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
const route = useRoute()
const router = useRouter()

interface Tab {
  name: RouteRecordName
  title: string
}

const tabs = useSessionStorage<Tab[]>(CacheSessionEnum.HISTORY_TABS, [
  config.HOME_PAGE
])

const activeTab = ref<Tab>(config.HOME_PAGE)
const hoverTab = ref<Tab>()
//添加
const addTab = () => {
  if (route.name !== 'redirect') {
    tabs.value.push({
      name: route.name!,
      title: route.meta.title!
    })
    if (tabs.value.length > 9) {
      tabs.value.splice(1, 1)
    }
  }
}

//获取索引
const tabIndex = (tab?: Tab) => {
  const tabName = tab ? tab.name : route.name
  return tabs.value.findIndex((item) => item.name === tabName)
}

//切换tab
const toggleTab = (tab: Tab) => {
  router.push({ name: tab.name })
}
//关闭tab
const closeTab = (tab: Tab) => {
  const index = tabIndex(tab)
  tabs.value.splice(index, 1)
}

//刷新当前页面
const reload = () => {
  router.replace({
    name: 'redirect',
    query: {
      path: router.currentRoute.value.fullPath
    }
  })
}

//关闭当前页面
const closeCurrent = () => {
  const index = tabIndex(activeTab.value)
  const isLeft = isLeftTab(activeTab.value)
  if (isLeft) {
    activeTab.value = tabs.value[0]
  } else {
    activeTab.value = tabs.value[index - 1]
  }
  tabs.value.splice(index, 1)
  toggleTab(activeTab.value)
}

//关闭左侧所有
const closeLeft = (tab: Tab = activeTab.value) => {
  const index = tabIndex(tab)
  const remaining = tabs.value.splice(index)
  tabs.value = [config.HOME_PAGE, ...remaining]
}

//关闭右侧所有
const closeRight = (tab: Tab = activeTab.value) => {
  const index = tabIndex(tab)
  tabs.value.splice(index + 1)
}

//关闭其他
const closeOther = () => {
  tabs.value = [config.HOME_PAGE, activeTab.value]
}
//全部关闭
const closeAll = () => {
  tabs.value = [config.HOME_PAGE]
  toggleTab(config.HOME_PAGE)
}

//是否是首页
const isHome = (tab: Tab = activeTab.value) => {
  return tab.name === config.HOME_PAGE.name
}

//是否是最左边
const isLeftTab = (tab: Tab = activeTab.value) => {
  const index = tabIndex(tab)
  return index <= 1
}
//是否是最右侧
const isRightTab = (tab: Tab = activeTab.value) => {
  const index = tabIndex(tab)
  return index + 1 === tabs.value.length
}
watch(
  route,
  (val) => {
    const index = tabIndex()
    if (index === -1) {
      addTab()
    }
    activeTab.value = { name: val.name!, title: val.meta.title! }
  },
  { deep: true, immediate: true }
)

const tabOptions = reactive([
  {
    label: '重新加载',
    value: 'reload',
    icon: 'refresh',
    event: reload
  },
  {
    label: '关闭当前',
    value: 'closeCurrent',
    icon: 'close',
    event: closeCurrent,
    disabled: isHome
  },
  {
    label: '关闭左侧',
    value: 'closeLeft',
    icon: 'chevronLeft',
    event: closeLeft,
    disabled: isLeftTab
  },
  {
    label: '关闭右侧',
    value: 'closeRight',
    icon: 'chevronRight',
    event: closeRight,
    disabled: isRightTab
  },
  {
    label: '关闭其他',
    value: 'closeOther',
    icon: 'code',
    event: closeOther,
    disabled: () => tabs.value.length <= 1
  },
  {
    label: '关闭全部',
    value: 'closeAll',
    icon: 'closeCircle',
    event: closeAll,
    disabled: () => tabs.value.length <= 1
  }
])
</script>
<template>
  <div class="main_between">
    <div class="flex">
      <transition-group name="fade">
        <div class="pd_4 pr_0" v-for="item in tabs" :key="item.name">
          <a-button
            :type="activeTab.name === item.name ? 'primary' : 'secondary'"
            size="mini"
            @click="toggleTab(item)"
            @mouseenter="hoverTab = item"
            @mouseleave="hoverTab = null"
          >
            {{ item.title }}
            <a-typography-text
              v-if="item.name !== config.HOME_PAGE.name"
              class="pl_4"
              @click="closeTab(item)"
            >
              <svg-icon
                icon-name="close"
                size="14"
                :color="
                  activeTab.name === item.name
                    ? '#ffffff'
                    : 'var(--color-text-2)'
                "
              />
            </a-typography-text>
          </a-button>
        </div>
      </transition-group>
    </div>
    <div class="pr_16 flex_center">
      <a-dropdown trigger="hover">
        <svg-icon icon-name="arrowDown" />
        <template #content>
          <a-doption
            v-for="item in tabOptions"
            :key="item.value"
            :disabled="item.value === 'reload' ? false : item.disabled()"
            @click="item.event()"
          >
            <div class="flex">
              <svg-icon :icon-name="item.icon" />
              <span class="pl_8">{{ item.label }}</span>
            </div>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style lang="less">
.arco-dropdown-list-wrapper {
  max-height: 300px;
}
</style>
