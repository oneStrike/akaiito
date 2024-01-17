<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import { getRequestLogApi } from '@/apis/system'

const { request, resetPageRequest, loading } = useRequest(getRequestLogApi)
request()
</script>

<template>
  <div class="main-page" v-loading="loading">更新日志</div>
</template>

<style scoped></style>
