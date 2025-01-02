<script setup lang="ts">
import type { CreateChapterTypesReq, UpdateChapterOrderTypesReq } from '@/apis/types/chapter'
import type { GetComicDetailTypesRes } from '@/apis/types/comic'
import {
  createChapterApi,
  deleteChapterApi,
  getChapterApi,
  updateChapterApi,
  updateChapterOrderApi,
  updateChapterPublishApi,
} from '@/apis/chapter'
import { PromptsEnum } from '@/enum/prompts'
import ComicContent from '@/views/contentMgmt/comicMgmt/content.vue'
import { chapterColumn, chapterFilter, chapterFormOptions, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

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
  getChapterApi,
  {
    defaultParams: {
      comicId: props.comic?.id,
    },
    init: false,
  },
)

const formModal = reactive({
  show: false,
  loading: false,
  data: {} as CreateChapterTypesReq,
})

const showContentModal = ref(false)

const currentChapter = ref<TableItem | null>()

const modalShow = defineModel('show', {
  type: Boolean,
  default: false,
})
watch(
  modalShow,
  (val) => {
    if (val) {
      request()
    }
  },
  {
    immediate: true,
  },
)

watch(
  formModal.data,
  (val: CreateChapterTypesReq) => {
    formTool.toggleDisplay('purchaseAmount', val.viewRule === 3)
  },
  { deep: true },
)

async function submit(val: any) {
  val.comicId = props.comic?.id
  if (currentChapter.value?.id) {
    val.id = currentChapter.value.id
    await updateChapterApi(val)
  } else {
    await createChapterApi(val)
  }
  formModal.show = false
  formModal.loading = false
  useMessage.success(PromptsEnum.CREATED)
  request()
}

async function editContent(row: TableItem) {
  currentChapter.value = row
  showContentModal.value = true
}

async function sortChapter(val: UpdateChapterOrderTypesReq) {
  await updateChapterOrderApi(val)
  useMessage.success(PromptsEnum.UPDATED)
  await request()
}
</script>

<template>
  <es-modal v-model="modalShow" :title="`【${comic.name}】`" width="900">
    <es-table
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
        <es-switch
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
        <el-button
          link
          type="primary"
          @click="((formModal.show = true), (currentChapter = row))"
        >
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteChapterApi"
          :row="row"
          @success="request"
        />
      </template>
    </es-table>

    <EsModalForm
      v-if="formModal.show"
      v-model="formModal.data"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :default-value="currentChapter"
      title="章节"
      width="800"
      :options="formTool.options"
      @submit="submit"
      @closed="currentChapter = null"
    />
    <ComicContent
      v-if="showContentModal && currentChapter"
      v-model:show="showContentModal"
      title="内容"
      width="800"
      :comic-id="comic!.id"
      :chapter-id="currentChapter!.id"
      @submit="submit"
      @closed="currentChapter = null"
    />
  </es-modal>
</template>

<style scoped lang="scss"></style>
