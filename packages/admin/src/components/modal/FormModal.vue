<script setup lang="ts">
import type {
  BasicFormInst,
  BasicFormOptions
} from '@/typings/components/basic/basicForm'

interface FormModalProps {
  show: boolean
  loading?: boolean
  title?: string
  modelValue?: Record<string | symbol, any>
  options: BasicFormOptions[]
}

const props = withDefaults(defineProps<FormModalProps>(), {
  show: false,
  loading: false
})

const emits = defineEmits<{
  (event: 'update:show'): void
  (event: 'update:loading'): void
  (event: 'update:modelValue'): void
  (event: 'close'): void
  (event: 'confirm', values: any): void
}>()

const show = useVModel(props, 'show', emits)
const loading = useVModel(props, 'loading', emits)
const formData = useVModel(props, 'modelValue', emits)

const basicFormRef = ref<BasicFormInst>()
const confirm = async () => {
  const { errors, values } = await basicFormRef.value?.validate()!
  if (errors) return
  emits('confirm', values)
}
</script>

<template>
  <shared-modal
    v-model:show="show"
    :title="title"
    :loading="loading"
    @close="show = false"
    @confirm="confirm"
  >
    <basic-form
      ref="basicFormRef"
      :options="options"
      v-model="formData"
      :show-btn="false"
    />
  </shared-modal>
</template>
