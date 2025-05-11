<script setup lang="ts">
import { utils } from '@/utils'

export interface EsDynamicFieldPairProps {
  modelValue?: string | { label: string, value: string }[]
  placeholder?: string[]
}

const props = withDefaults(defineProps<EsDynamicFieldPairProps>(), {
  placeholder: () => ['请输入', '请输入'],
  modelValue: () => [{ label: '', value: '' }],
})

const emits = defineEmits<{
  (event: 'update:modelValue', val: null | string | { label: string, value: string }[]): void
}>()

const innerItems = ref<{ label: string, value: string }[]>([])
watch(() => props.modelValue, (val) => {
  if (!innerItems.value.length) {
    if (!val) {
      innerItems.value = [{ label: '', value: '' }]
    } else {
      innerItems.value = utils.parseJson(val)
    }
  }
}, { deep: true, immediate: true })

function addItem() {
  innerItems.value.push({ label: '', value: '' })
}

function removeItem(idx: number) {
  innerItems.value.splice(idx, 1)
}

function valueInputChange() {
  const emitData: typeof props.modelValue = []
  innerItems.value.forEach((item) => {
    if (item.label && item.value) {
      emitData.push(item)
    }
  })
  emits('update:modelValue', emitData.length ? emitData : null)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in innerItems" :key="index" class="flex items-center"
      :class="innerItems.length !== 1 && index !== innerItems.length - 1 ? 'mb-2' : ''"
    >
      <div class="flex">
        <el-input
          v-model="innerItems[index].label"
          maxlength="200"
          :placeholder="placeholder[0] ?? ''"
          @input="valueInputChange()"
        />
        <el-input
          v-model="innerItems[index].value"
          maxlength="200"
          :placeholder="placeholder[1] ?? ''"
          class="ml-2"
          @input="valueInputChange()"
        />
      </div>
      <es-icon v-if="index !== 0" name="closeCircle" class="ml-2" :size="22" color="error" @click="removeItem(index)" />
      <es-icon
        v-if="index === innerItems.length - 1" name="plusCircle" class="ml-2" :size="22"
        color="success"
        @click="addItem"
      />
    </div>
  </div>
</template>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
