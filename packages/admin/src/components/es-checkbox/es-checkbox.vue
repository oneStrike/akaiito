<script lang="ts" setup>
import type { AuyOptions, IterateObject } from '@auy/types'

export interface EsCheckboxProps {
  modelValue?: string | (string | number)[]
  valueType?: 'string' | 'array'
  options: AuyOptions[]
  disabled?: boolean
}

defineOptions({
  name: 'EsCheckbox',
})

const props = withDefaults(defineProps<EsCheckboxProps>(), {
  valueType: 'string',
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: string | (string | number)[]): void
}>()

const optionsValueType = computed(() => {
  const typeObject: IterateObject = {}
  props.options.forEach((item) => {
    typeObject[item.value] = typeof item.value
  })

  return typeObject
})

const innerValue = computed({
  get() {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue
    } else {
      return (
        props.modelValue?.split(',').map((item) => {
          if (optionsValueType.value[item] === 'number') {
            return Number(item)
          } else {
            return `${item}`
          }
        }) ?? []
      )
    }
  },
  set(value) {
    if (props.valueType === 'string') {
      emits('update:modelValue', value.join(','))
    } else {
      let emitData

      if (props.valueType === 'array') {
        emitData = value.map((item) => {
          if (optionsValueType.value[item] === 'number') {
            return Number(item)
          } else {
            return `${item}`
          }
        })
      } else {
        emitData = value.length ? value.join(',') : ''
      }
      emits('update:modelValue', emitData)
    }
  },
})
</script>

<template>
  <el-checkbox-group v-model="innerValue">
    <el-checkbox
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<style scoped></style>
