<template>
  <view class="content wh-full"
    >213123
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <es-icons name="foo" :size="100" />
      <es-icons name="MajesticonsAirplaneLine" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello')
</script>
