<script setup lang="ts">
import type { GetNoticeTypesRes } from '@/apis/types/appManage'
import { getNoticeApi } from '@/apis/appManage'

defineOptions({
  name: 'HomePage',
})
const popupRef = ref()
const notice = ref<GetNoticeTypesRes>()
onLoad(async () => {
  notice.value = await getNoticeApi()
  if (notice.value.content) {
    nextTick(() => {
      popupRef.value.open()
    })
  }
})

function closeNotice() {
  popupRef.value.close()
  if (notice.value?.pageCode) {
    useRouter.navigateTo({ name: notice.value.pageCode })
  }
}
</script>

<template>
  <view>
    <uni-popup ref="popupRef" type="center" :is-mask-click="false">
      <view class="w-60 h-80 p-2 bg-white rounded-xl">
        <view class="overflow-auto h-64 mb-2">
          <rich-text :nodes="notice?.content" />
        </view>
        <es-button type="primary" text="确认" size="large" :round="false" text-size="sm" @click="closeNotice" />
      </view>
    </uni-popup>
  </view>
</template>

<style scoped lang="scss"></style>
