<script lang="ts" setup>
import EsSearch from '@/components/es-search/es-search.vue'
import { useStorage } from '@/components/libs/hooks/useStorage'
import { useModal } from '@/components/libs/hooks/useModal'

defineOptions({
  name: 'SearchPage'
})

const { storageValue } = useStorage<string[]>('search', [])

const startSearch = (value: string) => {
  if (!storageValue.value!.includes(value)) {
    if (storageValue.value!.length >= 12) {
      storageValue.value!.shift()
    }
    storageValue.value!.unshift(value)
  }
}

const clearHistory = () => {
  useModal({
    content: '确定清空搜索历史吗？',
    success: ({ confirm }) => {
      if (confirm) {
        storageValue.value = []
      }
    }
  })
}
</script>

<template>
  <es-page border-top padding>
    <view class="search pt-2">
      <es-search :focus="true" @confirm="startSearch" />
    </view>
    <view class="mt-6">
      <es-text text="热门搜索" />
      <view class="search-item mt-2">是搜1索</view>
    </view>
    <view class="mt-6">
      <view class="flex justify-between">
        <es-text text="搜索历史" />
        <es-icons name="delete" color="#999999" @click="clearHistory" />
      </view>
      <view class="search-item mt-2 flex flex-wrap">
        <uni-tag
          v-for="(item, index) in storageValue"
          :key="index"
          :inverted="true"
          :text="item"
          class="mr-2 mb-2"
        />
      </view>
    </view>
  </es-page>
</template>

<style scoped></style>
