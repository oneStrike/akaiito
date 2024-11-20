<script lang="ts" setup>
import { useThemeStore } from '@/stores/modules/themeStore'

defineOptions({
  name: 'ContentLayout',
})

const themeStore = useThemeStore()
</script>

<template>
  <div class="p-4 h-full">
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route.meta?.cache">
        <Transition mode="out-in" :name="`${themeStore.pageAnim}-transform`">
          <component :is="Component" :key="route.path" />
        </Transition>
      </keep-alive>

      <Transition mode="out-in" :name="`${themeStore.pageAnim}-transform`" v-else>
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>
<style scoped lang="scss">
/*渐变过渡*/
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.5s ease;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
}

/*缩放过渡*/
.scale-transform-enter-active,
.scale-transform-leave-active {
  transition: all 0.1s ease;
}

.scale-transform-enter-from,
.scale-transform-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
