<script setup lang="ts">
import type { EsIconProps } from '@/components/es-icons/types'

const props = withDefaults(defineProps<EsIconProps>(), {
  color: '',
  size: 18,
  rotate: false,
  hover: true,
  unset: false,
  rotateType: 'always',
})

const emits = defineEmits<{
  (event: 'click'): void
}>()
const colorClass = ref('')
const rotateClass = ref(props.rotateType === 'always' && props.rotate ? 'rotate-animation' : '')

watch(
  () => props.color,
  (val) => {
    if (!props.unset && val) {
      if (val.includes('#')) {
        colorClass.value = `text-[${val}]`
      } else {
        colorClass.value = val === 'primary' ? 'text-theme!' : `text-${val}!`
      }
    }
  },
  { immediate: true },
)

const clickHandler = useDebounceFn(() => {
  if (props.rotateType === 'click' && props.rotate) {
    rotateClass.value = 'rotate-animation'
    useTimeoutFn(() => {
      rotateClass.value = ''
    }, 1000)
  }
  emits('click')
}, 200)
</script>

<template>
  <el-icon
    :size="size"
    class="cursor-pointer"
    :class="[unset ? '!text-unset' : '', hover ? 'hover:(!text-theme)' : '', rotateClass, colorClass]"
    @click="clickHandler"
  >
    <!--   https://icones.netlify.app/collection/line-md -->
    <icon-md-chevron-double-left v-if="name === 'chevronDoubleLeft'" />
    <icon-md-chevron-double-left v-if="name === 'chevronDoubleRight'" class="rotate-180" />
    <icon-md-sun-rising-loop v-if="name === 'sunLoop'" />
    <icon-md-moon-loop v-if="name === 'moonLoop'" />
    <icon-md-downloading-loop v-if="name === 'downloading'" />
    <icon-md-uploading-loop v-if="name === 'uploading'" />

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
    <icon-majest-close-line v-if="name === 'close'" />

    <icon-tabler-user-edit v-if="name === 'userEdit'" />
  </el-icon>
</template>

<style scoped lang="scss">
.rotate-animation {
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
