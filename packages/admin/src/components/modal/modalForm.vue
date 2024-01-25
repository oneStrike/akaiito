<script setup lang="ts">
import type {
  BasicFormOptions,
  BasicFormProps
} from '@/components/basic/BasicForm.vue'
import type { IterateObject } from '@typings/index'
import { utils } from '@/utils'

export interface FormModalProps {
  modelValue?: IterateObject
  defaultValue?: IterateObject
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
  (event: 'close'): void
  (event: 'closed'): void
  (event: 'submit', data: IterateObject): void
  (event: 'update:modelValue', data: IterateObject): void
  (event: 'update:modal', data: IterateObject): void
}>()

const show = useVModel(props, 'modal', emits)

watch(show, (val) => {
  if (!val) {
    formValue.value = {}
  }
})

const formValue = computed({
  get() {
    return props.modelValue || utils._.cloneDeep(props.defaultValue || {})
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const formProps = computed(() =>
  Object.assign(props.formProps, { labelPosition: 'top' })
)

const handler = () => {
  basicFormRef.value?.submitForm()
}

const formSubmit = (val: IterateObject) => {
  emits('submit', val)
}
</script>

<template>
  <basic-modal
    v-model="show"
    :loading="loading"
    :width="width"
    :title="title"
    destroy-on-close
    @handler="handler"
    @close="emits('close')"
    @closed="emits('closed')"
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
