import { useValidate } from '@/hooks/uesValidator'
import type { BaseFormOptions } from '@/typings/components/base/baseForm'

export const modifyPwdForm: BaseFormOptions[] = [
  {
    component: 'Input',
    bind: {
      field: 'originPassword',
      label: '原密码',
      required: true,
      rules: useValidate.pwd
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
        type: 'password'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      field: 'password',
      label: '新密码',
      required: true,
      rules: useValidate.pwd
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
        type: 'password'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      field: 'confirmPassword',
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

export const modifyInfoForm: BaseFormOptions[] = [
  {
    component: 'Input',
    bind: {
      field: 'username',
      label: '用户名',
      rules: useValidate.normal('用户名')
    },
    componentProps: {
      bind: {
        placeholder: '请输入用户名',
        maxLength: 20
      }
    }
  },
  {
    component: 'Input',
    bind: {
      field: 'mobile',
      label: '手机号',
      rules: useValidate.mobile
    },
    componentProps: {
      bind: {
        placeholder: '请输入手机号',
        maxLength: 11
      }
    }
  },
  {
    component: 'Input',
    bind: {
      field: 'email',
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
    component: 'Radio',
    bind: {
      field: 'isRoot',
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
