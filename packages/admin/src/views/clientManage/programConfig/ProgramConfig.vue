<script setup lang="ts">
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import BasicForm from '@/components/basic/BasicForm.vue'

const formOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      path: 'service_agreement',
      label: '服务协议',
      rule: useValidate.url,
      prompt:
        '用户初次启动程序时，会弹窗请求用户授权，若用户拒绝授权，则主动退出APP'
    },
    componentProps: {
      bind: {
        placeholder: '请输入服务协议链接地址'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'privacy_agreement',
      label: '隐私协议',
      rule: useValidate.url,
      prompt:
        '用户初次启动程序时，会弹窗请求用户授权，若用户拒绝授权，则主动退出APP'
    },
    componentProps: {
      bind: {
        placeholder: '请输入隐私协议链接地址'
      }
    }
  }
]
</script>

<template>
  <n-card class="main_block">
    <basic-form
      :options="formOptions"
      :reset-btn="false"
      submit-text="导出代码包"
    ></basic-form>
  </n-card>
</template>

<style scoped lang="scss"></style>
