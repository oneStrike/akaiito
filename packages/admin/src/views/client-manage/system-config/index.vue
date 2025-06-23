<script lang="ts" setup>
import { getAppConfigApi, updateSystemConfigApi } from '@/apis/appManage'
import { formOptions } from './shared'

defineOptions({
  name: 'AppSystemConfig',
})
const configData = ref()

async function formSubmit() {
  await updateSystemConfigApi(configData.value)
  useMessage.success('更新成功')
}

async function getConfigData() {
  configData.value = (await getAppConfigApi()) || {}
}

getConfigData()
</script>

<template>
  <div class="main-page">
    <es-form v-model="configData" :form-props="{ labelPosition: 'top' }" :options="formOptions" @submit="formSubmit" />
  </div>
</template>

<style scoped></style>
