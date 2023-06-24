<script setup lang="ts">
interface SharedModalProps {
  show: boolean
  loading?: boolean
  width?: number
  height?: number
  title?: string
  cancelBtn?: boolean
	trapFocus?: boolean
  confirmBtn?: boolean
  confirmText?: string
  cancelText?: string
  maskClosable?: boolean
}

const props = withDefaults(defineProps<SharedModalProps>(), {
  width: 980,
  height: 80,
  loading: false,
  cancelBtn: true,
  trapFocus: true,
  confirmBtn: true,
  confirmText: '确认',
  cancelText: '取消',
  maskClosable: true
})

const emits = defineEmits<{
  (event: 'update:show'): void
  (event: 'close'): void
  (event: 'confirm'): void
  (event: 'after-enter'): void
  (event: 'after-leave'): void
}>()

const show = useVModel(props, 'show', emits)
</script>

<template>
  <n-modal
    v-model:show="show"
    preset="card"
    size="medium"
    :title="title"
    display-directive="if"
    :mask-closable="maskClosable"
    :trap-focus="trapFocus"
    :segmented="{ content: 'soft', footer: 'soft' }"
    :style="{ width: `${width}px`, height: `${height}vh` }"
    content-style="overflow:auto"
    @after-enter="emits('after-enter')"
    @after-leave="emits('after-leave')"
  >
    <div class="flex1 over_scroll_y">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer">
        <n-space justify="end" :size="32">
          <n-button
            @click="emits('close')"
            :disabled="loading"
            v-if="cancelBtn"
            >{{ cancelText }}</n-button
          >
          <n-button
            v-if="confirmBtn"
            type="primary"
            @click="emits('confirm')"
            :loading="loading"
            :disabled="loading"
            >{{ confirmText }}</n-button
          >
        </n-space>
      </slot>
    </template>
  </n-modal>
</template>
