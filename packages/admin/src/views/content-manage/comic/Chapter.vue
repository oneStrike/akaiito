<script setup lang="ts">
  import type {
    GetChapterTypesRes,
    UpdateChapterOrderTypesReq,
  } from '@/apis/types/chapter'
  import type { GetComicDetailTypesRes } from '@/apis/types/comic'
  import {
    createChapterApi,
    deleteChapterApi,
    getChapterApi,
    getChapterPageApi,
    updateChapterApi,
    updateChapterOrderApi,
    updateChapterPublishApi,
  } from '@/apis/chapter'
  import { PromptsEnum } from '@/enum/prompts'
  import ComicContent from '@/views/content-manage/comic/content.vue'
  import {
    chapterColumn,
    chapterFilter,
    chapterFormOptions,
    toolbar,
  } from '@/views/content-manage/comic/shared'

  type TableItem = ResolveListItem<typeof requestData.value>

  defineOptions({
    name: 'ComicChapter',
  })

  const props = withDefaults(
    defineProps<{
      comic: GetComicDetailTypesRes
    }>(),
    {},
  )
  const formTool = useFormTool(chapterFormOptions)

  const { request, requestData, loading, params, sortChange } = useRequest(
    getChapterPageApi,
    {
      defaultParams: {
        comicId: props.comic?.id,
      },
    },
  )

  const formModal = reactive({
    show: false,
    loading: false,
    data: {} as GetChapterTypesRes,
  })

  const showContentModal = ref(false)

  const currentRecord = ref<TableItem | null>()

  const modalShow = defineModel('show', {
    type: Boolean,
    default: false,
  })

  async function submit(val: any) {
    val.comicId = props.comic?.id
    if (currentRecord.value?.id) {
      val.id = currentRecord.value.id
      await updateChapterApi(val)
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      await createChapterApi(val)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModal.show = false
    formModal.loading = false
    request()
  }

  async function editContent(row: TableItem) {
    currentRecord.value = row
    showContentModal.value = true
  }

  async function sortChapter(val: UpdateChapterOrderTypesReq) {
    await updateChapterOrderApi(val)
    useMessage.success(PromptsEnum.UPDATED)
    await request()
  }

  async function openForm(row: TableItem) {
    currentRecord.value = row
    formModal.data = await getChapterApi({ id: row.id })
    formModal.show = true
  }

  function formChange(val: TableItem) {
    formTool.toggleDisplay('purchaseAmount', val.viewRule === 3)
  }
</script>

<template>
  <EsModal v-model="modalShow" :title="`【${comic.name}】`" width="900">
    <EsTable
      v-model:params="params"
      v-loading="loading"
      :toolbar="[toolbar![0]]"
      :filter="chapterFilter"
      :columns="chapterColumn"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      drag
      @query="request"
      @toolbar-handler="formModal.show = true"
      @sort-change="sortChange"
      @drag-end="sortChapter"
    >
      <template #isPublish="{ row }">
        <EsSwitch
          :row="row"
          :request="updateChapterPublishApi"
          field="isPublish"
          @success="request"
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
          v-model:loading="loading"
          :request="deleteChapterApi"
          :row="row"
          @success="request"
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
    <ComicContent
      v-if="showContentModal && currentRecord"
      v-model:show="showContentModal"
      title="内容"
      :comic-id="comic!.id"
      :chapter-id="currentRecord!.id"
      @submit="submit"
      @closed="currentRecord = null"
    />
  </EsModal>
</template>

<style scoped lang="scss"></style>
