<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { InputInstance } from 'element-plus'

interface ModalInput {
  visible: boolean
  label: string
  title?: string
  inputValue?: string
  required?: boolean
  inputAttr: InputInstance['$props']
}

const props = withDefaults(defineProps<ModalInput>(), {
  visible: false,
  title: '输入框',
  required: false
})

const emits = defineEmits<{
  (event: 'closed'): void
  (event: 'complete', data: string | number): void
}>()
const ruleFormRef = ref<FormInstance>()
const elInputRef = ref()
const ruleForm = reactive({
  inputValue: props.inputValue || ''
})
let timer: number | null = null
watch(
  props,
  () => {
    ruleForm.inputValue = props.inputValue || ''
    if (props.visible && !timer) {
      timer = window.setTimeout(() => {
        elInputRef.value && elInputRef.value.focus()
        timer && clearTimeout(timer)
      }, 100)
    }
  },
  { immediate: true, deep: true }
)

const rules = reactive<FormRules>({
  inputValue: [
    {
      required: props.required,
      message: props.label + '不能为空',
      trigger: 'blur'
    }
  ]
})

//关闭弹窗
const closed = () => {
  emits('closed')
  ruleFormRef.value?.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      emits('complete', JSON.parse(JSON.stringify(ruleForm.inputValue)))
      ruleFormRef.value?.resetFields()
    }
  })
}
</script>

<template>
  <el-dialog
    destroy-on-close
    :model-value="visible"
    :title="title"
    width="40%"
    @closed="closed"
  >
    <template #footer>
      <el-button @click="closed"> 取消 </el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
      <el-form-item :required="required" :label="label" prop="inputValue">
        <el-input
          ref="elInputRef"
          v-bind="inputAttr"
          v-model="ruleForm.inputValue"
          @keyup.enter="submitForm(ruleFormRef)"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped></style>
