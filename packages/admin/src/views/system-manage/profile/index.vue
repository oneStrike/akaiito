<script setup lang="ts">
  import type {
    UserInfoByIdResponse,
    UserUpdatePasswordRequest,
  } from '@/apis/types/user'
  import type { EsFormOptions } from '@/components/es-form/types'
  import { onMounted, reactive, ref } from 'vue'
  import * as requestLogApi from '@/apis/request-log.ts'
  import * as userApi from '@/apis/user.ts'
  import { useUserStore } from '@/stores/modules/user.ts'
  import { loginLogsColumns, loginLogsFilter } from './shared.ts'

  /**
   * 用户信息数据
   */
  const userInfo = ref<UserInfoByIdResponse | null>(null)

  const userStore = useUserStore()

  /**
   * 修改密码相关状态
   */
  const showPasswordDialog = ref(false)
  const passwordLoading = ref(false)
  const passwordFormData = reactive<UserUpdatePasswordRequest>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    refreshToken: userStore.token.refreshToken,
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
   * 处理修改密码
   */
  const handleUpdatePassword = async () => {
    try {
      // 表单验证
      passwordLoading.value = true
      await userApi.userUpdatePasswordApi(passwordFormData)
      useMessage.success('修改密码成功')
      showPasswordDialog.value = false
      userStore.token.accessToken = ''
      await userStore.signOut()
    } finally {
      passwordLoading.value = false
    }
  }

  const tableRef = templateRef('tableRef')
  const loginLogsParams = ref({
    requestPath: '/api/admin/user/user-login',
    username: userStore.userInfo?.username,
  })

  /**
   * 页面加载时获取用户信息
   */
  onMounted(async () => {
    userInfo.value = await userApi.userInfoApi()
  })
</script>

