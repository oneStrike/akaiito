<script lang="ts" setup>
import { getClientSystemConfigApi, updateClientSystemConfigApi } from '@/apis/clientManage'
import { useMessage } from '@/hooks/useFeedback'
import { formOptions } from './shared'

defineOptions({
  name: 'ClientSystemMgmtPage',
})
const configData = ref()

async function formSubmit() {
  await updateClientSystemConfigApi(configData.value)
  useMessage.success('更新成功')
}

async function getConfigData() {
  configData.value = (await getClientSystemConfigApi()) || {}
}

getConfigData()
</script>

<template>
  <div class="main-page">
    <es-form v-model="configData" :form-props="{ labelPosition: 'top' }" :options="formOptions" @submit="formSubmit" />
  </div>
</template>

<style scoped></style>
