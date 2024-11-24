<script lang="ts" setup>
import type { EsSearchProps } from '@/components/es-search/types'
import type { InputOnConfirmEvent } from '@uni-helper/uni-types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsSearch',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsSearchProps>(), {
  mode: 'search',
  trim: true,
  focus: false,
  placeholder: '搜索关键词',
  icon: 'search',
  maxLength: 100,
  radius: 12,
  backgroundColor: '#F5F6F7',
})

const emits = defineEmits<{
  (event: 'confirm', data: string): void
  (event: 'click'): void
  (event: 'clear'): void
}>()

const inputValue = ref('')
const searchValue = defineModel({
  type: String,
  required: false,
  default: '',
  set(value) {
    if (props.trim) {
      return value.replace(/\s+/g, '')
    }
    return value
  },
})

const searchStyle = computed(() => {
  const styles = [`background:${props.backgroundColor}`]
  if (props.radius) {
    styles.push(`border-radius: ${useConfig.addUnit(props.radius)}`)
  }
  return styles
})

// 清空输入框的内容
function clear() {
  inputValue.value = ''
  searchValue.value = ''
  emits('clear')
}

// 确认搜索
function confirm(e: InputOnConfirmEvent) {
  searchValue.value = e.detail.value
  emits('confirm', searchValue.value)
}
</script>

<template>
  <view :style="searchStyle" class="flex items-center px-4 py-2">
    <slot name="icon">
      <es-icons name="search" color="info" />
    </slot>
    <input
      v-model="inputValue"
      type="text"
      :placeholder="String(placeholder)"
      class="flex-1 pl-1"
      :focus="focus"
      :maxlength="maxLength"
      confirm-type="search"
      @confirm="confirm"
    />
    <es-icons
      v-if="inputValue"
      name="close"
      color="minor"
      class="ml-1"
      @click="clear"
    />
  </view>
</template>

<style scoped></style>
