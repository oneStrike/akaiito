<script setup lang="ts">
import type {
  BasicFormOptions,
  BasicFormProps
} from '@/components/basic/BasicForm.vue'
import type { IterateObject } from '@typings/index'

export interface FormModalProps {
  modelValue?: IterateObject
  modal?: boolean
  options: BasicFormOptions[]
  title?: string
  loading?: boolean
  formProps?: BasicFormProps['formProps']
  width?: string | number
}
const basicFormRef = ref()
const props = withDefaults(defineProps<FormModalProps>(), {
  formProps: () => ({}),
  width: 700
})

const emits = defineEmits<{
  (event: 'submit', data: IterateObject): void
  (event: 'update:modelValue', data: IterateObject): void
  (event: 'update:modal', data: IterateObject): void
}>()

const show = useVModel(props, 'modal', emits)

const formValue = useVModel(props, 'modelValue', emits)

const formProps = computed(() =>
  Object.assign(props.formProps, { labelPosition: 'top' })
)

const handler = () => {
  basicFormRef.value?.submitForm()
}

const formSubmit = (val) => {
  emits('submit', val)
}
</script>

<template>
  <basic-modal
    v-model="show"
    :loading="loading"
    :width="width"
    :title="title"
    @handler="handler"
  >
    <basic-form
      ref="basicFormRef"
      :options="options"
      :show-btn="false"
      :form-props="formProps"
      v-model="formValue"
      @submit="formSubmit"
    />
  </basic-modal>
</template>

<style scoped></style>
