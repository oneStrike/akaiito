<script setup lang="ts">
import { getUserPageApi } from '@/apis/user'
import { tableColumns } from '@/views/systemMgmt/userMgmt/shared'

defineOptions({
  name: 'UserMgmt',
})
</script>

<template>
  <es-page>
    <es-table :columns="tableColumns" :api="getUserPageApi">
      <template #customRender="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button>编辑</a-button>
          <a-button>删除</a-button>
        </template>
      </template>
    </es-table>
  </es-page>
</template>

<style scoped lang="scss"></style>
