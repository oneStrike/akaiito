<script setup lang="ts">
  import type {
    EsToolbarProps,
    ToolbarFilter,
  } from '@/components/es-toolbar/types'

  const props = withDefaults(defineProps<EsToolbarProps>(), {
    followSelection: true,
  })
  const emits = defineEmits<{
    (event: 'handler', data: any): void
    (event: 'query', data: IterateObject): void
    (event: 'reset', data: IterateObject): void
  }>()

  const formValue = ref<IterateObject>({})

  const esFormRef = ref<IterateObject>()
  const innerFilter = ref<ToolbarFilter>()

  const inputFields = new Set<string>()

  // 使用计算属性优化filter处理
  const processedFilter = computed(() => {
    if (!Array.isArray(props.filter)) return []

    return props.filter.map((item: ToolbarFilter[number]) => {
      const clonedItem = {
        ...item,
        componentProps: {
          clearable: true,
          ...item.componentProps,
        },
      }

      if (item.component === 'Input') {
        inputFields.add(item.field)
      }

      return clonedItem
    })
  })

  // 同步innerFilter
  watch(
    processedFilter,
    (val) => {
      innerFilter.value = val
    },
    { immediate: true },
  )

  // 计算属性优化模板渲染
  const showForm = computed(() => {
    return (
      innerFilter.value &&
      Array.isArray(props.filter) &&
      props.filter.length > 0
    )
  })

  const formProps = computed(() => ({
    labelPosition: 'top' as const,
  }))

  let oldFormValue: IterateObject = {}
  let isResetChange = false
  // 优化防抖逻辑
  const debounceFn = useDebounceFn((val) => {
    emits('query', val)
  }, 300)

  // 使用watchEffect优化监听
  watchEffect(() => {
    // 检查是否有变化
    const hasChanges =
      Object.keys(formValue.value).some(
        (key) => formValue.value[key] !== oldFormValue[key],
      ) || Object.keys(oldFormValue).some((key) => !(key in formValue.value))

    if (!hasChanges) return

    // 检查是否需要防抖（输入框字段）
    const needsDebounce = Object.keys(formValue.value).some(
      (key) =>
        formValue.value[key] !== oldFormValue[key] && inputFields.has(key),
    )

    if (!isResetChange) {
      if (needsDebounce) {
        debounceFn(formValue.value)
      } else {
        emits('query', formValue.value)
      }
    }
    // 浅拷贝更新oldFormValue
    oldFormValue = { ...formValue.value }
  })

  function resetFilter() {
    esFormRef.value?.resetForm()
  }

  let resetTimeoutId: number | null = null
  /**
   * 清除重置状态定时器
   */
  function clearResetTimeout() {
    if (resetTimeoutId !== null) {
      clearTimeout(resetTimeoutId)
      resetTimeoutId = null
    }
  }
  function emitReset() {
    isResetChange = true
    emits('reset', formValue.value)
    clearResetTimeout() // 清除之前的定时器

    resetTimeoutId = window.setTimeout(() => {
      isResetChange = false
    }, 350)
  }
  // 组件卸载时清理定时器
  onBeforeUnmount(() => {
    clearResetTimeout()
  })
  defineExpose({
    resetFilter,
  })
</script>

<template>
  <div id="toolbar" class="flex justify-between flex-wrap p-1">
    <div v-if="toolbar?.length" class="flex pb-4">
      <div
        v-for="(item, index) in toolbar"
        :key="`${item.type}-${item.label}-${index}`"
        class="mr-4"
      >
        <el-button
          v-if="item.type === 'button'"
          v-bind="item.props"
          @click="() => emits('handler', item.value)"
        >
          {{ item.label }}
        </el-button>

        <el-dropdown
          v-else-if="item.type === 'dropdown'"
          v-bind="item.props"
          :disabled="!selected"
          @command="(val: any) => emits('handler', val)"
        >
          <el-button v-bind="item.buttonProps" :disabled="!selected">
            {{ item.label }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(child, idx) in item.options"
                :key="`${child.value}-${idx}`"
                :command="child.value"
                v-bind="child?.props"
              >
                {{ child.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <template v-else-if="item.slotName">
          <slot :name="item.slotName" :tool="item" />
        </template>
      </div>
    </div>

    <es-form
      v-if="showForm"
      ref="esFormRef"
      v-model="formValue"
      class="flex-1"
      :options="innerFilter!"
      submit-text="查询"
      :form-props="formProps"
      :box-border="false"
      @reset="emitReset"
      @submit="emits('query', formValue)"
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
