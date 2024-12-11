<script setup lang="ts">
import type { CreateChapterTypesReq, GetChapterTypesRes } from '@/apis/types/chapter'
import type { GetComicDetailTypesRes } from '@/apis/types/comic'
import type { EsFormOptions } from '@/components/es-form/types'
import { createChapterApi, deleteChapterApi, getChapterApi, updateChapterPublishApi } from '@/apis/chapter'
import { PromptsEnum } from '@/enum/prompts'
import { chapterColumn, chapterFilter, chapterFormOptions, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

type TableItem = ResolveListItem<typeof requestData.value>

defineOptions({
  name: 'ComicChapter',
})

const props = withDefaults(
  defineProps<{
    record: GetComicDetailTypesRes | null
  }>(),
  {},
)


const formTool = useFormTool(chapterFormOptions)

const { request, requestData, loading, params, sortChange } = useRequest(getChapterApi, {
  init: false,
})

const formModal = reactive({
  show: false,
  loading: false,
  data: {} as CreateChapterTypesReq,
})

const contentFormModal = reactive({
  show: false,
  loading: false,
  chapter: null as TableItem | null,
})

const contentFormOptions: EsFormOptions[] = reactive([
  {
    field: 'contents',
    component: 'Upload',
    props: {
      label: '内容',
      rules: useValidate.required('内容'),
    },
    componentProps: {
      placeholder: '请上传内容',
      listType: 'picture',
      fileType: 'image',
      multiple: true,
      scenario: 'content',
      maxCount: 9999,
      structure: 'string',
      data: {
        comicId: props.record?.id,
        chapterId: contentFormModal.chapter?.id,
      },
    },
  },
])

const currentRow = ref<TableItem | null>()

const modalShow = defineModel('show', {
  type: Boolean,
  default: false,
})
watch(
  modalShow,
  (val) =>
    val &&
    request({
      comicId: props.record?.id,
    }),
)

watch(formModal.data, (val: CreateChapterTypesReq) => {
  formTool.toggleDisplay('purchaseAmount', val.viewRule === 3)
}, { deep: true })

async function submit(val: CreateChapterTypesReq) {
  val.comicId = props.record?.id
  await createChapterApi(val)
  formModal.show = false
  useMessage.success(PromptsEnum.CREATED)
  request({
    comicId: props.record?.id,
  })
}

async function editContent(row: TableItem) {
  contentFormModal.chapter = row
  contentFormModal.show = true
  console.log(contentFormModal.chapter)
}
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
      @toolbar-handler="formModal.show = true"
      @sort-change="sortChange"
    >
      <template #isPublish="{ row }">
        <es-switch :row="row" :request="updateChapterPublishApi" field="isPublish" @success="request" />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" @click="editContent(row)">内容</el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm v-model:loading="loading" :request="deleteChapterApi" :row="row" @success="request" />
      </template>
    </es-table>

    <es-modal-form
      v-model="formModal.data"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :default-value="currentRow"
      title="章节"
      width="800"
      :options="formTool.options"
      @submit="submit"
    />
    <es-modal-form
      v-model:show="contentFormModal.show"
      v-model:loading="contentFormModal.loading"
      :default-value="currentRow"
      title="内容"
      width="800"
      :options="contentFormOptions"
      @submit="submit"
    />
  </es-modal>
</template>

<style scoped lang="scss"></style>
