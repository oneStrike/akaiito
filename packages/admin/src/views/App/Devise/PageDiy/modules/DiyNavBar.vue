<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import type { IDiyModule, IRibbonItem } from '~@/diyPage'
import { useDiyCommonStyleToString } from '@/hooks/useDiyCommonStyleToString'

const props = withDefaults(
  defineProps<{
    layout: IDiyModule
  }>(),
  {}
)

const ribbon = computed(() => props.layout.attr?.ribbonConfig || [])
const navBarStyle = computed(() => {
  const { navBarHeight, textColor } = props.layout.attr
  return `height: ${navBarHeight}px; color: ${textColor}; `
})
const commonStyleString = computed(() =>
  useDiyCommonStyleToString(props.layout.commonAttr)
)
const searchBoxStyle = (style: IRibbonItem) => {
  const { size, ribbon, autoWidth } = style
  const widthStyle = autoWidth ? 'flex: 1' : `width:${size}px`
  return `border-radius: ${ribbon.searchRadius}px;` + widthStyle
}
</script>

<template>
  <div :style="navBarStyle + commonStyleString" class="flex center">
    <span v-if="!layout.attr.ribbon">{{ layout.attr.text }}</span>
    <div
      v-else-if="ribbon.length"
      class="h_100 w_100 flex cross_center pl_2 pr_2"
    >
      <template v-for="(item, index) in ribbon" :key="index">
        <div
          v-if="item.ribbon.type !== 'search'"
          class="flex"
          :class="
            index === 0
              ? 'mr_2'
              : index === ribbon.length - 1
              ? 'ml_2'
              : ' mr-2 ml_2'
          "
        >
          <el-avatar
            v-if="item.iconType === 'image'"
            :size="item?.size || 30"
            :src="$FILE_PATH + item?.icon"
          ></el-avatar>
          <icon-font
            v-else
            :type="item.icon"
            :color="item.iconColor"
            :size="item.size || 24"
          ></icon-font>
        </div>
        <div
          v-else
          class="dummy_input flex cross_center main_between pl_1 pr_1 swiper-no-swiping"
          :style="searchBoxStyle(item)"
        >
          <swiper
            v-if="
              item.ribbon.searchPlaceholderType === 'custom' &&
              Array.isArray(item.ribbon.searchPlaceholderValue)
            "
            class="w_100 h_100"
            :style="`width: ${item.size - 30}px`"
            :height="28"
            :allow-touch-move="false"
            direction="vertical"
            :autoplay="
              item.ribbon.searchPlaceholderValue && {
                delay: 2500,
                disableOnInteraction: false
              }
            "
            :loop="true"
            :modules="[Autoplay]"
          >
            <swiper-slide
              v-for="(placeholder, ind) in item.ribbon.searchPlaceholderValue"
              :key="ind"
            >
              <div class="h_100 w_100 flex cross_center">
                <div class="placeholder text_cut fs14">{{ placeholder }}</div>
              </div>
            </swiper-slide>
          </swiper>
          <span v-else class="fs14 w_100 text_cut placeholder"> 热门搜索</span>
          <svg-icon icon-name="search" color="#e4e7ed"></svg-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dummy_input {
  height: 28px;
  border: 1px solid #e4e7ed;
  overflow: hidden;

  .swiper {
    height: 28px;
  }

  .placeholder {
    color: #a8abb2;
  }
}
</style>
