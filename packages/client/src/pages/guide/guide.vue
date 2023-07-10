<script setup lang="ts">
import { useStorage } from '@/hooks/useStorage'
import { StorageEnum } from '@/enum/storage'
import { getSocialCirclePageApi } from '@/api/socialCircle/socialCircle'
import { ClientGetSocialCirclePageRes } from '~@/apiTypes/socialCirlce'

type socialCircleItem = ClientGetSocialCirclePageRes['list'][number]

const useRouter = uni.$lk.router

const socialCircle = ref<ClientGetSocialCirclePageRes>()
const getSocialCircle = async () => {
  socialCircle.value = await getSocialCirclePageApi({ guide: '1' })
}
getSocialCircle()

const selected = ref<number[]>([])
const selection = (val: socialCircleItem) => {
  const idx = selected.value.findIndex((item) => item === val.id)
  if (idx !== -1) {
    selected.value.splice(idx, 1)
  } else {
    selected.value.push(val.id)
  }
}

const selectedAll = () => {
  socialCircle.value?.list.forEach((item) => {
    selected.value.push(item.id)
  })
  goHome()
}

const goHome = () => {
  useStorage.set(StorageEnum.FIRST_ENTERING, 1)
  if (selected.value.length) {
  } else {
    useRouter.reLaunch({
      path: '/home/home'
    })
  }
}
</script>

<template>
  <view>
    <view class="head">
      <view class="flex_center mb_16">
        <lk-text text="选择你感兴趣的方向" size="utmost" />
      </view>
      <lk-text text="为你推荐丰富多样的内容" align="center" class="w_100" />
    </view>

    <view
      class="pd_16 flex flex_wrap main_between over_scroll content flex_1 mt_16"
      v-if="socialCircle"
    >
      <view
        v-for="item in socialCircle.list"
        :key="item.id"
        class="mb_16 pos_re item flex_center flex_col"
        @click="selection(item)"
      >
        <image
          :src="$FILE_PATH + item.icon"
          class="icon border_radius_small mb_8 w_100 h_100"
        ></image>
        <lk-text :text="item.name" size="small" align="center" />
        <view class="check_status pos_ab flex_center">
          <lk-text
            :icon="selected.includes(item.id) ? 'checkbox' : 'circle'"
            :type="selected.includes(item.id) ? 'primary' : 'minor'"
            size="utmost"
          />
        </view>
      </view>
    </view>

    <view class="btn main_between flex_center pd_16 w_100">
      <lk-button size="medium" text="一键开启推荐" @click="selectedAll" />
      <lk-text
        center
        type="minor"
        size="small"
        text="直接进入"
        @click="goHome"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.head {
  padding-top: 50px;
}

.skip_btn {
  right: 20px;
}

.btn {
  position: fixed;
  bottom: 0;
  left: 0;

  .next {
    width: 380rpx;
  }
}

.item {
  width: 215rpx;
  height: fit-content;

  .icon {
    height: 215rpx;
  }

  .check_status {
    top: 0;
    right: 0;
  }
}
</style>
