<script setup lang="ts">
import type { FormInst, FormProps } from 'naive-ui'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'

interface BasicFormProps {
  modelValue?: Record<string | symbol, any>
  inline?: boolean
  labelWidth?: FormProps['labelWidth']
  labelPlacement?: FormProps['labelPlacement']
  showLabel?: FormProps['showLabel']
  size?: FormProps['size']
  options: BasicFormOptions[]
  loading?: boolean
}

const formRef = ref<FormInst>()

const props = withDefaults(defineProps<BasicFormProps>(), {
  modelValue: () => ({}),
  labelWidth: 'auto',
  loading: false
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'submit', data: any): void
}>()

const initFormData = useCloned(props.modelValue).cloned
const formData = computed(() => useCloned(props.modelValue).cloned.value)
const throttledFn = useThrottleFn((val) => emits('update:modelValue', val), 100)
watch(formData, (val) => throttledFn(val), { deep: true, immediate: true })

//提交表单
const submit = useDebounceFn(() => {
  formRef.value?.validate((errors) => {
    if (errors) return
    emits('submit', formData.value)
  })
})

//重置表单
const reset = () => {
  formRef.value?.restoreValidation()
  Object.keys(unref(formData)).forEach((item) => {
    formData.value[item] = initFormData.value[item] || null
  })
}
</script>

<template>
  <n-form ref="formRef" :model="formData" class="pd_4">
    <n-form-item v-for="item in options" v-bind="item.bind">
      <n-input
        v-if="item.component === 'Input'"
        v-bind="item.componentProps.bind"
        v-model:value="formData[item.bind.path]"
      ></n-input>

      <n-input-number
        v-if="item.component === 'InputNumber'"
        v-bind="item.componentProps.bind"
        v-model:value="formData[item.bind.path]"
      ></n-input-number>

      <n-radio-group
        v-if="item.component === 'Radio'"
        v-bind="item.componentProps.bind"
        v-model:value="formData[item.bind.path]"
      >
        <n-radio
          v-for="radio in item.componentProps.options"
          :key="radio.value"
          :value="radio.value"
          :disabled="radio.disabled"
        >
          {{ radio.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>

    <n-form-item>
      <n-space justify="space-around" class="w_100">
        <n-button type="primary" :loading="loading" @click="submit"
          >提交</n-button
        >
        <n-button @click="reset">重置</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
