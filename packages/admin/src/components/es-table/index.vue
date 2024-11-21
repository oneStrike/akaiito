<script lang="ts" setup>
import type { EsTableProps } from '@/components/es-table/types'

const props = withDefaults(defineProps<EsTableProps>(), {})

const tableData = ref()
const loading = ref(true)
props.api().then((res) => {
  tableData.value = res.list
  loading.value = false
})
</script>

<template>
  <es-loading v-model="loading">
    <a-table :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'username'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
  </es-loading>
</template>
