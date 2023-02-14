<script setup lang="ts">
import useTabs from '@/hooks/useTabs'
import config from '@/config'
import { useLayoutStore } from '@/stores'
import { useMenu } from '@/hooks/useMenu'
import type { Tabs } from '@/typings/layout'
const route = useRoute()
const layoutStore = useLayoutStore()
watch(
  route,
  () => {
    useTabs.addTab(route)
    if (!layoutStore.menuCollapsed) useMenu.getMenuOpenKeys()
  },
  { deep: true }
)
const mouseEnterName = ref<string>()
const tabMouseEnter = (val: Tabs) => {
  mouseEnterName.value = val.pathName
}

const tabOptions = reactive([
  {
    label: '重新加载',
    value: 'reload',
    icon: 'refresh',
    event: useTabs.reload
  },
  {
    label: '关闭当前',
    value: 'closeCurrent',
    icon: 'close',
    event: () => useTabs.closeCurrent(),
    disabled: () => useTabs.isFixedTab()
  },
  {
    label: '关闭左侧',
    value: 'closeLeft',
    icon: 'chevronLeft',
    event: () => useTabs.closeLeft(),
    disabled: () => useTabs.isLeft()
  },
  {
    label: '关闭右侧',
    value: 'closeRight',
    icon: 'chevronRight',
    event: () => useTabs.closeRight(),
    disabled: () => useTabs.isRight()
  },
  {
    label: '关闭其他',
    value: 'closeOther',
    icon: 'code',
    event: () => useTabs.closeOther(),
    disabled: () => useTabs.isCloseOther()
  },
  {
    label: '关闭全部',
    value: 'closeAll',
    icon: 'closeCircle',
    event: () => useTabs.clear(),
    disabled: () => useTabs.isFixedTab()
  }
])
</script>
<template>
  <div class="tabs flex main_between bg_primary">
    <div class="flex flex1 flex_nowrap h_100 over_scroll_y">
      <transition-group appear name="slide-up">
        <div
          class="tab flex center flex_nowrap pl_16 pr_16 h_100 cursor_pointer bg_primary"
          v-for="item in useTabs.history.value"
          :key="item.pathName"
          :style="{
            background: $route.name === item.pathName ? '#f0f7ff' : '',
            wordBreak: 'keep-all'
          }"
          @click.stop="useTabs.toggleTab(item)"
          @mouseenter="tabMouseEnter(item)"
          @mouseleave="mouseEnterName = ''"
        >
          <i
            class="dot mr_8 border_radius_circle"
            :style="{
              backgroundColor:
                $route.name === item.pathName
                  ? layoutStore.primaryColor
                  : '#999999'
            }"
          ></i>

          {{ item.title }}
          <div style="width: 16px">
            <Transition>
              <svg-icon
                v-if="item.pathName !== config.HOME_PAGE.pathName"
                v-show="
                  item.pathName === $route.name ||
                  mouseEnterName === item.pathName
                "
                style="color: currentColor"
                @click.stop="useTabs.close(item)"
                icon-name="close"
                size="14"
                class="ml_8"
                color="#666"
              />
            </Transition>
          </div>
        </div>
      </transition-group>
    </div>
    <a-dropdown class="ml_16 mr_16">
      <svg-icon icon-name="arrowDown" />
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in tabOptions"
            :key="item.icon"
            @click="item.event()"
            :disabled="item.disabled ? item.disabled() : false"
          >
            <template #icon>
              <svg-icon :icon-name="item.icon" />
            </template>
            <span>{{ item.label }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style scoped lang="less">
.tabs {
  height: 40px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);

  .tab {
    border-right: 1px solid var(--border-color);

    .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
    }
  }
}
</style>
