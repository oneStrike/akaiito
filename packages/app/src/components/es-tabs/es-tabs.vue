<script setup lang="ts">
  import type { EsTabsProps } from '@/components/es-tabs/types'
  import { getCurrentInstance } from 'vue'
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
    backgroundColor: 'transparent',
    lineHeight: 6,
    mapNum: 7,
    f2f3f4,
  })

  const emits = defineEmits<{
    (event: 'change', data: { idx: number; value?: string | number }): void
  }>()
  const { proxy } = getCurrentInstance() as any

  const mapTop = ref(0)
  const stickyTop = ref('0px')
  const getStickyTop = (top: number) => {
    if (props.positionTop !== undefined) {
      stickyTop.value = useConfig.addUnit(props.positionTop)
    }
    const currentPage = uni.$es.router.getRoute()
    const customNavigation = currentPage?.style?.navigationStyle === 'custom'
    if (customNavigation) {
      stickyTop.value = `${top}px`
    }
  }

  onMounted(async () => {
    const { height, top } = await useRect('.tabs-container', false, proxy)
    mapTop.value = height! + top! + 10
    getStickyTop(top!)
  })

  const currentIdx = defineModel({
    type: Number,
    default: 0,
  })
  const popup = ref()
  const showMap = ref(false)
  const scrollLeft = ref(0)
  const rectInfo = reactive({
    container: {} as UniApp.NodeInfo,
    allItem: [] as UniApp.NodeInfo[],
  })

  const lineStyle = reactive({
    width: '',
    left: '',
  })
  const handlerLine = () => {
    const halfway = rectInfo.container.width! / 2
    const { width, left } = rectInfo.allItem[currentIdx.value]
    const lineLeft = left! - rectInfo.container.left!
    lineStyle.width = `${width! - 18}px`
    lineStyle.left = `${lineLeft + 9}px`
    if (lineLeft > halfway) {
      scrollLeft.value = lineLeft - halfway + width! / 2
    } else {
      scrollLeft.value = 0
    }
  }

  const setActiveTab = () => {
    showMap.value = false
    handlerLine()
  }

  watch(showMap, () => {
    if (showMap.value) {
      popup.value.open()
    } else {
      popup.value.close()
    }
  })
  watch(currentIdx, () => {
    setActiveTab()
  })

  watch(
    () => props.tabs,
    () => {
      if (Array.isArray(props.tabs) && props.tabs.length) {
        nextTick(async () => {
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
          handlerLine()
          currentIdx.value = currentIdx.value || 0
        })
      }
    },
    { deep: true, immediate: true },
  )

  const change = (item: EsTabsProps['tabs'][number], idx: number) => {
    currentIdx.value = idx
    emits('change', { idx, value: item.value })
  }
</script>

<template>
  <view
    class="es-tabs z-50"
    :style="{
      position: sticky ? 'sticky' : '',
      top: stickyTop,
    }"
  >
    <view
      class="relative z-999 h-full w-full flex overflow-hidden"
      :style="{
        background: useConfig.getColor(backgroundColor),
      }"
    >
      <scroll-view
        class="h-full"
        :scroll-x="scrollable <= tabs.length"
        scroll-with-animation
        :scroll-left="scrollLeft"
        :show-scrollbar="false"
        enhanced
      >
        <view class="tabs-container relative h-full flex flex items-center">
          <view
            v-for="(item, idx) in tabs"
            :key="idx"
            class="relative flex shrink-0 items-center justify-center px-3 pb-1"
            :class="scrollable > tabs.length ? 'flex-1' : ''"
            @click="change(item, idx)"
          >
            <view class="tabs-item">
              <es-text
                :text="item.label"
                :color="
                  useConfig.getColor(
                    currentIdx === idx ? activeColor : inactiveColor,
                  )
                "
              />
              <es-icons
                v-if="item.badge?.dot"
                type="uni"
                name="smallcircle-filled"
                size="18"
                color="error"
                class="ml-1"
              />

              <es-text
                v-if="item.badge?.value"
                :text="item.badge.value"
                color="white"
                size="20"
                :style="{ background: useConfig.getColor('error') }"
                class="ml-1 inline-block h-4 rounded-full text-align-center leading-4 w-4!"
              />
            </view>
          </view>

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
      <view
        v-if="mapNum <= tabs.length"
        class="flex items-center justify-center px-1 transition-transform"
        :style="`transform: rotate(${showMap ? 180 : 0}deg);`"
        @click="showMap = !showMap"
      >
        <es-icons name="down" type="uni" size="xl" />
      </view>
    </view>
    <uni-popup ref="popup" type="top" @mask-click="showMap = false">
      <view
        class="flex flex-wrap bg-white p-4"
        :style="`padding-top:${mapTop}px;`"
      >
        <es-button
          v-for="(item, idx) in tabs"
          :key="item.value"
          :text="item.label"
          class="mb-3 ml-3"
          :type="idx === currentIdx ? 'primary' : 'default'"
          @click="change(item, idx)"
        />
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
  /* #ifdef H5*/
  :deep(.uni-scroll-view)::-webkit-scrollbar {
    display: none;
  }

  /* #endif */
</style>
