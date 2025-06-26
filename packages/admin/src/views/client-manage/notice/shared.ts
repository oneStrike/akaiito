import type { EsFormOptions } from '@/components/es-form/types'
import type { EsToolbarProps } from '@/components/es-toolbar/types.ts'

export const noticeType = [
  {
    label: '系统通知',
    value: 0,
  },
  {
    label: '活动公告',
    value: 1,
  },
  {
    label: '维护通知',
    value: 2,
  },
  {
    label: '更新公告',
    value: 3,
  },
]

export const noticePriority = [
  {
    label: '低优先级',
    value: 0,
  },
  {
    label: '中等优先级',
    value: 1,
  },
  {
    label: '高优先级',
    value: 2,
  },
  {
    label: '紧急',
    value: 3,
  },
]

export const enablePlatform = [
  {
    label: 'H5',
    value: 1,
  },
  {
    label: 'APP',
    value: 2,
  },
  {
    label: '小程序',
    value: 4,
  },
]
export const formOptions: EsFormOptions[] = [
  {
    field: 'title',
    component: 'Input',
    props: {
      span: 2,
      label: '标题',
      rules: useValidate.required('标题'),
    },
    componentProps: {
      placeholder: '请输入通知标题',
      maxlength: 100,
    },
  },
  {
    field: 'noticeType',
    component: 'Select',
    props: {
      span: 2,
      label: '通知类型',
      rules: useValidate.required('通知类型'),
    },
    componentProps: {
      placeholder: '请选择通知类型',
      options: noticeType,
    },
  },
  {
    field: 'enablePlatform',
    component: 'Checkbox',
    props: {
      span: 2,
      label: '发布平台',
      rules: useValidate.required('发布平台'),
    },
    componentProps: {
      placeholder: '请选择发布平台',
      options: enablePlatform,
      valueType: 'bitmask',
    },
  },

  {
    field: 'priorityLevel',
    component: 'Select',
    props: {
      span: 2,
      label: '紧急程度',
      rules: useValidate.required('紧急程度'),
    },
    componentProps: {
      placeholder: '请选择紧急程度',
      options: noticePriority,
    },
  },
  {
    field: 'pageCode',
    component: 'Select',
    props: {
      span: 2,
      label: '跳转页面',
    },
    componentProps: {
      placeholder: '请选择跳转页面',
      options: [],
    },
  },
  {
    field: 'order',
    component: 'InputNumber',
    props: {
      span: 2,
      label: '排序权重',
    },
    componentProps: {
      placeholder: '请输入排序权重',
      min: 0,
      max: 99999999,
    },
  },
  {
    field: 'popupBackgroundImage',
    component: 'Upload',
    props: {
      span: 2,
      label: '弹窗背景',
      rules: [{ required: false, message: '请上传弹窗背景图片' }],
    },
    componentProps: {
      placeholder: '请上传弹窗背景图片',
      scenario: 'shared',
      multiple: false,
      fileType: 'image',
    },
  },
  {
    field: 'dateTimeRange',
    component: 'DateTime',
    props: {
      span: 2,
      label: '通知时间',
    },
    componentProps: {
      placeholder: '请选择通知时间',
      disabledDate: (date: Date) =>
        new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0),
    },
  },
  {
    field: 'isPinned',
    component: 'Radio',
    props: {
      span: 2,
      label: '是否置顶',
    },
    componentProps: {
      placeholder: '请选择是否置顶',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    field: 'showAsPopup',
    component: 'Radio',
    props: {
      span: 2,
      label: '首页弹窗展示',
    },
    componentProps: {
      placeholder: '请选择是否首页弹窗展示',
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
  },
  {
    field: 'content',
    component: 'RichText',
    props: {
      label: '内容',
      rules: useValidate.required('内容'),
    },
    componentProps: {
      placeholder: '请输入内容...',
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
