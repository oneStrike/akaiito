import type {
  BaseForm,
  BaseFormOptions
} from '@/typings/components/base/baseForm'
import { useValidate } from '@/hooks/useValidator'
import { BaseFormEnum } from '@/enum/baseFormEnum'
import type {
  BaseTableColumns,
  BaseTableRibbon
} from '@/typings/components/base/baseTable'

export const ribbon: BaseTableRibbon[] = [
  {
    label: '新增',
    value: 'add',
    type: 'button'
  },
  {
    label: '批量操作',
    type: 'menu',
    options: [
      {
        label: '批量禁用',
        value: 1
      }
    ]
  }
]

export const search: BaseFormOptions[] = reactive([
  {
    field: 'status',
    component: BaseFormEnum.SELECT,
    bind: {
      label: '状态'
    },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      bind: {
        placeholder: '账号状态',
        rules: useValidate.pwd
      }
    }
  },
  {
    field: 'isRoot',
    component: BaseFormEnum.SELECT,
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
        placeholder: '角色'
      }
    }
  },
  {
    field: 'dateTime',
    component: BaseFormEnum.DATE,
    bind: {
      label: '创建时间'
    },
    componentProps: {
      bind: {}
    }
  }
])

export const columns: BaseTableColumns = [
  {
    dataIndex: 'username',
    title: '昵称',
    slot: 'username'
  },
  {
    dataIndex: 'account',
    title: '账号'
  },
  {
    dataIndex: 'email',
    title: '邮箱'
  },
  {
    dataIndex: 'mobile',
    title: '手机号'
  },
  {
    dataIndex: 'isRoot',
    title: '角色',
    customRender: ({ text }) => (text === 1 ? '超管' : '普通')
  },
  {
    dataIndex: 'createdAt',
    title: '创建时间'
  },
  {
    dataIndex: 'status',
    title: '状态',
    slot: 'status'
  },
  {
    dataIndex: 'action',
    title: '操作',
    slot: 'action',
    width: 100
  }
]

export const form: BaseForm['options'] = [
  {
    field: 'avatar',
    component: BaseFormEnum.UPLOAD,
    bind: {
      label: '头像',
      rules: useValidate.normal('头像')
    },
    componentProps: {}
  },
  {
    field: 'username',
    component: BaseFormEnum.INPUT,
    bind: {
      label: '用户名',
      rules: useValidate.normal('用户名')
    },
    componentProps: {
      bind: {
        placeholder: '请输入用户名'
      }
    }
  },
  {
    field: 'account',
    component: BaseFormEnum.INPUT,
    bind: {
      label: '账号',
      rules: useValidate.normal('账号')
    },
    componentProps: {
      bind: {
        placeholder: '请输入账号'
      }
    }
  },
  {
    field: 'mobile',
    component: BaseFormEnum.INPUT,
    bind: {
      label: '手机号',
      rules: useValidate.mobile
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
    component: BaseFormEnum.INPUT,
    bind: {
      label: '邮箱',
      rules: useValidate.email
    },
    componentProps: {
      bind: {
        placeholder: '请输入邮箱'
      }
    }
  },

  {
    field: 'isRoot',
    component: BaseFormEnum.RADIO,
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

export const pwdForm: BaseForm['options'] = [
  {
    field: 'password',
    component: BaseFormEnum.INPUT,
    bind: {
      label: '密码',
      required: true,
      rules: useValidate.pwd
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
    component: BaseFormEnum.INPUT,
    bind: {
      label: '确认密码',
      required: true,
      rules: useValidate.pwd
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
        type: 'password'
      }
    }
  }
]
