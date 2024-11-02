<script setup lang="ts">
import type { EsPickerProps } from '@/components/es-picker/types'
import type { IterateObject } from '@/types/global'

defineOptions({
  name: 'EsPicker',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsPickerProps>(), {
  mode: 'selector',
  position: 'left',
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: number | string): void
}>()
const innerValue = computed({
  get: () => {
    if (['number', 'string'].includes(typeof props.modelValue)) {
      let res: IterateObject = {}
      if (props.mode === 'selector') {
        props.options.forEach((item, idx) => {
          if (item.value === props.modelValue) {
            res = {
              pickerValue: idx,
              value: item.value,
              text: item.text,
            }
          }
        })
      } else if (['date', 'time'].includes(props.mode)) {
        res = {
          value: props.modelValue,
          pickerValue: props.modelValue,
          text: props.modelValue,
        }
      }
      return res
    }
    return {
      pickerValue: 0,
      value: '',
      text: '',
    }
  },
  set: newVal => {
    emits('update:modelValue', newVal.value)
  },
})

const change = ({ detail }: any) => {
  const target = props.options[detail.value]
  innerValue.value = {
    pickerValue: detail.value,
    value: target.value,
    text: target.text,
  }
}

const clearPicker = () => {
  innerValue.value = {
    pickerValue: 0,
    value: '',
    text: '',
  }
}
</script>

<template>
  <picker
    :class="disabled ? 'bg-#F7F6F6' : ''"
    class="h-full w-full leading-9"
    :mode="mode"
    :range="options"
    range-key="text"
    :value="innerValue.pickerValue"
    :disabled="disabled"
    @change="change"
  >
    <view class="h-full w-full flex justify-between">
      <es-text
        class="flex-1 break-all"
        :style="{ textAlign: position }"
        :text="innerValue.text || placeholder"
        :color="
          innerValue.text ? (disabled ? 'disabled' : 'base') : 'placeholder'
        "
      />
      <view
        v-if="innerValue.text"
        class="pl-1 pr-1"
        @click.stop="clearPicker()"
      >
        <uni-icons v-if="!disabled" type="clear" size="24" color="#c0c4cc" />
      </view>
      <es-icons
        v-else
        type="uni"
        name="right"
        color="placeholder"
        class="ml-2"
      />
    </view>
  </picker>
</template>

<style scoped lang="scss"></style>
