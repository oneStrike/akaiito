<script setup lang="ts">
import { getFunPluginApi } from '@/apis/funPlugin'

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
</script>

<template>
  <es-page background-color="#f5f5f5" tabs>
    <es-tabs :tabs="tabs" @change="tabChange" />
    <view class="pl-3 pr-3 pt-3">
      <es-list :data="requestRes?.data" :loading="loading">
        <template v-slot="{ record }">
          <es-card class="mb-3 flex">
            <es-image class="w-10 h-10 rounded mr-3" :src="record.avatar" />
            <view class="flex flex-col justify-between">
              <es-text :text="record.name" />
              <es-text
                :text="'积分：' + record.price"
                color="primary"
                size="xs"
              />
            </view>
          </es-card>
        </template>
      </es-list>
    </view>
  </es-page>
</template>

<style scoped></style>
