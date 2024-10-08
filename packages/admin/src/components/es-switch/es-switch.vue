<script setup lang="ts">
import { PromptsEnum } from '@/enum/prompts'
import { useMessage } from '@/hooks/useFeedback'
import type { AsyncFn, IterateObject } from '@typings/index'

export interface EsSwitchProps<T = IterateObject> {
  row: T
  ids?: boolean
  request: AsyncFn
}

const props = withDefaults(defineProps<EsSwitchProps>(), {
  ids: false,
})
const emits = defineEmits<{
  (event: 'update:row'): void
  (event: 'success'): void
  (event: 'error', error: any): void
}>()

const row = useVModel(props, 'row', emits)

async function toggleStatus() {
  try {
    row.value.loading = true
    const status = row.value.status === 0 ? 1 : 0
    const params = {
      [props.ids ? 'ids' : 'id']: props.ids ? [row.value.id] : row.value.id,
      status,
    }
    await props.request(params)
    row.value.loading = false
    row.value.status = status
    emits('success')
    useMessage.success(PromptsEnum.UPDATED)
    return true
  } catch (e) {
    row.value.loading = false
    emits('error', e)
    return false
  }
}
</script>

<template>
  <el-switch
    :active-value="1"
    :inactive-value="0"
    :model-value="row.status"
    :loading="row.loading"
    :before-change="toggleStatus"
  />
</template>

<style scoped></style>
