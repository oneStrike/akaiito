<script setup lang="ts">
import router from '@/router'

defineOptions({
  name: 'TabsLayout',
})
const historyRoute = useSessionStorage<
  {
    label: string
    name: string
    icon: string
  }[]
>('history_route', [
  {
    label: '工作台',
    name: 'Dashboard',
    icon: 'dashboard',
  },
])
const route = useRoute()

const activeKey = ref<string>(route.name as string)

const edit = (val: any) => {
  historyRoute.value.splice(
    historyRoute.value.findIndex((item) => item.name === val),
    1,
  )
}
const navigator = (val: any) => {
  router.push({ name: val })
}
onMounted(() => {
  const reloadRoute = inject('reload', null)
  console.log(reloadRoute)
})
</script>

<template>
  <a-tabs
    v-model:active-key="activeKey"
    class="bg-white! dark:bg-[#141414]!"
    type="editable-card"
    hide-add
    @edit="edit"
    @tab-click="navigator"
  >
    <a-tab-pane v-for="(item, idx) in historyRoute" :key="item.name" :closable="idx !== 0">
      <template #tab>
        <div class="flex-inline">
          <span>{{ item.label }}</span>
          <es-icon v-if="activeKey === item.name" rotate class="ml-2" :size="16" name="update" />
        </div>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="scss">
:deep(.ant-tabs-nav) {
  margin: 0 !important;
  padding: 0 14px;
  box-sizing: border-box;

  &::before {
    border-bottom: none !important;
  }
}
</style>
