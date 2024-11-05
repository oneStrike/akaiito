<script setup lang="ts">
import { WorkApi } from '@/apis/work'

defineOptions({
  name: 'WordDetailPage',
})

const word = ref<IterateObject>({
  detail: {},
  relation: {},
  chapters: {},
})
const query = useRouter.getQuery()
const apiInst = new WorkApi(query!.apiPath, query!.id, query!.type)

const formatDetailData = (data: IterateObject) => {
  if (query.type === 'comic') {
    return {
      name: data.comic?.name,
      introduce: data.comic?.brief,
      cover: data.comic?.cover,
    }
  }
}

const initPage = async () => {
  const [detail, relation, chapters] = await Promise.all([
    apiInst.detail(),
    apiInst.relation(),
    apiInst.chapters(),
  ])
  word.value.detail = formatDetailData(detail)
  word.value.relation = relation
  word.value.chapters = chapters
}

initPage()
</script>

<template>
  <es-page :title="word.detail.name">
    <template v-if="word.detail.name">
      <es-text cn :text="word.detail.introduce" />
    </template>
  </es-page>
</template>

<style scoped lang="scss"></style>
