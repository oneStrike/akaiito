<script setup lang="ts">
import {
  userListApi,
  statusSwitchApi,
  deleteUserApi,
  updateUserInfoApi,
  createUserApi
} from '@/api/user'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import type {
  BasicTableColumn,
  BasicTableInst
} from '@/typings/components/basic/basicTable'
import type {
  AdminCreateUserReq,
  AdminUserInfoRes,
  AdminUpdateUserInfoReq
} from '~@/apiTypes/user'
import { useMessage } from '@/hook/naviaDiscreteApi'
import BasicTable from '@/components/basic/BasicTable.vue'
import { userStore } from '@/stores'
import type { JoinLoading } from '@/typings/shared'

const basicTable = ref<BasicTableInst>()
const useUserStore = userStore()

const showModal = ref(false)
const editUser = ref<AdminUserInfoRes>()

//禁用or启用
const toggleUserStatus = async (user: JoinLoading<AdminUserInfoRes>) => {
  user.loading = true
  await statusSwitchApi({
    ids: [user.id],
    status: user.status === 1 ? 0 : 1
  })
  basicTable.value?.reset()
  useMessage.success(HintEnum.OPT_SUC)
  user.loading = false
}

//删除用户
const deleteUser = async (user: AdminUserInfoRes) => {
  await deleteUserApi({ id: user.id })
  useMessage.success(HintEnum.DEL_SUC)
  basicTable.value?.reset()
}

//编辑用户
const formLoading = ref(false)
const editUserFn = async (values: any) => {
  formLoading.value = true
  if (values.id) {
    await updateUserInfoApi(values)
  } else {
    await createUserApi(values)
  }
  useMessage.success(HintEnum.UPD_SUC)
  formLoading.value = false
}

const actions = (user: AdminUserInfoRes) => {
  return useTableBasicButtons({
    source: user,
    disabled: user.id === useUserStore.userInfo.id,
    options: [
      {
        text: '编辑',
        event: (user) => {
          showModal.value = true
          editUser.value = user
        }
      },
      {
        text: '删除',
        tipField: 'username',
        confirm: deleteUser
      }
    ]
  })
}

const filterOptions: BasicFormOptions[] = [
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'status',
      width: 140
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  {
    component: 'Select',
    bind: {
      label: '角色',
      path: 'isRoot',
      width: 140
    },
    componentProps: {
      bind: {
        placeholder: '角色'
      },
      options: [
        { label: '超管', value: 1 },
        { label: '普通', value: 0 }
      ]
    }
  },
  {
    component: 'Date',
    bind: {
      label: '创建时间',
      path: 'createdAt',
      width: 440
    },
    componentProps: {
      bind: {
        placeholder: '创建时间',
        type: 'datetimerange',
        isDateDisabled: useDisablePreviousDate
      }
    }
  }
]

const column: BasicTableColumn[] = [
  {
    key: 'username',
    title: '昵称'
  },
  {
    key: 'account',
    title: '账号'
  },
  {
    key: 'email',
    title: '邮箱'
  },
  {
    key: 'mobile',
    title: '手机号'
  },
  {
    key: 'isRoot',
    title: '角色',
    width: 80,
    render: (rowData) => (rowData.isRoot === 1 ? '超管' : '普通')
  },
  {
    key: 'createdAt',
    title: '创建时间',
    sorter: true
  },
  {
    key: 'status',
    title: '状态',
    width: 80,
    renderType: 'switch',
    render: (rowData) => {
      const row = rowData as unknown as JoinLoading<AdminUserInfoRes>
      return useSwitch({
        value: row.status,
        loading: row.loading,
        disabled: useUserStore.userInfo.id === row.id,
        onUpdateValue: () => toggleUserStatus(row)
      })
    }
  },
  {
    key: 'action',
    title: '操作',
    align: 'center',
    render: (rowData) => actions(rowData as unknown as AdminUserInfoRes)
  }
]

const form: BasicFormOptions[] = [
  {
    component: 'Upload',
    bind: {
      path: 'avatar',
      label: '头像',
      rule: useValidate.required('头像')
    },
    componentProps: {
      bind: {
        listType: 'image-card',
        max: 1,
        fileClassify: 'shared'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'username',
      label: '用户名',
      rule: useValidate.required('用户名')
    },
    componentProps: {
      bind: {
        placeholder: '请输入用户名'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'account',
      label: '账号',
      rule: useValidate.required('账号')
    },
    componentProps: {
      bind: {
        placeholder: '请输入账号'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'mobile',
      label: '手机号',
      rule: useValidate.mobile
    },
    componentProps: {
      bind: {
        placeholder: '请输入手机号',
        maxlength: 11
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'email',
      label: '邮箱',
      rule: useValidate.email
    },
    componentProps: {
      bind: {
        placeholder: '请输入邮箱'
      }
    }
  },
  {
    component: 'Radio',
    bind: {
      path: 'isRoot',
      label: '角色',
      required: true,
      rule: useValidate.required('角色')
    },
    componentProps: {
      bind: {
        placeholder: '请选择角色'
      },
      options: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '管理员',
          value: 0
        }
      ]
    }
  }
]
</script>
<template>
  <n-card class="main_block">
    <basic-table
      ref="basicTable"
      :columns="column"
      :request-api="userListApi"
      :filter-options="filterOptions"
    >
      <template #left>
        <n-button type="primary" @click=";(editUser = {}), (showModal = true)"
          >添加</n-button
        >
      </template>
    </basic-table>
    <form-modal
      v-model:loading="formLoading"
      v-model:model-value="editUser"
      v-model:show="showModal"
      :options="form"
      @confirm="editUserFn"
    ></form-modal>
  </n-card>
</template>
