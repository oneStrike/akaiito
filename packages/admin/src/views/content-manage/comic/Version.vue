<script setup lang="ts">
  import type { ComicDetailResponse } from '@/apis/types/comic'
  import {
    comicVersionPageApi,
    createComicVersionApi,
    deleteComicVersionApi,
  } from '@/apis/comic-version.ts'
  import { PromptsEnum } from '@/enum/prompts.ts'
  import { toolbar } from '@/views/content-manage/comic/shared/comic.ts'
  import {
    versionColumn,
    versionForm,
  } from '@/views/content-manage/comic/shared/version.ts'
  import Chapter from './Chapter.vue'

  defineOptions({
    name: 'ComicChapter',
  })

  const props = withDefaults(
    defineProps<{
      comic: ComicDetailResponse
    }>(),
    {},
  )

  const tableRef = useTemplateRef('table')
  const tableParams = ref({
    comicId: props.comic.id,
  })
  const chapterModal = ref(false)
  const currentRow = ref<ComicDetailResponse | null>(null)
  const formTool = useFormTool(versionForm)
  formTool.fillDict([{ field: 'language', code: 'work_language' }])
  function formChange(val: ComicDetailResponse) {
    formTool.toggleDisplay(['purchaseAmount'], val.readRule === 3)
  }

  const modalShow = defineModel({
    type: Boolean,
    default: false,
  })
  const formModal = reactive({
    show: false,
    loading: false,
    defaultValue: {
      isRecommended: false,
    },
  })

  function openForm(row?: ComicDetailResponse) {
    if (row) {
      currentRow.value = row
    }
    formModal.show = true
  }
  async function submitForm(data: any) {
    data.comicId = props.comic.id
    await createComicVersionApi(data)
    useMessage.success(PromptsEnum.CREATED)
    tableRef.value?.reset()
    formModal.show = false
    formModal.loading = false
  }
</script>

<template>
  <EsModal v-model="modalShow" :title="`【${comic.name}】`" width="900">
    <EsTable
      ref="table"
      v-model:params="tableParams"
      :request-api="comicVersionPageApi"
      :columns="versionColumn"
      :toolbar="[toolbar![0]]"
      @toolbar-handler="openForm()"
    >
      <template #language="{ row }">
        <span>{{ row.id }}</span>
      </template>
      <template #action="{ row }">
        <el-button
          link
          type="primary"
          @click="((currentRow = row), (chapterModal = true))"
        >
          章节
        </el-button>
        <el-divider direction="vertical" />
        <el-button link type="primary" @click="openForm(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm
          :request="deleteComicVersionApi"
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>
    <Chapter v-if="chapterModal" v-model:show="chapterModal" :comic="comic" />
    <EsModalForm
      v-if="formModal.show"
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :default-value="currentRow ? currentRow : formModal.defaultValue"
      :options="formTool.options"
      @update:model-value="formChange"
      @submit="submitForm"
      @close="currentRow = null"
    />
  </EsModal>
</template>

<style scoped lang="scss"></style>
