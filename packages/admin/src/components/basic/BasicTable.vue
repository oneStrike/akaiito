<script setup lang="ts">
import type { TableProps, TableColumnInstance } from 'element-plus'
import type { IterateObject } from '@typings/index'

export type BasicTableColumn = (Partial<TableColumnInstance> & {
  slotName?: string
})[]

export interface BasicTableProps<T = IterateObject> {
  data: T[]
  columns: BasicTableColumn
}

const props = withDefaults(defineProps<BasicTableProps>(), {})
</script>

<template>
  <el-table :data="data">
    <el-table-column
      v-for="item in columns"
      :key="item.columnKey"
      v-bind="item"
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

<style scoped></style>
