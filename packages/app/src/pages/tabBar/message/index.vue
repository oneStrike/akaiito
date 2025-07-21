<script setup lang="ts">
  defineOptions({
    name: 'PortraitPage',
  })

  const messageTypeList = [
    {
      label: '未读消息',
      value: 'news',
      icon: '/static/icons/message/msg-news.svg',
    },
    {
      label: '文章评论',
      value: 'comment',
      icon: '/static/icons/message/msg-comment.svg',
    },
    {
      label: '点赞喜欢',
      value: 'followed',
      icon: '/static/icons/message/msg-followed.svg',
    },
    {
      label: '私信消息',
      value: 'private',
      icon: '/static/icons/message/msg-private.svg',
    },
    {
      label: '系统通知',
      value: 'system',
      icon: '/static/icons/message/msg-system.svg',
    },
  ]

  const currentMessageType = ref('news')
</script>

<template>
  <es-page padding background-color="#f5f6f7">
    <view class="flex justify-around pt-4">
      <view
        v-for="item in messageTypeList"
        :key="item.value"
        class="flex flex-col justify-center items-center"
        @click="currentMessageType = item.value"
      >
        <image class="w-88rpx h-88rpx mb-1 rounded-full" :src="item.icon" />
        <es-text :color="currentMessageType === item.value ? 'primary' : ''">
          {{ item.label }}
        </es-text>
      </view>
    </view>

    <view
      class="flex flex-col justify-center items-center w-full h-780rpx mt-6 bg-white rounded-lg shadow"
    >
      <es-text size="lg" color="info">Hi！请登录</es-text>

      <view class="flex mt-4">
        <view
          hover-class="opacity-70"
          class="flex flex items-center py-2 login-btn px-7 rounded-md"
        >
          <es-icons class="mr-1" size="lg" name="login" color="white" />
          <es-text color="white">登录</es-text>
        </view>
        <view
          hover-class="opacity-70"
          class="flex px-7 py-2 rounded-md flex items-center ml-4 register-btn"
        >
          <es-icons class="mr-1" size="lg" name="register" color="hite" />
          <es-text color="white">注册</es-text>
        </view>
      </view>
    </view>
  </es-page>
</template>

<style scoped lang="scss">
  .shadow {
    box-shadow: 0 0 20rpx rgba(116, 116, 116, 0.08);
  }

  .login-btn {
    background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
  }
  .register-btn {
    background: linear-gradient(135deg, #f59f54 10%, #ff6922 100%);
  }
</style>