<template>
  <div class="h-full flex flex-col p-5">
    <!-- 主要内容区域 -->
    <div class="flex flex-1 gap-5 overflow-hidden">
      <!-- 左侧：用户信息和安全设置 -->
      <div class="flex-1 flex flex-col gap-5 h-full overflow-y-auto">
        <!-- 用户信息 -->
        <el-card class="hover:shadow-lg transition-all duration-300">
          <template #header>
            <div class="flex justify-between items-center">
              <el-text tag="h3" class="flex items-center gap-2 font-semibold text-lg">
                <es-icon name="user" :size="20" />
                个人信息
              </el-text>
            </div>
          </template>
          <div>
            <div class="flex items-center pb-6 mb-8" style="border-bottom: 1px solid var(--el-border-color-light)">
              <div class="relative mr-8">
                <el-avatar
                  :size="80"
                  :src="userInfo?.avatar ?? ''"
                  class="shadow-lg"
                  style="border: 3px solid var(--el-border-color-light)"
                />
                <el-badge
                  value="在线"
                  class="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                  type="success"
                />
              </div>
              <div class="flex-1">
                <el-text tag="h2" class="font-bold mb-2 text-2xl">
                  {{ userInfo?.username || '未设置' }}
                </el-text>
                <el-text type="info" class="text-base mb-4 block">
                  {{ userInfo?.role === 0 ? '超级管理员' : '管理员' }}
                </el-text>
              </div>
            </div>

            <div class="gap-5 grid grid-cols-2">
              <div
                class="p-4 rounded-lg"
                style="background-color: var(--el-fill-color-light); border-left: 4px solid var(--el-color-primary)"
              >
                <el-text type="info" class="flex items-center gap-2 font-semibold mb-2 text-sm">
                  手机号码
                </el-text>
                <el-text class="text-base font-medium">
                  {{ userInfo?.mobile || '未设置' }}
                </el-text>
              </div>
              <div
                class="p-4 rounded-lg"
                style="background-color: var(--el-fill-color-light); border-left: 4px solid var(--el-color-primary)"
              >
                <el-text type="info" class="flex items-center gap-2 text-sm font-semibold mb-2">
                  用户ID
                </el-text>
                <el-text class="text-base font-medium">
                  {{ userInfo?.id || '未知' }}
                </el-text>
              </div>
              <div
                class="p-4 rounded-lg"
                style="background-color: var(--el-fill-color-light); border-left: 4px solid var(--el-color-primary)"
              >
                <el-text type="info" class="flex items-center gap-2 text-sm font-semibold mb-2">
                  注册时间
                </el-text>
                <el-text class="text-base font-medium">
                  {{
                    $dayjs(userInfo?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </el-text>
              </div>
              <div
                class="p-4 rounded-lg"
                style="background-color: var(--el-fill-color-light); border-left: 4px solid var(--el-color-primary)"
              >
                <el-text type="info" class="flex items-center gap-2 text-sm font-semibold mb-2">
                  更新时间
                </el-text>
                <el-text class="text-base font-medium">
                  {{
                    $dayjs(userInfo?.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </el-text>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 安全设置 -->
        <el-card class="hover:shadow-lg transition-all duration-300">
          <template #header>
            <div class="flex justify-between items-center">
              <el-text tag="h3" class="flex items-center gap-2 text-lg font-semibold">
                <es-icon name="lock" :size="20" />
                安全设置
              </el-text>
            </div>
          </template>
          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200"
              style="border: 1px solid var(--el-border-color)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center p-2 rounded-full"
                  style="background-color: var(--el-color-primary-light-8)"
                >
                  <es-icon name="lock" :size="18" style="color: var(--el-color-primary)" />
                </div>
                <div>
                  <el-text tag="h4" class="font-semibold mb-1">登录密码</el-text>
                  <el-text type="info" class="text-sm">
                    定期更换密码，保护账户安全
                  </el-text>
                </div>
              </div>
              <el-button
                type="primary"
                size="small"
                @click="showPasswordDialog = true"
              >
                修改密码
              </el-button>
            </div>

            <div
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200"
              style="border: 1px solid var(--el-border-color)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-full flex items-center justify-center"
                  style="background-color: var(--el-color-success-light-8)"
                >
                  <es-icon name="user" :size="18" style="color: var(--el-color-success)" />
                </div>
                <div>
                  <el-text tag="h4" class="font-semibold mb-1">账户状态</el-text>
                  <el-text type="info" class="text-sm">当前账户状态正常</el-text>
                </div>
              </div>
              <el-tag type="success" size="small">正常</el-tag>
            </div>

            <div
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200"
              style="border: 1px solid var(--el-border-color)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-full flex items-center justify-center"
                  style="background-color: var(--el-color-warning-light-8)"
                >
                  <es-icon name="phone" :size="18" style="color: var(--el-color-warning)" />
                </div>
                <div>
                  <el-text tag="h4" class="font-semibold mb-1">手机绑定</el-text>
                  <el-text type="info" class="text-sm">
                    {{ userInfo?.mobile ? '已绑定手机号' : '未绑定手机号' }}
                  </el-text>
                </div>
              </div>
              <el-tag
                :type="userInfo?.mobile ? 'success' : 'warning'"
                size="small"
              >
                {{ userInfo?.mobile ? '已绑定' : '未绑定' }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧：登录日志 -->
      <div class="overflow-hidden h-full w-2/3 request-log">
        <el-card
          class="flex flex-col h-full hover:shadow-lg transition-all duration-300"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <el-text tag="h3" class="flex items-center gap-2 text-lg font-semibold">
                <es-icon name="listBox" :size="20" />
                登录日志
              </el-text>
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
              :request-api="requestLogApi.requestLogPageApi"
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

    <!-- 修改密码弹窗 -->
    <es-modal-form
      v-if="showPasswordDialog"
      v-model="passwordFormData"
      v-model:show="showPasswordDialog"
      title="修改密码"
      :width="600"
      :height="240"
      :options="passwordFormOptions"
      @submit="handleUpdatePassword"
    />
  </div>
</template>

<style scoped lang="scss">
  .request-log {
    :deep(.el-card__body) {
      height: 93%;
      display: flex;
    }
  }
</style>
