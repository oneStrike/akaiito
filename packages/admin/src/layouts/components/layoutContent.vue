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
  /*水平滑动过渡 - SlideX (带虚化效果)*/
  .slideX-transform-enter-active,
  .slideX-transform-leave-active {
    transition: all 0.3s ease-out;
  }

  .slideX-transform-enter-from {
    transform: translateX(-20px);
    opacity: 0;
    filter: blur(4px);
  }

  .slideX-transform-leave-to {
    transform: translateX(20px);
    opacity: 0;
    filter: blur(4px);
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
  /*缩放淡入过渡 - ZoomFade*/
  .zoomFade-transform-enter-active,
  .zoomFade-transform-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .zoomFade-transform-enter-from {
    transform: scale(1.1);
    opacity: 0;
  }

  .zoomFade-transform-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }

  /*虚化过渡 - Blur (Vben风格)*/
  .blur-transform-enter-active,
  .blur-transform-leave-active {
    transition: all 0.4s ease;
    position: relative;
  }

  .blur-transform-enter-active::before,
  .blur-transform-leave-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(0px);
    transition: backdrop-filter 0.4s ease;
    z-index: -1;
  }

  .blur-transform-enter-from,
  .blur-transform-leave-to {
    opacity: 0;
    transform: scale(0.98);
  }

  .blur-transform-enter-from::before,
  .blur-transform-leave-to::before {
    backdrop-filter: blur(8px);
  }

  /*毛玻璃过渡 - Glass*/
  .glass-transform-enter-active,
  .glass-transform-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
  }

  .glass-transform-enter-active::before,
  .glass-transform-leave-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(0px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.5s ease;
    z-index: -1;
  }

  .glass-transform-enter-from,
  .glass-transform-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  .glass-transform-enter-from::before,
  .glass-transform-leave-to::before {
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.25);
  }

  /*深度虚化过渡 - DeepBlur*/
  .deepBlur-transform-enter-active,
  .deepBlur-transform-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .deepBlur-transform-enter-active::before,
  .deepBlur-transform-leave-active::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
    backdrop-filter: blur(0px) brightness(1.1);
    transition: all 0.6s ease;
    z-index: -1;
  }

  .deepBlur-transform-enter-from,
  .deepBlur-transform-leave-to {
    opacity: 0;
    transform: scale(0.9) rotateX(10deg);
    filter: blur(2px);
  }

  .deepBlur-transform-enter-from::before,
  .deepBlur-transform-leave-to::before {
    backdrop-filter: blur(15px) brightness(1.2);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
  }

  /*渐进虚化过渡 - ProgressiveBlur*/
  .progressiveBlur-transform-enter-active {
    animation: progressive-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards;
  }

  .progressiveBlur-transform-leave-active {
    animation: progressive-blur-out 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      forwards;
  }

  @keyframes progressive-blur-in {
    0% {
      opacity: 0;
      transform: scale(1.1);
      filter: blur(10px);
      backdrop-filter: blur(20px);
    }
    30% {
      opacity: 0.3;
      transform: scale(1.05);
      filter: blur(5px);
      backdrop-filter: blur(10px);
    }
    70% {
      opacity: 0.8;
      transform: scale(1.02);
      filter: blur(2px);
      backdrop-filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px);
      backdrop-filter: blur(0px);
    }
  }

  @keyframes progressive-blur-out {
    0% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px);
      backdrop-filter: blur(0px);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.98);
      filter: blur(3px);
      backdrop-filter: blur(8px);
    }
    100% {
      opacity: 0;
      transform: scale(0.95);
      filter: blur(8px);
      backdrop-filter: blur(15px);
    }
  }
</style>
