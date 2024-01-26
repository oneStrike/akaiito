<script setup lang="ts">
import type { IterateObject } from '@typings/index'
import type { FormInstance, FormItemProps, FormProps } from 'element-plus'
import BasicUpload from '@/components/basic/BasicUpload.vue'

export type BasicFormComponent =
  | 'Input'
  | 'InputNumber'
  | 'Textarea'
  | 'RichText'
  | 'Radio'
  | 'Checkbox'
  | 'Select'
  | 'Date'
  | 'DateTime'
  | 'Upload'

export interface BasicFormOptions {
  field: string
  props?: Partial<FormItemProps & { class?: string }>
  component: BasicFormComponent
  componentProps?: IterateObject
  on?: IterateObject
}
export interface BasicFormProps {
  modelValue: IterateObject
  options: BasicFormOptions[]
  formProps?: Partial<Omit<FormProps, 'model'>>
  showBtn?: boolean
  submitText?: string
  resetText?: string
}

const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<BasicFormProps>(), {
  modelValue: () => ({}),
  formProps: () => ({}),
  showBtn: true,
  submitText: '提交',
  resetText: '重置'
})
const emits = defineEmits<{
  (event: 'reset'): void
  (event: 'submit', data: IterateObject): void
  (event: 'update:modelValue', data: IterateObject): void
}>()

const formData = ref<IterateObject>({})

watch(
  () => props.modelValue,
  (val) => {
    formData.value = val
  },
  { immediate: true, deep: true }
)

watch(
  formData,
  (val) => {
    emits('update:modelValue', val)
  },
  { deep: true }
)

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (!valid) return false
    emits('submit', toRaw(formData.value))
  })
}
const resetForm = () => {
  formRef.value?.resetFields()
  emits('reset')
}

defineExpose({
  submitForm,
  resetForm
})
</script>

<template>
  <el-form :model="formData" v-bind="formProps" ref="formRef">
    <el-form-item
      v-for="item in options"
      :key="item.field"
      :prop="item.field"
      v-bind="item.props"
    >
      <basic-upload
        v-if="item.component === 'Upload'"
        v-model="formData[item.field]"
        v-bind="item.componentProps"
        v-on="item.on || {}"
      />

      <el-input
        v-if="item.component === 'Input'"
        v-model="formData[item.field]"
        v-bind="item.componentProps"
        @keydown.enter="submitForm"
        v-on="item.on || {}"
      />

      <el-input
        v-if="item.component === 'Textarea'"
        v-model="formData[item.field]"
        v-bind="item.componentProps"
        type="textarea"
        :rows="3"
        @keydown.enter="submitForm"
        v-on="item.on || {}"
      />

      <el-radio-group
        v-model="formData[item.field]"
        v-bind="item.componentProps"
        v-on="item.on || {}"
      >
        <el-radio
          :label="child.value"
          v-for="child in item.componentProps.options"
          :key="child.value"
          >{{ child.label }}</el-radio
        >
      </el-radio-group>

      <el-select
        v-if="item.component === 'Select'"
        v-model="formData[item.field]"
        :clearable="
          typeof item.componentProps?.clearable === 'boolean'
            ? item.componentProps?.clearable
            : true
        "
        v-bind="item.componentProps"
        v-on="item.on || {}"
      >
        <el-option
          v-for="sub in item.componentProps?.options"
          :key="sub.value"
          :label="sub.label"
          :value="sub.value"
        />
      </el-select>

      <el-date-picker
        v-if="item.component === 'DateTime'"
        v-model="formData[item.field]"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        v-on="item.on || {}"
        v-bind="item.componentProps"
      />
    </el-form-item>
    <el-form-item v-if="showBtn">
      <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
      <el-button @click="resetForm">{{ resetText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
