import type { IBasicForm } from '@/typings/components/basicForm'
import {
  emailRule,
  mobileRule,
  passwordRule,
  requiredRule
} from '@/hooks/useValidator'

export const modifyPwdForm: IBasicForm['options'] = [
  {
    field: 'originPassword',
    component: 'Input',
    bind: {
      label: '原密码',
      required: true,
      rules: passwordRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
        type: 'password'
      }
    }
  },
  {
    field: 'password',
    component: 'Input',
    bind: {
      label: '新密码',
      required: true,
      rules: passwordRule
    },
    componentProps: {
      bind: {
        placeholder: '请输入原密码',
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

export const modifyInfoForm: IBasicForm['options'] = [
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
