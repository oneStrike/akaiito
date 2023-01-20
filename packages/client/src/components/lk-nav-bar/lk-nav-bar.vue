<script setup lang="ts">
import type {
  IRibbonItem,
  TDiyLayoutData
} from '@akaiito/typings/src/admin/diyPage'
import { formatCommonStyle } from '@/utils/method'
import { useRouter } from '@/hooks/useRouter'
interface IRenderData {
  renderData: TDiyLayoutData
}

const props = withDefaults(defineProps<IRenderData>(), {})

const navBarStyle = ref('')
const commonStyle = ref('')
watch(
  () => props.renderData,
  (val: TDiyLayoutData) => {
    commonStyle.value = formatCommonStyle(val.commonAttr)
    navBarStyle.value =
      `height: ${props.renderData.attr.navBarHeight}px;` + commonStyle.value
  },
  { immediate: true, deep: true }
)

const ribbonClick = (ribbon: IRibbonItem['ribbon']) => {
  if (ribbon.type === 'page') {
    useRouter.navigateTo({
      path: '/foo/foo'
    })
  }
}

const baseSearchConfig = ({ ribbon }: IRibbonItem): TDiyLayoutData => {
  return {
    ribbon,
    id: 99,
    ribbonName: 'search'
  }
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
        v-for="(item, index) in renderData.attr.ribbonConfig"
        :key="item.id"
        class="flex"
        :class="
          index !== renderData.attr.ribbonConfig.length - 1 ? 'pr_16' : ''
        "
        :style="item.autoWidth ? 'flex: 1' : ''"
      >
        <lk-search
          v-if="item.ribbon.type === 'search'"
          :render-data="baseSearchConfig(item)"
        ></lk-search>
        <view v-else @click="ribbonClick(item.ribbon)">
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
.search-box {
  position: relative;
  overflow: hidden;

  .input_pd {
    padding: 4px 10px;
  }

  .swiper_placeholder {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding-right: 40px;
  }

  .search_icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
