<script setup lang="ts">
interface ModalHtml {
  visible: boolean
  content?: string
  width?: number
  height?: number
  title?: string
}
const props = withDefaults(defineProps<ModalHtml>(), {
  title: '详情'
})
const emits = defineEmits<{
  (event: 'closed'): void
}>()
</script>

<template>
  <el-dialog
    destroy-on-close
    :model-value="visible"
    :title="title"
    width="70%"
    top="8vh"
    style="height: 85vh; overflow: auto"
    @closed="emits('closed')"
  >
    <div class="w_100 h_100">
      <div class="" v-html="content"></div>
    </div>
  </el-dialog>
</template>
