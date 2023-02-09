<script setup lang="ts">
import type { selectOptions } from '@/typings/components/basicForm'

interface CheckboxProps {
  modelValue: string[] | number[] | string
  options: selectOptions[]
  numberValue?: boolean
  conversion?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: () => [],
  numberValue: true,
  conversion: true
})
const emits = defineEmits<{
  (event: 'update:modelValue', data: CheckboxProps['modelValue']): void
}>()

const checkboxData = computed({
  get() {
    return props.conversion
      ? conversionModelValue(props.modelValue, 'array')
      : props.modelValue
  },
  set(value: CheckboxProps['modelValue']) {
    const emitsData = props.conversion
      ? conversionModelValue(value, 'string')
      : value
    emits('update:modelValue', emitsData)
  }
})

const conversionModelValue = (
  val: CheckboxProps['modelValue'],
  type: 'string' | 'array'
) => {
  if (!val) return []
  if (type === 'string' && Array.isArray(val)) {
    return val.join(',')
  }
  if (type === 'array' && typeof val === 'string') {
    const valArray = val.split(',')
    return props.numberValue ? valArray.map((item) => Number(item)) : valArray
  }
  return []
}
</script>

<template>
  <el-checkbox-group v-model="checkboxData">
    <el-checkbox v-for="op in options" :key="op.value" :label="op.value">{{
      op.label
    }}</el-checkbox>
  </el-checkbox-group>
</template>
