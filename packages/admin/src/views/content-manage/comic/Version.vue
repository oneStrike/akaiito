<script setup lang="ts">
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import { comicVersionPageApi } from '@/apis/comic-version.ts'

  defineOptions({
    name: 'ComicChapter',
  })

  const props = withDefaults(
    defineProps<{
      comic: ComicDetailResponse
    }>(),
    {},
  )

  const modalShow = defineModel({
    type: Boolean,
    default: false,
  })
</script>

<template>
  <EsModal v-model="modalShow" :title="`【${comic.name}】`" width="900">
    <EsTable :request-api="comicVersionPageApi" />
  </EsModal>
</template>

<style scoped lang="scss"></style>
