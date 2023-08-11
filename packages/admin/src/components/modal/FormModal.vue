<script setup lang="ts">
import type {
  BasicFormInst,
  BasicFormOptions
} from '@/typings/components/basic/basicForm'

interface FormModalProps {
  show: boolean
  loading?: boolean
  width?: number
  height?: number
  title?: string
  modelValue?: Record<string | symbol, any> | null
  options: (() => BasicFormOptions[]) | BasicFormOptions[]
}

const props = withDefaults(defineProps<FormModalProps>(), {
  show: false,
  loading: false,
  width: 980,
  height: 80
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
  const validateRes = await basicFormRef.value?.validate()
  if (!validateRes || validateRes.errors) return
  emits('confirm', validateRes.values)
}

const closeModal = () => {
  show.value = false
}

let formOptions: BasicFormOptions[] = []
watch(show, (value) => {
  if (!value) emits('close')
  formOptions = Array.isArray(props.options) ? props.options : props.options()
})
</script>

<template>
  <shared-modal
    v-model:show="show"
    :title="title"
    :loading="loading"
    :width="width"
    :height="height"
    :trap-focus="false"
    @close="closeModal"
    @confirm="confirm"
  >
    <basic-form
      v-if="show"
      ref="basicFormRef"
      :options="formOptions"
      v-model="formData"
      :show-btn="false"
      @submit="confirm"
    />
  </shared-modal>
</template>
