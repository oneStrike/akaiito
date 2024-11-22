<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue'

defineOptions({
  name: 'EsIcon',
})

export interface AsIconsProps {
  name: string
  size?: number
  color?: 'text-primary' | 'text-error' | 'text-info' | 'text-success' | 'text-warning' | string
  rotate?: boolean
  hover?: boolean
  unset?: boolean
}

const props = withDefaults(defineProps<AsIconsProps>(), {
  color: '',
  size: 18,
  rotate: false,
  hover: false,
  unset: false,
})

const emits = defineEmits<{
  (event: 'click'): void
}>()
const iconClass = ref('')

watch(
  () => props.color,
  (val) => {
    if (!props.unset && val) {
      if (val.includes('#')) {
        iconClass.value = `text-[${val}]`
      } else {
        iconClass.value = val === '!text-primary' ? '!text-theme' : val
      }
    }
  },
  { immediate: true },
)

const iconBox = ref<HTMLElement>()
const clickHandler = useDebounceFn(() => {
  if (props.rotate) {
    iconBox.value?.classList.add('rotate_animation')
    const timer = window.setTimeout(() => {
      iconBox.value?.classList.remove('rotate_animation')
      clearTimeout(timer)
    }, 1000)
  }
  emits('click')
}, 200)
</script>

<template>
  <span
    ref="iconBox"
    class="cursor-pointer flex-inline items-center"
    :class="[unset ? '!text-unset' : '', iconClass]"
    :style="{ fontSize: `${size}px` }"
    @click="clickHandler"
  >
    <!--   https://icones.netlify.app/collection/line-md -->
    <icon-md-sun-rising-loop v-if="name === 'sunLoop'" />
    <icon-md-moon-loop v-if="name === 'moonLoop'" />
    <icon-md-downloading-loop v-if="name === 'downloading'" />
    <icon-md-uploading-loop v-if="name === 'uploading'" />
    <icon-md-menu-unfold-left v-if="name === 'unfoldLeft'" />
    <icon-md-menu-unfold-right v-if="name === 'unfoldRight'" />
    <icon-md-rotate-270 v-if="name === 'update'" />

    <!-- https://icones.netlify.app/collection/majesticons    -->

    <icon-majest-arrows-collapse-full v-if="name === 'arrowsCollapseFull'" />
    <icon-majest-arrows-expand-full v-if="name === 'arrowsExpandFull'" />
    <icon-majest-chevron-down-line v-if="name === 'chevronDown'" />
    <icon-majest-user-line v-if="name === 'user'" />
    <icon-majest-server-line v-if="name === 'server'" />
    <icon-majest-users-line v-if="name === 'users'" />
    <icon-majest-hand-pointer-event-line v-if="name === 'handPointer'" />
    <icon-majest-dashboard-line v-if="name === 'dashboard'" />
    <icon-majest-settings-cog-line v-if="name === 'settings'" />
    <icon-majest-dots-horizontal-line v-if="name === 'dotsHorizontal'" />
    <icon-majest-multiply-line v-if="name === 'multiply'" />
    <icon-majest-reload-line v-if="name === 'reload'" />
    <icon-majest-chevron-left-line v-if="name === 'chevronLeft'" />
    <icon-majest-chevron-right-line v-if="name === 'chevronRight'" />
    <icon-majest-code-line v-if="name === 'code'" />
    <icon-majest-image-circle-line v-if="name === 'imageCircle'" />
    <icon-majest-data-minus-line v-if="name === 'dataMinus'" />
    <icon-majest-pinwheel-line v-if="name === 'pinwheel'" />
    <icon-majest-minimize-line v-if="name === 'minimize'" />
    <icon-majest-maximize-line v-if="name === 'maximize'" />
    <icon-majest-list-box-line v-if="name === 'listBox'" />
    <icon-majest-login-half-circle-line v-if="name === 'login'" />
    <icon-majest-puzzle-line v-if="name === 'puzzle'" />
    <icon-majest-planet-line v-if="name === 'planet'" />
    <icon-majest-dots-vertical v-if="name === 'dotsVertical'" />
    <icon-majest-edit-pen-2-line v-if="name === 'edit'" />
    <icon-majest-delete-bin-line v-if="name === 'delete'" />
    <icon-majest-smartphone-apps-line v-if="name === 'phone'" />
    <icon-majest-scale-light-line v-if="name === 'scale'" />
    <icon-majest-book-open-line v-if="name === 'book'" />
    <icon-majest-textbox-line v-if="name === 'textbox'" />
    <icon-majest-cube-line v-if="name === 'cube'" />
    <icon-majest-device-mobile-line v-if="name === 'mobile'" />
    <icon-majest-speakerphone-line v-if="name === 'speakerphone'" />
    <icon-majest-chevron-double-left-line v-if="name === 'chevronsLeft'" />
    <icon-majest-chevron-double-right-line v-if="name === 'chevronsRight'" />
    <icon-majest-close-line v-if="name === 'close'" />
    <icon-majest-close-circle-line v-if="name === 'closeCircle'" />

    <!-- https://icones.js.org/collection/svg-spinners?icon=svg-spinners:dot-revolve   -->
    <icon-spinners-270-ring-with-bg v-if="name === 'loading'" />

    <!-- https://icones.netlify.app/collection/tabler   -->

    <icon-tabler-refresh v-if="name === 'refresh'" />
  </span>
</template>

<style scoped lang="scss">
svg {
  width: 1em;
  height: 1em;
}

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
