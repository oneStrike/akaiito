<script setup lang="ts">
import { getFunPluginApi } from '@/apis/funPlugin'
import { useRouter } from '@/hooks/useRouter'

defineOptions({
  name: 'Plugins'
})

const tabs = ['小说', '漫画', '图片', '视频']
const { requestRes, request, loading } = useRequest(getFunPluginApi, {
  refresh: true
})
const tabChange = (val: number) => {
  request({ type: val + 1 })
}

const showDetail = (item: any) => {
  console.log(item)
  useRouter()?.navigateTo({ name: 'pluginsDetail' })
}
</script>

<template>
  <es-page background-color="#f5f5f5" tabs>
    <es-tabs :tabs="tabs" @change="tabChange" />
    <view class="pl-3 pr-3 pt-3">
      <es-list :data="requestRes?.data" :loading="loading">
        <es-card
          v-for="item in requestRes?.data"
          :key="item.id"
          :flex="true"
          class="mb-3"
          @click="showDetail(item)"
        >
          <image
            class="!w-10 !h-10 rounded mr-3"
            :src="$filePath(item.avatar)"
            mode="aspectFill"
          ></image>
          <view class="flex flex-col justify-between">
            <es-text :text="item.name" />
            <es-text :text="'积分：' + item.price" size="xs" color="primary" />
          </view>
        </es-card>
      </es-list>
    </view>
  </es-page>
</template>
