<script setup lang="ts">
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import BasicForm from '@/components/basic/BasicForm.vue'

interface BasicSearchProps {
  modelValue: Record<string | symbol, any>
  options: BasicFormOptions[]
  loading?: boolean
}

const props = withDefaults(defineProps<BasicSearchProps>(), {
  loading: false
})

const innerOptions = computed(() => {
  return props.options.map((item) => {
    item.componentProps.bind.clearable = true
    return item
  })
})
console.log('🚀 ~ file:basicSearch method: line:21 -----', innerOptions)
const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
}>()

const formData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    if (JSON.stringify(val) !== JSON.stringify(props.modelValue)) {
      emits('update:modelValue', val)
    }
  }
})
</script>

<template>
  <n-space justify="space-between" size="small" id="basic_search">
    <slot name="left">
      <div></div>
    </slot>
    <slot name="right">
      <div>
        <basic-form
          inline
          size="small"
          v-model="formData"
          :loading="loading"
          label-placement="left"
          :options="innerOptions"
        ></basic-form>
      </div>
    </slot>
  </n-space>
</template>

<style scoped lang="scss">
:deep(.n-form--inline) {
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>
