<script setup lang="ts">
import type { GetComicDetailTypesRes } from '@/apis/types/comic'

defineOptions({
  name: 'ComicChapter',
})

const props = withDefaults(defineProps<{
  record: GetComicDetailTypesRes | null
}>(), {})
const modalShow = defineModel('modalShow', { type: Boolean, default: false })
</script>

<template>
  <es-modal v-model="modalShow" title="章节列表">
    我是章节列表
  </es-modal>
</template>

<style scoped lang="scss">

</style>
