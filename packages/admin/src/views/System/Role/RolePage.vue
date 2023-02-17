<script setup lang="ts">
import { statusSwitchApi, userListApi } from '@/api/user'
import { columns, ribbon, search } from '@/views/System/Role/shared'
import type { AdminUserListRes } from '~@/apiTypes/user'
import { useUserStore } from '@/stores'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'

const { userInfo } = storeToRefs(useUserStore())

type recordUserInfo = AdminUserListRes['list'][number] & { loading: boolean }
const toggleUserStatus = useDebounceFn(async (user: recordUserInfo) => {
  user.loading = true
  user.status = user.status === 1 ? 0 : 1
  await statusSwitchApi({ ids: [user.id], status: user.status })
  useMessage.success(Hint.OPT_SUC)
  user.loading = false
}, 200)

const handleRibbon = (val) => {
  console.log('🚀 ~ file:RolePage method:handleRibbon line:21 -----', val)
}
</script>

<template>
  <base-table
    :request-api="userListApi"
    :columns="columns"
    :filter-options="search"
    :ribbon="ribbon"
    align="center"
    @handleRibbon="handleRibbon"
  >
    <template #username="{ text, record }">
      <a-avatar
        class="mr_8"
        v-if="record.avatar"
        :src="$FILE_PATH + record.avatar"
      ></a-avatar>
      <span>{{ text }}</span>
    </template>

    <template #status="{ text, record }">
      <a-switch
        :checked="record.status"
        :checkedValue="1"
        :unCheckedValue="0"
        :loading="record.loading"
        :disabled="userInfo.id === record.id"
        @click="toggleUserStatus(record)"
      ></a-switch>
    </template>

    <template #action="{ record }">
      <div class="flex main_around">
        <a-button size="small" type="link">编辑</a-button>
        <a-popconfirm
          placement="left"
          :title="`确定删除【${record.username}】？`"
          :disabled="userInfo.id === record.id"
          ok-text="确定"
          cancel-text="取消"
        >
          <a-button
            :disabled="userInfo.id === record.id"
            size="small"
            type="link"
            danger
            >删除</a-button
          >
        </a-popconfirm>
      </div>
    </template>
  </base-table>
</template>

<style scoped></style>
