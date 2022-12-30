import {
  emailRule,
  mobileRule,
  passwordRule,
  requiredRule
} from '@/hooks/useValidator'
import type { IBasicForm } from '@/typings/components/basicForm'
import type { ISearchProps } from '@/typings/components/basicSearch'
import type { TTableColumn } from '@/typings/components/basicTable'
export const search: ISearchProps['options'] = reactive([
  {
    field: 'status',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '状态'
    },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      bind: {
        placeholder: '请选择账号状态',
        rules: passwordRule
      }
    }
  },
  {
    field: 'isRoot',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '角色'
    },
    componentProps: {
      options: [
        { label: '超管', value: 1 },
        { label: '普通', value: 0 }
      ],
      bind: {
        placeholder: '请选择账号角色',
        rules: passwordRule
      }
    }
  },
  {
    field: 'dateTime',
    component: 'DateTime',
    bind: {
      label: '创建时间'
    },
    componentProps: {
      bind: {
        placeholder: '请选择创建时间'
      }
    }
  }
])

export const column: TTableColumn = [
  {
    prop: 'username',
    label: '昵称'
  },
  {
    prop: 'account',
    label: '账号'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'mobile',
    label: '手机号'
  },
  {
    prop: 'isRoot',
    label: '角色',
    formatter: (row, column, cellValue) => (cellValue === 1 ? '超管' : '普通')
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    width: 180,
    sortable: 'custom'
  },
  {
    prop: 'status',
    label: '状态',
    scoped: 'status'
  },
  {
    prop: 'action',
    label: '操作',
    width: 140,
    scoped: 'action'
  }
]

export const form: IBasicForm['options'] = [
  {
    field: 'avatar',
    component: 'Upload',
    bind: {
      label: '头像',
      rules: requiredRule('头像')
    },
    componentProps: {}
  },
  {
    field: 'username',
    component: 'Input',
    bind: {
      label: '用户名',
      rules: requiredRule('用户名')
    },
    componentProps: {
      bind: {
        placeholder: '请输入用户名'
      }
    }
  },
  {
    field: 'account',
    component: 'Input',
    bind: {
      label: '账号',
      rules: requiredRule('账号')
    },
    componentProps: {
      bind: {
        placeholder: '请输入账号'
      }
    }
  },
  {
    field: 'mobile',
    component: 'Input',
    bind: {
      label: '手机号',
      rules: mobileRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入手机号',
        maxlength: 11
      }
    }
  },
  {
    field: 'email',
    component: 'Input',
    bind: {
      label: '邮箱',
      rules: emailRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入邮箱'
      }
    }
  },

  {
    field: 'isRoot',
    component: 'Radio',
    bind: {
      label: '角色',
      required: true
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

export const pwdForm: IBasicForm['options'] = [
  {
    field: 'password',
    component: 'Input',
    bind: {
      label: '密码',
      required: true,
      rules: passwordRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入密码',
        type: 'password'
      }
    }
  },
  {
    field: 'confirmPassword',
    component: 'Input',
    bind: {
      label: '确认密码',
      required: true,
      rules: passwordRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
        type: 'password'
      }
    }
  }
]
