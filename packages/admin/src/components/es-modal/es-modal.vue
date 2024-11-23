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
  height: 680,
  loading: false,
})
const emits = defineEmits<{
  (event: 'handler'): void
  (event: 'update:modelValue'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'fullScreen', data: boolean): void
}>()
const fullscreen = ref(false)

const contentStyle = computed(() => {
  if (!props.height) {
    return ''
  }
  if (typeof props.height === 'string') {
    return `height:${props.height}`
  }
  return `height:${fullscreen.value ? '80vh' : props.height}px`
})

const modalShow = useVModel(props, 'modelValue', emits)

const { start: timeoutStart } = useTimeoutFn(() => {
  fullscreen.value = false
}, 500)

function close(event: 'close' | 'closed') {
  modalShow.value = false
  if (event === 'close') {
    emits('close')
  }
  if (event === 'closed') {
    emits('closed')
  }
  timeoutStart()
}

function toggleFullScreenStatus() {
  fullscreen.value = !fullscreen.value
  emits('fullScreen', fullscreen.value)
}
</script>

<template>
  <el-dialog
    v-model="modalShow"
    draggable
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
        <h4 :id="titleId" :class="titleClass">
          {{ title }}
        </h4>
        <div class="cursor-pointer">
          <es-icons
            :name="fullscreen ? 'minimize' : 'maximize'"
            hover
            color="!text-info"
            class="mr-4"
            @click="toggleFullScreenStatus"
          />
          <es-icons name="multiply" color="info" hover @click="close" />
        </div>
      </div>
    </template>
    <el-scrollbar :height="fullscreen ? '80vh' : `${height}px`">
      <slot />
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <el-button :loading="loading" @click="(modalShow = false), close('close')"> 关闭</el-button>
        <el-button type="primary" :loading="loading" @click="emits('handler')"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style></style>
