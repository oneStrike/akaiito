<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import { getFunPluginApi, createFunPluginApi } from '@/apis/funPlugin'
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
  <div class="main-page" v-loading="loading">
    <es-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @query="resetRequest"
      @handler="formModal = true"
    />

    <el-space wrap size="default" v-if="requestData && requestData.data">
      <el-card shadow="hover" v-for="item in requestData.data" :key="item.id">
        <div class="flex justify-between">
          <div class="flex">
            <el-image
              :src="item.avatar"
              class="w12 h12 rounded-md mr-2"
            ></el-image>
            <div class="flex flex-col flex-auto">
              <el-tooltip :content="item.name" placement="top">
                <span class="truncate w-full">{{ item.name + item.name }}</span>
              </el-tooltip>
              <el-tag
                class="w-fit mt-1"
                size="small"
                :type="item.status ? 'success' : 'danger'"
                effect="light"
              >
                {{ item.status ? '启用' : '禁用' }}
              </el-tag>
            </div>
          </div>
          <el-dropdown>
            <es-icons name="dotsVertical"></es-icons>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item
                  >{{ item.status ? '禁用' : '启用' }}
                </el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="flex flex-wrap justify-between">
          <el-tag class="w-48% mt-2" effect="light" type="info">
            item.label
          </el-tag>
          <el-tag class="w-48% mt-2 ml-2" effect="light" type="info">
            item.label
          </el-tag>
          <el-tag class="w-48% mt-2" effect="light" type="info">
            item.label
          </el-tag>
          <el-tag class="w-48% mt-2" effect="light" type="info">
            item.label
          </el-tag>
        </div>
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
