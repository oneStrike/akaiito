<script setup lang="ts">
import type { EsFormOptions, EsFormProps } from '@/components/es-form/es-form.vue'
import { utils } from '@/utils'

export interface FormModalProps {
  defaultValue: IterateObject
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
    if (value && Object.keys(value).length) {
      formData.value = utils._.cloneDeep(value)
    }
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
    :loading="formLoading"
    :width="width"
    :title="title"
    destroy-on-close
    @handler="handler"
    @close="emits('close')"
    @closed="emits('closed')"
  >
    <es-form
      ref="esFormRef"
      v-model="formData"
      :options="options"
      :show-btn="false"
      :form-props="formProps"
      @submit="formSubmit"
    />
  </es-modal>
</template>

<style scoped></style>
