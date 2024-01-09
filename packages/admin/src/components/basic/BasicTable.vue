<script setup lang="ts">
import type { TableColumnInstance } from 'element-plus'
import type { IterateObject } from '@typings/index'

export type BasicTableColumn = (Partial<TableColumnInstance> & {
  slotName?: string
})[]

export interface BasicTableProps<T = IterateObject> {
  data: T[]
  columns: BasicTableColumn
  index?: Boolean
  selection?: Boolean
  selectionItems?: T[] | null
}

const props = withDefaults(defineProps<BasicTableProps>(), {})

const emits = defineEmits<{
  (event: 'update:selectionItems', data: any): void
}>()

const selectionItems = computed({
  get() {
    return props.selectionItems
  },
  set(val) {
    emits('update:selectionItems', val)
  }
})

const handleSelectionChange = (val) => {
  selectionItems.value = val
}
</script>

<template>
  <el-table :data="data" @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55"
      v-if="selection"
      class-name="leading-9"
    />
    <el-table-column
      v-for="item in columns"
      :key="item.columnKey"
      v-bind="item"
      class-name="leading-9"
    >
      <template #default="{ row, column, $index }">
        <template v-if="item.slotName">
          <slot
            :name="item.slotName"
            :row="row"
            :column="column"
            :index="$index"
          ></slot>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
::v-deep(.cell) {
  line-height: 32px;
}
</style>
