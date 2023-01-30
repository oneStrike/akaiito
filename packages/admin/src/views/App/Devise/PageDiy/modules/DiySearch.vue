<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import { useDiyCommonStyleToString } from '@/hooks/useDiyCommonStyleToString'

import type { IDiyModule } from '~@/diyPage'
import type { IDiyPageSearch } from '~@/diyPageModule'
import IconFont from '@/components/IconFont.vue'

interface ISearchProps {
  layout: IDiyModule<IDiyPageSearch>
  space: boolean
}

const props = withDefaults(defineProps<ISearchProps>(), {})

//搜索框样式
const handlerSearchBoxStyle = () => {
  const {
    searchBoxHeight,
    searchBorderColor,
    searchBoxColor,
    searchBoxRadius,
    searchIconPosition
  } = props.layout.attr
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
  const { searchIconPosition } = props.layout.attr
  return searchIconPosition === 'left'
    ? 'margin-right: 8px'
    : 'margin-left: 8px'
}

//placeholder样式
const handlerPlaceholderStyle = () => {
  const { searchPlaceholderColor } = props.layout.attr
  return `color: ${searchPlaceholderColor}`
}

//icon属性
const handlerIcon = (): { type: string; icon: string } | undefined => {
  const { searchIcon } = props.layout.attr
  if (Array.isArray(searchIcon) && searchIcon.length) {
    const icon = searchIcon[0]
    console.log('🚀 ~ file:DiySearch method:handlerIcon line:55 -----', icon)
    return {
      type: icon.mimeType,
      icon: icon.path
    }
  }
}

//placeholder内容
const handlerPlaceholder = () => {
  const { searchPlaceholder } = props.layout.attr
  if (!searchPlaceholder) return '热门搜索'
  if (searchPlaceholder.includes(',')) return searchPlaceholder.split(',')
  if (searchPlaceholder.includes('，')) return searchPlaceholder.split('，')
  return searchPlaceholder
}
//搜索容器的样式
const handlerSearchContainerStyle = () => {
  const { searchContainerWidth, searchContainerPadding } = props.layout.attr
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
  () => props.layout,
  (val) => {
    commonStyle.value = useDiyCommonStyleToString(val.commonAttr)
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
  <div class="dummy_input pd_1" :style="commonStyle + searchContainerStyle">
    <div
      class="swiper-no-swiping flex cross_center main_between h_100 pl_1 pr_1 over_hide"
      :style="searchBoxStyle"
    >
      <swiper
        v-if="layout.attr.searchPlaceholderType === 'swiper'"
        class="w_100 h_100"
        :height="28"
        :allow-touch-move="false"
        direction="vertical"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false
        }"
        :loop="true"
        :modules="[Autoplay]"
      >
        <swiper-slide v-for="(item, ind) in placeholder" :key="ind">
          <div class="h_100 w_100 flex cross_center">
            <div :style="placeholderStyle" class="placeholder text_cut fs14">
              {{ item }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <span
        v-else
        :style="placeholderStyle"
        class="fs14 w_100 text_cut placeholder"
      >
        {{ placeholder }}</span
      >
      <div v-if="iconAttr" :style="iconStyle" class="flex center">
        <icon-font
          v-if="iconAttr.type === 'icon'"
          :type="iconAttr.icon"
          :color="layout.attr.searchIconColor"
          :size="26"
        ></icon-font>
        <el-avatar
          v-else
          :src="$FILE_PATH + iconAttr.icon"
          :size="20"
        ></el-avatar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dummy_input {
  overflow: hidden;

  .swiper {
    height: 30px;
  }

  .placeholder {
    color: #a8abb2;
  }
}
</style>
