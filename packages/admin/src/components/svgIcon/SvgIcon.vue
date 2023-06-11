<script lang="ts" setup>
import type { IconName } from '@/typings/components/svgIcon'

export interface SvgIconProps {
  iconName: IconName
  color?: string
  size?: number | string
  type?: 'primary' | 'error' | ''
  rotate?: boolean
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  iconName: '404',
  color: '',
  size: 22,
  rotate: false
})

const emits = defineEmits<{
  (event: 'click', data: Event): void
}>()

const iconColor = ref('')
watch(
  () => props.color,
  (val) => {
    iconColor.value = val
  },
  { immediate: true }
)

const iconTypeClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'primary_color'
    case 'error':
      return 'error_color'
  }
})
</script>

<template>
  <n-icon
    class="cursor_pointer"
    :class="[iconTypeClass, rotate && 'rotate_animation']"
    :color="iconColor"
    :size="props.size"
    @click="(e:Event) => emits('click', e)"
  >
    <!--    自定义图标集-->
    <!--    <icon-lczk-403 v-if="iconName === '403'" />-->
    <!--    <icon-lczk-404 v-if="iconName === '404'" />-->
    <!--    <icon-lczk-500 v-if="iconName === '500'" />-->
    <!--    Material line Icons-->
    <icon-md-moon-to-sunny-outline-loop-transition
      v-if="iconName === 'light'"
    />
    <icon-md-laptop v-if="iconName === 'laptop'" />
    <icon-md-moon-twotone-alt-loop v-if="iconName === 'dark'" />
    <icon-md-menu-fold-right v-if="iconName === 'menu'" />
    <icon-md-reddit-loop v-if="iconName === 'reddit'" />
    <icon-md-uploading-loop v-if="iconName === 'uploading'" />
    <icon-md-loading-twotone-loop v-if="iconName === 'loading'" />
    <icon-md-plus-circle v-if="iconName === 'plusCircle'" />
    <!--    majesticons-->
    <icon-majest-users-line v-if="iconName === 'users'" />
    <icon-majest-user-line v-if="iconName === 'user'" />
    <icon-majest-server-line v-if="iconName === 'server'" />
    <icon-majest-clock-line v-if="iconName === 'clock'" />
    <icon-majest-support-line v-if="iconName === 'support'" />
    <icon-majest-arrows-expand-full v-if="iconName === 'expand'" />
    <icon-majest-arrows-collapse-full v-if="iconName === 'contraction'" />
    <icon-majest-chevron-right-line v-if="iconName === 'arrowTop'" />
    <icon-majest-chevron-down-line v-if="iconName === 'arrowDown'" />
    <icon-majest-chevron-left-line v-if="iconName === 'arrowLeft'" />
    <icon-majest-chevron-right v-if="iconName === 'arrowRight'" />
    <icon-majest-close-line v-if="iconName === 'close'" />
    <icon-majest-shooting-star-line v-if="iconName === 'shooting'" />
    <icon-majest-document-award-line v-if="iconName === 'document'" />
    <icon-majest-applications-line v-if="iconName === 'applications'" />
    <icon-majest-sparkles-line v-if="iconName === 'sparkles'" />
    <icon-majest-user-group-line v-if="iconName === 'userGroup'" />
    <icon-majest-incognito-line v-if="iconName === 'incognito'" />
    <icon-majest-cube-line v-if="iconName === 'cube'" />
    <icon-majest-puzzle-line v-if="iconName === 'puzzle'" />
    <icon-majest-shopping-cart-line v-if="iconName === 'shoppingCart'" />
    <icon-majest-search-line v-if="iconName === 'search'" />
    <icon-majest-applications-line v-if="iconName === 'navMenu'" />
    <icon-majest-megaphone-line v-if="iconName === 'megaphone'" />
    <icon-majest-color-swatch-line v-if="iconName === 'swatch'" />
    <icon-majest-paper-airplane-line v-if="iconName === 'airplane'" />
    <icon-majest-question-mark-circle v-if="iconName === 'question'" />
    <icon-majest-edit-pen-4-line v-if="iconName === 'edit'" />
    <icon-majest-delete-bin-line v-if="iconName === 'delete'" />
    <icon-majest-zoom-in-line v-if="iconName === 'search2'" />
    <icon-majest-home-analytics-line v-if="iconName === 'home'" />
    <icon-majest-ban-line v-if="iconName === 'ban'" />
    <icon-majest-check-line v-if="iconName === 'check'" />
    <icon-majest-ferris-wheel-line v-if="iconName === 'ferrisWheel'" />
    <icon-majest-pinwheel-line v-if="iconName === 'pinwheel'" />
    <icon-majest-planet-rocket-line v-if="iconName === 'planetRocket'" />
    <icon-majest-exclamation-line v-if="iconName === 'exclamation'" />
    <icon-majest-refresh-line v-if="iconName === 'refresh'" />
    <icon-majest-question-mark-circle-line v-if="iconName === 'questionMark'" />
    <icon-majest-code-line v-if="iconName === 'code'" />
    <icon-majest-close-circle-line v-if="iconName === 'closeCircle'" />
    <icon-majest-cog-line v-if="iconName === 'cog'" />
    <!--BoxIcons		-->
    <icon-bx-pie-chart-alt v-if="iconName === 'chart'" />
    <icon-bx-game v-if="iconName === 'game'" />
  </n-icon>
</template>

<style scoped lang="scss">
.rotate_animation {
  animation: rotate 1s infinite ease-in-out;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
