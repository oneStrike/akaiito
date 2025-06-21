<script setup lang="ts">
  import type { DetailTypesRes, UpdateTypesReq } from '@/apis/types/notice'
  import type { EsTableColumn } from '@/components/es-table/types.ts'
  import type { ToolbarFilter } from '@/components/es-toolbar/types.ts'
  import * as noticeApi from '@/apis/notice.ts'
  import * as pageConfigApi from '@/apis/page-config.ts'
  import { PromptsEnum } from '@/enum/prompts'
  import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
  import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'
  import NoticeDetail from '@/views/appMgmt/notice/detail.vue'
  import { formOptions, toolbar } from '@/views/appMgmt/notice/shared'

  defineOptions({
    name: 'NoticePage',
  })

  const modalFrom = reactive({
    show: false,
    loading: false,
  })
  const filter = ref<ToolbarFilter>()
  const tableColumns = ref<EsTableColumn>()

  const formTool = useFormTool(formOptions)
  pageConfigApi.pageApi({ pageSize: 500 }).then((res) => {
    formTool.specificItem('pageCode', (item) => {
      item.componentProps!.options = res.list.map((item) => ({
        label: item.pageName,
        value: item.pageCode,
      }))
      filter.value = formOptionsToFilterOptions(formTool.options, {
        isPopup: 6,
        priority: 6,
        type: 6,
        pageCode: 6,
        title: 6,
      })
      tableColumns.value = formOptionsToTableColumn(
        formTool.options,
        ['content', 'isPopup', 'isTop', 'startTime', 'backgroundImage'],
        {
          title: {
            columnType: 'link',
          },
        },
      )
    })
  })

  const showDetail = ref(false)
  const currentRow = ref<(DetailTypesRes & IterateObject) | null>(null)
  const tableRef = useTemplateRef('tableRef')

  const openDetailModal = ({ row }: any) => {
    currentRow.value = row
    showDetail.value = true
  }

  const openFormModal = async (row?: DetailTypesRes) => {
    if (row) {
      currentRow.value = await noticeApi.detailApi({ id: row.id })
      currentRow.value.enablePlatform = ''
      if (currentRow.value.enableApplet) {
        currentRow.value.enablePlatform += '0,'
      }
      if (currentRow.value.enableWeb) {
        currentRow.value.enablePlatform += '1,'
      }
      if (currentRow.value.enableApp) {
        currentRow.value.enablePlatform += '2,'
      }
    }
    modalFrom.show = true
  }
  const submitForm = async (value: UpdateTypesReq & IterateObject) => {
    modalFrom.loading = true
    if (value.pageCode) {
      const pages = formTool.getItem('pageCode')[0].componentProps!.options!
      value.pageName = pages.find(
        (item) => item.value === value.pageCode,
      )!.label
    }
    value.enableApplet = value.enablePlatform.includes('0')
    value.enableWeb = value.enablePlatform.includes('1')
    value.enableApp = value.enablePlatform.includes('2')
    if (Array.isArray(value.startTime) && value.startTime.length === 2) {
      const [startTime, endTime] = value.startTime
      value.startTime = startTime
      value.endTime = endTime
    }
    if (currentRow.value?.id) {
      value.id = currentRow.value.id
      await noticeApi.updateApi(value)
    } else {
      await noticeApi.createApi(value)
    }
    useMessage.success(
      currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
    )
    currentRow.value = null
    modalFrom.loading = false
    modalFrom.show = false
    tableRef.value?.reset()
  }
</script>

<template>
  <div class="main-page">
    <es-table
      v-if="tableColumns"
      ref="tableRef"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :request-api="noticeApi.pageApi"
      @link="openDetailModal"
      @toolbar-handler="openFormModal()"
    >
      <template #enableApplet="{ row }">
        <es-switch
          :row="row"
          field="enableApplet"
          :request="noticeApi.updateApi"
          @success="tableRef?.refresh()"
        />
      </template>
      <template #enableWeb="{ row }">
        <es-switch
          :row="row"
          field="enableWeb"
          :request="noticeApi.updateApi"
          @success="tableRef?.refresh()"
        />
      </template>
      <template #enableApp="{ row }">
        <es-switch
          :row="row"
          field="enableApp"
          :request="noticeApi.updateApi"
          @success="tableRef?.refresh()"
        />
      </template>
      <template #isPublish="{ row }">
        <el-text
          v-if="row.endTime && $dayjs(row.endTime).isBefore($dayjs())"
          type="danger"
        >
          已下线
        </el-text>
        <el-text v-else-if="row.isPublish" type="success">已发布</el-text>
        <el-text v-else-if="!row.isPublish" type="danger">未发布</el-text>
      </template>

      <template #status="{ row }">
        <el-text :type="row.statusColor">{{ row.statusText }}</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <es-pop-confirm
          ids
          :request="noticeApi.batchDeleteApi"
          :row="row"
          @success="tableRef?.reset()"
        />
        <es-pop-confirm
          :disabled="row.endTime && $dayjs(row.endTime).isBefore($dayjs())"
          :confirm-text="row.isPublish ? '取消发布' : '发布'"
          :request="noticeApi.updateStatusApi"
          :row="row"
          ids
          field="isPublish"
          @success="tableRef?.refresh()"
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

    <NoticeDetail
      v-if="currentRow && showDetail"
      :visible="showDetail"
      :record-id="currentRow.id"
      @close="((currentRow = null), (showDetail = false))"
    />
  </div>
</template>

<style scoped lang="scss"></style>
