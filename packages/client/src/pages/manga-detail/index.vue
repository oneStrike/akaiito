<script setup lang="ts">
import {
  getMangaChaptersApi,
  getMangaDetailApi,
  getMangaRelationApi,
} from '@/apis/work'

defineOptions({
  name: 'MangaDetailPage',
})

const mangaDetail = ref<IterateObject>({
  detail: {},
  relation: {},
  chapters: {},
})
const initPage = async (path: string) => {
  const [detail, relation, chapters] = await Promise.all([
    getMangaDetailApi(path),
    getMangaRelationApi(path),
    getMangaChaptersApi(path),
  ])
  mangaDetail.value.detail = detail
  mangaDetail.value.relation = relation
  mangaDetail.value.chapters = chapters
  console.log(mangaDetail.value)
}

onLoad((options) => {
  initPage(options!.apiPath)
})
</script>

<template>
  <es-page :title="mangaDetail.detail.comic.name">
    <es-text cn :text="mangaDetail.detail.comic.brief" />
    <image :src="mangaDetail.detail.comic.cover"></image>
  </es-page>
</template>

<style scoped lang="scss"></style>
