<script setup lang="ts">
import { SessionCacheEnum } from '@/enum/cache'
import type { DropdownOption } from 'naive-ui'
import type {
  RouteLocationNormalizedLoaded,
  RouteMeta,
  RouteRecordName
} from 'vue-router'
import { useSvgIconFn } from '@/hook/useTsx'
import config from '@/config'

interface HistoryRouter {
  name: RouteRecordName
  title: Required<RouteMeta['title']>
}

const route = useRoute()
const router = useRouter()

const defaultHistory = { name: 'workbench', title: '工作台' }

const historyRouter = useSessionStorage<HistoryRouter[]>(
  SessionCacheEnum.HISTORY_ROUTER,
  [defaultHistory]
)
//判断是否已经存在
const isExits = (name: RouteRecordName) => {
  return !!historyRouter.value.find((item) => item.name === name)
}
//添加历史记录
const add = (route: RouteLocationNormalizedLoaded) => {
  if (route.name === 'redirect') return
  historyRouter.value.push({
    name: route.name!,
    title: route.meta.title
  })
  if (historyRouter.value.length > 15) historyRouter.value.shift()
}

//关闭指定路由
const close = (idx: number) => {
  historyRouter.value.splice(idx, 1)
}

//切换路由
const toggleRoute = ({ name }: HistoryRouter) => {
  router.push({ name })
}

//查找当前所在的所以
const findIdx = (name = route.name) => {
  return historyRouter.value.findIndex((item) => item.name === name)
}

//是否是最左侧
const isLeft = () => {
  return findIdx(route.name!) <= 1
}
//是否是最右侧
const isRight = () => {
  return findIdx(route.name!) === historyRouter.value.length - 1
}

//处理关闭事件
const handleClose = (key: string) => {
  const idx = findIdx(route.name!)
  let nextRoute = defaultHistory as HistoryRouter
  switch (key) {
    case 'closeCurrent':
      if (isRight() || !isLeft()) nextRoute = historyRouter.value[idx - 1]
      close(idx)
      toggleRoute(nextRoute)
      break
    case 'closeLeft':
      historyRouter.value.splice(1, idx - 1)
      break
    case 'closeRight':
      historyRouter.value.splice(idx + 1)
      break
    case 'closeOther':
      historyRouter.value = [defaultHistory, historyRouter.value[idx]]
      break
    case 'closeAll':
      historyRouter.value = [defaultHistory]
      toggleRoute(defaultHistory)
  }
}

//刷新当前路由
const reloadFlag = ref(false)
let timer: number
const reload = useDebounceFn(() => {
  reloadFlag.value = true
  router.replace({
    name: 'redirect',
    query: {
      path: router.currentRoute.value.fullPath
    }
  })
  timer = window.setTimeout(() => {
    reloadFlag.value = false
  }, 1000)
}, config.DEBOUNCE)

const dropdownOptions = ref<DropdownOption[]>()
const serializeDropdownOptions = () => {
  return [
    {
      label: '关闭当前',
      key: 'closeCurrent',
      icon: useSvgIconFn({ iconName: 'close', size: 18 }),
      disabled: route.name === defaultHistory.name
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      icon: useSvgIconFn({ iconName: 'arrowLeft', size: 18 }),
      disabled: isLeft()
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: useSvgIconFn({ iconName: 'arrowRight', size: 18 }),
      disabled: isRight()
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: useSvgIconFn({ iconName: 'code', size: 18 }),
      disabled: historyRouter.value.length <= 2
    },
    {
      label: '关闭全部',
      key: 'closeAll',
      icon: useSvgIconFn({ iconName: 'closeCircle', size: 18 }),
      disabled: historyRouter.value.length <= 1
    }
  ]
}
watch(
  route,
  (val) => {
    if (isExits(val.name!)) {
      router.push({ name: val.name! })
    } else {
      add(val)
    }
    dropdownOptions.value = serializeDropdownOptions()
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <n-space justify="space-between" :wrap="false" class="pd_8">
    <div style="white-space: nowrap">
      <TransitionGroup name="list">
        <n-button
          v-for="(item, index) in historyRouter"
          :key="item.name"
          class="mr_8"
          icon-placement="right"
          size="tiny"
          :bordered="false"
          secondary
          :type="route.name === item.name ? 'primary' : 'tertiary'"
          @click="toggleRoute(item)"
        >
          {{ item.title }}
          <template #icon v-if="item.name !== defaultHistory.name">
            <svg-icon icon-name="close" size="14" @click.stop="close(index)" />
          </template>
        </n-button>
      </TransitionGroup>
    </div>

    <n-space item-style="display:flex;align-items:center" :wrap="false">
      <n-dropdown :options="dropdownOptions" :on-select="handleClose">
        <svg-icon icon-name="arrowDown" />
      </n-dropdown>

      <svg-icon
        icon-name="pinwheel"
        size="18"
        @click="reload"
        :rotate="reloadFlag"
      />
    </n-space>
  </n-space>
</template>

<style scoped lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
