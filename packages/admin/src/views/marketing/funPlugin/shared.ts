import type { EsFormOptions } from '@/components/es-form/es-form.vue'
import type {
  EsToolbarProps,
  ToolbarFilter,
} from '@/components/es-toolbar/es-toolbar.vue'

const pluginType = [
  {
    label: '小说',
    value: 1,
  },
  {
    label: '漫画',
    value: 2,
  },
  {
    label: '图片',
    value: 3,
  },
  {
    label: '视频',
    value: 4,
  },
]

export const formOptions: EsFormOptions[] = [
  {
    field: 'icon',
    component: 'Upload',
    props: {
      label: '封面',
      rules: [{ required: true, message: '请上传插件封面' }],
    },
    componentProps: {
      placeholder: '请上传插件封面',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'name',
    component: 'Input',
    props: {
      label: '插件名称',
      class: 'w-6/12!',
      rules: [{ required: true, message: '请输入插件名称' }],
    },
    componentProps: {
      placeholder: '请输入插件名称',
      maxlength: 50,
    },
  },
  {
    field: 'pluginFile',
    component: 'Upload',
    props: {
      label: '插件包',
      class: 'w-6/12!',
      rules: [{ required: true, message: '请上传插件包' }],
    },
    componentProps: {
      placeholder: '请上传插件包',
      maxlength: 1,
      listType: 'text',
      scenario: 'plugin',
      fileType: 'compressed',
      structure: 'string',
    },
  },
  {
    field: 'version',
    component: 'Input',
    props: {
      label: '插件版本',
      class: 'w-6/12!',
      rules: [{ required: true, message: '请输入插件版本' }],
    },
    componentProps: {
      placeholder: '请输入插件版本',
      maxlength: 50,
    },
  },

  {
    field: 'type',
    component: 'Radio',
    props: {
      label: '插件类型',
      rules: [{ required: true, message: '请选择插件类型' }],
    },
    componentProps: {
      placeholder: '请选择插件类型',
      options: pluginType,
    },
  },
  {
    field: 'isFree',
    component: 'Radio',
    props: {
      label: '是否免费',
      rules: [{ required: true, message: '请选择是否免费' }],
    },
    componentProps: {
      placeholder: '请选择是否免费',
      options: [
        {
          label: '免费',
          value: 1,
        },
        {
          label: '收费',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'price',
    component: 'InputNumber',
    props: {
      label: '价格',
    },
    componentProps: {
      placeholder: '请输入价格',
    },
  },
  {
    field: 'assistPurchaseCount',
    component: 'InputNumber',
    props: {
      label: '辅助购买人次',
    },
    componentProps: {
      placeholder: '请输入辅助购买人次',
    },
  },
  {
    field: 'sourceName',
    component: 'Input',
    props: {
      label: '数据源名称',
      class: 'w-6/12!',
      rules: [{ required: true, message: '请输入数据源名称' }],
    },
    componentProps: {
      placeholder: '请输入数据源名称',
    },
  },
  {
    field: 'sourceUrl',
    component: 'Input',
    props: {
      label: '数据源地址',
      class: 'w-6/12!',
      rules: [{ required: true, message: '请输入数据源地址' }],
    },
    componentProps: {
      placeholder: '请输入数据源地址',
    },
  },
  {
    field: 'desc',
    component: 'Textarea',
    props: {
      label: '描述信息',
      rules: [{ required: true, message: '请输入插件描述信息' }],
    },
    componentProps: {
      placeholder: '请输入插件描述信息',
    },
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      clearable: true,
      options: [
        {
          label: '成功',
          value: 1,
        },
        {
          label: '失败',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'isFree',
    component: 'Select',
    props: {
      defaultValue: 1,
    },
    componentProps: {
      placeholder: '收费状态',
      clearable: true,
      options: [
        {
          label: '免费',
          value: 1,
        },
        {
          label: '收费',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'type',
    component: 'Select',
    componentProps: {
      placeholder: '插件类型',
      clearable: true,
      options: pluginType,
    },
  },
  {
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '插件名称',
      clearable: true,
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
