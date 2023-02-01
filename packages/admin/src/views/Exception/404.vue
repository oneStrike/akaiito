<template>
  <el-result title="404" sub-title="生活总归带点荒谬">
    <template #icon>
      <SvgIcon icon-name="404" size="160" />
    </template>
    <template #extra>
      <el-button @click="goHome" type="primary">找点乐子吧</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
const router = useRouter()
const goHome = () => {
  router.back()
}
</script>
