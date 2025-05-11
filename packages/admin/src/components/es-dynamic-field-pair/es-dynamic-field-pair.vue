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
  (event: 'update:modelValue', val: string | { label: string, value: string }[]): void
}>()

const items = ref<{ label: string, value: string }[]>([])
watch(() => props.modelValue, (val) => {
  if (!val) {
    items.value = [{ label: '', value: '' }]
  } else {
    items.value = utils.parseJson(val)
  }
}, { deep: true, immediate: true })

function removeItem(idx: number) {
  items.value.splice(idx, 1)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in items" :key="index" class="flex items-center"
      :class="items.length !== 1 && index !== items.length - 1 ? 'mb-2' : ''"
    >
      <div class="flex">
        <el-input v-model="item.label" maxlength="200" :placeholder="placeholder[0] ?? ''" />
        <el-input v-model="item.value" maxlength="200" :placeholder="placeholder[1] ?? ''" class="ml-2" />
      </div>
      <es-icon v-if="index !== 0" name="closeCircle" class="ml-2" :size="22" color="error" @click="removeItem(index)" />
      <es-icon
        v-if="index === items.length - 1" name="plusCircle" class="ml-2" :size="22"
        color="success"
        @click="items.push({ label: '', value: '' })"
      />
    </div>
  </div>
</template>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
