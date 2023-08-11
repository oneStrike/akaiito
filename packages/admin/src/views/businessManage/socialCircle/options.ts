import type { BasicFormOptions } from '@/typings/components/basic/basicForm'

export const tableFilterOptions: BasicFormOptions[] = [
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'status',
      width: 180
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '封禁', value: 0 },
        { label: '正常', value: 1 }
      ]
    }
  },
  {
    component: 'Select',
    bind: {
      label: '首页展示',
      path: 'guide',
      width: 180
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  {
    component: 'Input',
    bind: {
      label: '名称',
      path: 'name',
      width: 160
    },
    componentProps: {
      bind: {
        placeholder: '名称'
      }
    }
  }
]

export const classifyFormOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      label: '分类',
      path: 'classifyName',
      rule: useValidate.required({ message: '分类' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入分类'
      }
    }
  }
]

export const bannedFormOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      label: '原因',
      path: 'bannedReason',
      rule: useValidate.required({ message: '封禁原因' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入封禁的原因'
      }
    }
  }
]

export const formOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      label: '名称',
      path: 'name',
      rule: useValidate.required({ message: '名称' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入名称'
      }
    }
  },
  {
    component: 'Input',
    bind: {
      label: '成员头衔',
      path: 'memberTitle',
      rule: useValidate.required({ message: '成员头衔' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入成员头衔'
      }
    }
  },
  {
    component: 'Select',
    bind: {
      label: '分类',
      path: 'classifyId',
      rule: useValidate.required({ message: '分类', type: 'any' })
    },
    componentProps: {
      bind: {
        placeholder: '请选择所属分类'
      },
      options: []
    }
  },
  {
    component: 'Input',
    bind: {
      label: '简述',
      path: 'desc',
      rule: useValidate.required({ message: '简述' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入简述'
      }
    }
  },
  {
    component: 'InputNumber',
    bind: {
      label: '初始关注人数',
      path: 'vFollowers'
    },
    componentProps: {
      bind: {
        placeholder: '请输入初始关注人数',
        width: '100%'
      }
    }
  },
  {
    component: 'Upload',
    bind: {
      label: '图标',
      path: 'icon',
      rule: useValidate.required({ message: '图标', type: 'any' })
    },
    componentProps: {
      bind: {
        placeholder: '请上传图标',
        listType: 'image-card',
        fileClassify: 'shared'
      }
    }
  },
  {
    component: 'Upload',
    bind: {
      label: '封面',
      path: 'cover',
      rule: useValidate.required({ message: '封面', type: 'any' })
    },
    componentProps: {
      bind: {
        placeholder: '请上传封面',
        listType: 'image-card',
        fileClassify: 'shared'
      }
    }
  },
  {
    component: 'Editor',
    bind: {
      label: '注意事项',
      path: 'rule',
      rule: useValidate.required({ message: '注意事项' })
    },
    componentProps: {
      bind: {
        type: 'textarea',
        placeholder: '请输入注意事项'
      }
    }
  }
]
