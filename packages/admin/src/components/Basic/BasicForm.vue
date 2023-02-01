<script setup lang="ts">
import type { BasicForm } from '@/typings/components/basicForm'
import { useDebounceFn } from '@vueuse/core'
import type { FormInstance } from 'element-plus'

interface IFromOp {
  removeAutoFillInput?: boolean
  inline?: BasicForm['inline']
  labelPosition?: BasicForm['labelPosition']
  labelWidth?: BasicForm['labelWidth']
  labelSize?: BasicForm['labelSize']
  showBtn?: BasicForm['showBtn']
  submitBtnText?: BasicForm['submitBtnText']
  btnPosition?: BasicForm['btnPosition']
  btnLoading?: BasicForm['btnLoading']
  modelValue: Record<string, any>
  options: BasicForm['options']
}

const props = withDefaults(defineProps<IFromOp>(), {
  removeAutoFillInput: false,
  inline: false,
  labelPosition: 'left',
  labelWidth: '100px',
  labelSize: 16,
  showBtn: true,
  btnLoading: false,
  btnPosition: 'center',
  submitBtnText: '提交',
  options: () => [],
  modelValue: () => ({})
})

const formRef = ref<FormInstance>()
const submitBtnRef = ref<HTMLButtonElement>()
const formData = ref(props.modelValue || {})

const emits = defineEmits<{
  (event: 'submit', data: any): void
  (event: 'update:modelValue', data: any): void
  (event: 'resetFields'): void
}>()

//lazy修饰符不求作用，用dummyInputValue接收input的值，change事件给真正的字段复制，避免重复触发双向绑定
const dummyInputValue = ref<Record<string, any>>({})

watch(
  () => props.modelValue,
  (val) => {
    formData.value = val
    dummyInputValue.value = val
  },
  { immediate: true, deep: true }
)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl || props.btnLoading) return
  formEl.validate(async (valid) => {
    if (!valid) return
    emits('submit', formData.value)
  })
}

const submitFormDe = useDebounceFn(submitForm, 200)

const resetFields = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emits('resetFields')
}
</script>
<template>
  <el-form
    :inline="inline"
    ref="formRef"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :model="formData"
  >
    <!--    禁止浏览器的自动填充-->
    <template v-if="removeAutoFillInput">
      <input type="password" class="hide" id="passWord" />
      <input type="text" class="hide" id="userName" />
    </template>
    <template v-for="item in options" :key="item.field">
      <el-form-item
        v-if="item.hide !== true"
        :style="{ width: item.width + 'px' }"
        :prop="item.field"
        v-bind="item.bind"
      >
        <template #label>
          <div class="flex center">
            <span :style="`font-size: ${labelSize}px`">{{
              item.bind?.label
            }}</span>
            <el-tooltip
              v-if="item.componentProps.tips"
              effect="dark"
              :content="item.componentProps.tips"
              placement="top"
            >
              <svg-icon
                class="ml_12"
                size="16"
                @click.prevent
                icon-name="question"
              ></svg-icon>
            </el-tooltip>
          </div>
        </template>

        <el-input
          v-if="item.component === 'Input'"
          v-model="dummyInputValue[item.field]"
          v-bind="item.componentProps.bind"
          v-on="item.componentProps.on || {}"
          :validate-event="false"
          @change="(val) => (formData[item.field] = val)"
        >
          <template #suffix>
            <span>{{ item?.bind?.suffix }}</span>
          </template>
        </el-input>

        <el-input-number
          v-if="item.component === 'InputNumber'"
          v-model.lazy.trim="formData[item.field]"
          v-bind="item.componentProps.bind"
          v-on="item.componentProps.on || {}"
        >
        </el-input-number>

        <el-radio-group
          v-if="item.component === 'Radio'"
          v-model="formData[item.field]"
        >
          <el-radio
            v-for="op in item.componentProps.options"
            :key="op.value"
            :label="op.value"
            >{{ op.label }}</el-radio
          >
        </el-radio-group>

        <el-select
          v-if="item.component === 'Select'"
          class="w_100"
          v-model="formData[item.field]"
          v-bind="item.componentProps.bind"
        >
          <el-option
            v-for="child in item.componentProps.options"
            :key="child.value"
            :label="child.label"
            :value="child.value"
          />
        </el-select>

        <el-date-picker
          v-if="item.component === 'DateTime'"
          v-model="formData[item.field]"
          type="datetimerange"
          :default-time="item.componentProps.bind?.defaultTime || new Date()"
          :start-placeholder="
            item.componentProps.bind?.startPlaceholder || '起始时间'
          "
          :end-placeholder="
            item.componentProps.bind?.endPlaceholder || '结束时间'
          "
          v-bind="item.componentProps.bind"
          v-on="item.componentProps.on || {}"
        />

        <basic-upload
          ref="basicUploadRef"
          v-if="item.component === 'Upload'"
          v-model:upload-file="formData[item.field]"
          v-bind="item.componentProps.bind"
        >
        </basic-upload>

        <el-switch
          v-if="item.component === 'Switch'"
          v-model="formData[item.field]"
          v-bind="item.componentProps.bind || {}"
        ></el-switch>

        <div class="flex" v-if="item.component === 'ColorPicker'">
          <el-input
            class="mr_16"
            v-model="formData[item.field]"
            :disabled="item.componentProps?.bind?.disabled"
          ></el-input>
          <el-color-picker
            v-model="formData[item.field]"
            :disabled="item.componentProps?.bind?.disabled"
            v-bind="item.componentProps?.bind"
          />
        </div>
      </el-form-item>
    </template>
    <el-form-item v-if="showBtn" class="w_100">
      <div
        class="w_100 flex"
        :class="
          btnPosition === 'center'
            ? '  center'
            : btnPosition === 'right'
            ? 'main_end'
            : ''
        "
      >
        <el-button
          ref="submitBtnRef"
          class="submit_btn"
          type="primary"
          :loading="btnLoading"
          @click="submitFormDe(formRef)"
        >
          {{ submitBtnText }}
        </el-button>
        <el-button
          class="submit_btn"
          type="primary"
          :loading="btnLoading"
          @click="resetFields(formRef)"
        >
          重置
        </el-button>
      </div>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<style scoped lang="scss">
.submit_btn {
  width: 120px;
}

.hide {
  width: 0;
  border: 0;
  position: absolute;
  top: -99999999999px;
  left: -9999999999px;
}

:deep(.el-input-number) {
  width: 100%;
}
</style>
