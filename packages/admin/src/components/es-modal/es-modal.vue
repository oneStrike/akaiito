<script setup lang="ts">
import type { EsModalProps } from '@/components/es-modal/types'

const props = withDefaults(defineProps<EsModalProps>(), {
  modelValue: false,
  title: '',
  height: 500,
  loading: false,
})
const emits = defineEmits<{
  (event: 'handler'): void
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'fullScreen', data: boolean): void
}>()
const modelValue = defineModel({ type: Boolean, default: false })

const fullscreen = ref(false)

const { start: timeoutStart } = useTimeoutFn(() => {
  fullscreen.value = false
}, 500)

function close(event: 'close' | 'closed') {
  modelValue.value = false
  // @ts-expect-error ignore
  emits(event)
  timeoutStart()
}

function toggleFullScreenStatus() {
  fullscreen.value = !fullscreen.value
  emits('fullScreen', fullscreen.value)
}
</script>

<template>
  <el-dialog
    v-model="modelValue"
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
      <div class="flex justify-between border-bottom pb-4">
        <h4 :id="titleId" :class="titleClass">
          {{ title }}
        </h4>
        <div class="cursor-pointer">
          <es-icon
            :name="fullscreen ? 'minimize' : 'maximize'"
            hover
            color="info"
            class="mr-4"
            @click="toggleFullScreenStatus"
          />
          <es-icon name="multiply" color="info" hover @click="close" />
        </div>
      </div>
    </template>

    <el-scrollbar :height="fullscreen ? '85vh' : `${height}px`">
      <slot />
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer border-top pt-4">
        <el-button :loading="loading" @click="((modelValue = false), close('close'))"> 关闭</el-button>
        <el-button type="primary" :loading="loading" @click="emits('handler')"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
