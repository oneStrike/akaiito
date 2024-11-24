<script setup lang="ts">
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/types'
import { utils } from '@/utils'

const props = withDefaults(defineProps<EsToolbarProps>(), {
  followSelection: true,
})
const emits = defineEmits<{
  (event: 'update:modelValue', data: IterateObject): void
  (event: 'handler', data: any): void
  (event: 'query', data: IterateObject): void
  (event: 'reset'): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: any) {
    emits('update:modelValue', val)
  },
})

const esFormRef = ref<IterateObject>()
const innerFilter = ref<ToolbarFilter>([])
watch(
  () => props.filter,
  (val) => {
    if (Array.isArray(val)) {
      innerFilter.value = JSON.parse(JSON.stringify(val)).map((item: ToolbarFilter[number]) => {
        if (!item.componentProps) {
          item.componentProps = {}
        }

        if (typeof item.componentProps.clearable !== 'boolean') {
          item.componentProps.clearable = true
        }

        return item
      })
    }
  },
  { deep: true, immediate: true },
)

function submit() {
  val = JSON.parse(JSON.stringify(val))
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
      v-model="modelValue"
      class="flex-1"
      :options="innerFilter"
      submit-text="查询"
      :form-props="{ labelPosition: 'top' }"
      :box-border="false"
      @submit="submit"
      @reset="reset"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form--inline) {
  position: relative;
  padding-right: 130px !important;
  justify-content: end;
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
