<script setup lang="ts">
import type { FormInstance, FormProps } from 'ant-design-vue'
import type { BaseForm } from '@/typings/components/base/baseForm'
import { BaseFormEnum } from '@/enum/baseFormEnum'
import { useCloned, useDebounceFn } from '@vueuse/core'

interface BaseFormProps {
  modelValue?: Record<string, any>
  options: BaseForm['options']
  formOptions?: FormProps
}

const baseFormOptions = {
  labelCol: { style: { width: '80px', marginRight: '8px' } },
  wrapperCol: { span: 24 }
}

const props = withDefaults(defineProps<BaseFormProps>(), {})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'submit', data: any): void
  (event: 'reset'): void
}>()

const formData = computed({
  get() {
    return props.modelValue || {}
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

if (props.formOptions) {
  Object.assign(baseFormOptions, useCloned(props.formOptions))
}

const formRef = ref<FormInstance>()
//提交
const onSubmit = useDebounceFn(() => {
  formRef.value
    ?.validate(Object.keys(formData.value))
    .then((res) => {
      emits('submit', res)
    })
    .catch(() => {})
})
//重置表单
const resetForm = () => {
  formRef.value?.resetFields(Object.keys(formData.value))
  emits('reset')
}
</script>

<template>
  <a-form
    v-bind="baseFormOptions"
    ref="formRef"
    :model="formData"
    @keyup.enter="onSubmit"
  >
    <template v-for="item in options" :key="item.field">
      <a-form-item v-bind="item.bind" :name="item.field">
        <a-input
          v-if="item.component === BaseFormEnum.INPUT"
          v-model:value="formData[item.field]"
          v-bind="item.componentProps.bind"
        ></a-input>

        <a-radio-group
          v-if="item.component === BaseFormEnum.RADIO"
          v-model:value="formData[item.field]"
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
    </template>

    <a-form-item>
      <div class="w_100 flex main_center">
        <a-button type="primary" @click="onSubmit">提交</a-button>
        <a-button class="ml_16" @click="resetForm">重置</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
