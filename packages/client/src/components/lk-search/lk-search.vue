<script setup lang="ts">
import type {
  IDiyPageSearch,
  IDiyModule
} from '@akaiito/typings/src/admin/modules/diy'
import { formatCommonStyle } from '@/utils/method'
import LkSwiper from '@/components/lk-swiper/lk-swiper.vue'
interface IRenderData {
  renderData: IDiyModule<IDiyPageSearch>
}

const props = withDefaults(defineProps<IRenderData>(), {})
console.log('🚀 ~ file:lk-search method: line:11 -----', props)
//搜索框样式
const handlerSearchBoxStyle = () => {
  const {
    searchBoxHeight,
    searchBorderColor,
    searchBoxColor,
    searchBoxRadius,
    searchIconPosition
  } = props.renderData.attr
  const flexDirection = `flex-direction: ${
    searchIconPosition === 'left' ? 'row-reverse' : 'row'
  };`
  const height = `height: ${
    isNaN(searchBoxHeight) ? searchBoxHeight : searchBoxHeight + 'px'
  };`
  return (
    flexDirection +
    height +
    ` border: 1px solid ${searchBorderColor};background: ${searchBoxColor};border-radius: ${searchBoxRadius}px;`
  )
}

//图标样式
const handlerIconStyle = () => {
  const { searchIconPosition } = props.renderData.attr
  return searchIconPosition === 'left'
    ? 'margin-right: 8px'
    : 'margin-left: 8px'
}

//placeholder样式
const handlerPlaceholderStyle = () => {
  const { searchPlaceholderColor } = props.renderData.attr
  return `color: ${searchPlaceholderColor}`
}

//icon属性
const handlerIcon = (): { type: string; icon: string } | undefined => {
  const { searchIcon } = props.renderData.attr
  if (Array.isArray(searchIcon) && searchIcon.length) {
    const icon = searchIcon[0]
    return {
      type: icon.mimeType,
      icon: icon.path
    }
  }
}

//placeholder内容
const handlerPlaceholder = () => {
  const { searchPlaceholder } = props.renderData.attr
  if (!searchPlaceholder) return '热门搜索'
  if (searchPlaceholder.includes(',')) return searchPlaceholder.split(',')
  if (searchPlaceholder.includes('，')) return searchPlaceholder.split('，')
  return searchPlaceholder
}
//搜索容器的样式
const handlerSearchContainerStyle = () => {
  const { searchContainerWidth, searchContainerPadding } = props.renderData.attr
  let styleStr = ''
  const width =
    typeof searchContainerWidth === 'string'
      ? searchContainerWidth
      : searchContainerWidth + 'px'
  if (searchContainerWidth) {
    styleStr = `width: ${width};`
  }
  if (typeof searchContainerPadding === 'number') {
    styleStr += `padding:${searchContainerPadding}px`
  }
  return styleStr
}
const commonStyle = ref()
const searchContainerStyle = ref<string>()
const searchBoxStyle = ref<string>()
const iconStyle = ref<string>()
const placeholderStyle = ref<string>()
const placeholder = ref<string | string[]>()
const iconAttr = ref<{ type: string; icon: string } | undefined>()
watch(
  () => props.renderData,
  (val) => {
    commonStyle.value = formatCommonStyle(val.commonAttr)
    searchBoxStyle.value = handlerSearchBoxStyle()
    iconStyle.value = handlerIconStyle()
    placeholderStyle.value = handlerPlaceholderStyle()
    placeholder.value = handlerPlaceholder()
    iconAttr.value = handlerIcon()
    searchContainerStyle.value = handlerSearchContainerStyle()
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <view class="content pd_8" :style="commonStyle">
    <div class="pl_12 pr_12 flex cross_center" :style="searchBoxStyle">
      <lk-swiper
        v-if="renderData.attr.searchPlaceholderType === 'swiper'"
        :render-data="placeholder"
        mode="text"
      ></lk-swiper>
      <text
        v-else
        :style="placeholderStyle"
        class="fs14 w_100 text_cut placeholder"
      >
        {{ placeholder }}</text
      >
      <view v-if="iconAttr" :style="iconStyle" class="flex center">
        <lk-icon
          :name="iconAttr.icon"
          :color="renderData.attr.searchIconColor"
          :size="20"
          shape="square"
        ></lk-icon>
      </view>
    </div>
  </view>
</template>

<style scoped lang="scss"></style>
