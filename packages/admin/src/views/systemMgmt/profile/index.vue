<script setup lang="ts">
  import type {
    GetUserInfoTypesRes,
    UpdatePasswordTypesReq,
    UpdateUserInfoTypesReq,
  } from '@/apis/types/user.d'
  import type { EsFormOptions } from '@/components/es-form/types'
  import { ElMessage } from 'element-plus'
  import { onMounted, reactive, ref } from 'vue'
  import * as requestLogApi from '@/apis/request-log.ts'
  import {
    getUserInfoApi,
    updatePasswordApi,
    updateUserInfoApi,
  } from '@/apis/user.ts'
  import {
    editFormOptions,
    loginLogsColumns,
    loginLogsFilter,
  } from './shared.ts'

  /**
   * 用户信息数据
   */
  const userInfo = ref<GetUserInfoTypesRes | null>(null)

  /**
   * 编辑用户信息相关状态
   */
  const showEditDialog = ref(false)
  const updateLoading = ref(false)
  const editFormRef = ref()
  const editFormData = reactive<UpdateUserInfoTypesReq>({
    username: '',
    avatar: '',
    mobile: '',
    status: true,
  })

  /**
   * 修改密码相关状态
   */
  const showPasswordDialog = ref(false)
  const passwordLoading = ref(false)
  const passwordFormRef = ref()
  const passwordFormData = reactive<UpdatePasswordTypesReq>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  /**
   * 修改密码表单配置
   */
  const passwordFormOptions: EsFormOptions[] = [
    {
      field: 'oldPassword',
      component: 'Input',
      props: {
        required: true,
        label: '原密码',
        rules: useValidate.password(true, '原密码'),
      },
      componentProps: {
        placeholder: '请输入原密码',
        type: 'password',
        showPassword: true,
      },
    },
    {
      field: 'newPassword',
      component: 'Input',
      props: {
        required: true,
        label: '新密码',
        rules: useValidate.password(true, '新密码'),
      },
      componentProps: {
        placeholder: '请输入新密码',
        type: 'password',
        showPassword: true,
      },
    },
    {
      field: 'confirmPassword',
      component: 'Input',
      props: {
        required: true,
        label: '确认新密码',
        rules: [
          useValidate.password(true, '确认新密码'),
          {
            validator: (rule: any, value: string, callback: any) => {
              if (value !== passwordFormData.newPassword) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
      componentProps: {
        placeholder: '请再次输入新密码',
        type: 'password',
        showPassword: true,
      },
    },
  ]

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfoApi()
      userInfo.value = res
      // 同步数据到编辑表单
      Object.assign(editFormData, {
        username: res.username || '',
        avatar: res.avatar || '',
        mobile: res.mobile || '',
        status: res.status,
      })
    } catch (error) {
      console.error('获取用户信息失败:', error)
      ElMessage.error('获取用户信息失败')
    }
  }

  /**
   * 处理更新用户信息
   */
  const handleUpdateUserInfo = async () => {
    try {
      // 表单验证
      const valid = await editFormRef.value?.validate()
      if (!valid) return

      updateLoading.value = true
      await updateUserInfoApi(editFormData)
      useMessage.success('更新用户信息成功')
      showEditDialog.value = false
      await fetchUserInfo()
    } finally {
      updateLoading.value = false
    }
  }

  /**
   * 处理修改密码
   */
  const handleUpdatePassword = async () => {
    try {
      // 表单验证
      const valid = await passwordFormRef.value?.validate()
      if (!valid) return

      passwordLoading.value = true
      await updatePasswordApi(passwordFormData)
      useMessage.success('修改密码成功')
      showPasswordDialog.value = false
      // 重置表单
      Object.assign(passwordFormData, {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } finally {
      passwordLoading.value = false
    }
  }

  const tableRef = templateRef('tableRef')
  const loginLogsParams = ref({
    requestPath: '/api/admin/user/login',
  })

  /**
   * 页面加载时获取用户信息
   */
  onMounted(() => {
    fetchUserInfo()
  })
</script>

<template>
  <div class="h-full flex flex-col p-5 bg-gray-50">
    <!-- 主要内容区域 -->
    <div class="flex gap-5 flex-1 overflow-hidden">
      <!-- 左侧：用户信息和安全设置 -->
      <div class="flex-1 flex flex-col gap-5 overflow-y-auto">
        <!-- 用户信息 -->
        <el-card class="hover:shadow-lg transition-all duration-300">
          <template #header>
            <div class="flex justify-between items-center">
              <h3
                class="flex items-center gap-2 text-lg font-semibold text-gray-800"
              >
                <es-icon name="user" :size="20" />
                个人信息
              </h3>
              <el-button type="primary" @click="showEditDialog = true">
                <es-icon name="edit" :size="16" class="mr-1" />
                编辑信息
              </el-button>
            </div>
          </template>
          <div>
            <div class="flex items-center mb-8 pb-6 border-b border-gray-200">
              <div class="relative mr-8">
                <el-avatar
                  :size="80"
                  :src="userInfo?.avatar ?? ''"
                  class="border-gray-200 border-3 shadow-lg"
                />
                <el-badge
                  value="在线"
                  class="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                  type="success"
                />
              </div>
              <div class="flex-1">
                <h2 class="text-gray-800 text-2xl font-bold mb-2">
                  {{ userInfo?.username || '未设置' }}
                </h2>
                <p class="text-base text-gray-500 mb-4">
                  {{ userInfo?.isRoot ? '超级管理员' : '管理员' }}
                </p>
                <div class="flex gap-2">
                  <el-tag v-if="userInfo?.status" type="success" size="small">
                    <es-icon name="check" :size="14" class="mr-1" />
                    正常
                  </el-tag>
                  <el-tag v-else type="danger" size="small">
                    <es-icon name="close" :size="14" class="mr-1" />
                    禁用
                  </el-tag>
                  <el-tag v-if="userInfo?.isRoot" type="warning" size="small">
                    <es-icon name="user" :size="14" class="mr-1" />
                    超级管理员
                  </el-tag>
                </div>
              </div>
            </div>

            <div class="gap-5 grid grid-cols-2">
              <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div
                  class="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-600"
                >
                  <es-icon name="phone" :size="16" />
                  手机号码
                </div>
                <div class="text-base text-gray-800 font-medium">
                  {{ userInfo?.mobile || '未设置' }}
                </div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
                  <es-icon name="user" :size="16" />
                  用户ID
                </div>
                <div class="text-base font-medium text-gray-800">
                  {{ userInfo?.id || '未知' }}
                </div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
                  <es-icon name="calendar" :size="16" />
                  注册时间
                </div>
                <div class="text-base font-medium text-gray-800">
                  {{
                    $dayjs(userInfo?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
                  <es-icon name="clock" :size="16" />
                  更新时间
                </div>
                <div class="text-base font-medium text-gray-800">
                  {{
                    $dayjs(userInfo?.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧：登录日志 -->
      <div class="overflow-hidden w-2/3 request-log">
        <el-card
          class="flex flex-col h-full hover:shadow-lg transition-all duration-300"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <h3
                class="flex items-center gap-2 text-lg font-semibold text-gray-800"
              >
                <es-icon name="listBox" :size="20" />
                登录日志
              </h3>
              <el-button @click="tableRef?.refresh()">
                <es-icon name="reload" :size="16" class="mr-1" />
                刷新
              </el-button>
            </div>
          </template>
          <div class="flex-1 overflow-hidden">
            <es-table
              ref="tableRef"
              v-model:params="loginLogsParams"
              :filter="loginLogsFilter"
              :columns="loginLogsColumns"
              :request-api="requestLogApi.pageApi"
            >
              <template #responseCode="{ row }">
                <el-tag
                  :type="row.responseCode === 200 ? 'success' : 'danger'"
                  size="small"
                >
                  {{ row.responseCode === 200 ? '成功' : '失败' }}
                </el-tag>
              </template>
            </es-table>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 编辑用户信息弹窗 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑个人信息"
      width="500px"
      :close-on-click-modal="false"
    >
      <EsForm
        ref="editFormRef"
        :form-options="editFormOptions"
        :model="editFormData"
        label-width="80px"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button
            type="primary"
            :loading="updateLoading"
            @click="handleUpdateUserInfo"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      v-model="showPasswordDialog"
      title="修改密码"
      width="450px"
      :close-on-click-modal="false"
    >
      <EsForm
        ref="passwordFormRef"
        :form-options="passwordFormOptions"
        :model="passwordFormData"
        label-width="100px"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showPasswordDialog = false">取消</el-button>
          <el-button
            type="primary"
            :loading="passwordLoading"
            @click="handleUpdatePassword"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
  :deep(.el-dialog) {
    border-radius: 8px;
  }

  :deep(.el-dialog__header) {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #e5e7eb;
  }

  :deep(.el-dialog__body) {
    padding: 20px;
  }

  :deep(.el-dialog__footer) {
    padding: 10px 20px 20px;
    border-top: 1px solid #e5e7eb;
  }

  .request-log {
    :deep(.el-card__body) {
      height: 93%;
      display: flex;
    }
  }
</style>
