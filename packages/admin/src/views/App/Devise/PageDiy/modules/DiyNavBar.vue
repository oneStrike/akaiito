<script setup lang="ts">
import type { IDiyModule } from '~@/diyPage'
import { useDiyCommonStyleToString } from '@/hooks/useDiyCommonStyleToString'
import DiySearch from '@/views/App/Devise/PageDiy/modules/DiySearch.vue'
import type { IDiyPageNavBar, IDiyPageSearch } from '~@/diyPageModule'
import { DiyRibbonEnum } from '~@/enum/diyModuleEnum'
import { defaultAttrCommon } from '@/views/App/Devise/PageDiy/attr/default'
const props = withDefaults(
  defineProps<{
    layout: IDiyModule<IDiyPageNavBar>
  }>(),
  {}
)

const ribbon = computed(() => props.layout.attr.ribbon || [])
const navBarStyle = computed(() => {
  const { height, textColor } = props.layout.attr
  return `height: ${height}px; color: ${textColor}; `
})
const commonStyleString = computed(() =>
  useDiyCommonStyleToString(props.layout.commonAttr)
)
const formatSearchAttr = (val: IDiyPageSearch) => {
  const otherAttr = {
    searchContainerPadding: 0,
    searchContainerWidth: val.autoWidth ? '100%' : val.size
  }

  return {
    attr: { ...val, ...otherAttr },
    commonAttr: { ...defaultAttrCommon(), bothSideMargin: 0 }
  }
}
</script>

<template>
  <div :style="navBarStyle + commonStyleString" class="flex center">
    <span v-if="!layout.attr.enableRibbon">{{ layout.attr.text }}</span>
    <div
      v-else-if="ribbon.length"
      class="h_100 w_100 flex cross_center pl_2 pr_2"
    >
      <template v-for="(item, index) in ribbon" :key="index">
        <div
          v-if="item.type !== DiyRibbonEnum.SEARCH"
          class="flex"
          :class="index !== ribbon.length - 1 ? 'mr_2' : ''"
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
        <diy-search
          v-else
          :space="false"
          :layout="formatSearchAttr(item)"
        ></diy-search>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
