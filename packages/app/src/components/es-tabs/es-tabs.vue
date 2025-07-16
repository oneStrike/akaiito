<script setup lang="ts">
  import type { EsTabsProps } from '@/components/es-tabs/types'
  import {
    getCurrentInstance,
    nextTick,
    onMounted,
    reactive,
    ref,
    watch,
  } from 'vue'
  import { useConfig } from '@/components/libs/hooks/useConfig'
  import { useRect } from '@/components/libs/hooks/useRect'

  defineOptions({
    name: 'EsTabs',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared',
    },
  })

  const props = withDefaults(defineProps<EsTabsProps>(), {
    bold: true,
    sticky: true,
    scrollable: 4,
    activeColor: 'primary',
    inactiveColor: 'base',
    backgroundColor: 'white',
    lineHeight: 6,
    mapNum: 7,
  })

  const emits = defineEmits<{
    change: [data: { idx: number; value?: string | number }]
  }>()

  const { proxy } = getCurrentInstance()!

  // 响应式状态
  const currentIdx = defineModel<number>({ default: 0 })
  const popup = ref()
  const showMap = ref(false)
  const scrollLeft = ref(0)
  const mapTop = ref(0)
  const stickyTop = ref('0px')

  // 矩形信息
  const rectInfo = reactive({
    container: {} as UniApp.NodeInfo,
    allItem: [] as UniApp.NodeInfo[],
  })

  // 下划线样式
  const lineStyle = reactive({
    width: '0px',
    left: '0px',
  })

  // 计算粘性定位顶部距离
  const calculateStickyTop = (top: number) => {
    if (props.positionTop !== undefined) {
      stickyTop.value = useConfig.addUnit(props.positionTop)
      return
    }

    const currentPage = uni.$es.router.getRoute()
    const customNavigation = currentPage?.style?.navigationStyle === 'custom'

    if (customNavigation) {
      stickyTop.value = `${top}px`
    }
  }

  // 处理下划线位置和滚动
  const updateLinePosition = () => {
    if (!rectInfo.allItem[currentIdx.value] || !rectInfo.container.width) return

    const halfway = rectInfo.container.width / 2
    const { width = 0, left = 0 } = rectInfo.allItem[currentIdx.value]
    const lineLeft = left - (rectInfo.container.left || 0)

    lineStyle.width = `${width - 16}px`
    lineStyle.left = `${lineLeft + 8}px`

    // 计算滚动位置
    if (lineLeft > halfway) {
      scrollLeft.value = lineLeft - halfway + width / 2
    } else {
      scrollLeft.value = 0
    }
  }

  // 设置激活标签
  const setActiveTab = () => {
    showMap.value = false
    updateLinePosition()
  }

  // 更新矩形信息
  const updateRectInfo = async () => {
    if (!Array.isArray(props.tabs) || !props.tabs.length) return

    try {
      rectInfo.container = (await useRect(
        '.tabs-container',
        false,
        proxy,
      )) as UniApp.NodeInfo
      rectInfo.allItem = (await useRect(
        '.tabs-item',
        true,
        proxy,
      )) as UniApp.NodeInfo[]
      updateLinePosition()
    } catch (error) {
      console.warn('Failed to get rect info:', error)
    }
  }

  // 标签切换处理
  const handleTabChange = (item: EsTabsProps['tabs'][number], idx: number) => {
    currentIdx.value = idx
    emits('change', { idx, value: item.value })
  }

  // 生命周期
  onMounted(async () => {
    try {
      const { height = 0, top = 0 } = (await useRect(
        '.tabs-container',
        false,
        proxy,
      )) as UniApp.NodeInfo
      mapTop.value = height + top + 10
      calculateStickyTop(top)
    } catch (error) {
      console.warn('Failed to initialize tabs:', error)
    }
  })

  // 监听器
  watch(showMap, (newVal) => {
    if (newVal) {
      popup.value?.open()
    } else {
      popup.value?.close()
    }
  })

  watch(currentIdx, setActiveTab)

  watch(
    () => props.tabs,
    () => {
      nextTick(updateRectInfo)
    },
    { deep: true, immediate: true },
  )
</script>

<template>
  <view
    class="relative z-50"
    :style="{
      position: sticky ? 'sticky' : 'static',
      top: stickyTop,
    }"
  >
    <!-- 主容器 -->
    <view
      class="relative z-10 h-full w-full flex overflow-hidden"
      :style="{
        backgroundColor: useConfig.getColor(backgroundColor),
      }"
    >
      <!-- 滚动容器 -->
      <scroll-view
        class="flex-1 h-full"
        :scroll-x="scrollable <= tabs.length"
        scroll-with-animation
        :scroll-left="scrollLeft"
        :show-scrollbar="false"
        enhanced
      >
        <view
          class="tabs-container relative h-full flex items-center min-w-full"
        >
          <!-- 标签项 -->
          <view
            v-for="(item, idx) in tabs"
            :key="`tab-${idx}-${item.value || item.label}`"
            class="tabs-item-wrapper relative flex shrink-0 items-center justify-center px-3 py-1 cursor-pointer transition-all duration-200"
            :class="{
              'flex-1': scrollable > tabs.length,
              'min-w-20': scrollable <= tabs.length,
            }"
            @click="handleTabChange(item, idx)"
          >
            <view class="tabs-item flex items-center justify-center">
              <!-- 标签文本 -->
              <es-text
                :text="item.label"
                :size="fontSize"
                :color="
                  useConfig.getColor(
                    currentIdx === idx ? activeColor : inactiveColor,
                  )
                "
                class="transition-all duration-200"
              />

              <!-- 徽章点 -->
              <es-icons
                v-if="item.badge?.dot"
                type="uni"
                name="smallcircle-filled"
                size="12"
                color="error"
                class="ml-1 flex-shrink-0"
              />

              <!-- 徽章数字 -->
              <view
                v-if="item.badge?.value"
                class="ml-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-white text-xs leading-none flex-shrink-0"
                :style="{ backgroundColor: useConfig.getColor('error') }"
              >
                {{ item.badge.value }}
              </view>
            </view>
          </view>

          <!-- 下划线指示器 -->
          <view
            v-if="lineStyle.width !== '0px'"
            class="tabs-line absolute bottom-0 rounded-full transition-all duration-300 ease-out"
            :style="{
              backgroundColor: useConfig.getColor(activeColor),
              height: useConfig.addUnit(lineHeight),
              width: lineStyle.width,
              left: lineStyle.left,
            }"
          />
        </view>
      </scroll-view>

      <!-- 展开按钮 -->
      <view
        v-if="mapNum <= tabs.length"
        class="flex items-center justify-center px-3 border-l border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50"
        :class="{
          'rotate-180': showMap,
        }"
        @click="showMap = !showMap"
      >
        <es-icons
          name="down"
          type="uni"
          size="16"
          :color="useConfig.getColor(inactiveColor)"
        />
      </view>
    </view>

    <!-- 下拉弹窗 -->
    <uni-popup
      ref="popup"
      type="top"
      :safe-area="false"
      @mask-click="showMap = false"
    >
      <view
        class="flex flex-wrap bg-white p-4 shadow-lg"
        :style="{ paddingTop: `${mapTop}px` }"
      >
        <es-button
          v-for="(item, idx) in tabs"
          :key="`popup-tab-${idx}-${item.value || item.label}`"
          :text="item.label"
          class="mb-2 mr-2"
          size="small"
          :type="idx === currentIdx ? 'primary' : 'default'"
          @click="handleTabChange(item, idx)"
        />
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
  /* 展开按钮旋转动画 */
  .es-tabs view[class*='rotate-180'] {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
</style>
