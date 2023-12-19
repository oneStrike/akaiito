<script setup lang="ts">
export interface AsIconsProps {
  name: string
  size?: number
  color?:
    | '!text-primary'
    | '!text-error'
    | '!text-info'
    | '!text-success'
    | '!text-warning'
    | string
  rotate?: boolean
}

const props = withDefaults(defineProps<AsIconsProps>(), {
  color: '',
  size: 18,
  rotate: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const iconColor = ref('')
const iconClass = ref('text-primary')

watch(
  () => props.color,
  (val) => {
    if (val.includes('#')) {
      iconColor.value = val
    } else if (val) {
      val = val === 'text-primary!' ? 'text-theme!' : val
      iconClass.value = val
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-icon
    :color="iconColor"
    :size="size"
    :class="[rotate ? 'rotate_animation' : '', 'cursor-pointer', iconClass]"
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
