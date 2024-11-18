<script setup lang="ts">
import type { EsFormProps } from '@/components/es-form/es-form.vue'
import type { ButtonProps } from 'element-plus'
import { utils } from '@/utils'

export type ToolbarFilter = EsFormProps['options']

export interface Toolbar {
  type: 'dropdown' | 'button'
  label: string
  value?: any
  slotName?: string
  props?: any
  buttonProps?: Partial<ButtonProps>
  options?: {
    label: string
    value: any
    props?: {
      disabled?: boolean
      divided?: boolean
    }
  }[]
}

export interface EsToolbarProps {
  toolbar?: Toolbar[]
  filter?: ToolbarFilter
  selection?: boolean
  followSelection?: boolean
}

const props = withDefaults(defineProps<EsToolbarProps>(), {
  followSelection: true,
})
const emits = defineEmits<{
  (event: 'handler', data: any): void
  (event: 'query', data: IterateObject): void
  (event: 'reset'): void
}>()

const bindChangeEventComponent = ['Select', 'DateTime']
const filterData = ref<IterateObject>({})
const esFormRef = ref<IterateObject>()
const innerFilter = ref<ToolbarFilter>([])
watch(
  () => props.filter,
  (val) => {
    if (Array.isArray(val)) {
      innerFilter.value = utils._.cloneDeep(val).map((item: ToolbarFilter[number]) => {
        if (!item.componentProps) {
          item.componentProps = {}
        }
        if (!item.on) {
          item.on = {}
        }
        if (!item.props) {
          item.props = {}
        }
        item.props.style = item.props.style || {}
        if (!item.props.style.width) {
          switch (item.component) {
            case 'DateTime':
              item.props.style.width = '300px'
              break
            default:
              item.props.style.width = '160px'
          }
        }
        const innerSubmit = () => {
          nextTick(() => submit(filterData.value))
        }

        if (typeof item.componentProps.clearable !== 'boolean') {
          item.componentProps.clearable = true
        }

        if (bindChangeEventComponent.includes(item.component)) {
          if (!item.on.change) {
            item.on.change = innerSubmit
          }
        } else if (!item.on.clear) {
          item.on.clear = innerSubmit
        }
        return item
      })
    }
  },
  { deep: true, immediate: true },
)

function submit(val?: IterateObject) {
  val = utils._.cloneDeep(val)
  if (Array.isArray(val?.dateTimePicker) && val?.dateTimePicker.length === 2) {
    const start = val.dateTimePicker[0]
    const end = val.dateTimePicker[1]
    val.startTime = utils.dayjs(start).format('YYYY-MM-DD HH:mm:ss')
    val.endTime = utils.dayjs(end).format('YYYY-MM-DD HH:mm:ss')
  } else if (val) {
    delete val.startTime
    delete val.endTime
    delete val.dateTimePicker
  }
  emits('query', val!)
}

function reset() {
  emits('reset')
}

function resetFilter() {
  esFormRef.value?.resetForm()
}

defineExpose({
  resetFilter,
})
</script>

<template>
  <div id="toolbar" class="flex justify-between flex-wrap">
    <div class="flex pb-4">
      <div v-for="(item, index) in toolbar" :key="index" class="mr-4">
        <el-button v-if="item.type === 'button'" v-bind="item.props" @click="emits('handler', item.value)">
          {{ item.label }}
        </el-button>

        <el-dropdown
          v-if="item.type === 'dropdown'"
          v-bind="item.props"
          :disabled="followSelection ? selection : item?.props.disabled"
          @command="(val: any) => emits('handler', val)"
        >
          <el-button v-bind="item.buttonProps" :disabled="followSelection ? selection : item.buttonProps!.disabled">
            {{ item.label }}
          </el-button>
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
          <slot :name="item.slotName" :tool="item" />
        </template>
      </div>
    </div>
    <es-form
      v-if="Array.isArray(filter) && filter.length"
      ref="esFormRef"
      v-model="filterData"
      :options="innerFilter"
      :form-props="{ inline: true }"
      submit-text="查询"
      @submit="submit"
      @reset="reset"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form--inline) {
  position: relative;
  padding-right: 130px !important;
}

:deep(.es-form-button) {
  position: absolute;
  top: 0;
  right: 0;

  .el-form-item {
    margin-right: 0;
  }
}
</style>
