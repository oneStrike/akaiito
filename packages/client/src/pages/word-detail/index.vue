<script setup lang="ts">
import { WorkApi } from '@/apis/work'
import EsTag from '@/components/es-tag/es-tag.vue'

defineOptions({
  name: 'WordDetailPage',
})

const word = ref<IterateObject>({
  detail: {},
  relation: {},
  chapters: {},
})

onMounted(() => {
  const query = useRouter.getQuery()

  const apiInst = new WorkApi(query!.apiPath, query!.id, query!.type)
  const formatDetailData = (data: IterateObject) => {
    if (query.type === 'comic') {
      return {
        name: data.comic?.name,
        introduce: data.comic?.brief,
        cover: data.comic?.cover,
        author: data.comic?.author,
        status: data.comic?.status,
        popular: data.comic?.popular,
        tags: data.comic?.theme ?? [],
        updatedDate: data.comic?.datetime_updated,
      }
    }
  }

  const initPage = async () => {
    const [detail] = await Promise.all([
      apiInst.detail(),
      // apiInst.relation(),
      // apiInst.chapters(),
    ])
    word.value.detail = formatDetailData(detail)
    // word.value.relation = relation
    // word.value.chapters = chapters
  }

  initPage()
})

function convertToTenThousand(num: number): string {
  const value = num / 10000
  return `${value.toFixed(2)}万`
}
</script>

<template>
  <es-page :title="word.detail.name" :nav-bar="false">
    <template v-if="word.detail.name">
      <view class="relative">
        <image
          :src="word.detail.cover"
          class="w-full vertical-middle"
          mode="aspectFill"
        />
        <view class="bg w-full p-4 h-20 absolute bottom-0">
          <es-text
            cn
            :text="word.detail.name"
            color="white"
            size="xl"
            :line-clamp="1"
          />
          <view class="mt-2">
            <es-text
              v-for="author in word.detail.author"
              :key="author.path_word"
              :text="`作者：${author.name}`"
              color="white"
              size="sm"
            />
            <es-text
              class="ml-2"
              :text="`最后更新：${word.detail.updatedDate}`"
              color="white"
              size="sm"
            />
          </view>
        </view>
      </view>
      <view class="p-2">
        <view class="flex">
          <es-tag :text="word.detail.status.display" cn />
          <view class="ml-4">
            <es-tag text="流行指数">
              <template #right>
                <es-text
                  :text="convertToTenThousand(word.detail.popular)"
                  size="sm"
                  class="ml-2"
                />
              </template>
            </es-tag>
          </view>
        </view>
        <view class="flex mt-4">
          <es-tag
            v-for="tag in word.detail.tags"
            :key="tag.path_word"
            :text="tag.name"
            class="mr-4"
          />
        </view>
        <view class="mt-4">
          <es-text :text="word.detail.introduce" cn />
        </view>
      </view>
    </template>
  </es-page>
</template>

<style scoped lang="scss">
.bg {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
}
</style>
