<script setup lang="ts">
import type { FormInst, FormProps } from 'naive-ui'
import type {
  BasicFormInst,
  BasicFormOptions
} from '@/typings/components/basic/basicForm'
import config from '@/config'
import SharedMultiple from '@/components/shared/SharedMultiple.vue'
import { utils } from '@/utils/index'

interface BasicFormProps {
  modelValue?: Record<string | symbol, any>
  inline?: boolean
  labelWidth?: FormProps['labelWidth']
  labelPlacement?: FormProps['labelPlacement']
  showLabel?: FormProps['showLabel']
  size?: FormProps['size']
  options: BasicFormOptions[]
  loading?: boolean
  showFeedback?: boolean
  showBtn?: boolean
  resetBtn?: boolean
  submitText?: string
  resetText?: string
  blankReset?: boolean
}

const formRef = ref<FormInst>()

const props = withDefaults(defineProps<BasicFormProps>(), {
  modelValue: () => ({}),
  labelWidth: 'auto',
  labelPlacement: 'top',
  size: 'medium',
  loading: false,
  showFeedback: true,
  showBtn: true,
  resetBtn: true,
  submitText: '提交',
  resetText: '重置',
  blankReset: false
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: any): void
  (event: 'submit', data: any): void
  (event: 'reset', data: any): void
}>()

const initFormData = ref(utils._.cloneDeep(props.modelValue))
const formData = ref(utils._.cloneDeep(props.modelValue))
//为了处理输入框input时间频繁触发emit而存在
const dummyInputValue = ref<Record<string, any>>({})
watch(
  () => props.modelValue,
  (val) => {
    dummyInputValue.value = utils._.cloneDeep(val)
    formData.value = utils._.cloneDeep(val)
  },
  { deep: true, immediate: true }
)

const throttledFn = useThrottleFn((val) => emits('update:modelValue', val), 100)
watch(formData, throttledFn, { deep: true })

const dummyInputValueChange = (field: string, val: string | string[]) => {
  formData.value[field] = val
}

//提交表单
const submit = useDebounceFn(() => {
  formRef.value?.validate((errors) => {
    if (errors) return
    emits('submit', formData.value)
  })
}, config.DEBOUNCE)

//重置表单
const reset = () => {
  if (!props.blankReset) {
    formRef.value?.restoreValidation()
    Object.keys(unref(formData)).forEach((item) => {
      formData.value[item] = initFormData.value[item] || null
      dummyInputValue.value[item] = initFormData.value[item] || null
    })
  } else {
    emits('reset', formData.value)
  }
}

//抛出的校验方法
const exposeValidate: BasicFormInst['validate'] = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((errors) => {
      resolve({
        errors: errors || null,
        values: formData.value
      })
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const computedModelValue = (field: string) => {
  if (field.includes('.')) {
    const fieldArr = field.split('.')
    let res: any
    fieldArr.forEach((item) => {
      res = res ? res[item] : formData.value[item]
    })
    return res
  }
  return formData.value[field]
}

defineExpose({
  reset,
  validate: exposeValidate
} as BasicFormInst)
</script>

<template>
  <n-form
    :size="size!"
    class="pd_4"
    ref="formRef"
    :inline="inline"
    :model="formData"
    :show-feedback="showFeedback"
    :label-placement="labelPlacement!"
    @keyup.enter="submit"
  >
    <template v-for="item in options" :key="item.bind.path">
      <n-h3 prefix="bar" v-if="item.sectionTitle">
        <n-text type="primary">
          {{ item.sectionTitle }}
        </n-text>
        <n-tag type="warning" v-if="item.sectionTips" class="ml_16">
          {{ item.sectionTips }}
        </n-tag>
      </n-h3>
      <n-form-item
        :style="{ width: item.bind.width + 'px' }"
        v-bind="item.bind"
      >
        <template #label>
          <div>
            <div class="flex_center">
              <span>{{ item.bind.label }}</span>
              <n-tooltip trigger="hover" v-if="item.bind.prompt">
                <template #trigger>
                  <svg-icon
                    icon-name="question"
                    size="16"
                    class="ml_8 mr_8"
                  ></svg-icon>
                </template>

                {{ item.bind.prompt }}
              </n-tooltip>
            </div>
          </div>
        </template>
        <n-input
          v-if="item.component === 'Input'"
          v-bind="item.componentProps.bind"
          v-model:value="dummyInputValue[item.bind.path!]"
          @change="
            (val: string | string[]) =>
              dummyInputValueChange(item.bind.path!, val)
          "
        ></n-input>

        <n-input-number
          v-if="item.component === 'InputNumber'"
          v-bind="item.componentProps.bind"
          v-model:value="formData[item.bind.path!]"
        ></n-input-number>

        <n-radio-group
          v-if="item.component === 'Radio'"
          v-model:value="formData[item.bind.path!]"
          v-bind="item.componentProps.bind"
        >
          <n-radio
            v-for="radio in item.componentProps.options"
            :key="radio.value"
            :value="radio.value"
            :disabled="radio.disabled"
          >
            {{ radio.label }}
          </n-radio>
        </n-radio-group>

        <shared-multiple
          v-if="item.component === 'Select' || item.component === 'Checkbox'"
          :component="item.component"
          v-model="formData[item.bind.path!]"
          :options="item.componentProps.options!"
          :bind="item.componentProps.bind"
        />

        <Editor
          v-if="item.component === 'Editor'"
          v-model="formData[item.bind.path!]"
          v-bind="item.componentProps.bind"
        ></Editor>

        <n-date-picker
          v-if="item.component === 'Date'"
          v-model:value="formData[item.bind.path!]"
          v-bind="item.componentProps.bind"
        />

        <basic-upload
          v-if="item.component === 'Upload'"
          v-model:fileList="formData[item.bind.path!]"
          v-bind="item.componentProps.bind"
        ></basic-upload>
      </n-form-item>
    </template>
    <n-form-item v-if="showBtn">
      <n-space justify="space-around" :wrap="false" class="w_100">
        <n-button type="primary" :loading="loading" @click="submit">
          {{ submitText }}
        </n-button>
        <n-button @click="reset" v-if="resetBtn">{{ resetText }}</n-button>
        <slot name="button"></slot>
      </n-space>
    </n-form-item>
  </n-form>
</template>
