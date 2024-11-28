<script setup lang="ts">
import { createAppUserApi } from '@/apis/user'
import { useRouter } from '@/hooks/useRouter'
import { useUserStore } from '@/stores/modules/user'

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})
const passwordType = ref(true)
const agree = ref(false)

const signUp = async () => {
  if (!formData.username) {
    uni.showToast({
      icon: 'error',
      title: '请输入账号',
    })
    return
  }
  if (!formData.password) {
    uni.showToast({
      icon: 'error',
      title: '请输入密码',
    })
    return
  }
  if (!formData.confirmPassword) {
    uni.showToast({
      icon: 'error',
      title: '请输入确认密码',
    })
    return
  }

  if (formData.password !== formData.confirmPassword) {
    uni.showToast({
      icon: 'error',
      title: '两次密码不一致',
    })
    return
  }

  if (!agree.value) {
    uni.showToast({
      icon: 'error',
      title: '请同意相关协议',
    })
    return
  }
  const params = {
    password: formData.password,
    username: formData.username,
  }
  await createAppUserApi(formData)
  await useUserStore().login(params)
  await useRouter.reLaunch({ name: 'home' })
}
</script>

<template>
  <view>
    <image src="../../static/images/loginHead.png" class="w-full h-360rpx fixed left-0 top-0" />
    <view class="top-24 relative z-1 px-6">
      <view class="mb-8">
        <es-text text="现在开始" block bold class="mb-2" size="2xl" />
        <es-text text="创建账号以继续" block size="sm" color="minor" />
      </view>
      <view class="mb-7">
        <es-text text="账号" block class="mb-3" />
        <view class="flex items-center rounded-lg p-3 bg-slate-50">
          <es-icons name="user" class="shrink-0 mr-2" color="placeholder" size="2xl" />
          <input v-model="formData.username" type="text" placeholder="请输入账号" class="flex-1">
        </view>
      </view>
      <view class="mb-7">
        <es-text text="密码" block class="mb-3" />
        <view class="flex items-center rounded-lg p-3 bg-slate-50">
          <es-icons name="lock" class="shrink-0 mr-2" color="placeholder" size="2xl" />
          <input v-model="formData.password" placeholder="请输入密码" class="flex-1" :password="passwordType">
          <es-icons
            class="ml-4"
            :name="passwordType ? 'watchOff' : 'watch'"
            color="info"
            @click="passwordType = !passwordType"
          />
        </view>
      </view>
      <view class="mb-3">
        <es-text text="确认密码" block class="mb-3" />
        <view class="flex items-center rounded-lg p-3 bg-slate-50">
          <es-icons name="lock" class="shrink-0 mr-2" color="placeholder" size="2xl" />
          <input
            v-model="formData.confirmPassword"
            placeholder="请输入确认密码"
            class="flex-1"
            :password="passwordType"
          >
          <es-icons
            class="ml-4"
            :name="passwordType ? 'watchOff' : 'watch'"
            color="info"
            @click="passwordType = !passwordType"
          />
        </view>
      </view>
      <view class="mb-10 flex">
        <checkbox :checked="agree" class="scale-70" />
        <view>
          <es-text text="我以阅读并同意" size="xs" color="minor" @click="agree = !agree" />
          <es-text text="《用户协议》" color="primary" size="xs" />
          <es-text text="《隐私协议》" color="primary" size="xs" />
        </view>
      </view>

      <es-button text="注册" size="large" type="primary" @click="signUp" />
    </view>
    <view class="fixed bottom-50rpx left-1/2 -translate-x-1/2">
      <es-text text="已经拥有账号？" color="info" size="sm" />
      <es-text text="登录" color="primary" size="sm" @click="useRouter.navigateTo({ name: 'login' })" />
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
