<script setup lang="ts">
import type { BasicProps } from '@/components/libs/types/basicProps'
import { getLocationApi } from '@/apis/common'

defineOptions({
  name: 'EsLocation',
  options: {
    virtualHost: true,
  },
})

withDefaults(defineProps<EsLocationProps>(), {
  placeholder: '请选择位置',
})

export interface EsLocationProps extends BasicProps {}

const modelValue = defineModel({
  default: '',
})

onMounted(() => {
  uni.getLocation({
    type: 'wgs84',
    success: async res => {
      const { result } = await getLocationApi(res)
      modelValue.value = result.address
    },
  })
})

const choose = () => {
  uni.chooseLocation({
    success: res => {
      modelValue.value = res.name
    },
  })
}

const clearLocation = () => {
  modelValue.value = ''
}
</script>

<template>
  <view class="h-full w-full flex justify-between leading-9" @click="choose">
    <es-text
      class="flex-1 overflow-x-auto whitespace-nowrap w-0!"
      :style="{ textAlign: position }"
      :text="modelValue || placeholder"
      :color="modelValue ? (disabled ? 'disabled' : 'base') : 'placeholder'"
    />
    <view v-if="modelValue" class="pl-1 pr-1" @click.stop="clearLocation()">
      <uni-icons v-if="!disabled" type="clear" size="24" color="#c0c4cc" />
    </view>
    <es-icons v-else type="uni" name="right" color="placeholder" class="ml-2" />
  </view>
</template>

<style scoped lang="scss"></style>
