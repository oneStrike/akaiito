import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type { EsToolbarProps, ToolbarFilter } from '@/components/es-toolbar/types'
import { useValidate } from '@/hooks/useValidate'

export const tableColumns: EsTableColumn = [
  {
    label: '用户名',
    prop: 'username',
    align: 'center',
    slotName: 'username',
  },
  {
    label: '手机号',
    prop: 'mobile',
    align: 'center',
  },
  {
    label: '角色',
    prop: 'isRoot',
    align: 'center',
    slotName: 'isRoot',
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    slotName: 'status',
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
  {
    label: '操作',
    prop: 'action',
    align: 'center',
    slotName: 'action',
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'status',
    component: 'Select',
    props: {
      span: 5,
    },
    componentProps: {
      placeholder: '状态',
      clearable: true,
      maxlength: 11,
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'isRoot',
    component: 'Select',
    props: {
      span: 5,
    },
    componentProps: {
      placeholder: '角色',
      clearable: true,
      maxlength: 11,
      options: [
        {
          label: '超级管理员',
          value: 1,
        },
        {
          label: '普通管理员',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'username',
    component: 'Input',
    props: {
      span: 5,
    },
    componentProps: {
      placeholder: '用户名',
    },
  },
  {
    field: 'mobile',
    component: 'Input',
    props: {
      span: 5,
    },
    componentProps: {
      placeholder: '手机号',
      maxlength: 11,
    },
  },
]

export const toolbar: EsToolbarProps['toolbar'] = [
  {
    type: 'button',
    label: '添加',
    value: 'add',
    props: {
      type: 'primary',
    },
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'avatar',
    component: 'Upload',
    props: {
      label: '头像',
    },
    componentProps: {
      placeholder: '请上传头像',
      scenario: 'adminUserAvatar',
      multiple: true,
      fileType: 'image',
    },
  },
  {
    field: 'username',
    component: 'Input',
    props: {
      label: '用户名',
      rules: useValidate.required('用户名'),
    },
    componentProps: {
      placeholder: '请填写用户名',
      maxlength: 50,
    },
  },
  {
    field: 'password',
    component: 'Input',
    props: {
      required: true,
      label: '密码',
      rules: useValidate.password(),
    },
    componentProps: {
      placeholder: '请输入密码',
      type: 'password',
      showPassword: true,
    },
  },
  {
    field: 'confirmPassword',
    component: 'Input',
    props: {
      required: true,
      label: '确认密码',
      rules: useValidate.password(),
    },
    componentProps: {
      placeholder: '请输入确认密码',
      type: 'password',
      showPassword: true,
    },
  },
  {
    field: 'mobile',
    component: 'Input',
    props: {
      label: '手机号',
      required: true,
      rules: useValidate.mobile(),
    },
    componentProps: {
      placeholder: '请输入手机号',
      maxlength: 11,
    },
  },
  {
    field: 'isRoot',
    component: 'Radio',
    props: {
      label: '角色',
      rules: [{ required: true, message: '请选择角色身份' }],
    },
    componentProps: {
      placeholder: '请选择角色身份',
      options: [
        {
          label: '超级管理员',
          value: 1,
        },
        {
          label: '普通管理员',
          value: 0,
        },
      ],
    },
  },
]

export const pwdFormOptions: EsFormOptions[] = [
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
    field: 'confirmNewPassword',
    component: 'Input',
    props: {
      required: true,
      label: '确认新密码',
      rules: useValidate.password(true, '新密码'),
    },
    componentProps: {
      placeholder: '请输入确认新密码',
      type: 'password',
      showPassword: true,
    },
  },
]
