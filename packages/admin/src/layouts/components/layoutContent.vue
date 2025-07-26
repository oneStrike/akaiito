<script setup lang="ts">
  import { useReloadRouterEventBus } from '@/hooks/useEventBus'
  import { useLayoutStore } from '@/stores/modules/layout'

  const layoutStore = useLayoutStore()

  const activeRouterView = ref(true)
  useReloadRouterEventBus.on(() => {
    activeRouterView.value = false
    useTimeoutFn(() => {
      activeRouterView.value = true
    }, 200)
  })
</script>

<template>
  <router-view v-slot="{ Component, route }" class="h-full rounded-md">
    <transition :name="`${layoutStore.pageAnim}-transform`" mode="out-in">
      <component
        :is="Component"
        v-if="activeRouterView"
        :key="route.fullPath"
      />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
  /*水平滑动过渡 - SlideX (高性能优化版)*/
  .slideX-transform-enter-active,
  .slideX-transform-leave-active {
    transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity;
  }

  .slideX-transform-enter-from {
    transform: translate3d(-15px, 0, 0) scale(0.98);
    opacity: 0;
  }

  .slideX-transform-leave-to {
    transform: translate3d(15px, 0, 0) scale(0.98);
    opacity: 0;
  }

  .slideX-transform-enter-to,
  .slideX-transform-leave-from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }

  /*渐变过渡*/
  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-transform-enter-from,
  .fade-transform-leave-to {
    opacity: 0;
  }

  /*幻灯片过渡 (性能优化版)*/
  .slide-transform-enter-active,
  .slide-transform-leave-active {
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  .slide-transform-enter-to {
    position: absolute;
    right: 0;
    transform: translate3d(0, 0, 0);
  }

  .slide-transform-enter-from {
    position: absolute;
    right: -100%;
    transform: translate3d(100%, 0, 0);
  }

  .slide-transform-leave-to {
    position: absolute;
    left: -100%;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-transform-leave-from {
    position: absolute;
    left: 0;
    transform: translate3d(0, 0, 0);
  }

  /*缩放过渡 (性能优化版)*/
  .scale-transform-enter-active,
  .scale-transform-leave-active {
    transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity;
  }

  .scale-transform-enter-from,
  .scale-transform-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.9);
  }

  .scale-transform-enter-to,
  .scale-transform-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  /*组合过渡 (性能优化版)*/
  .scale-slide-transform-enter-active,
  .scale-slide-transform-leave-active {
    position: absolute;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  .scale-slide-transform-enter-from {
    left: -100%;
    transform: translate3d(-100%, 0, 0) scale(1);
  }

  .scale-slide-transform-enter-to {
    left: 0;
    transform: translate3d(0, 0, 0) scale(1);
  }

  .scale-slide-transform-leave-from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  .scale-slide-transform-leave-to {
    transform: translate3d(0, 0, 0) scale(0.8);
  }

  /*缩放淡入过渡 - ZoomFade (性能优化版)*/
  .zoomFade-transform-enter-active,
  .zoomFade-transform-leave-active {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity;
  }

  .zoomFade-transform-enter-from {
    transform: translate3d(0, 0, 0) scale(1.1);
    opacity: 0;
  }

  .zoomFade-transform-leave-to {
    transform: translate3d(0, 0, 0) scale(0.9);
    opacity: 0;
  }

  .zoomFade-transform-enter-to,
  .zoomFade-transform-leave-from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }

  /*虚化过渡 - Blur (性能优化版)*/
  .blur-transform-enter-active,
  .blur-transform-leave-active {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity;
  }

  .blur-transform-enter-from,
  .blur-transform-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.96);
  }

  .blur-transform-enter-to,
  .blur-transform-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  /*毛玻璃过渡 - Glass (性能优化版)*/
  .glass-transform-enter-active,
  .glass-transform-leave-active {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity;
  }

  .glass-transform-enter-from,
  .glass-transform-leave-to {
    opacity: 0;
    transform: translate3d(0, 15px, 0) scale(0.95);
  }

  .glass-transform-enter-to,
  .glass-transform-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  /*深度虚化过渡 - DeepBlur (性能优化版)*/
  .deepBlur-transform-enter-active,
  .deepBlur-transform-leave-active {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }

  .deepBlur-transform-enter-from,
  .deepBlur-transform-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.9) rotateX(5deg);
  }

  .deepBlur-transform-enter-to,
  .deepBlur-transform-leave-from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1) rotateX(0deg);
  }

  /*渐进虚化过渡 - ProgressiveBlur (性能优化版)*/
  .progressiveBlur-transform-enter-active {
    animation: progressive-enter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .progressiveBlur-transform-leave-active {
    animation: progressive-leave 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
  }

  @keyframes progressive-enter {
    0% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(1.05);
    }
    50% {
      opacity: 0.5;
      transform: translate3d(0, 0, 0) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  @keyframes progressive-leave {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(0.95);
    }
  }
</style>
