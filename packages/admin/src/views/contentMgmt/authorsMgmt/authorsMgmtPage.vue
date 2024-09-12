<script lang="ts" setup>
import { getAuthorPageApi } from '@/apis/author'
import { useRequest } from '@/hooks/useRequest'

defineOptions({
  name: 'AuthorsMgmtPage',
})

const { request, loading, requestData } = useRequest(getAuthorPageApi)
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">作者管理</div>
</template>

<style scoped></style>
