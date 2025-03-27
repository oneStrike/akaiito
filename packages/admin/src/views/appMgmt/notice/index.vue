<script setup lang="ts">
import type {
  GetAppNoticeDetailTypesRes,
  GetAppNoticeListTypesRes,
  UpdateAppNoticeTypesReq,
} from '@/apis/types/appNotice'
import {
  createAppNoticeApi,
  deleteAppNoticeApi,
  getAppNoticeDetailApi,
  getAppNoticeListApi,
  publishAppNoticeApi,
  updateAppNoticeApi,
} from '@/apis/appNotice'
import { getAppPagesApi } from '@/apis/appPageConfig'
import { PromptsEnum } from '@/enum/prompts'
import { utils } from '@/utils'
import {
  filter,
  formOptions,
  tableColumns,
  toolbar,
} from '@/views/appMgmt/notice/shared'

defineOptions({
  name: 'NoticePage',
})
type TableItem = GetAppNoticeDetailTypesRes & {
  enable: string
}

const modalFrom = reactive({
  show: false,
  loading: false,
})
const formTool = useFormTool(formOptions)
getAppPagesApi({ pageSize: '500' }).then((res) => {
  formTool.specificItem('pageCode', (item) => {
    item.componentProps!.options = res.list.map((item) => ({
      label: item.pageName,
      value: item.pageCode,
    }))
  })
})

const currentRow = ref<TableItem | null>(null)

const { loading, reset, request, requestData, params } = useRequest(
  getAppNoticeListApi,
  {
    hook: formatList,
  },
)

function formatList(data: GetAppNoticeListTypesRes) {
  data.list.forEach((item: any) => {
    const { enableWeb, enableApplet, enableApp, startTime, endTime } = item
    item.statusText = '正常'
    item.statusColor = 'primary'
    item.statusCode = 1
    if (!enableApp && !enableWeb && !enableApplet) {
      item.statusText = '暂无可发布平台'
      item.statusColor = 'danger'
      item.statusCode = 0
    } else if (utils.dayjs() > utils.dayjs(endTime)) {
      item.statusText = '已过期'
      item.statusColor = 'danger'
      item.statusCode = 2
    } else if (item.isPublish) {
      item.statusText = '已发布'
      item.statusColor = 'primary'
      item.statusCode = 3
    }
  })
  return data
}

const openFormModal = async (row?: TableItem) => {
  if (row) {
    currentRow.value = await getAppNoticeDetailApi({ id: row.id })
    let enable = ''
    if (currentRow.value!.enableApplet) {
      enable += '0,'
    }
    if (currentRow.value!.enableWeb) {
      enable += '1,'
    }
    if (currentRow.value!.enableApp) {
      enable += '2,'
    }
    currentRow.value!.enable = enable
  }
  modalFrom.show = true
}
const submitForm = async (
  value: UpdateAppNoticeTypesReq & { enable: string },
) => {
  modalFrom.loading = true
  if (value.pageCode) {
    const pages = formTool.getItem('pageCode')[0].componentProps!.options!
    value.pageName = pages.find((item) => item.value === value.pageCode)!.label
  }
  value.enableApplet = value.enable.includes('0')
  value.enableWeb = value.enable.includes('1')
  value.enableApp = value.enable.includes('2')
  if (Array.isArray(value.startTime) && value.startTime.length === 2) {
    const [startTime, endTime] = value.startTime
    value.startTime = startTime
    value.endTime = endTime
  }
  if (currentRow.value?.id) {
    value.id = currentRow.value.id
    await updateAppNoticeApi(value)
  } else {
    await createAppNoticeApi(value)
  }
  useMessage.success(
    currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
  )
  currentRow.value = null
  modalFrom.loading = false
  modalFrom.show = false
  await reset()
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-table
      v-model:params="params"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @reset="reset"
      @query="request"
      @toolbar-handler="openFormModal()"
    >
      <template #enableApplet="{ row }">
        <es-switch
          :row="row"
          field="enableApplet"
          :request="updateAppNoticeApi"
          @success="request()"
        />
      </template>
      <template #enableWeb="{ row }">
        <es-switch
          :row="row"
          field="enableWeb"
          :request="updateAppNoticeApi"
          @success="request()"
        />
      </template>
      <template #enableApp="{ row }">
        <es-switch
          :row="row"
          field="enableApp"
          :request="updateAppNoticeApi"
          @success="request()"
        />
      </template>

      <template #status="{ row }">
        <el-text :type="row.statusColor">{{ row.statusText }}</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteAppNoticeApi"
          :row="row"
          @success="request()"
        />
        <es-pop-confirm
          v-model:loading="loading"
          :confirm-text="row.isPublish === 1 ? '取消发布' : '发布'"
          :request="publishAppNoticeApi"
          :row="row"
          field="isPublish"
          @success="request()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formTool.options"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
