<script lang="ts" setup>
  import { useBitmask } from '@/hooks/useBitmask.ts'

  interface IterateObject {
    [key: string]: string | number | undefined
  }

  export interface EsCheckboxProps {
    modelValue?: string | (string | number)[] | number
    valueType?: 'string' | 'array' | 'bitmask'
    options: {
      label: string
      value: string | number
      disabled?: boolean
    }[]
    disabled?: boolean
  }

  defineOptions({
    name: 'EsCheckbox',
  })

  const props = withDefaults(defineProps<EsCheckboxProps>(), {
    valueType: 'string',
  })

  const emits = defineEmits<{
    (
      event: 'update:modelValue',
      data: string | number | (string | number)[],
    ): void
  }>()

  const optionsValueType = computed(() => {
    const typeObject: Record<string, string> = {}
    props.options.forEach((item) => {
      const valueKey =
        typeof item.value === 'number' ? String(item.value) : item.value
      typeObject[valueKey] = typeof item.value
    })
    return typeObject
  })

  const parseValue = (value: string): (string | number)[] => {
    if (!value) return []

    return value.split(',').map((item) => {
      if (optionsValueType.value[item] === 'number') {
        const num = Number(item)
        return Number.isNaN(num) ? item : num
      } else {
        return item
      }
    })
  }

  const formatEmitData = (
    value: (string | number)[],
    isStringType: boolean,
  ): string | (string | number)[] => {
    if (isStringType) {
      return value.join(',')
    }

    if (props.valueType === 'array') {
      return value.map((item) => {
        const key = typeof item === 'number' ? String(item) : item
        if (optionsValueType.value[key] === 'number') {
          const num = Number(item)
          return Number.isNaN(num) ? item : num
        } else {
          return item
        }
      })
    }

    // 默认按字符串处理
    return value.length ? value.join(',') : ''
  }

  const innerValue = computed({
    get() {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue
      } else if (
        props.valueType === 'bitmask' &&
        typeof props.modelValue === 'number'
      ) {
        try {
          const bitmaskResult = useBitmask.split(props.modelValue)
          if (Array.isArray(bitmaskResult)) {
            return bitmaskResult
          }
          return []
        } catch (error) {
          return []
        }
      } else if (typeof props.modelValue === 'string') {
        return parseValue(props.modelValue as string)
      }
      return []
    },
    set(value) {
      let emitData: string | (string | number)[]

      if (props.valueType === 'string') {
        emitData = value.join(',')
      } else {
        emitData = formatEmitData(value, false)
      }

      emits('update:modelValue', emitData)
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
