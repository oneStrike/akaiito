<script setup lang="ts">
export interface AsIconsProps {
  name: string
  size?: number
  color?:
    | 'text-primary'
    | 'text-error'
    | 'text-info'
    | 'text-success'
    | 'text-warning'
    | string
  rotate?: boolean
  hover?: boolean
  unset?: boolean
}

const props = withDefaults(defineProps<AsIconsProps>(), {
  color: '',
  size: 18,
  rotate: false,
  hover: false,
  unset: false
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
        iconClass.value = 'text-[' + val + ']'
      } else {
        iconClass.value = val === '!text-primary' ? '!text-theme' : val
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-icon
    :size="size"
    :class="[
      unset ? '!text-unset' : '',
      rotate ? 'rotate_animation' : '',
      hover ? 'hover:(!text-theme)' : '',
      'cursor-pointer',
      iconClass
    ]"
    @click="emits('click')"
  >
    <!--   https://icones.netlify.app/collection/line-md -->
    <icon-md-chevron-double-left v-if="name === 'chevronDoubleLeft'" />
    <icon-md-chevron-double-left
      v-if="name === 'chevronDoubleRight'"
      class="rotate-180"
    />
    <icon-md-sun-rising-loop v-if="name === 'sunLoop'" />
    <icon-md-moon-loop v-if="name === 'moonLoop'" />
    <icon-md-downloading-loop v-if="name === 'downloading'" />
    <icon-md-uploading-loop v-if="name === 'uploading'" />

    <!--https://icones.netlify.app/collection/majesticons    -->

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
  </el-icon>
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
