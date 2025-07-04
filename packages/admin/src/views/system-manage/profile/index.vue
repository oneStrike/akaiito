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
    requestPath: '/api/admin/user/login',
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
  <div class="layout-container h-full flex flex-col">
    <!-- 主要内容区域 -->
    <div class="flex flex-1 gap-5 overflow-hidden">
      <!-- 左侧：用户信息和安全设置 -->
      <div class="flex-1 flex flex-col gap-5 h-full overflow-y-auto">
        <!-- 用户信息 -->
        <div class="card">
          <div class="layout-header">
            <div class="accent-bar-primary" />
            <h3 class="title-section">
              <es-icon name="user" :size="20" />
              个人信息
            </h3>
          </div>
          <div class="content-section">
            <div
              class="flex items-center pb-6 mb-8 border-b border-[var(--el-border-color-light)]"
            >
              <div class="relative mr-8">
                <el-avatar
                  :size="80"
                  :src="userInfo?.avatar ?? ''"
                  class="border-3 shadow-lg border-[var(--el-border-color-light)]"
                />
                <el-badge
                  value="在线"
                  class="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                  type="success"
                />
              </div>
              <div class="flex-1">
                <h2 class="title-page mb-2">
                  {{ userInfo?.username || '未设置' }}
                </h2>
                <p class="text-regular mb-4">
                  {{ userInfo?.role === 0 ? '超级管理员' : '管理员' }}
                </p>
              </div>
            </div>

            <div class="layout-grid-2">
              <div
                class="content-section border-l-4 border-l-[var(--el-color-info)]"
              >
                <div class="title-sub mb-2">手机号码</div>
                <div class="text-primary font-medium">
                  {{ userInfo?.mobile || '未设置' }}
                </div>
              </div>
              <div
                class="content-section border-l-4 border-l-[var(--el-color-info)]"
              >
                <div class="title-sub mb-2">用户ID</div>
                <div class="text-primary font-medium">
                  {{ userInfo?.id || '未知' }}
                </div>
              </div>
              <div
                class="content-section border-l-4 border-l-[var(--el-color-info)]"
              >
                <div class="title-sub mb-2">注册时间</div>
                <div class="text-primary font-medium">
                  {{
                    $dayjs(userInfo?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
              <div
                class="content-section border-l-4 border-l-[var(--el-color-info)]"
              >
                <div class="title-sub mb-2">更新时间</div>
                <div class="text-primary font-medium">
                  {{
                    $dayjs(userInfo?.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 安全设置 -->
        <div class="card">
          <div class="layout-header">
            <div class="accent-bar-warning" />
            <h3 class="title-section">
              <es-icon name="lock" :size="20" />
              安全设置
            </h3>
          </div>
          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200 border border-[var(--el-border-color-light)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center p-2 rounded-full bg-[var(--el-color-primary-light-9)]"
                >
                  <es-icon
                    name="lock"
                    :size="18"
                    class="text-[var(--el-color-primary)]"
                  />
                </div>
                <div>
                  <h4 class="title-card mb-1">登录密码</h4>
                  <p class="text-regular text-sm">定期更换密码，保护账户安全</p>
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
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200 border border-[var(--el-border-color-light)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-full flex items-center justify-center bg-[var(--el-color-success-light-9)]"
                >
                  <es-icon
                    name="user"
                    :size="18"
                    class="text-[var(--el-color-success)]"
                  />
                </div>
                <div>
                  <h4 class="title-card mb-1">账户状态</h4>
                  <p class="text-regular text-sm">当前账户状态正常</p>
                </div>
              </div>
              <span class="status-success">正常</span>
            </div>

            <div
              class="flex items-center justify-between p-4 rounded-lg hover:shadow-md duration-200 border border-[var(--el-border-color-light)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 rounded-full flex items-center justify-center bg-[var(--el-color-warning-light-9)]"
                >
                  <es-icon
                    name="phone"
                    :size="18"
                    class="text-[var(--el-color-warning)]"
                  />
                </div>
                <div>
                  <h4 class="title-card mb-1">手机绑定</h4>
                  <p class="text-regular text-sm">
                    {{ userInfo?.mobile ? '已绑定手机号' : '未绑定手机号' }}
                  </p>
                </div>
              </div>
              <span
                :class="userInfo?.mobile ? 'status-success' : 'status-warning'"
              >
                {{ userInfo?.mobile ? '已绑定' : '未绑定' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：登录日志 -->
      <div class="overflow-hidden h-full w-2/3 request-log">
        <div class="card flex flex-col h-full">
          <div class="layout-header">
            <div class="accent-bar-info" />
            <h3 class="title-section">
              <es-icon name="listBox" :size="20" />
              登录日志
            </h3>
            <div class="ml-auto">
              <el-button @click="tableRef?.refresh()">
                <es-icon name="reload" :size="16" class="mr-1" />
                刷新
              </el-button>
            </div>
          </div>
          <div class="flex-1 overflow-hidden">
            <es-table
              ref="tableRef"
              v-model:params="loginLogsParams"
              :filter="loginLogsFilter"
              :columns="loginLogsColumns"
              :request-api="requestLogApi.requestLogPageApi"
            >
              <template #responseCode="{ row }">
                <span
                  :class="
                    row.responseCode === 200
                      ? 'status-success'
                      : 'status-danger'
                  "
                >
                  {{ row.responseCode === 200 ? '成功' : '失败' }}
                </span>
              </template>
            </es-table>
          </div>
        </div>
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
      :loading="passwordLoading"
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
