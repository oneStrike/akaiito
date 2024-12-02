<script lang="ts" setup>
import { useFormTool } from '@/hooks/useForm'
import { formOptions, tableColumn, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})
const formModal = reactive({
  show: false,
  loading: false,
})

const formInst = useFormTool(formOptions)
formInst.specificItem('authorId', (item) => {
  item.componentProps!.remoteMethod = async (val: string) => {
    console.log(val)
  }
  return item
})

function toolbarHandler(type: string) {
  if (type === 'add') {
    formModal.show = true
  }
}

function submitForm(val: IterateObject) {
  console.log(val)
}
</script>

<template>
  <div class="main-page">
    <es-table :toolbar="toolbar" :columns="tableColumn" :data="[]" @toolbar-handler="toolbarHandler" />
    <es-modal-form
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      title="漫画"
      :options="formInst.formOptions"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
