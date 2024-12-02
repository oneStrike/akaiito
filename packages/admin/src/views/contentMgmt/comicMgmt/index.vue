<script lang="ts" setup>
import { formOptions, tableColumn, toolbar } from '@/views/contentMgmt/comicMgmt/shared'

defineOptions({
  name: 'ContentMgmtPage',
})
const formModal = reactive({
  show: false,
  loading: false,
})

function toolbarHandler(type: string) {
  if (type === 'add') {
    formModal.show = true
  }
}

function submitForm(val) {
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
      :options="formOptions"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped></style>
