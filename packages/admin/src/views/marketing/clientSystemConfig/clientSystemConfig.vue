<script lang="ts" setup>
import { formOptions } from './Shared'
import {
  getClientSystemConfigApi,
  updateClientSystemConfigApi
} from '@/apis/clientManage'
import { useMessage } from '@/hooks/useFeedback'

defineOptions({
  name: 'ClientSystemMgmtPage'
})

const formSubmit = async () => {
  await updateClientSystemConfigApi(configData.value)
  useMessage.success('更新成功')
}

const configData = ref()
const getConfigData = async () => {
  configData.value = await getClientSystemConfigApi()
}
getConfigData()
</script>

<template>
  <div class="main-page">
    <es-form
      ref="esFormRef"
      :form-props="{ labelPosition: 'top' }"
      :options="formOptions"
      v-model="configData"
      @submit="formSubmit"
    />
  </div>
</template>

<style scoped></style>
