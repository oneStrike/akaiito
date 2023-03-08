<script setup lang="ts">
import { getPrivacyDetailApi } from '@/api/privacy'
import type { AdminGetPrivacyDetailRes } from '~@/apiTypes/privacy'
const route = useRoute()
const privacy = ref<AdminGetPrivacyDetailRes>()
if (route.query.id) {
  getPrivacyDetailApi({ id: route.query.id as string }).then((res) => {
    privacy.value = res
    useTitle(res.name)
  })
}
</script>

<template>
  <div class="container  w_100 flex_center">
    <n-empty v-if="!route.query.id" description="暂无数据" size="large">
    </n-empty>
    <div v-else-if="privacy" v-html="privacy.content"></div>
  </div>
</template>
