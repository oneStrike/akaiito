<script setup lang="ts">
import config from '@/config'
import { defineOptions } from 'unplugin-vue-define-options/macros'
import LkView from '@/components/lk-view/lk-view.vue'

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
  activeColor: string
  inActiveColor?: string
}

defineOptions({
  name: 'LkTabBar'
})

const { safeAreaInsets } = uni.getSystemInfoSync()
const tabBarHeight = ref(config.tabBarHeight + 'px')
const paddingBottom = ref(safeAreaInsets!.bottom + 'px')

const props = withDefaults(defineProps<TabBarProps>(), {
  border: true,
  inActiveColor: '#7d7e80'
})

const emits = defineEmits<{
  (event: 'click', data: TabBarItem): void
}>()

const style = computed(() => {
  let styleStr = ''
  if (props.border) styleStr += 'border-top:1px solid #dadbde;'
  return styleStr
})
</script>

<template>
  <!-- #ifdef H5 -->
  <teleport to="uni-app">
    <!-- #endif		-->
    <view class="tabbar flex_center" :style="style">
      <view
        v-for="item in list"
        :key="item.key"
        class="flex_1 flex_col h_100 main_center cross_center"
        @click="emits('click', item)"
      >
        <template v-if="item.midButton">
          <view class="w_100 h_100 flex_center">
            <lk-view class="pd_4" type="primary" center radius="small">
              <lk-text
                :icon="item.icon"
                align="center"
                icon-prefix="iconfont"
                color="#ffffff"
                size="huge"
              />
            </lk-view>
          </view>
        </template>
        <template v-else>
          <view class="mb_4 pos_re">
            <lk-text
              :icon="item.icon"
              align="center"
              icon-prefix="iconfont"
              :color="value === item.key ? activeColor : inActiveColor"
              size="large"
            />
            <view class="badge pos_ab tc" v-if="item.badge">
              <lk-view type="primary" radius="base">
                <text class="fs12"
                  >{{ item.badge > 99 ? 99 : item.badge }}
                </text>
              </lk-view>
            </view>

            <view v-else-if="item.dot" class="pos_ab dot fs12">
              <lk-text
                icon="dian"
                type="error"
                align="center"
                icon-prefix="iconfont"
                size="tiny"
              />
            </view>
          </view>
          <lk-text
            :text="item.text"
            align="center"
            size="tiny"
            :color="value === item.key ? activeColor : inActiveColor"
          />
        </template>
      </view>
    </view>
    <!-- #ifdef H5 -->
  </teleport>
  <!--#endif	-->
</template>

<style lang="scss" scope>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: v-bind(tabBarHeight);
  background: #ffffff;
  padding-bottom: v-bind(paddingBottom);
  box-sizing: content-box;
}

.dot {
  line-height: 1;
  top: -6rpx;
  right: -14rpx;
}

.badge {
  width: 36rpx;
  line-height: 12px;
  top: -6rpx;
  right: -30rpx;
  border-radius: 100px;
  margin-top: 2px;
  background: #ff5844;
}
</style>
