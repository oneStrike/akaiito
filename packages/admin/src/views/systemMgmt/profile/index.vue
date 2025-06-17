<script setup lang="ts">
  import type {
    GetUserInfoTypesRes,
    UpdatePasswordTypesReq,
  } from '@/apis/types/user.d'
  import type { EsFormOptions } from '@/components/es-form/types'
  import { onMounted, reactive, ref } from 'vue'
  import * as requestLogApi from '@/apis/request-log.ts'
  import { getUserInfoApi, updatePasswordApi } from '@/apis/user.ts'
  import { loginLogsColumns, loginLogsFilter } from './shared.ts'

  /**
   * 用户信息数据
   */
  const userInfo = ref<GetUserInfoTypesRes | null>(null)

  /**
   * 修改密码相关状态
   */
  const showPasswordDialog = ref(false)
  const passwordLoading = ref(false)
  const passwordFormData = reactive<UpdatePasswordTypesReq>({
    oldPassword: 'Aa@123456',
    newPassword: 'Aa@123456',
    confirmPassword: 'Aa@123456',
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
    console.log(123)
    try {
      // 表单验证
      passwordLoading.value = true
      await updatePasswordApi(passwordFormData)
      useMessage.success('修改密码成功')
      showPasswordDialog.value = false
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
  onMounted(async () => {
    userInfo.value = await getUserInfoApi()
  })
</script>

<template>
  <div class="h-full flex flex-col p-5 bg-gray-50">
    <!-- 主要内容区域 -->
    <div class="flex gap-5 flex-1 overflow-hidden">
      <!-- 左侧：用户信息和安全设置 -->
      <div class="flex-1 flex flex-col gap-5 overflow-y-auto h-full">
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
              </div>
            </div>

            <div class="gap-5 grid grid-cols-2">
              <div
                class="bg-gray-50 p-4 rounded-lg border-l-4 border-slate-400"
              >
                <div
                  class="flex items-center gap-2 font-semibold mb-2 text-sm text-gray-600"
                >
                  手机号码
                </div>
                <div class="text-base text-gray-800 font-medium">
                  {{ userInfo?.mobile || '未设置' }}
                </div>
              </div>
              <div
                class="p-4 bg-gray-50 rounded-lg border-l-4 border-slate-400"
              >
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
                  用户ID
                </div>
                <div class="text-base font-medium text-gray-800">
                  {{ userInfo?.id || '未知' }}
                </div>
              </div>
              <div
                class="p-4 bg-gray-50 rounded-lg border-l-4 border-slate-400"
              >
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
                  注册时间
                </div>
                <div class="text-base font-medium text-gray-800">
                  {{
                    $dayjs(userInfo?.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  }}
                </div>
              </div>
              <div
                class="p-4 bg-gray-50 rounded-lg border-l-4 border-slate-400"
              >
                <div
                  class="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2"
                >
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

        <!-- 安全设置 -->
        <el-card class="hover:shadow-lg transition-all duration-300">
          <template #header>
            <div class="flex justify-between items-center">
              <h3
                class="flex items-center gap-2 text-lg font-semibold text-gray-800"
              >
                <es-icon name="lock" :size="20" />
                安全设置
              </h3>
            </div>
          </template>
          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-4 rounded-lg border border-slate-300 hover:shadow-md duration-200"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 bg-blue-100 rounded-full flex items-center justify-between"
                >
                  <es-icon name="lock" :size="18" class="text-blue-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">登录密码</h4>
                  <p class="text-sm text-gray-500">
                    定期更换密码，保护账户安全
                  </p>
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
              class="flex items-center justify-between p-4 rounded-lg border border-slate-300 hover:shadow-md duration-200"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 bg-green-100 rounded-full flex items-center justify-between"
                >
                  <es-icon name="user" :size="18" class="text-green-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">账户状态</h4>
                  <p class="text-sm text-gray-500">当前账户状态正常</p>
                </div>
              </div>
              <el-tag type="success" size="small">正常</el-tag>
            </div>

            <div
              class="flex items-center justify-between p-4 rounded-lg border border-slate-300 hover:shadow-md duration-200"
            >
              <div class="flex items-center gap-3">
                <div
                  class="p-2 bg-purple-100 rounded-full flex items-center justify-between"
                >
                  <es-icon name="phone" :size="18" class="text-purple-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">手机绑定</h4>
                  <p class="text-sm text-gray-500">
                    {{ userInfo?.mobile ? '已绑定手机号' : '未绑定手机号' }}
                  </p>
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
      <div class="overflow-hidden w-2/3 request-log h-full">
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
