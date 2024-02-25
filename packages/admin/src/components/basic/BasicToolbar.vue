<script setup lang="ts">
import type { ButtonProps } from 'element-plus'
import type { BasicFormProps } from '@/components/basic/BasicForm.vue'
import type { IterateObject } from '@typings/index'
import { utils } from '@/utils'

export type ToolbarFilter = BasicFormProps['options']

export type Toolbar = {
  type: 'dropdown' | 'button'
  label: string
  value?: any
  slotName?: string
  props?: any
  buttonProps?: Partial<ButtonProps>
  options?: {
    label: string
    value: any
    props?: { disabled?: boolean; divided?: boolean }
  }[]
}
export interface BasicToolbarProps {
  toolbar?: Toolbar[]
  filter?: ToolbarFilter
  selection?: boolean
  followSelection?: boolean
}

const props = withDefaults(defineProps<BasicToolbarProps>(), {
  followSelection: true
})
const emits = defineEmits<{
  (event: 'handler', data: any): void
  (event: 'query', data: IterateObject): void
}>()

onMounted(() => {
  console.log('🚀 ~ file:1 method: line:38 -----')
})

const bindChangeEventComponent = ['Select', 'DateTime']
const innerFilter = computed(() =>
  utils._.cloneDeep(props.filter).map((item) => {
    if (!item.componentProps) item.componentProps = {}
    if (!item.on) item.on = {}
    if (!item.props) item.props = {}
    if (!item.props.class) {
      switch (item.component) {
        case 'DateTime':
          item.props.class = 'w-96'
          break
        default:
          item.props.class = 'w-52'
      }
    }
    const innerSubmit = () => {
      nextTick(() => submit(filterData.value))
    }

    if (typeof item.componentProps.clearable !== 'boolean') {
      item.componentProps.clearable = true
    }

    if (!item.on.clear && item.component !== 'Select') {
      item.on.clear = innerSubmit
    }

    if (bindChangeEventComponent.includes(item.component) && !item.on.change) {
      item.on.change = innerSubmit
    }
    return item
  })
)

const filterData = ref<IterateObject>()
const basicFormRef = ref<IterateObject>()

const submit = (val: IterateObject) => {
  const { pickBy, isBoolean, isNumber } = utils._
  if (
    val &&
    Array.isArray(val.dateTimePicker) &&
    val.dateTimePicker.length === 2
  ) {
    const start = val.dateTimePicker[0]
    const end = val.dateTimePicker[1]
    val.startTime = utils.dayjs(start).format('YYYY-MM-DD HH:mm:ss')
    val.endTime = utils.dayjs(end).format('YYYY-MM-DD HH:mm:ss')
  } else if (val) {
    delete val.startTime
    delete val.endTime
  }
  console.log('🚀 ~ file:BasicToolbar method:submit line:89 -----')
  emits(
    'query',
    pickBy(val, (item) => isBoolean(item) || isNumber(item) || item)
  )
}

const resetFilter = () => {
  basicFormRef.value?.resetForm()
}

defineExpose({
  resetFilter
})
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
          :disabled="followSelection ? selection : item?.props.disabled"
          @command="(val) => emits('handler', val)"
        >
          <el-button
            v-bind="item.buttonProps"
            :disabled="followSelection ? selection : item?.buttonProps.disabled"
            >{{ item.label }}</el-button
          >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(child, idx) in item.options"
                :key="idx"
                :command="child.value"
                v-bind="child?.props"
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
      ref="basicFormRef"
      v-if="Array.isArray(filter) && filter.length"
      v-model="filterData"
      :options="innerFilter"
      :form-props="{ inline: true }"
      submit-text="查询"
      @submit="submit"
      @reset="submit"
    />
  </div>
</template>

<style scoped></style>
