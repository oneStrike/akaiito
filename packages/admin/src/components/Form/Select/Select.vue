<script setup lang="ts">
import type { selectOptions } from '@/typings/components/basicForm'

interface SelectProps {
  modelValue: any[] | string | number | boolean
  clearable?: boolean
  multiple?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  placeholder?: string
  filterable?: boolean
  numberValue?: boolean
  conversion?: boolean
  options: selectOptions[]
  bind?: Record<string, any>
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  clearable: true,
  numberValue: true,
  conversion: false,
  collapseTags: true,
  collapseTagsTooltip: true,
  placeholder: '请选择筛选条件'
})
const emits = defineEmits<{
  (event: 'update:modelValue', data: SelectProps['modelValue']): void
}>()

const selectData = computed({
  get() {
    return props.conversion
      ? conversionModelValue(props.modelValue, 'array')
      : props.modelValue
  },
  set(val) {
    const emitsData = props.conversion
      ? conversionModelValue(val, 'string')
      : val
    emits('update:modelValue', emitsData)
  }
})

const conversionModelValue = (
  val: SelectProps['modelValue'],
  type: 'string' | 'array'
): SelectProps['modelValue'] => {
  if (val === '') return val
  if (type === 'string' && Array.isArray(val)) {
    return val.join(',')
  }
  if (type === 'array' && typeof val === 'string') {
    const valArray = val.split(',')
    return props.numberValue ? valArray.map((item) => Number(item)) : valArray
  }
  return val
}
</script>

<template>
  <el-select
    class="w_100"
    v-model="selectData"
    :clearable="clearable"
    v-bind="bind"
    :multiple="multiple"
    :placeholder="placeholder"
    :collapse-tags="collapseTags"
    :collapse-tags-tooltip="collapseTagsTooltip"
  >
    <el-option
      v-for="child in options"
      :key="child.value"
      :label="child.label"
      :value="child.value"
    />
  </el-select>
</template>
