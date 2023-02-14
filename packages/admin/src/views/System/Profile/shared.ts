import { useValidate } from '@/hooks/useValidator'
import type { BaseFormOptions } from '@/typings/components/base/baseForm'
import { BaseFormEnum } from '@/enum/baseFormEnum'

export const modifyPwdForm: BaseFormOptions[] = [
  {
    field: 'originPassword',
    component: BaseFormEnum.INPUT,
    bind: {
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
    field: 'password',
    component: BaseFormEnum.INPUT,
    bind: {
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

export const modifyInfoForm: BaseFormOptions[] = [
  {
    field: 'username',
    component: BaseFormEnum.INPUT,
    bind: {
      label: '用户名',
      rules: useValidate.normal('用户名')
    },
    componentProps: {
      bind: {
        placeholder: '请输入用户名',
        maxlength: 20
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
