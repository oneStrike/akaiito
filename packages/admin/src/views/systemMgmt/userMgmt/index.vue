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
      <template #action="{ record }">
        <a-button>{{ record.username }}</a-button>
      </template>
    </es-table>
  </es-page>
</template>

<style scoped lang="scss"></style>
