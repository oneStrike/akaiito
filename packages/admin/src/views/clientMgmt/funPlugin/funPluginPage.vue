<script setup lang="ts">
import type { GetFunPluginTypesRes } from '@/apis/types/funPlugin'
import type { IterateObject } from '@auy/types'
import {
  createFunPluginApi,
  deleteFunPluginApi,
  getFunPluginApi,
  updateFunPluginApi,
  updateFunPluginStatusApi,
} from '@/apis/funPlugin'
import { useMessage } from '@/hooks/useFeedback'
import { useFormTool } from '@/hooks/useForm'
import { useRequest } from '@/hooks/useRequest'
import { filter, formOptions, toolbar } from '@/views/clientMgmt/funPlugin/shared'

type record = GetFunPluginTypesRes[number]

const formScheme = useFormTool(formOptions)
const formModal = ref(false)
const currentRow = ref<record | null>()
const { request, loading, requestData } = useRequest(getFunPluginApi)
const pluginType = ['', '小说', '漫画', '图片', '视频']

/* 新增插件信息 */
function openEditFormModal(item: record) {
  if (!item.isFree) {
    item.price = Number.parseFloat(item.price) as unknown as string
  }
  formScheme.toggleDisplay(['price', 'assistPurchaseCount'], item.isFree === 0)
  currentRow.value = item
  formModal.value = true
}

formScheme.toggleDisplay(['price', 'assistPurchaseCount'], false)

/* 新增编辑插件信息 */
async function submitForm(val: any) {
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateFunPluginApi(val)
  } else {
    await createFunPluginApi(val)
  }
  formModal.value = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！',
  })
  currentRow.value = null
  request()
}

function formChange(val: IterateObject) {
  formScheme.toggleDisplay(['price', 'assistPurchaseCount'], val.isFree === 0)
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-toolbar :toolbar="toolbar" :filter="filter" @query="request" @handler="formModal = true" />

    <el-space v-if="requestData && requestData.length" wrap alignment="stretch" size="default" class="overflow-auto">
      <el-card v-for="item in requestData" :key="item.id" shadow="hover">
        <div class="flex justify-between w-260px">
          <div class="flex">
            <el-image :src="item.icon" fit="cover" class="w12 h12 rounded-md mr-2" />
            <div class="flex flex-col flex-auto">
              <div class="flex justify-between">
                <span class="truncate w-170px">{{ item.name }}</span>
                <div class="flex">
                  <es-icons name="edit" @click="openEditFormModal(item)" />
                  <es-pop-confirm :request="deleteFunPluginApi" :row="item" @success="request()">
                    <es-icons name="delete" class="ml-2" color="!text-error" />
                  </es-pop-confirm>
                </div>
              </div>
              <div class="flex justify-between">
                <el-tag class="w-fit mt-1" size="small" :type="item.status ? 'success' : 'danger'" effect="light">
                  {{ item.status ? '上线中' : '下线中' }}
                </el-tag>
                <es-switch :row="item" :request="updateFunPluginStatusApi" />
              </div>
            </div>
          </div>
        </div>
        <el-divider />
        <el-descriptions :column="1">
          <el-descriptions-item label="插件类型：">
            {{ pluginType[item.type] }}
          </el-descriptions-item>
          <el-descriptions-item label="出售价格：">
            {{ item.isFree ? '免费' : item.price }}
          </el-descriptions-item>
          <el-descriptions-item label="购买人数：">
            {{ item.purchaseCount }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-space>

    <el-empty v-else description="暂无数据" />

    <es-modal-form
      v-model:modal="formModal"
      :title="currentRow?.id ? '修改插件' : '新增插件'"
      :options="formScheme.formOptions"
      :default-value="currentRow || { type: 1, isFree: 1 }"
      @change="formChange"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.el-divider--horizontal) {
  margin: 12px 0;
}

:deep(.el-descriptions__cell) {
  padding-bottom: 0 !important;
}
</style>
