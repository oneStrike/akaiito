import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'

/**
 * 登录日志表格配置
 */
export const loginLogsColumns: EsTableColumn = [
  {
    label: '登录者',
    prop: 'username',
    align: 'center',
  },
  {
    label: '登录IP',
    prop: 'ipAddress',
    align: 'center',
  },
  {
    label: '登录地址',
    prop: 'ipLocation',
    align: 'center',
  },
  {
    label: '登录结果',
    prop: 'responseCode',
    align: 'center',
    slotName: 'responseCode',
  },
  {
    label: '登录时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
    type: 'date',
  },
]

/**
 * 登录日志筛选配置
 */
export const loginLogsFilter: EsFormOptions[] = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    props: {
      span: 2,
    },
    componentProps: {
      placeholder: '操作时间',
    },
  },
  {
    field: 'responseCode',
    component: 'Select',
    props: {
      span: 5,
    },
    componentProps: {
      placeholder: '登录结果',
      clearable: true,
      options: [
        {
          label: '成功',
          value: 200,
        },
        {
          label: '失败',
          value: 400,
        },
      ],
    },
  },
  {
    field: 'userMobile',
    component: 'Input',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '手机号',
      clearable: true,
      maxlength: 11,
    },
  },
]

/**
 * 编辑用户信息表单配置
 */
export const editFormOptions: EsFormOptions[] = [
  {
    field: 'avatar',
    component: 'Upload',
    props: {
      label: '头像',
    },
    componentProps: {
      placeholder: '请上传头像',
      scenario: 'adminUserAvatar',
      multiple: false,
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
      placeholder: '请输入用户名',
      maxlength: 50,
    },
  },
  {
    field: 'mobile',
    component: 'Input',
    props: {
      label: '手机号',
      rules: useValidate.mobile(),
    },
    componentProps: {
      placeholder: '请输入手机号',
      maxlength: 11,
    },
  },
]
