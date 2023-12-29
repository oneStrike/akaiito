<script setup lang="ts">
import type { ButtonProps, DropdownInstance } from 'element-plus'
import type { BasicFormProps } from '@/components/basic/BasicForm.vue'
import type { IterateObject } from '@typings/index'
import { utils } from '@/utils'

export type ToolbarFilter = BasicFormProps['options']

export type Toolbar =
  | {
      type: 'button'
      label: string
      value?: any
      slotName?: string
      props: Partial<ButtonProps>
    }
  | {
      type: 'dropdown'
      label: string
      value?: any
      slotName?: string
      props?: Partial<DropdownInstance>
      buttonProps?: Partial<ButtonProps>
      options: {
        label: string
        value: any
        props?: { disabled?: boolean; divided?: boolean }
      }[]
    }
export interface BasicToolbarProps {
  toolbar: Toolbar[]
  filter?: ToolbarFilter
}

const props = withDefaults(defineProps<BasicToolbarProps>(), {})
const emits = defineEmits<{
  (event: 'handler', data: any): void
  (event: 'query', data: IterateObject): void
}>()

const filterData = ref<IterateObject>()

const submit = (val) => {
  const { pickBy, isBoolean, isNumber } = utils._
  emits(
    'query',
    pickBy(val, (item) => isBoolean(item) || isNumber(item) || item)
  )
}
</script>

<template>
  <div id="toolbar" class="flex justify-between flex-wrap">
    <div class="flex pb-4">
      <div v-for="(item, index) in toolbar" :key="index" class="mr-4">
        <el-button
          v-if="item.type === 'button'"
          v-bind="item.props"
          @click="emits('handler', item.value)"
          >{{ item.label }}</el-button
        >

        <el-dropdown
          v-if="item.type === 'dropdown'"
          v-bind="item.props"
          @command="(val) => emits('handler', val)"
        >
          <el-button v-bind="item.buttonProps">{{ item.label }}</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(child, idx) in item.options"
                :key="idx"
                :command="child.value"
              >
                {{ child.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <template v-if="item.slotName">
          <slot :name="item.slotName" :tool="item"></slot>
        </template>
      </div>
    </div>
    <basic-form
      v-if="Array.isArray(filter) && filter.length"
      v-model="filterData"
      :options="filter"
      :form-props="{ inline: true }"
      submit-text="查询"
      @submit="submit"
    />
  </div>
</template>

<style scoped></style>
