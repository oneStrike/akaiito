<script setup lang="ts">
import type { SearchProps } from '@/typings/components/basicSearch'
export interface ISearchOp {
  options: SearchProps['options']
  modelValue: Record<string, any>
}
const props = withDefaults(defineProps<ISearchOp>(), {
  options: () => [],
  modelValue: () => ({})
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'search', data: any): void
}>()

const searchData = ref(props.modelValue || {})

const fillAllSelect = (item: SearchProps['options'][number]) => {
  if (item.fillAll) {
    const options = item.componentProps.options
    if (options && !options.find((item) => item.label === '全部')) {
      options.unshift({ label: '全部', value: '' })
    }
  }
  return item
}

//搜索选项的默认宽度
const finalSearchOption = ref<SearchProps['options']>()
watch(
  () => props.options,
  (val) => {
    finalSearchOption.value = val.map((item) => {
      switch (item.component) {
        case 'Input':
          item.width = 100
          break
        case 'Select':
          item.width = 200
          item = fillAllSelect(item)
          break
        case 'DateTime':
          item.width = 460
      }
      return item
    })
  },
  { immediate: true, deep: true }
)

watch(
  searchData,
  () => {
    emits('update:modelValue', searchData.value)
  },
  { deep: true }
)

const search = () => {
  emits('search', searchData.value)
}

const resetFields = () => {
  emits('update:modelValue', {})
  searchData.value = {}
}
</script>
<template>
  <div id="basic_search" class="container flex main_between">
    <div class="mr_16">
      <slot> </slot>
    </div>
    <basic-form
      v-model="searchData"
      :label-width="'auto'"
      :inline="true"
      :submit-btn-text="'查询'"
      btn-position="right"
      :options="finalSearchOption"
      @submit="search"
      @reset-fields="resetFields"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__label-wrap) {
  margin-right: 0 !important;
}

:deep(.el-form-item) {
  margin-right: 0 !important;
  margin-left: 32px;
}

:deep(.submit_btn) {
  width: auto;
}

:deep(.el-form) {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>
