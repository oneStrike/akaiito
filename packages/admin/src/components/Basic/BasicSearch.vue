<script setup lang="ts">
import type { SearchProps } from '@/typings/components/basicSearch'
export interface ISearchOp {
  options: SearchProps['options']
  modelValue: Record<string, any>
  batchBtn?: SearchProps['batchBtn']
}
const props = withDefaults(defineProps<ISearchOp>(), {
  options: () => [],
  modelValue: () => ({})
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'search', data: any): void
  (event: 'dropdown', data: any): void
  (event: 'reset'): void
}>()

const searchData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

//搜索选项的默认宽度
const finalSearchOption = ref<SearchProps['options']>()
watch(
  () => props.options,
  (val) => {
    finalSearchOption.value = val.map((item) => {
      switch (item.component) {
        case 'Input':
          item.width = 200
          break
        case 'Select':
          item.width = 200
          break
        case 'DateTime':
          item.width =
            item.componentProps.bind!.type === 'daterange' ? 320 : 460
      }
      return item
    })
  },
  { immediate: true, deep: true }
)

const search = () => {
  emits('search', searchData.value)
}

const resetFields = () => {
  emits('update:modelValue', {})
  emits('reset')
  searchData.value = {}
}
</script>
<template>
  <div id="basic_search" class="container flex main_between flex1">
    <div class="mr_16 left_btn">
      <slot> </slot>
      <el-dropdown
        v-if="batchBtn"
        class="ml_12"
        @command="(command) => emits('dropdown', command)"
      >
        <el-button>
          批量操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu v-for="(item, index) in batchBtn" :key="index">
            <el-dropdown-item :command="item.value">{{
              item.label
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

.left_btn {
  white-space: nowrap;
}
</style>
