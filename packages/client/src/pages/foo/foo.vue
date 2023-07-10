<script setup lang="ts">
import { useRouter } from '@/components/libs/hooks/useRouter'

onLoad((options) => {
  console.log('🚀 ~ file:foo method: line:5 -----', options?.params)
})
const foo = () => {
  console.log('🚀 ~ file:foo method:foo line:11 -----', 5456)
}
</script>

<template>
  <button @click="useRouter.back()">测试</button>
</template>
