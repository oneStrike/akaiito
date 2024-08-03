<script lang="ts" setup>
import { useAddUnit } from '@/components/libs/hooks/useConfig'

export interface EsSearchProps {
  mode?: 'icon' | 'search' | 'booth'
  placeholder?: string | string[]
  icon?: string
  trim?: boolean
  radius?: number
  backgroundColor?: string
  maxLength?: number
}

defineOptions({
  name: 'EsSearch',
  options: {
    virtualHost: true
  }
})

const props = withDefaults(defineProps<EsSearchProps>(), {
  mode: 'search',
  trim: true,
  placeholder: '搜索关键词',
  icon: 'search',
  maxLength: 100,
  backgroundColor: '#F5F6F7'
})

const searchValue = defineModel({
  type: String,
  required: false,
  default: '',
  set(value) {
    if (props.trim) {
      return value.replace(/\s+/g, '')
    }
    return value
  }
})

const searchStyle = computed(() => {
  const styles = []
  if (props.radius) {
    styles.push(`border-radius: ${useAddUnit(props.radius)}`)
  }
  return styles
})

const emits = defineEmits<{
  (event: 'confirm', data: string): void
  (event: 'clear'): void
}>()

//清空输入框的内容
const clear = () => {
  searchValue.value = ''
  emits('clear')
}

//确认搜索
const confirm = () => {
  const emitsData = props.trim
    ? searchValue.value.replace(/\s+/g, '')
    : searchValue.value
  emits('confirm', emitsData)
}
</script>

<template>
  <view
    v-if="mode !== 'icon'"
    :style="searchStyle"
    class="es-search w-full h-8 bg-neutral-100 rounded-md flex items-center px-2"
  >
    <slot name="icon">
      <es-icons name="search" color="#666666" />
    </slot>
    <es-swiper
      v-if="mode === 'booth'"
      :text="Array.isArray(placeholder) ? placeholder : [placeholder]"
      class="pl-1"
    />
    <input
      v-model="searchValue"
      v-else-if="mode === 'search'"
      type="text"
      :placeholder="typeof placeholder === 'string' ? placeholder : ''"
      class="pl-1 flex-1"
      :maxlength="maxLength"
      confirm-type="search"
      @confirm="confirm"
    />
    <es-icons
      name="close"
      color="#999999"
      class="ml-1"
      v-if="searchValue"
      @click="clear"
    />
  </view>
</template>

<style scoped></style>
