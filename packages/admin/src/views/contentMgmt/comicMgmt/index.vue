<script lang="ts" setup>
import { getAuthorPageApi } from '@/apis/author'
import { formOptions, tableColumn, toolbar } from '@/views/contentMgmt/comicMgmt/shared'
import { getCategoryPageApi } from '@/apis/category'
import { createComicApi } from '@/apis/comic'
import type { CreateComicTypesReq } from '@/apis/types/comic'

defineOptions({
  name: 'ContentMgmtPage',
})
const formModal = reactive({
  show: false,
  loading: false,
})

const formTool = useFormTool(formOptions)
formTool.fillDict([
  { field: 'language', code: 'language' },
  { field: 'region', code: 'region' },
  { field: 'publisher', code: 'publisher' },
])
formTool.specificItem('authorId', (item) => {
  item.componentProps!.remoteMethod = async (val: string) => {
    if (val) {
      item.componentProps!.loading = true
      const data = await getAuthorPageApi({ name: val, pageSize: '500' })
      item.componentProps!.options = data.list.map((item) => ({
        label: item.name,
        value: item.id,
      }))
      item.componentProps!.loading = false
    }
  }
})
getCategoryPageApi({ pageSize: 500 }).then(({ list }) => {
  formTool.specificItem('categoryId', (item) => {
    item.componentProps!.options = list.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  })
})

function toolbarHandler(type: string) {
  if (type === 'add') {
    formModal.show = true
  }
}

async function submitForm(val: CreateComicTypesReq) {
  await createComicApi(val)
  formModal.show = false
  formModal.loading = false
  ElMessage.success('添加成功')
}
</script>

<template>
  <div class="main-page">
    <es-table :toolbar="toolbar" :columns="tableColumn" :data="[]" @toolbar-handler="toolbarHandler" />
    <es-modal-form
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :options="formTool.options"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
