<script setup lang="ts">
import { PromptsEnum } from '@/enum/prompts'
import { useMessage } from '@/hooks/useFeedback'

export interface EsSwitchProps<T = IterateObject> {
  row: T
  ids?: boolean
  field?: string
  request: AsyncFn
}

const props = withDefaults(defineProps<EsSwitchProps>(), {
  ids: false,
  field: 'isEnabled',
})
const emits = defineEmits<{
  (event: 'success'): void
  (event: 'error', error: any): void
}>()

const loading = ref(false)

async function toggleStatus() {
  try {
    loading.value = true
    const status = !props.row[props.field]
    const params = {
      [props.ids ? 'ids' : 'id']: props.ids ? [props.row.id] : props.row.id,
      [props.field]: status,
    }
    await props.request(params)
    loading.value = false
    emits('success')
    useMessage.success(PromptsEnum.UPDATED)
    return true
  } catch (e) {
    loading.value = false
    emits('error', e)
    return false
  }
}
</script>

<template>
  <el-switch :model-value="row[field]" :loading="loading" :before-change="toggleStatus" />
</template>

<style scoped></style>
