<script setup lang="ts">
import type { FormInstance, FormProps } from 'ant-design-vue'
import type { BaseForm } from '@/typings/components/base/baseForm'
import { BaseFormEnum } from '@/enum/baseFormEnum'
import { useCloned, useDebounceFn } from '@vueuse/core'
import { useDisabledDate, useDisabledTime } from '@/hooks/useForm'

interface BaseFormProps {
  value?: Record<string, any>
  options: BaseForm['options']
  formOptions?: FormProps
  submitText?: string
}

const baseFormOptions = {
  labelCol: { style: { width: '75px', marginRight: '10px' } },
  layout: 'vertical'
}

const props = withDefaults(defineProps<BaseFormProps>(), {
  value: () => ({}),
  submitText: '提交'
})

const emits = defineEmits<{
  (event: 'update:value', data: any): void
  (event: 'submit', data: any): void
  (event: 'reset'): void
}>()

const formData = ref(props.value)

if (props.formOptions) {
  Object.assign(baseFormOptions, useCloned(props.formOptions).cloned.value)
}

watch(
  formData,
  (value) => {
    emits('update:value', value)
  },
  { deep: true }
)

const formRef = ref<FormInstance>()
//提交
const onSubmit = useDebounceFn(async () => {
  try {
    const values = await formRef.value?.validateFields()
    emits('submit', values)
  } catch (e) {}
})
//重置表单
const resetForm = () => {
  formRef.value?.resetFields()
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
      <a-form-item
        v-bind="item.bind"
        :name="item.field"
        :style="{ width: item.bind.width + 'px' }"
      >
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

        <a-select
          v-model:value="formData[item.field]"
          allowClear
          v-bind="item.componentProps.bind"
          v-if="item.component === BaseFormEnum.SELECT"
        >
          <a-select-option
            v-for="select in item.componentProps.options"
            :key="select.value"
            :value="select.value"
            :disabled="select.disabled"
          >
            {{ select.label }}
          </a-select-option>
        </a-select>

        <a-range-picker
          v-if="item.component === BaseFormEnum.DATE"
          v-model:value="formData[item.field]"
          :disabled-date="useDisabledDate('now')"
          :disabled-time="useDisabledTime('before')"
          v-bind="item.componentProps.bind"
        />
      </a-form-item>
    </template>

    <a-form-item>
      <div class="w_100 flex main_center">
        <a-button type="primary" @click="onSubmit">{{ submitText }}</a-button>
        <a-button class="ml_16" @click="resetForm">重置</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
