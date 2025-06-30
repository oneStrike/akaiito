import type { EsFormOptions } from '@/components/es-form/types'
import type { EsTableColumn } from '@/components/es-table/types'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/types'
import { formOptionsToFilterOptions } from '@/utils/formOptionsToFilterOptions.ts'
import { formOptionsToTableColumn } from '@/utils/formOptionsToTableColumn.ts'

export const authorRoles = [
  {
    label: '漫画家',
    value: 1,
  },
  {
    label: '作家',
    value: 2,
  },
  {
    label: '插画师',
    value: 4,
  },
  {
    label: '模特',
    value: 8,
  },
]

export const gender = [
  {
    label: '未知',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
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
      placeholder: '请上传作者头像',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      span: 2,
      label: '作者',
      rules: useValidate.required('作者名字'),
    },
    componentProps: {
      placeholder: '请输入作者名称',
      maxlength: 50,
    },
  },

  {
    field: 'roles',
    component: 'Checkbox',
    props: {
      span: 2,
      label: '身份',
      rules: useValidate.required('身份'),
    },
    componentProps: {
      placeholder: '请选择身份',
      options: authorRoles,
      valueType: 'bitmask',
    },
  },
  {
    field: 'gender',
    component: 'Radio',
    props: {
      span: 2,
      label: '性别',
      rules: useValidate.required('性别'),
    },
    componentProps: {
      placeholder: '请选择性别',
      options: gender,
    },
  },
  {
    field: 'nationality',
    component: 'Select',
    props: {
      span: 2,
      label: '国籍',
      rules: useValidate.required('国籍'),
    },
    componentProps: {
      placeholder: '请选择国籍',
    },
  },
  {
    field: 'description',
    component: 'Textarea',
    props: {
      label: '作者描述',
      rules: useValidate.required('作者描述'),
    },
    componentProps: {
      placeholder: '请输入作者描述',
      rows: 5,
    },
  },
  {
    field: 'socialLinks',
    component: 'DynamicFieldPair',
    props: {
      label: '社交媒体链接',
    },
    componentProps: {
      placeholder: ['请输入社交载体', '请输入链接'],
    },
  },
  {
    field: 'remark',
    component: 'Textarea',
    props: {
      label: '备注',
    },
    componentProps: {
      placeholder: '请输入备注信息',
      rows: 5,
    },
  },
]

const [avatar, name, roles, genderColumn, action] = formOptionsToTableColumn(
  formOptions,
  ['remark', 'socialLinks', 'description', 'nationality'],
  {
    roles: {
      formatter: (row) => {
        return useBitmask.getLabels(row.roles, authorRoles).join('、')
      },
    },
    name: {
      columnType: 'link',
    },
  },
)
export const tableColumns: EsTableColumn = [
  avatar,
  name,
  roles,
  genderColumn,
  {
    prop: 'worksCount',
    label: '作品数量',
    align: 'center',
    columnType: 'link',
  } as any,
  {
    prop: 'followersCount',
    label: '粉丝数',
    align: 'center',
    columnType: 'link',
  } as any,
  action,
]

export const filter: ToolbarFilter = formOptionsToFilterOptions(formOptions, {
  gender: 6,
  roles: 6,
  name: 6,
})
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
