<script setup lang="ts">
import useTabs from '@/hooks/useTabs'
import type { RouteRecordName } from 'vue-router'
import config from '@/config'
const route = useRoute()

const activeTab = ref<RouteRecordName>()

watchEffect(() => {
  if (route.name) activeTab.value = route.name
})

const tabOptions = reactive([
  {
    label: '重新加载',
    value: 'reload',
    icon: 'RefreshRight',
    event: useTabs.reload()
  },
  {
    label: '关闭当前',
    value: 'closeCurrent',
    icon: 'Close',
    event: useTabs.closeCurrent(),
    disabled: useTabs.isFixedTab()
  },
  {
    label: '关闭左侧',
    value: 'closeLeft',
    icon: 'ArrowLeft',
    event: useTabs.closeLeft(),
    disabled: useTabs.isLeft()
  },
  {
    label: '关闭右侧',
    value: 'closeRight',
    icon: 'ArrowRight',
    event: useTabs.closeRight(),
    disabled: useTabs.isRight()
  },
  {
    label: '关闭其他',
    value: 'closeOther',
    icon: 'CircleClose',
    event: useTabs.closeOther(),
    disabled: useTabs.isCloseOther()
  },
  {
    label: '关闭全部',
    value: 'closeAll',
    icon: 'DCaret',
    event: useTabs.clear(),
    disabled: useTabs.isFixedTab()
  }
])
</script>

<template>
  <div class="flex main_between cross_center nav_tab pl_2 pr_2 bg_box">
    <div class="tabs pr_2 flex over_scroll_x">
      <transition-group appear name="el-zoom-in-center">
        <div
          class="el-button el-button--small el-button--primary"
          :class="activeTab !== item.pathName && 'is-plain el-button--info '"
          @click="useTabs.toggleTab(item)"
          v-for="item in useTabs.history.value"
          :key="item.pathName"
        >
          {{ item.title }}
          <svg-icon
            v-if="item.pathName !== config.HOME_PAGE.pathName"
            style="color: currentColor"
            @click.stop="useTabs.close(item)"
            icon-name="close"
            size="14"
            class="ml_1"
          />
        </div>
      </transition-group>
    </div>

    <el-dropdown class="options">
      <svg-icon icon-name="arrowDown" />
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="(item, index) in tabOptions" :key="item.value">
            <el-dropdown-item
              @click="item.event"
              :divided="index !== 0 && index % 2 === 0"
              :icon="item.icon"
              :disabled="item.disabled ? item.disabled() : false"
            >
              <span>{{ item.label }}</span>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.nav_tab {
  min-height: 40px;

  .tab {
    width: 100px;
    height: 32px;
  }

  .options {
    width: 66px;
  }
}
</style>
