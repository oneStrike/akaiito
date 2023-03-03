import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import { useValidate } from '@/hook/useValidate'

export const infoForm: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      path: 'username',
      label: '用户名',
      required: true,
      rule: useValidate.required({
        message: '用户名'
      })
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
      path: 'mobile',
      label: '手机号',
      required: true,
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
      rule: useValidate.required({ message: '角色', type: 'number' })
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

export const pwdForm: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      path: 'originPassword',
      label: '原密码',
      required: true,
      rule: useValidate.password
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
      path: 'password',
      label: '新密码',
      required: true,
      rule: useValidate.password
    },
    componentProps: {
      bind: {
        placeholder: '请输入新密码',
        type: 'password'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      path: 'confirmPassword',
      label: '确认密码',
      required: true,
      rule: useValidate.password
    },
    componentProps: {
      bind: {
        placeholder: '请输入确认密码',
        type: 'password'
      }
    }
  }
]
