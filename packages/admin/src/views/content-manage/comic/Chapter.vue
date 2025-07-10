<script setup lang="ts">
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import type { ComicChapterDetailResponse } from '@/apis/types/comic-chapter'
  import {
    batchDeleteComicChapterApi,
    comicChapterDetailApi,
    comicChapterPageApi,
    createComicChapterApi,
    swapChapterNumbersApi,
    updateComicChapterApi,
  } from '@/apis/comic-chapter'
  import { PromptsEnum } from '@/enum/prompts'
  import {
    chapterColumn,
    chapterFilter,
    chapterFormOptions,
    toolbar,
  } from '@/views/content-manage/comic/shared'

  type Row = ComicChapterDetailResponse

  defineOptions({
    name: 'ComicChapter',
  })

  const props = withDefaults(
    defineProps<{
      comic: ComicDetailResponse
    }>(),
    {},
  )
  const formTool = useFormTool(chapterFormOptions)

  const formModal = reactive({
    show: false,
    loading: false,
    data: {} as Row,
  })

  const showContentModal = ref(false)

  const currentRecord = ref<Row | null>()
  const tableRef = useTemplateRef('tableRef')
  const tableParams = reactive({
    comicId: props.comic?.id,
  })

  const modalShow = defineModel('show', {
    type: Boolean,
    default: false,
  })

  async function submit(val: any) {
    val.comicId = props.comic?.id
    if (currentRecord.value?.id) {
      val.id = currentRecord.value.id
      await updateComicChapterApi(val)
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      await createComicChapterApi(val)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModal.show = false
    formModal.loading = false
  }

  async function editContent(row: Row) {
    currentRecord.value = row
    showContentModal.value = true
  }

  async function openForm(row: Row) {
    currentRecord.value = row
    formModal.data = await comicChapterDetailApi({ id: row.id })
    formModal.show = true
  }

  function formChange(val: Row) {
    formTool.toggleDisplay('purchaseAmount', val.viewRule === 3)
  }
</script>

<template>
  <EsModal v-model="modalShow" :title="`【${comic.name}】`" width="900">
    <EsTable
      ref="tableRef"
      v-model:params="tableParams"
      drag
      :toolbar="[toolbar![0]]"
      :filter="chapterFilter"
      :columns="chapterColumn"
      :request-api="comicChapterPageApi"
      :drag-api="swapChapterNumbersApi"
    >
      <template #isPublish="{ row }">
        <EsSwitch
          :row="row"
          :request="updateComicChapterApi"
          field="isPublish"
          @success="tableRef?.refresh()"
        />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" @click="editContent(row)">
          内容
        </el-button>
        <el-divider direction="vertical" />
        <el-button link type="primary" @click="openForm(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <EsPopConfirm
          :request="batchDeleteComicChapterApi"
          ids
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :model-value="formModal.data"
      :default-value="currentRecord"
      title="章节"
      width="800"
      :options="formTool.options"
      @update:model-value="formChange"
      @submit="submit"
      @closed="currentRecord = null"
    />
  </EsModal>
</template>

<style scoped lang="scss"></style>
