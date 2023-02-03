<script setup lang="ts">
import Mobile from '@/components/Mobile/Mobile.vue'
import BasicForm from '@/components/Basic/BasicForm.vue'
import { formOptions } from '@/views/App/BootstrapManage/shared'
const configInfo = reactive({
  guideGather: 1,
  guideMust: 0
})
</script>
<template>
  <div class="container">
    <el-alert
      title="主要对于APP初次启动做一些配置，一个良好的启动引导可以更加的吸引用户"
      type="info"
      effect="dark"
    />
    <div class="content mt_16 flex">
      <Mobile></Mobile>
      <el-card class="ml_16 flex1">
        <basic-form
          :options="formOptions"
          v-model="configInfo"
          :label-width="120"
        ></basic-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
