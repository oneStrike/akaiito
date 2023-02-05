<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { modifyPwdForm, modifyInfoForm } from './shared'
import { updatePasswordApi, updateUserInfoApi } from '@/api/user'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import type { AdminUpdatePasswordReq } from '~@/apiTypes/user'
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
    useMessage('success', Hint.UPD_SUC)
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
  useMessage('success', Hint.UPD_SUC)
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
  <el-row class="h_100" :gutter="10">
    <el-col :span="10" class="info">
      <el-card class="flex flex_col h_100">
        <div class="flex flex_col center w_100">
          <basic-upload
            ref="uploadRef"
            :is-clear="true"
            :is-loading="true"
            :data="{ fileType: 'avatar' }"
            list-type="text"
            :uploadMethod="false"
            :show-file-list="false"
            @success="modifyAvatarSuccess"
          >
            <el-avatar
              class="cursor_pointer"
              :size="100"
              :src="$FILE_PATH + userInfo.avatar"
            />
          </basic-upload>
          <span class="fw_b fs20 mt_16">{{ userInfo.username }}</span>
        </div>
        <div class="mt_16">
          <el-descriptions border :column="1" direction="horizontal">
            <el-descriptions-item label="账号">{{
              userInfo.account
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              userInfo.mobile
            }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{
              userInfo.email
            }}</el-descriptions-item>
            <el-descriptions-item label="角色">{{
              userInfo.isRoot === 1 ? '超级管理员' : '管理员'
            }}</el-descriptions-item>
            <el-descriptions-item label="创建日期">{{
              userInfo.createdAt
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14" class="modify">
      <el-card class="h_100">
        <el-tabs v-model="activeTab" class="demo-tabs">
          <el-tab-pane label="基础信息" name="1">
            <basic-form
              :btn-loading="loading"
              v-model="userInfo"
              @submit="modifyInfoSubmit"
              :options="modifyInfoForm"
            ></basic-form>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="2">
            <basic-form
              v-model="pwdForm"
              @submit="modifyPwdSubmit"
              :options="modifyPwdForm"
            ></basic-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>
