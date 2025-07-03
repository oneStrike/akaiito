<script setup lang="ts">
  import type {
    CreateNoticeRequest,
    NoticeDetailResponse,
    UpdateNoticeRequest,
  } from '@/apis/types/notice'
  import type { EsTableColumn } from '@/components/es-table/types.ts'
  import type { ToolbarFilter } from '@/components/es-toolbar/types.ts'
  import * as clientPageApi from '@/apis/client-page.ts'
  import * as noticeApi from '@/apis/notice.ts'
  import { PromptsEnum } from '@/enum/prompts'
  import { useBitMask } from '@/hooks/useBitMask'
  import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
  import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'
  import NoticeDetail from '@/views/client-manage/notice/NoticeDetail.vue'
  import {
    enablePlatform,
    formOptions,
    toolbar,
  } from '@/views/client-manage/notice/shared'

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
  clientPageApi
    .clientPagePageApi({ pageSize: 500, pageStatus: 1 })
    .then((res) => {
      formTool.specificItem('pageCode', (item) => {
        item.componentProps!.options = res.list.map((item) => ({
          label: item.pageName,
          value: item.pageCode,
        }))
        filter.value = formOptionsToFilterOptions(formTool.options, {
          showAsPopup: 6,
          priorityLevel: 6,
          noticeType: 6,
          pageCode: 6,
          title: 6,
        })
        tableColumns.value = formOptionsToTableColumn(
          formTool.options,
          [
            'content',
            'showAsPopup',
            'isPinned',
            'popupBackgroundImage',
            'order',
          ],
          {
            dateTimeRange: {
              label: '通知结束时间',
              width: 160,
              prop: 'publishEndTime',
            },
            action: {
              width: 200,
            },
            title: {
              columnType: 'link',
            },
            enablePlatform: {
              width: 150,
              formatter: (row) => {
                return useBitMask
                  .getLabels(row.enablePlatform, enablePlatform)
                  .join('、')
              },
            },
          },
        )
        tableColumns.value.splice(-1, 0, {
          width: 120,
          label: '发布状态',
          prop: 'isPublished',
          align: 'center',
        } as EsTableColumn[number])
      })
    })

  const showDetail = ref(false)
  const currentRow = ref<(NoticeDetailResponse & IterateObject) | null>(null)
  const tableRef = useTemplateRef('tableRef')

  const openDetailModal = ({ row }: any) => {
    currentRow.value = row
    showDetail.value = true
  }

  const openFormModal = async (row?: NoticeDetailResponse) => {
    if (row) {
      currentRow.value = await noticeApi.noticeDetailApi({ id: row.id })
      currentRow.value.dateTimeRange = [
        currentRow.value.publishStartTime,
        currentRow.value.publishEndTime,
      ]
    }
    modalFrom.show = true
  }

  const submitForm = async (value: UpdateNoticeRequest & IterateObject) => {
    modalFrom.loading = true
    if (value.pageCode) {
      const pages = formTool.getItem('pageCode')[0].componentProps!.options!
      value.pageName = pages.find(
        (item) => item.value === value.pageCode,
      )!.label
    }
    value.enablePlatform = useBitMask.set(String(value.enablePlatform))
    if (Array.isArray(value.dateTimeRange) && value.dateTimeRange[0]) {
      const [startTime, endTime] = value.dateTimeRange
      value.publishStartTime = startTime
      value.publishEndTime = endTime
    }
    if (currentRow.value?.id) {
      value.id = currentRow.value.id
      await noticeApi.updateNoticeApi(value)
    } else {
      await noticeApi.createNoticeApi(value as CreateNoticeRequest)
    }
    useMessage.success(
      currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
    )
    modalFrom.loading = false
    modalFrom.show = false
    tableRef.value?.reset()
    currentRow.value = null
  }
</script>

<template>
  <div class="main-page">
    <EsTable
      v-if="tableColumns"
      ref="tableRef"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :request-api="noticeApi.noticePageApi"
      @link="openDetailModal"
      @toolbar-handler="openFormModal()"
    >
      <template #isPublished="{ row }">
        <el-text
          v-if="row.endTime && $dayjs(row.endTime).isBefore($dayjs())"
          type="danger"
        >
          已下线
        </el-text>
        <el-text v-else-if="row.isPublished" type="success">已发布</el-text>
        <el-text v-else-if="!row.isPublished" type="danger">未发布</el-text>
      </template>

      <template #status="{ row }">
        <el-text :type="row.statusColor">{{ row.statusText }}</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <EsPopConfirm
          ids
          :request="noticeApi.batchDeleteNoticeApi"
          :row="row"
          @success="tableRef?.reset()"
        />
        <EsPopConfirm
          :disabled="
            !row.isPublished
            && row.publishEndTime
            && $dayjs(row.publishEndTime).isBefore($dayjs())
          "
          :confirm-text="row.isPublished ? '取消发布' : '发布'"
          :request="noticeApi.batchUpdateNoticeStatusApi"
          :row="row"
          ids
          field="isPublished"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <EsModalForm
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
