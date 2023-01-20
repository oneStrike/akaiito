<script setup lang="ts">
import type { TDiyLayoutData } from '@akaiito/typings/src/admin/diyPage'
import { formatCommonStyle } from '@/utils/method'
import { IRibbonItem } from '@akaiito/typings/src/admin/diyPage'
interface IRenderData {
  renderData: TDiyLayoutData
}

const props = withDefaults(defineProps<IRenderData>(), {})
const commonStyle = ref('')
const inputFocusStatus = ref(false)
const searchValue = ref('')
watch(
  () => props.renderData,
  (val) => {
    commonStyle.value = formatCommonStyle(val.commonAttr)
  },
  { immediate: true, deep: true }
)

const inputFocus = () => {
  inputFocusStatus.value = true
}

//搜索框placeholder
const getHotSearch = async () => {
  return ['我是搜索内容', '我也是搜索内容', '我还是搜索内容']
}
const isSwiperPlaceholder = (ribbon: IRibbonItem['ribbon']) => {
  const searchPlaceholderCount = ribbon.searchPlaceholderValue?.length || 0
  return searchPlaceholderCount > 1
}
const searchPlaceholder = (ribbon: IRibbonItem['ribbon']) => {
  const placeholder = ribbon.searchPlaceholderValue
  return placeholder?.length ? placeholder : ['请输入搜索内容']
}
const searchBoxStyle = (style: IRibbonItem) => {
  const { size, ribbon, autoWidth } = style
  const styles: any = {
    borderRadius: `${ribbon.searchRadius}px`,
    width: `${size}px`
  }
  if (autoWidth) delete styles.width

  return styles
}
const goSearch = () => {
  inputFocusStatus.value = false
  if (searchValue.value) return
}
</script>

<template>
  <view class="content" :style="commonStyle">
    <view @click="inputFocus" class="search-box flex1">
      <input
        ref="uInput"
        v-model="searchValue"
        class="border_base input_pd"
        :focus="inputFocusStatus"
        :style="searchBoxStyle(item)"
        :placeholder="
          !isSwiperPlaceholder(item.ribbon)
            ? searchPlaceholder(item.ribbon)[0]
            : ''
        "
        confirm-type="search"
        @blur="inputFocusStatus = false"
        @confirm="goSearch"
      />
      <view
        class="w_100 h_100 swiper_placeholder input_pd"
        v-if="
          isSwiperPlaceholder(item.ribbon) && !inputFocusStatus && !searchValue
        "
      >
        <lk-swiper
          mode="text"
          :render-data="item.ribbon.searchPlaceholderValue"
        ></lk-swiper>
      </view>
      <view class="search_icon" @click.stop="goSearch">
        <uni-icons color="#999" type="search" :size="22"></uni-icons>
      </view>
    </view>
  </view>
</template>
