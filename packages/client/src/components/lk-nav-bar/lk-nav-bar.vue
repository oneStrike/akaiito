<script setup lang="ts">
import type {
  IRibbonItem,
  TDiyLayoutData
} from '@akaiito/typings/src/admin/diyPage'
import { formatCommonStyle } from '@/utils/method'
import { useRouter } from '@/hooks/useRouter'
import { useModal } from '@/hooks/useModal'
interface IRenderData {
  renderData: TDiyLayoutData
}

const props = withDefaults(defineProps<IRenderData>(), {})

const navBarStyle = ref('')
const commonStyle = ref('')
const hotSearch: string[] = reactive([])
watch(
  () => props.renderData,
  (val: TDiyLayoutData) => {
    commonStyle.value = formatCommonStyle(val.commonAttr)
    navBarStyle.value =
      `height: ${props.renderData.attr.navBarHeight}px;` + commonStyle.value
    if (val.attr.ribbon) {
      val.attr.ribbonConfig?.forEach((item: any) => {
        if (item.type === 'search') getHotSearch()
      })
    }
  },
  { immediate: true, deep: true }
)

const searchBoxStyle = (style: IRibbonItem) => {
  const { size, ribbon, autoWidth } = style
  const styles: any = {
    borderRadius: `${ribbon.searchRadius}px`,
    width: `${size}px`
  }
  if (autoWidth) delete styles.width

  return styles
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

const inputFocusStatus = ref(false)
const inputFocus = () => {
  inputFocusStatus.value = true
}

const searchValue = ref('')

const goSearch = () => {
  inputFocusStatus.value = false
  if (searchValue.value) return
}

const ribbonClick = (ribbon: IRibbonItem['ribbon']) => {
  useRouter.navigateTo({
    path: '/foo/foo',
    params: ribbon
  })
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
        <view
          @click="inputFocus"
          v-if="item.ribbon.type === 'search'"
          class="search-box flex1"
        >
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
              isSwiperPlaceholder(item.ribbon) &&
              !inputFocusStatus &&
              !searchValue
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
        <view v-else @click="ribbonClick(item)">
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
