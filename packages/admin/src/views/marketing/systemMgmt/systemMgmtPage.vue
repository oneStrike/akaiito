<script lang="ts" setup>
import { formOptions } from './Shared'

defineOptions({
  name: 'ClientSystemMgmtPage'
})

const clientSystemMgmt = ref()
const formSubmit = async () => {}
</script>

<template>
  <div class="main-page">
    <es-form
      ref="esFormRef"
      :form-props="{ labelPosition: 'top' }"
      :options="formOptions"
      v-model="clientSystemMgmt"
      @submit="formSubmit"
    />
  </div>
</template>

<style scoped></style>
