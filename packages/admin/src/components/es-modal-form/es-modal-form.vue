<script setup lang="ts">
import type { EsFormOptions, EsFormProps } from '@/components/es-form/es-form.vue'
import type { IterateObject } from '@auy/types'
import { utils } from '@/utils'

export interface FormModalProps {
  modelValue?: IterateObject
  defaultValue?: IterateObject | null
  options: EsFormOptions[]
  title?: string
  loading?: boolean
  formProps?: EsFormProps['formProps']
  width?: string | number
}

const props = withDefaults(defineProps<FormModalProps>(), {
  formProps: () => ({}),
  width: 880,
})
const emits = defineEmits<{
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'submit', data: IterateObject): void
  (event: 'change', data: IterateObject): void
  (event: 'update:loading', data: boolean): void
  (event: 'update:modelValue', data: IterateObject): void
}>()

const btnLoading = ref(false)
const esFormRef = ref()

const formValue = computed({
  get() {
    return props.modelValue || utils._.cloneDeep(props.defaultValue || {})
  },
  set(val) {
    emits('update:modelValue', val)
    emits('change', val)
  },
})

onMounted(() => {
  window.addEventListener('unhandledrejection', () => {
    btnLoading.value = false
    emits('update:loading', false)
  })
})

const showForm = defineModel('modal', {
  type: Boolean,
  default: false,
})
watch(
  () => props.loading,
  (val) => {
    btnLoading.value = !!val
  },
  { immediate: true },
)

watch(showForm, (value) => {
  if (!value) {
    formValue.value = {}
    esFormRef.value.resetForm()
    btnLoading.value = false
    emits('update:loading', false)
  }
})

const formProps = computed(() => Object.assign(props.formProps, { labelPosition: 'top' }))

function handler() {
  esFormRef.value?.submitForm()
}

function formSubmit(val: IterateObject) {
  btnLoading.value = true
  emits('submit', val)
  emits('update:loading', true)
}
</script>

<template>
  <es-modal
    v-model="showForm"
    :loading="btnLoading"
    :width="width"
    :title="title"
    destroy-on-close
    @handler="handler"
    @close="emits('close')"
    @closed="emits('closed')"
  >
    <es-form
      ref="esFormRef"
      v-model="formValue"
      :options="options"
      :show-btn="false"
      :form-props="formProps"
      @submit="formSubmit"
    />
  </es-modal>
</template>

<style scoped></style>
