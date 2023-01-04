<script setup lang="ts">
import { getHomeLayout } from '@/api/common/common'
import config from '@/config'
import {
  IOverallPage,
  TDiyLayoutData
} from '@akaiito/typings/src/admin/diyPage'
import { IDiyData } from '@akaiito/typings/src/admin/diyPage'

const pageStyle = ref<string>('')
const layouts = ref<TDiyLayoutData>()
getHomeLayout().then((res) => {
  const layoutData: IDiyData['diyData'] = JSON.parse(res.diyData)
  layouts.value = layoutData.modules
  formatPageStyle(layoutData.page)
})

const adaptiveStatusBar = ref(false)
const formatPageStyle = (pageData: IOverallPage) => {
  const { backgroundStyle, backgroundColor, backgroundImage } = pageData
  adaptiveStatusBar.value = pageData.adaptiveStatusBar
  if (backgroundStyle === 'color') {
    pageStyle.value = `background-color: ${backgroundColor}`
  } else if (Array.isArray(backgroundImage) && backgroundImage[0]?.path) {
    pageStyle.value = `background-image: url('${
      config.FILE_PATH + backgroundImage[0].path
    }');background-size: cover`
  }
}
</script>
<template>
  <view
    class="layout-container w_full min_h_full"
    :class="adaptiveStatusBar && 'status-bar-height'"
    :style="pageStyle"
  >
    <view v-for="(item, index) in layouts" :key="index">
      <lk-nav-bar
        v-if="item.module === 'DiyNavBar'"
        :render-data="item"
      ></lk-nav-bar>
      <lk-divider
        v-if="item.commonAttr.divider"
        :render-data="item.divider"
      ></lk-divider>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.layout-container {
  box-sizing: border-box;
}

.status-bar-height {
  padding-top: var(--status-bar-height);
}
</style>
