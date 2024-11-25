<script setup lang="ts">
import type { EsFormProps } from '@/components/es-form/types'
import type { FormInstance } from 'element-plus'

const props = withDefaults(defineProps<EsFormProps>(), {
  modelValue: () => ({}),
  formProps: () => ({}),
  showBtn: true,
  submitText: '提交',
  resetText: '重置',
  boxBorder: true,
})
const emits = defineEmits<{
  (event: 'reset'): void
  (event: 'submit', data: IterateObject): void
  (event: 'update:modelValue', data: IterateObject): void
}>()
const formRef = ref<FormInstance>()
const formData = ref<IterateObject>({})
const throttleInput = ref('')

const formOptions = computed(() => {
  return props.options.map((item) => {
    if (item.props?.span) {
      // @ts-expect-error 临时方案
      item.props.style = `width:${100 / item.props.span}%;min-width:229.5px;`
    } else {
      // @ts-expect-error 临时方案
      item.props.style = 'width:100%;min-width:229.5px;'
    }
    return item
  })
})

watch(
  () => props.modelValue,
  (val) => {
    formData.value = val
  },
  { immediate: true, deep: true },
)

watch(
  formData,
  (val) => {
    emits('update:modelValue', val)
  },
  { deep: true },
)

function submitForm() {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      emits('submit', toRaw(formData.value))
    }
  })
}

function resetForm() {
  formRef.value?.resetFields()
  emits('reset')
}

defineExpose({
  submitForm,
  resetForm,
})
</script>

<template>
  <el-form v-bind="formProps" ref="formRef" :model="formData" :inline="true">
    <template v-for="item in formOptions" :key="item.field">
      <el-form-item
        v-if="item.show !== false"
        :prop="item.field"
        v-bind="item.props"
        :class="boxBorder ? 'box-border' : ''"
        class="mr-0! px-3!"
      >
        <es-upload
          v-if="item.component === 'Upload'"
          v-model="formData[item.field]"
          v-bind="item.componentProps"
          v-on="item.on || {}"
        />

        <el-input
          v-if="item.component === 'Input'"
          v-model="throttleInput"
          autocomplete="new-password"
          v-bind="item.componentProps"
          @keydown.enter="submitForm"
          v-on="item.on || {}"
          @change="(val) => ((formData[item.field] = val), item.on?.change(val))"
        />

        <el-input-number
          v-if="item.component === 'InputNumber'"
          v-model="formData[item.field]"
          v-bind="item.componentProps"
          class="w-full!"
          @keydown.enter="submitForm"
          v-on="item.on || {}"
        />

        <el-input
          v-if="item.component === 'Textarea'"
          v-model="formData[item.field]"
          v-bind="item.componentProps"
          type="textarea"
          @keydown.enter="submitForm"
          v-on="item.on || {}"
        />

        <es-checkbox
          v-if="item.component === 'Checkbox'"
          v-model="formData[item.field]"
          v-bind="item.componentProps"
          :options="item.componentProps?.options"
          v-on="item.on || {}"
        />

        <el-radio-group
          v-if="item.component === 'Radio'"
          v-model="formData[item.field]"
          v-bind="item.componentProps"
          v-on="item.on || {}"
        >
          <el-radio
            v-for="child in item.componentProps?.options"
            :key="child.value"
            :value="child.value"
            :disabled="child.disabled"
          >
            {{ child.label }}
          </el-radio>
        </el-radio-group>

        <el-select
          v-if="item.component === 'Select'"
          v-model="formData[item.field]"
          :clearable="typeof item.componentProps?.clearable === 'boolean' ? item.componentProps?.clearable : true"
          v-bind="item.componentProps"
          v-on="item.on || {}"
        >
          <el-option
            v-for="sub in item.componentProps?.options"
            :key="sub.value"
            :label="sub.label"
            :value="sub.value"
            :disabled="sub.disabled"
          />
        </el-select>

        <el-date-picker
          v-if="item.component === 'DateTime'"
          v-model="formData[item.field]"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
          v-bind="item.componentProps"
          v-on="item.on || {}"
        />

        <es-editor v-if="item.component === 'RichText'" v-model="formData[item.field]" v-bind="item.componentProps" />
      </el-form-item>
    </template>
    <div v-if="showBtn" class="es-form-button">
      <el-button @click="resetForm">
        {{ resetText }}
      </el-button>
      <el-button type="primary" @click="submitForm">
        {{ submitText }}
      </el-button>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  min-width: 229.5px;
}
</style>
