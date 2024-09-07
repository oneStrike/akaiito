<script setup lang="ts">
import { getFunPluginApi } from '@/apis/funPlugin'

defineOptions({
  name: 'Plugins',
})

const tabs = ['小说', '漫画', '图片', '视频']
const { requestRes, request, loading } = useRequest(getFunPluginApi, {
  refresh: true,
})
function tabChange(val: number) {
  request({ type: val + 1 })
}

function installPlugin(item: any) {
  console.log(item)
}
</script>

<template>
  <es-page background-color="#f5f5f5" tabs>
    <es-tabs :tabs="tabs" @change="tabChange" />
    <view class="pl-3 pr-3 pt-3">
      <es-list :data="requestRes?.list" :loading="loading">
        <es-card
          v-for="item in requestRes?.list"
          :key="item.id"
          :flex="true"
          class="mb-3 flex items-center"
          @click="installPlugin(item)"
        >
          <image
            class="!w-10 !h-10 rounded mr-3"
            :src="$filePath(item.avatar)"
            mode="aspectFill"
          />

          <view class="flex flex-col justify-between">
            <es-text :text="item.name" />
            <es-text
              :text="`积分：${item.price}`"
              size="xs"
              color="primary"
              class="mt-1"
            />
          </view>
        </es-card>
      </es-list>
    </view>
  </es-page>
</template>
