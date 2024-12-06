<script setup lang="ts">
import type { EsFormOptions, EsFormProps } from '@/components/es-form/types'

export interface FormModalProps {
  defaultValue?: IterateObject | null
  options: EsFormOptions[]
  title?: string
  loading?: boolean
  formProps?: EsFormProps['formProps']
  width?: string | number
}

const props = withDefaults(defineProps<FormModalProps>(), {
  formProps: () => ({}),
  width: 980,
})

const emits = defineEmits<{
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'submit', data: any): void
}>()

const formData = defineModel({
  type: Object,
  default: () => ({}),
})

const showForm = defineModel('show', {
  type: Boolean,
  default: false,
})

const formLoading = defineModel('loading', {
  type: Boolean,
  default: false,
})

watch(
  () => props.defaultValue,
  (value) => {
    formData.value = JSON.parse(JSON.stringify(value || {}))

  },
  { deep: true },
)

const esFormRef = ref()

onMounted(() => {
  window.addEventListener('unhandledrejection', () => {
    formLoading.value = false
  })
})

watch(showForm, (value) => {
  if (!value) {
    formData.value = {}
    esFormRef.value.resetForm()
    formLoading.value = false
  }
})

const formProps = computed(() => Object.assign(props.formProps, { labelPosition: 'top' }))

function handler() {
  esFormRef.value?.submitForm()
}

function formSubmit(val: IterateObject) {
  formLoading.value = true
  emits('submit', val)
}
</script>

<template>
  <es-modal
    v-model="showForm"
    :width="width"
    :title="title"
    destroy-on-close
    class="p-2"
    @handler="handler"
    @close="emits('close')"
    @closed="emits('closed')"
  >
    <es-form
      ref="esFormRef"
      v-model="formData"
      v-loading="formLoading"
      :options="options"
      :show-btn="false"
      :form-props="formProps"
      @submit="formSubmit"
    />
  </es-modal>
</template>

<style scoped></style>
