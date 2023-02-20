<script setup lang="ts">
import { loginLogApi } from '@/api/user'
import { columns } from '@/views/system/log/loginLog/shared'
</script>

<template>
  <div class="main_block">
    <base-table :request-api="loginLogApi" :columns="columns"></base-table>
  </div>
</template>
