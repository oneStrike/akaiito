<script setup lang="ts">
/**
 * 应用场景：
 * select的多选和checkbox要求的数据格式是数组
 * 但是外部使用的字符串，所以需要进行转换
 * 外部传递字符串，组件emit的也是字符串
 * 但是组件内部使用的是数组格式
 * bind.transform决定是否使用此项功能
 * 为false时使用使用组件的原生功能，不进行转换
 */
import type {
  BasicFormComponent,
  BasicFormComponentPropsBind,
  SelectOptions
} from '@/typings/components/basic/basicForm'

export type ModelValueType = string | number | any[]

interface ShareSelectProps {
  modelValue?: ModelValueType
  component: BasicFormComponent
  bind: BasicFormComponentPropsBind
  options: SelectOptions[]
}

const props = withDefaults(defineProps<ShareSelectProps>(), {})

const emits = defineEmits<{
  (event: 'update:modelValue', data: ModelValueType): void
}>()

const valueType = props.bind.valueType
const transform = props.bind.transform
const transformTypeFn = !valueType || valueType === 'number' ? parseInt : String

const transformValue = () => {
  if (typeof props.modelValue === 'undefined' || props.modelValue === '')
    return []
  if (!transform || Array.isArray(props.modelValue)) return props.modelValue
  const modelValue = JSON.parse(JSON.stringify(props.modelValue))
  if (Array.isArray(modelValue)) return modelValue
  if (typeof modelValue === 'string') {
    return modelValue.split(',').map((item) => transformTypeFn(item))
  }
  return [modelValue]
}

const transformEmitValue = (val: ModelValueType) => {
  if (transform) {
    if (Array.isArray(val)) return val.join(',')
  }
  return val
}

const innerValue = computed({
  get() {
    return transformValue()
  },
  set(val) {
    emits('update:modelValue', transformEmitValue(val))
  }
})
</script>

<template>
  <n-select
    v-if="component === 'Select'"
    v-model:value="innerValue"
    v-bind="bind"
    :options="options"
  ></n-select>

  <n-checkbox-group
    v-if="component === 'Checkbox'"
    v-model:value="innerValue"
    v-bind="bind"
  >
    <n-checkbox
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      >{{ item.label }}</n-checkbox
    >
  </n-checkbox-group>
</template>
