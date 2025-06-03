<script setup lang="ts">
  import { getUserInfoApi } from '@/apis/user.ts'
  import { useUserStore } from '@/stores/modules/user'
  import { utils } from '@/utils'

  defineOptions({
    name: 'Profile',
  })

  getUserInfoApi()
  const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <div class="w-full h-full">
    <el-row :gutter="12" class="h-full">
      <el-col :span="12">
        <el-card class="h-full">
          <div class="wh-full cross-center flex-col">
            <el-avatar :size="80" :src="userInfo?.avatar ?? ''">
              <es-icon name="imageCircle" :size="60" />
            </el-avatar>
            <span class="text-3xl mt-4">{{ userInfo?.username }}</span>
            <el-descriptions :column="1" border class="mt-4" size="large">
              <el-descriptions-item label="手机号">
                {{ userInfo?.mobile }}
              </el-descriptions-item>
              <el-descriptions-item label="超级管理员">
                {{ userInfo?.isRoot ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="创建日期">
                {{ utils.formatTime(userInfo!.createdAt) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-full" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
