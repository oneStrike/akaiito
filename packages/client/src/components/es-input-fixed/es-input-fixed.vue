<script setup lang="ts">
defineOptions({
  name: 'EsInputFixed',
  options: {
    virtualHost: true,
  },
})

withDefaults(defineProps<EsInputFixedProps>(), {
  maxLength: 1000,
  placeholder: '请输入内容',
})

const emits = defineEmits<{
  (event: 'confirm', data: string): void
}>()

export interface EsInputFixedProps {
  maxLength?: number
  placeholder?: string
}

const show = defineModel('show', {
  type: Boolean,
  default: false,
})
const modelValue = defineModel({
  type: String,
  default: '',
})

const confirm = () => {
  emits('confirm', modelValue.value)
}

const blurEvent = () => {
  const timer = setTimeout(() => {
    show.value = false
    modelValue.value = ''
    clearTimeout(timer)
  }, 100)
}
</script>

<template>
  <view
    v-if="show"
    class="shadow-box fixed bottom-0 left-0 w-full flex bg-white p-2"
  >
    <input
      v-model.trim="modelValue"
      :placeholder="placeholder"
      :fixed="true"
      :auto-focus="true"
      confirm-type="send"
      :maxlength="maxLength"
      class="box-border h-full w-9/12 bg-gray-100 p-2"
      @blur="blurEvent"
    />
    <es-button
      class="ml-4 shrink-0"
      type="primary"
      text="提交"
      :round="8"
      :disabled="!modelValue"
      @click="confirm"
    />
  </view>
</template>

<style scoped lang="scss">
.shadow-box {
  box-shadow: 0 53px 26px 41px rgba(0, 0, 0, 0.3);
}
</style>
