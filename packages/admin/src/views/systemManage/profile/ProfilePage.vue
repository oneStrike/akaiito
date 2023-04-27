<script setup lang="ts">
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import { userStore } from '@/stores'
import { updateUserInfoApi, updatePasswordApi } from '@/api/user'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type { AdminUpdatePasswordReq, AdminUserInfoRes } from '~@/apiTypes/user'
import { infoForm, pwdForm } from '@/views/systemManage/profile/shared'
const useUserStore = userStore()
const { userInfo } = storeToRefs(useUserStore)

/**
 * 修改用户信息
 * @param val
 */
const loading = ref(false)
const updateUserInfo = async (val: AdminUserInfoRes) => {
  try {
    loading.value = true
    await updateUserInfoApi(val)
    await useUserStore.getUserInfo()
    loading.value = false
    useMessage.success(HintEnum.UPD_SUC)
  } catch (e) {
    loading.value = false
  }
}

/**
 * 修改密码
 */
const updatePwdSubmit = async (val: AdminUpdatePasswordReq) => {
  await updatePasswordApi(val)
  await useUserStore.refreshTokenFn()
  useMessage.success(HintEnum.UPD_SUC)
}

//更新头像
const uploadSuccess = async (data: CommonUploadRes) => {
  userInfo.value.avatar = data[0].path
  await updateUserInfo(userInfo.value)
}
</script>

<template>
  <n-grid :cols="2" :x-gap="8" class="h_100">
    <n-gi>
      <n-card class="h_100">
        <n-space justify="center">
          <basic-upload
            fileClassify="shared"
            list-type="image"
            :show-file-list="false"
            :max="1"
            :retain-file-list="false"
            @success="uploadSuccess"
          >
            <n-avatar
              class="cursor_pointer"
              :src="$FILE_PATH + userInfo.avatar"
              :size="100"
							object-fit="cover"
							circle
            ></n-avatar>
          </basic-upload>
        </n-space>
        <n-h2 class="tc">{{ userInfo.username }}</n-h2>
        <n-descriptions label-placement="left" :columns="1" bordered>
          <n-descriptions-item>
            <template #label> 账号 </template>
            {{ userInfo.account }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label> 手机号 </template>
            {{ userInfo.mobile }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label> 邮箱 </template>
            {{ userInfo.email }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label> 角色 </template>
            {{ userInfo.isRoot === 1 ? '超级管理员' : '管理员' }}
          </n-descriptions-item>
          <n-descriptions-item>
            <template #label> 创建日期 </template>
            {{ userInfo.createdAt }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card class="h_100">
        <n-tabs size="large" animated>
          <n-tab-pane name="signin" tab="修改信息">
            <basic-form
              :options="infoForm"
              :model-value="userInfo"
              :loading="loading"
              @submit="updateUserInfo"
            ></basic-form>
          </n-tab-pane>
          <n-tab-pane name="signup" tab="修改密码">
            <basic-form
              :options="pwdForm"
              :loading="loading"
              @submit="updatePwdSubmit"
            ></basic-form>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-gi>
  </n-grid>
</template>
