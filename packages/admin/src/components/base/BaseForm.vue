<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import type { BaseFormOptions } from '@/typings/components/base/baseForm'
type formProps = FormInstance['$props']
interface BaseFromProps {
  modelValue: Record<string | symbol, any>
  layout?: formProps['layout']
  size?: formProps['size']
  labelAlign?: formProps['labelAlign']
  autoLabelWidth?: formProps['autoLabelWidth']
  loading?: boolean
  options: BaseFormOptions[]
}

const props = withDefaults(defineProps<BaseFromProps>(), {
  loading: false,
  layout: 'horizontal',
  size: 'medium',
  labelAlign: 'right',
  autoLabelWidth: true
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: BaseFromProps['modelValue']): void
  (event: 'submit', data: BaseFromProps['modelValue']): void
  (event: 'resetForm'): void
}>()

const formRef = ref<FormInstance>()
const formData = ref<BaseFromProps['modelValue']>(props.modelValue || {})

watchThrottled(
  formData,
  (value) => {
    emits('update:modelValue', value)
  },
  {
    throttle: 100,
    deep: true,
    immediate: true
  }
)

//提交表单
const submit = useDebounceFn(async () => {
  if (props.loading) return
  const validateRes = await formRef.value?.validate()
  !validateRes && emits('submit', formData.value)
}, 200)

//重置表单
const resetForm = () => {
  formRef.value?.resetFields()
  emits('resetForm')
}
</script>

<template>
  <a-form ref="formRef" :size="size" :model="formData" v-bind="props">
    <a-form-item
      v-for="item in options"
      :key="item.bind.field"
      v-bind="item.bind"
    >
      <a-input
        v-if="item.component === 'Input'"
        v-model="formData[item.bind.field]"
        v-bind="item.componentProps.bind"
      ></a-input>

      <a-radio-group
        v-if="item.component === 'Radio'"
        v-model="formData[item.bind.field]"
        v-bind="item.componentProps.bind"
      >
        <a-radio
          v-for="radio in item.componentProps.options"
          :key="radio.value"
          :value="radio.value"
        >
          {{ radio.label }}
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item class="w_100">
      <a-space size="large" fill>
        <a-button type="primary" :loading="loading" @click="submit"
          >提交</a-button
        >
        <a-button @click="resetForm">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
