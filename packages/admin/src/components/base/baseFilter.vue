<script setup lang="ts">
import type { BaseForm } from '@/typings/components/base/baseForm'
import { BaseFormEnum } from '@/enum/baseFormEnum'

interface BaseFilterProps {
  value?: Record<string | symbol, any>
  options: BaseForm['options']
}

const props = withDefaults(defineProps<BaseFilterProps>(), {
  value: () => ({})
})

const emits = defineEmits<{
  (event: 'update:value', data: any): void
  (event: 'filter', data: any): void
}>()

const filterData = computed({
  get() {
    return props.value
  },
  set(val) {
    emits('update:value', val)
  }
})

//处理默认宽度
props.options.forEach((item) => {
  if (!item.bind.width) {
    switch (item.component) {
      case BaseFormEnum.INPUT:
        item.bind.width = 200
        break
      case BaseFormEnum.SELECT:
        item.bind.width = 200
        break
    }
  }
})

//表单提交和重置事件
const handleFilter = () => {
  emits('filter', filterData)
}
</script>

<template>
  <div class="base_filter flex main_between">
    <base-form
      v-model:value="filterData"
      class="flex"
      submit-text="查询"
      :options="options"
      :form-options="{
        layout: 'inline',
        labelCol: {},
        wrapperCol: {}
      }"
      @submit="handleFilter"
    ></base-form>
  </div>
</template>

<style lang="less" scoped>
::v-deep(.ant-form-inline) {
  justify-content: flex-end;
}
::v-deep(.ant-form-item) {
  padding-bottom: 16px !important;
  margin: 0 0 0 32px;
}
</style>
