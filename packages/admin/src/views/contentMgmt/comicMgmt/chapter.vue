<script setup lang="ts">
import type { GetComicDetailTypesRes } from '@/apis/types/comic'
import { deleteChapterApi, getChapterApi, updateChapterPublishApi } from '@/apis/chapter'
import { chapterColumn, chapterFilter, toolbar } from '@/views/contentMgmt/comicMgmt/shared'
import { deleteComicApi } from '@/apis/comic'

defineOptions({
  name: 'ComicChapter',
})

const props = withDefaults(defineProps<{
  record: GetComicDetailTypesRes | null
}>(), {})

const { request, requestData, loading, params, sortChange } = useRequest(getChapterApi, {
  init: false,
})

const modalShow = defineModel('show', {
  type: Boolean,
  default: false,
})
watch(modalShow, val => val && request({
  comicId: props.record?.id,
}))
</script>

<template>
  <es-modal v-model="modalShow" title="章节列表">
    <es-table
      v-model:params="params"
      v-loading="loading"
      :toolbar="[toolbar![0]]"
      :filter="chapterFilter"
      :columns="chapterColumn"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @query="request"
      @sort-change="sortChange"
    >
      <template #isPublish="{ row }">
        <es-switch :row="row" :request="updateChapterPublishApi" field="isPublish" @success="request" />
      </template>
      <template #action="{ row }">
        <el-button link type="primary">内容</el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm v-model:loading="loading" :request="deleteChapterApi" :row="row" @success="request" />
      </template>
    </es-table>
  </es-modal>
</template>

<style scoped lang="scss">

</style>
