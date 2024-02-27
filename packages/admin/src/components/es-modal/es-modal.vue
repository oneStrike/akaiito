<script setup lang="ts">
export interface EsModalProps {
  modelValue: boolean
  title?: string
  width?: number | string
  height?: number | string
  maxHeight?: number
  loading?: boolean
  destroyOnClose?: boolean
}
const props = withDefaults(defineProps<EsModalProps>(), {
  modelValue: false,
  title: '',
  loading: false
})
const emits = defineEmits<{
  (event: 'handler'): void
  (event: 'update:modelValue'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'fullScreen', data: boolean): void
}>()

const contentStyle = computed(() => {
  if (!props.height) return ''
  if (typeof props.height === 'string') return `height:${props.height}`
  return `height:${fullscreen.value ? '80vh' : props.height}px`
})

const modalShow = useVModel(props, 'modelValue', emits)

const fullscreen = ref(false)
const { start: timeoutStart } = useTimeoutFn(() => {
  fullscreen.value = false
}, 500)
const close = (event: 'close' | 'closed') => {
  modalShow.value = false
  if (event === 'close') emits('close')
  if (event === 'closed') emits('closed')
  timeoutStart()
}

const toggleFullScreenStatus = () => {
  fullscreen.value = !fullscreen.value
  emits('fullScreen', fullscreen.value)
}
</script>

<template>
  <el-dialog
    draggable
    v-model="modalShow"
    :fullscreen="fullscreen"
    :show-close="false"
    :width="width"
    align-center
    :destroy-on-close="destroyOnClose"
    @close="close('close')"
    @closed="close('closed')"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="flex justify-between">
        <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
        <div class="cursor-pointer">
          <es-icons
            :name="fullscreen ? 'minimize' : 'maximize'"
            hover
            color="!text-info"
            class="mr-4"
            @click="toggleFullScreenStatus"
          />
          <es-icons name="multiply" color="!text-info" hover @click="close" />
        </div>
      </div>
    </template>
    <div
      class="overflow-auto"
      :class="fullscreen ? ['max-h-[80vh]', 'h-[80vh]'] : 'max-h-[70vh]'"
    >
      <div :style="contentStyle" class="h-full">
        <slot></slot>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          @click="(modalShow = false), close('close')"
          :loading="loading"
          >关闭</el-button
        >
        <el-button type="primary" @click="emits('handler')" :loading="loading">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style></style>
