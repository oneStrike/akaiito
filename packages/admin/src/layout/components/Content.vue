<script setup lang="ts">
import { layoutStore } from '@/stores'

const useLayoutStore = layoutStore()
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="useLayoutStore.pageAnim + '-transform'" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
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

/*幻灯片过渡*/

.slide-transform-enter-active,
.slide-transform-leave-active {
  transition: all 0.75s ease-out;
}

.slide-transform-enter-to {
  position: absolute;
  right: 0;
}

.slide-transform-enter-from {
  position: absolute;
  right: -100%;
}

.slide-transform-leave-to {
  position: absolute;
  left: -100%;
}

.slide-transform-leave-from {
  position: absolute;
  left: 0;
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

/*组合过渡*/
.scale-slide-transform-enter-active,
.scale-slide-transform-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-transform-enter-from {
  left: -100%;
}

.scale-slide-transform-enter-to {
  left: 0;
}

.scale-slide-transform-leave-from {
  transform: scale(1);
}

.scale-slide-transform-leave-to {
  transform: scale(0.8);
}
</style>
