<script setup lang="ts">
import { booksApi, comicsApi, postsApi } from '@/apis/collect'

defineOptions({
  name: 'BookShelfPage',
})
const tabs = reactive([
  {
    text: '漫画',
    value: 1,
  },
  {
    text: '小说',
    value: 2,
  },
  {
    text: '写真',
    value: 3,
  },
])
const params = ref({})
const listData = ref<IterateObject>({})
const currentTabIdx = ref(0)

const apis = [comicsApi, booksApi, postsApi]
const getList = async (params: any) => {
  return apis[currentTabIdx.value](params)
}
const tabChange = ({ idx }: { idx: number }) => {
  console.log(idx)
}

const goDetail = (item: any) => {
  useRouter.navigateTo({
    name: 'mangaDetail',
    query: {
      apiPath: item.comic.path_word,
      id: item.comic.uuid,
    },
  })
}
</script>

<template>
  <es-page padding>
    <es-tabs :tabs="tabs" @change="tabChange" />
    <es-list v-model:list="listData" v-model:params="params" :api="getList">
      <view class="flex flex-wrap justify-between">
        <view
          v-for="item in listData.data"
          :key="item.id"
          class="relative mb-2 w-31%"
          @click="goDetail(item)"
        >
          <image
            :src="item.comic.cover"
            class="w-full h-40 vertical-middle"
            mode="aspectFill"
          />
          <view class="w-full">
            <es-text :text="item.comic.name" cn :line-clamp="2" size="sm" />
          </view>
        </view>
      </view>
    </es-list>
  </es-page>
</template>

<style scoped lang="scss"></style>
