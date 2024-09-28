<script setup lang="ts">
import { PromptsEnum } from '@/enum/prompts'
import { useMessage } from '@/hooks/useFeedback'
import type { AsyncFn, IterateObject } from '@typings/index'

export interface EsPopConfirmProps<T = IterateObject> {
  request: AsyncFn
  row: T
  ids?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<EsPopConfirmProps>(), {})
const emits = defineEmits<{
  (event: 'update:row'): void
  (event: 'update:loading'): void
  (event: 'success'): void
  (event: 'error', error: any): void
}>()

const row = useVModel(props, 'row', emits)
const loading = useVModel(props, 'loading', emits)

async function deleteRow() {
  try {
    loading.value = true
    const params = {
      [props.ids ? 'ids' : 'id']: props.ids ? [row.value.id] : row.value.id,
    }
    await props.request(params)
    loading.value = false
    useMessage.success(PromptsEnum.DELETED)
    emits('success')
  } catch (e) {
    loading.value = false
    emits('error', e)
  }
}
</script>

<template>
  <el-popconfirm
    width="180"
    confirm-button-text="删除"
    cancel-button-text="取消"
    confirm-button-type="danger"
    title="是否删除当前项？"
    trigger="click"
    @confirm="deleteRow"
  >
    <template #reference>
      <slot>
        <el-button type="danger" link> 删除 </el-button>
      </slot>
    </template>
  </el-popconfirm>
</template>

<style scoped></style>
