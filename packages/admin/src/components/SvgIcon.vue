<script lang="ts" setup>
import type { IconName } from '@/typings/components/svgicon'

interface SvgIcon {
  iconName: IconName
  color?: string
  size?: number | string
  type?: 'primary' | 'error' | 'warning' | 'light'
  border?: boolean
}

const props = withDefaults(defineProps<SvgIcon>(), {
  iconName: '404',
  color: '',
  size: 16,
  border: false
})
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
      return 'rgb(var(--primary-6))'
    case 'error':
      return 'rgb(var(--danger-6))'
    case 'warning':
      return 'rgb(var(--warning-6))'
    case 'light':
      return 'var(--color-text-2)'
  }
})
</script>

<template>
  <a-typography-text
    class="flex_center cursor_pointer"
    :class="[border && 'border pd_4 border_circle']"
    :style="{ color: iconTypeClass || color, fontSize: size + 'px' }"
  >
    <icon-lczk-403 v-if="iconName === '403'" />
    <icon-lczk-404 v-if="iconName === '404'" />
    <icon-lczk-500 v-if="iconName === '500'" />
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
    <icon-majest-chevron-left v-if="iconName === 'chevronLeft'" />
    <icon-majest-chevron-right v-if="iconName === 'chevronRight'" />
    <icon-majest-code-line v-if="iconName === 'code'" />
    <icon-majest-close-circle-line v-if="iconName === 'closeCircle'" />
  </a-typography-text>
</template>

<style lang="less" scoped></style>
