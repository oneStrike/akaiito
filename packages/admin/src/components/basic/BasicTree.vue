<script setup lang="ts">
import type { TreeProps } from 'naive-ui'

export interface BasicTreeProps {
  accordion?: TreeProps['accordion']
  treeData: TreeProps['data']
  defaultExpandedKeys?: TreeProps['defaultExpandedKeys']
  keyField?: string
  labelField?: string
  search?: boolean
  searchPlaceholder?: string
  searchValue?: string
  showIrrelevantNodes?: boolean
  renderSuffix?: TreeProps['renderSuffix']
}

const props = withDefaults(defineProps<BasicTreeProps>(), {
  accordion: false,
  keyField: 'value',
  labelField: 'label',
  defaultExpandedKeys: () => [],
  search: true,
  searchValue: '',
  searchPlaceholder: '请输入搜索内容',
  showIrrelevantNodes: false
})

const emits = defineEmits<{
  (event: 'update:searchValue', data: string | number): void
}>()

const searchValue = ref('')

watch(
  () => props.searchValue,
  (value) => {
    searchValue.value = value
  },
  { immediate: true }
)

watch(searchValue, (value) => {
  emits('update:searchValue', value)
})

</script>

<template>
  <div>
    <div class="w_100 main_between cross_center" v-if="search">
      <n-input
        v-model:value="searchValue"
        :placeholder="searchPlaceholder"
        size="small"
      />
      <div class="ml_16 flex_center">
        <slot name="search-after"></slot>
      </div>
    </div>
    <n-tree
      class="mt_16"
      block-line
      :pattern="searchValue"
      :data="treeData"
      :default-expanded-keys="defaultExpandedKeys!"
      :key-field="keyField"
      :label-field="labelField"
      :show-irrelevant-nodes="showIrrelevantNodes"
      selectable
      :render-suffix="renderSuffix"
    />
  </div>
</template>

<style scoped lang="scss"></style>
