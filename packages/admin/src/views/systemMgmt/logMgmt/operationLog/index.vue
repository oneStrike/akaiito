<script setup lang="ts">
import { getRequestLogsApi } from '@/apis/logs'
import { tableColumns } from '@/views/systemMgmt/logMgmt/operationLog/shared'

defineOptions({
  name: 'OperationLog',
})
</script>

<template>
  <es-page>
    <es-table :columns="tableColumns" :api="getRequestLogsApi">
      <template #customRender="{ column, text, record }">
        <template v-if="column.dataIndex === 'responseCode'">
          <es-text v-if="text === 200" type="success">成功</es-text>
          <a-popover v-else placement="top">
            <template #content>
              {{ record.responseDesc }}
            </template>
            <template #title>
              <es-text type="danger"> 失败es-text></es-text>
            </template>
          </a-popover>
        </template>
      </template>
    </es-table>
  </es-page>
</template>

<style scoped lang="scss"></style>
