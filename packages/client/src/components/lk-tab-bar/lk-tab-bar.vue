<script setup lang="ts">
import { defineOptions } from 'unplugin-vue-define-options/macros'
import LkView from '@/components/lk-view/lk-view.vue'
import type { ColorSchemeKey } from '@/components/libs/typings/components'
import { useColor } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'LkTabBar'
})
export type TabBarItem = {
  icon: string
  key: string
  text: string
  path: string
  badge?: string | number
  dot?: boolean
  midButton?: boolean
}

interface TabBarProps {
  value: string
  list: TabBarItem[]
  border?: boolean
  activeColor?: ColorSchemeKey
  inActiveColor?: ColorSchemeKey
}

const props = withDefaults(defineProps<TabBarProps>(), {
  border: true,
  activeColor: 'primary',
  inActiveColor: '#7d7e80'
})
const emits = defineEmits<{
  (event: 'click', data: TabBarItem): void
}>()

const style = computed(() => {
  let styleStr = ''
  if (props.border) styleStr += 'border-top:1px solid #dadbde;'
  return styleStr + 'height: ' + uni.$lk.config.tabBarHeight + 'px;'
})

const color = computed(() => ({
  active: useColor(props.activeColor),
  inActive: useColor(props.inActiveColor)
}))

</script>

<template>
  <view class="tabbar flex_center" :style="style">
    <view
      v-for="item in list"
      :key="item.key"
      class="flex_1 flex_col h_100 flex_center"
      @click="emits('click', item)"
    >
      <template v-if="item.midButton">
        <lk-view class="pd_8" type="primary" center radius="small">
          <lk-icon
            :name="item.icon"
            prefix="iconfont"
            color="#ffffff"
            size="utmost"
          />
        </lk-view>
      </template>
      <template v-else>
        <view class="pos_re flex_center">
          <lk-icon
            :name="item.icon"
            prefix="iconfont"
            :color="value === item.key ? color.active : color.inActive"
            size="large"
          />
          <lk-view
            type="primary"
            radius="base"
            class="badge_box pos_ab flex_center"
            v-if="item.badge"
            style="width: 20px; top: 0; right: -15px; border-radius: 100px"
          >
            <lk-text
              :text="item.badge > 99 ? 99 : item.badge"
              size="tiny"
              color="white"
            />
          </lk-view>

          <lk-icon
            v-else-if="item.dot"
            name="smallcircle-filled"
            color="primary"
            prefix="uni"
            size="tiny"
            class="pos_ab"
            style="top: -3px; right: -7px"
          />
        </view>
        <lk-text
          :text="item.text"
          size="tiny"
          :color="value === item.key ? activeColor : inActiveColor"
        />
      </template>
    </view>
  </view>
</template>

<style lang="scss" scope>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-sizing: content-box;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.badge_box {
  width: 20px;
  top: 0;
  right: -15px;
  border-radius: 100px;
}
</style>
