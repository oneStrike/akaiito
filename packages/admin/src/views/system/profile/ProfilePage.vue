<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { modifyPwdForm, modifyInfoForm } from './shared'
import { updatePasswordApi, updateUserInfoApi } from '@/api/user'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import type { AdminUpdatePasswordReq } from '~@/apiTypes/user'
import SvgIcon from '@/components/SvgIcon.vue'
const activeTab = ref('1')
const loading = ref(false)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const uploadRef = ref()
const pwdForm = ref({})

userStore.getUserInfo()

/**
 * 修改用户信息
 * @param val
 */
const modifyInfoSubmit = async (val: typeof userInfo.value) => {
  try {
    loading.value = true
    await updateUserInfoApi(val)
    await userStore.getUserInfo()
    loading.value = false
    useMessage.success(Hint.UPD_SUC)
  } catch (e) {
    loading.value = false
  }
}

/**
 * 修改密码
 */
const modifyPwdSubmit = async (val: AdminUpdatePasswordReq) => {
  await updatePasswordApi(val)
  await userStore.refreshToken()
  useMessage.success(Hint.UPD_SUC)
}

/**
 * 修改用户头像
 */
const modifyAvatarSuccess = async (data: CommonUploadRes) => {
  userInfo.value.avatar = data[0].path
  await modifyInfoSubmit(userInfo.value)
}
</script>

<template>
  <a-row class="h_100 pd_16" :gutter="14">
    <a-col :span="10" class="h_100">
      <a-card class="h_100">
        <div class="flex_col cross_center">
          <base-upload
            ref="uploadRef"
            :limit="1"
            :show-file-list="false"
            list-type="avatar"
            @success="modifyAvatarSuccess"
          >
            <a-avatar
              :image-url="$FILE_PATH + userInfo.avatar"
              :size="80"
              trigger-type="mask"
            >
              <template #trigger-icon>
                <svg-icon color="#ffffff" icon-name="edit" :size="12" />
              </template>
            </a-avatar>
          </base-upload>
          <a-typography-title :heading="4">
            {{ userInfo.username }}
          </a-typography-title>
        </div>
        <div class="mt_16">
          <a-descriptions bordered :column="1" size="large" layout="horizontal">
            <a-descriptions-item label="账号">{{
              userInfo.account
            }}</a-descriptions-item>
            <a-descriptions-item label="手机号">{{
              userInfo.mobile
            }}</a-descriptions-item>
            <a-descriptions-item label="邮箱">{{
              userInfo.email
            }}</a-descriptions-item>
            <a-descriptions-item label="角色">{{
              userInfo.isRoot === 1 ? '超级管理员' : '管理员'
            }}</a-descriptions-item>
            <a-descriptions-item label="创建日期">{{
              userInfo.createdAt
            }}</a-descriptions-item>
          </a-descriptions>
        </div>
      </a-card>
    </a-col>
    <a-col :span="14" class="h_100">
      <a-card class="h_100">
        <a-tabs v-model:active-key="activeTab" size="large">
          <a-tab-pane title="基础信息" key="1">
            <base-form
              :loading="loading"
              :model-value="userInfo"
              @submit="modifyInfoSubmit"
              :options="modifyInfoForm"
            ></base-form>
          </a-tab-pane>
          <a-tab-pane title="修改密码" key="2">
            <base-form
              v-model="pwdForm"
              @submit="modifyPwdSubmit"
              :options="modifyPwdForm"
            ></base-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped lang="less">
:deep(.arco-avatar-trigger-icon-button) {
  bottom: 0;
  right: 0;
}
</style>
