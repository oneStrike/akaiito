<script setup lang="ts">
import type { IDiyLayoutData } from '@/typings/pages/home/home'
import type { IRibbonItem } from '@akaiito/typings/src/admin/diyPage'
import { formatCommonStyle } from '@/utils/method'

interface IRenderData {
  renderData: IDiyLayoutData
}

const props = withDefaults(defineProps<IRenderData>(), {})

const navBarStyle = ref('')
const commonStyle = ref('')
const hotSearch: string[] = reactive([])
watch(
  () => props.renderData,
  (val: IDiyLayoutData) => {
    commonStyle.value = formatCommonStyle(val.commonAttr)
    navBarStyle.value =
      `height: ${props.renderData.attr.navBarHeight}px;` + commonStyle.value
    val.attr.ribbonConfig.forEach((item: any) => {
      if (item.type === 'search') getHotSearch()
    })
  },
  { immediate: true, deep: true }
)

const searchBoxStyle = (style: IRibbonItem) => {
  const { size, ribbon, autoWidth } = style
  const widthStyle = autoWidth ? '' : `width:${size}px`
  return `border-radius: ${ribbon.searchRadius}px;` + widthStyle
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
</script>

<template>
  <view
    :style="navBarStyle"
    class="flex cross_center pl3 pr3"
    :class="!renderData.attr.ribbon && ['center']"
  >
    <text
      v-if="!renderData.attr.ribbon"
      :style="'color: ' + renderData.attr.textColor"
      >{{ renderData.attr.text }}</text
    >
    <view
      v-else
      class="ribbons w_100 flex cross_center main_between pl_16 pr_16"
    >
      <view
        v-for="item in renderData.attr.ribbonConfig"
        :key="item.id"
        class="flex"
        :class="item.autoWidth ? 'pl_16 pr_16' : ''"
        :style="item.autoWidth ? 'flex: 1' : ''"
      >
        <view v-if="item.ribbon.type === 'search'" class="search-box flex1">
          <u--input
            :style="searchBoxStyle(item)"
            :placeholder="
              !isSwiperPlaceholder(item.ribbon) &&
              searchPlaceholder(item.ribbon)[0]
            "
            border="surround"
            suffixIcon="search"
            :suffixIconStyle="{ fontSize: '26px', color: '#e4e7ed' }"
          >
          </u--input>
          <!--          <lk-swiper-->
          <!--            mode="text"-->
          <!--            :render-data="item.ribbon.searchPlaceholderValue"-->
          <!--          ></lk-swiper>-->
        </view>
        <view v-if="item.ribbon.type === 'page'">
          <lk-icon
            :name="item.icon"
            :color="item.iconColor"
            :size="item.size"
          ></lk-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:deep(.u-input) {
  padding: 3px 6px !important;
}
</style>
