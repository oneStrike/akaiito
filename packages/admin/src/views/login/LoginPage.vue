<script setup lang="ts">
import { getCaptcha } from '@/api/modules/open'

getCaptcha()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<template>
  <el-button>我是登陆页面</el-button>
</template>

<style scoped></style>
