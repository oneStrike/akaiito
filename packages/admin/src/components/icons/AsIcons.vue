<script setup lang="ts">
export interface AsIconsProps {
  name: string
  size?: number
  color?: 'primary' | 'error' | 'info' | string
  rotate?: boolean
}

const props = withDefaults(defineProps<AsIconsProps>(), {
  color: '#303133',
  size: 22,
  rotate: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const iconColor = ref('')
watch(
  () => props.color,
  (val) => {
    iconColor.value = val
  },
  { immediate: true }
)

const handlerEvent = useDebounceFn(() => {
  emits('click')
}, 200)
</script>

<template>
  <el-icon
    :size="size"
    :class="[rotate ? 'rotate_animation' : '', 'cursor-pointer']"
    @click="handlerEvent"
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
