<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  getFunPluginApi,
  createFunPluginApi,
  updateFunPluginStatusApi
} from '@/apis/funPlugin'
import type { GetFunPluginTypings } from '@/apis/funPlugin.d'
import {
  filter,
  toolbar,
  formOptions
} from '@/views/marketing/funPlugin/Shared'
import type { IterateObject } from '@akaiito/typings/src'
import { useFormTool } from '@/hooks/useForm'
import { useMessage } from '@/hooks/useFeedback'

const formScheme = useFormTool(formOptions)
const formModal = ref(false)
const currentRow = ref<GetFunPluginTypings['Response']['data'][number]>()
const { request, loading, resetRequest, requestData } =
  useRequest(getFunPluginApi)
request()

const pluginType = ['', '小说', '漫画', '图片', '视频']

/*新增插件信息*/
const handlerToolbar = () => {}

formScheme.toggleDisplay(['price', 'assistPurchaseCount'], false)

/*新增编辑插件信息*/
const submitForm = async (val) => {
  if (Array.isArray(val.avatar)) {
    val.avatar = val.avatar[0].filePath
  }
  await createFunPluginApi(val)
  formModal.value = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！'
  })
  currentRow.value = null
  request()
}

const formChange = (val: IterateObject) => {
  formScheme.toggleDisplay(['price', 'assistPurchaseCount'], val.isFree === 0)
}
</script>

<template>
  <div class="main-page pb-6" v-loading="loading">
    <es-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @query="resetRequest"
      @handler="formModal = true"
    />

    <el-space
      wrap
      alignment="stretch"
      size="default"
      v-if="requestData && requestData.data"
      class="overflow-auto"
    >
      <el-card shadow="hover" v-for="item in requestData.data" :key="item.id">
        <div class="flex justify-between w-260px">
          <div class="flex">
            <el-image
              :src="item.avatar"
              class="w12 h12 rounded-md mr-2"
            ></el-image>
            <div class="flex flex-col flex-auto">
              <el-tooltip :content="item.name" placement="top">
                <span class="truncate w-220px">{{
                  item.name + item.name
                }}</span>
              </el-tooltip>
              <div class="flex justify-between">
                <el-tag
                  class="w-fit mt-1"
                  size="small"
                  :type="item.status ? 'success' : 'danger'"
                  effect="light"
                >
                  {{ item.status ? '上线中' : '下线中' }}
                </el-tag>
                <es-switch :row="item" :request="updateFunPluginStatusApi" />
              </div>
            </div>
          </div>
        </div>
        <el-divider />
        <el-descriptions :column="1">
          <el-descriptions-item label="插件类型："
            >{{ pluginType[item.type] }}
          </el-descriptions-item>
          <el-descriptions-item label="出售价格："
            >{{ item.price }}
          </el-descriptions-item>
          <el-descriptions-item label="购买人数："
            >{{ item.purchaseCount }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-space>

    <es-modal-form
      v-model:modal="formModal"
      :model-value="{ type: 1, isFree: 1 }"
      :title="currentRow?.id ? '修改插件' : '新增插件'"
      :options="formScheme.formOptions"
      :default-value="currentRow"
      @change="formChange"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped lang="scss"></style>
