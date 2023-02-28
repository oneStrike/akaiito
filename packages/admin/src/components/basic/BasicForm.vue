<script setup lang="ts">
import type { FormInst, FormProps } from 'naive-ui'
import type {
  BasicFormInst,
  BasicFormOptions
} from '@/typings/components/basic/basicForm'
import config from '@/config'

interface BasicFormProps {
  modelValue?: Record<string | symbol, any>
  inline?: boolean
  labelWidth?: FormProps['labelWidth']
  labelPlacement?: FormProps['labelPlacement']
  showLabel?: FormProps['showLabel']
  size?: FormProps['size']
  options: BasicFormOptions[]
  loading?: boolean
  showFeedback?: boolean
  showBtn?: boolean
}

const formRef = ref<FormInst>()

const props = withDefaults(defineProps<BasicFormProps>(), {
  modelValue: () => ({}),
  labelWidth: 'auto',
  loading: false,
  showFeedback: true,
  showBtn: true
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'submit', data: any): void
}>()

const initFormData = useCloned(props.modelValue).cloned
const formData = ref(useCloned(props.modelValue).cloned.value)
//为了处理输入框input时间频繁触发emit而存在
const dummyInputValue = ref<Record<string, any>>({})
watch(
  () => props.modelValue,
  (val) => {
    dummyInputValue.value = useCloned(val).cloned.value
    formData.value = useCloned(val).cloned.value
  },
  { deep: true, immediate: true }
)

const throttledFn = useThrottleFn((val) => emits('update:modelValue', val), 100)
watch(
  formData,
  (val) => () => {
    console.log('🚀 ~ file:BasicForm method: line:54 -----', val)
    throttledFn(val)
  },
  { deep: true, immediate: true }
)

//提交表单
const submit = useDebounceFn(() => {
  formRef.value?.validate((errors) => {
    if (errors) return
    emits('submit', formData.value)
  })
}, config.DEBOUNCE)

//重置表单
const reset = () => {
  formRef.value?.restoreValidation()
  Object.keys(unref(formData)).forEach((item) => {
    formData.value[item] = initFormData.value[item] || null
    dummyInputValue.value[item] = initFormData.value[item] || null
  })
}

//抛出的校验方法
const exposeValidate: BasicFormInst['validate'] = () => {
  return new Promise((resolve) => {
    console.log('🚀 ~ file:BasicForm method: line:80 -----', formData.value)
    formRef.value?.validate((errors) => {
      resolve({
        errors: errors || null,
        values: formData.value
      })
    })
  })
}

defineExpose({
  reset,
  validate: exposeValidate
} as BasicFormInst)
</script>

<template>
  <n-form
    :size="size"
    class="pd_4"
    ref="formRef"
    :inline="inline"
    :model="formData"
    :show-feedback="showFeedback"
    :label-placement="labelPlacement"
  >
    <n-form-item
      :style="{ width: item.bind.width + 'px' }"
      v-for="item in options"
      v-bind="item.bind"
    >
      <n-input
        v-if="item.component === 'Input'"
        v-bind="item.componentProps.bind"
        v-model:value="dummyInputValue[item.bind.path]"
        @change="(val) => (formData[item.bind.path] = val)"
      ></n-input>

      <n-input-number
        v-if="item.component === 'InputNumber'"
        v-bind="item.componentProps.bind"
        v-model:value="formData[item.bind.path]"
      ></n-input-number>

      <n-radio-group
        v-if="item.component === 'Radio'"
        v-model:value="formData[item.bind.path]"
        v-bind="item.componentProps.bind"
      >
        <n-radio
          v-for="radio in item.componentProps.options"
          :key="radio.value"
          :value="radio.value.toString()"
          :disabled="radio.disabled"
        >
          {{ radio.label }}
        </n-radio>
      </n-radio-group>

      <n-select
        v-if="item.component === 'Select'"
        v-model:value="formData[item.bind.path]"
        :options="item.componentProps.options"
        v-bind="item.componentProps.bind"
      />

      <n-date-picker
        v-if="item.component === 'Date'"
        v-model:value="formData[item.bind.path]"
        v-bind="item.componentProps.bind"
      />

      <basic-upload
        v-if="item.component === 'Upload'"
        v-model:fileList="formData[item.bind.path]"
        v-bind="item.componentProps.bind"
      ></basic-upload>
    </n-form-item>
    <n-form-item v-if="showBtn">
      <n-space justify="space-around" :wrap="false" class="w_100">
        <n-button type="primary" :loading="loading" @click="submit">
          提交
        </n-button>
        <n-button @click="reset">重置</n-button>
        <slot name="button"></slot>
      </n-space>
    </n-form-item>
  </n-form>
</template>
