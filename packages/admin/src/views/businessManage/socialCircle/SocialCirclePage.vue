<script setup lang="ts">
import {
  createSocialCircleApi,
  createSocialCircleClassifyApi,
  deleteSocialCircleApi,
  deleteSocialCircleClassifyApi,
  getSocialCircleClassifyListApi,
  getSocialCircleDetailApi,
  getSocialCirclePageApi,
  updateSocialCircleApi,
  updateSocialCircleClassifyApi,
  updateSocialCircleGuideStatusApi,
  updateSocialCircleStatusApi
} from '@/api/socialCircle'
import BasicTree from '@/components/basic/BasicTree.vue'
import type {
  BasicTableColumn,
  BasicTableInst
} from '@/typings/components/basic/basicTable'
import type { JoinLoading, RenderSuffix } from '@/typings/shared'
import type {
  AdminCreateSocialCircleClassifyReq,
  AdminCreateSocialCircleReq,
  AdminGetSocialCircleClassifyListRes,
  AdminGetSocialCircleDetailRes,
  AdminGetSocialCirclePageRes
} from '~@/apiTypes/socialCircle'
import { useSpace, useSwitch, useTag } from '@/hook/useTsx'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import { useFormAssist } from '@/hook/useFormAssist'
import { userStore } from '@/stores'
import { useTableBasicButtons } from '@/hook/useEmbedTsx'
import type { TagProps, TreeProps } from 'naive-ui'
import SharedModal from '@/components/shared/SharedModal.vue'

type SocialCircleItem = JoinLoading<AdminGetSocialCirclePageRes['list'][number]>
type SocialCircleClassifyItem = AdminGetSocialCircleClassifyListRes[number]

const orphanId = 800909088
const useUserStore = userStore()
const tableRef = ref<BasicTableInst>()
const formAssist = useFormAssist<Partial<SocialCircleItem>>()
const bannedFormAssist = useFormAssist<Partial<SocialCircleItem>>()
const socialCieCleClassifyList = ref<AdminGetSocialCircleClassifyListRes>()
const classifyFormAssist = useFormAssist<Partial<SocialCircleClassifyItem>>()

//获取圈子分类
const getTreeData = async () => {
  socialCieCleClassifyList.value = await getSocialCircleClassifyListApi()
  socialCieCleClassifyList.value.unshift({
    classifyName: '未分类',
    id: orphanId,
    sort: orphanId
  })
}
getTreeData()
//圈子列表请求参数
const requestTableParams = ref<{
  classifyId: number | string
  orphan?: number
}>({
  classifyId: ''
})

//创建or编辑圈子分类
const createClassify = async (val: AdminCreateSocialCircleClassifyReq) => {
  try {
    classifyFormAssist.loading = true

    if (classifyFormAssist.edit) {
      await updateSocialCircleClassifyApi({
        ...val,
        id: classifyFormAssist.editData?.id!
      })
    } else {
      await createSocialCircleClassifyApi(val)
    }
    await getTreeData()
    useMessage.success(
      classifyFormAssist.edit ? HintEnum.UPD_SUC : HintEnum.ADD_SUC
    )
    classifyFormAssist.clearStatus()
  } catch (error) {
    classifyFormAssist.loading = false
  }
}

//删除圈子分类
const deleteClassify = async (id: number) => {
  classifyFormAssist.loading = true
  await deleteSocialCircleClassifyApi({ id })
  await getTreeData()
  useMessage.success(HintEnum.DEL_SUC)
  classifyFormAssist.loading = false
}

//更新圈子的状态
const updateStatus = async (id: number, status: number, reason?: string) => {
  if (status === 0 && !reason) {
    bannedFormAssist.editData = { id }
    bannedFormAssist.showModal = true
    return
  }
  await updateSocialCircleStatusApi({ id, status, bannedReason: reason })
  useMessage.success(HintEnum.UPD_SUC)
  tableRef.value?.refresh()
  bannedFormAssist.clearStatus()
  formAssist.clearStatus()
}

const banned = (val: { bannedReason: string }) => {
  updateStatus(bannedFormAssist.editData?.id!, 0, val.bannedReason)
}

//创建OR编辑圈子
const createSocialCircle = async (val: AdminCreateSocialCircleReq) => {
  if (!val.classifyName) {
    val.classifyName = socialCieCleClassifyList.value!.find(
      (item) => item.id === val.classifyId
    )?.classifyName!
  }
  val.creatorId = useUserStore.userInfo.id
  val.creatorName = useUserStore.userInfo.username
  if (Array.isArray(val.icon)) {
    val.icon = val.icon[0].path
  }
  if (Array.isArray(val.cover)) {
    val.cover = val.cover[0].path
  }
  try {
    formAssist.loading = true
    if (formAssist.edit) {
      await updateSocialCircleApi({
        ...val,
        id: formAssist.editData?.id!
      })
    } else {
      await createSocialCircleApi(val)
    }
    tableRef.value?.refresh()
    useMessage.success(formAssist.edit ? HintEnum.UPD_SUC : HintEnum.ADD_SUC)
    formAssist.clearStatus()
  } catch (err) {
    formAssist.loading = false
  }
}

//调整查看的分类
const classifyChange = (id: (number | string)[]) => {
  if (id[0] === orphanId) {
    requestTableParams.value.classifyId = ''
    requestTableParams.value.orphan = 1
  } else {
    requestTableParams.value.orphan = 0
    requestTableParams.value.classifyId = id[0] === 'all' ? '' : id[0]
  }
}

//设置或取消在引导页面展示
const toggleGuide = async (val: SocialCircleItem) => {
  val.loading = true
  val.guide = val.guide ? 0 : 1
  formAssist.edit = true
  formAssist.editData = val
  await updateSocialCircleGuideStatusApi({
    id: val.id,
    guide: val.guide
  })
  useMessage.success(HintEnum.UPD_SUC)
  val.loading = false
}

const formatStatus = (status: number) => {
  switch (status) {
    case 0:
      return {
        text: '封禁',
        type: 'error'
      }
    case 1:
      return {
        text: '正常',
        type: 'success'
      }
  }
}

//展示详情
const showDetailModal = ref(false)
const currentDetail = ref<AdminGetSocialCircleDetailRes | null>()
const showDetail = async (val: SocialCircleItem) => {
  currentDetail.value = await getSocialCircleDetailApi({
    id: val.id.toString()
  })
  showDetailModal.value = true
}

//操作
const actions = (val: SocialCircleItem) => {
  return useTableBasicButtons({
    source: val,
    options: [
      {
        text: '编辑',
        event: (row) => {
          getSocialCircleDetailApi({ id: row.id.toString() }).then((res) => {
            formAssist.showModal = true
            formAssist.edit = true
            formAssist.editData = res
            formAssist.formValue = res
          })
        }
      },
      {
        text: '删除',
        tipField: 'name',
        confirm: async (row) => {
          await deleteSocialCircleApi({ id: row.id })
          useMessage.success(HintEnum.DEL_SUC)
          tableRef.value?.refresh()
        }
      },
      {
        text: '更多',
        fold: true,
        foldProps: {
          options: [
            {
              label: '封禁',
              key: 0,
              show: val.status === 1
            },
            {
              label: '启用',
              key: 1,
              show: val.status === 0
            }
          ],
          onSelect: (key) => updateStatus(val.id, key)
        }
      }
    ]
  })
}

const tableColumns: BasicTableColumn<SocialCircleItem> = [
  {
    key: 'name',
    title: '名称',
    render: (row) =>
      useButton(row.name, {
        text: true,
        type: 'primary',
        onClick: () => showDetail(row)
      })
  },
  {
    key: 'classifyName',
    title: '分类',
    render: (row) => (row.classifyName ? row.classifyName : '-')
  },
  {
    key: 'memberTitle',
    title: '成员头衔'
  },
  {
    key: 'creatorName',
    title: '创建人'
  },
  {
    key: 'followers',
    title: '订阅人数',
    sorter: true
  },
  {
    key: 'vFollowers',
    title: '虚拟订阅',
    sorter: true
  },
  {
    key: 'status',
    title: '状态',
    render: (row) => {
      const tagProps = formatStatus(row.status)!
      return useTag(tagProps.text, { type: tagProps.type as TagProps['type'] })
    }
  },
  {
    key: 'guide',
    title: '引导页展示',
    render: (row) =>
      useSwitch({
        value: row.guide,
        loading: row.loading,
        onUpdateValue: () => toggleGuide(row)
      })
  },
  {
    key: 'action',
    title: '操作',
    align: 'center',
    width: 200,
    render: (rowData) => actions(rowData)
  }
]
const tableFilterOptions: BasicFormOptions[] = [
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

const classifyFormOptions: BasicFormOptions[] = [
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
const bannedFormOptions: BasicFormOptions[] = [
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

const formOptions: () => BasicFormOptions[] = () => [
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
      options: socialCieCleClassifyList.value
        ?.filter((item) => item.id !== orphanId)
        .map((item) => {
          return {
            label: item.classifyName,
            value: item.id
          }
        })
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

//分类操作按钮
const renderSuffix: RenderSuffix<SocialCircleItem> = ({ option }) => {
  if (isNaN(option.id) || option.id === orphanId) return
  return useSpace([
    useSvgIcon({
      iconName: 'edit',
      size: 16,
      onClick: () => {
        classifyFormAssist.showModal = true
        classifyFormAssist.edit = true
        classifyFormAssist.editData = option
        classifyFormAssist.formValue = {
          classifyName: option.classifyName
        }
      }
    }),
    usePopConfirm({
      source: option,
      text: '删除',
      tipField: 'classifyName',
      confirm: () => deleteClassify(data.id),
      props: {
        positiveButtonProps: {
          loading: classifyFormAssist.loading
        }
      },
      trigger: () =>
        useSvgIcon({
          iconName: 'delete',
          size: 16,
          type: 'error'
        })
    })
  ])
}
</script>
<template>
  <div class="h_100">
    <n-grid :cols="4" :x-gap="12" class="h_100">
      <n-grid-item class="bg" :span="1">
        <n-card class="h_100">
          <basic-tree
            :tree-data="socialCieCleClassifyList"
            label-field="classifyName"
            key-field="id"
            :render-suffix="renderSuffix"
            :fill-all="true"
            :default-selected-keys="['all']"
            @select-change="classifyChange"
          >
            <template #search-after>
              <svg-icon
                icon-name="plusCircle"
                @click="classifyFormAssist.showModal = true"
              ></svg-icon>
            </template>
          </basic-tree>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="3">
        <n-card class="h_100">
          <basic-table
            ref="tableRef"
            :columns="tableColumns"
            :requestApi="getSocialCirclePageApi"
            :list-params="requestTableParams"
            :filter-options="tableFilterOptions"
          >
            <template #left>
              <n-button type="primary" @click="formAssist.showModal = true">
                添加
              </n-button>
            </template>
          </basic-table>
        </n-card>
      </n-grid-item>
    </n-grid>

    <form-modal
      title="编辑分类"
      v-model:show="classifyFormAssist.showModal"
      :loading="classifyFormAssist.loading"
      :height="30"
      v-model="classifyFormAssist.formValue"
      :options="classifyFormOptions"
      @close="classifyFormAssist.formValue = {}"
      @confirm="createClassify"
    />

    <form-modal
      title="圈子"
      v-model:show="formAssist.showModal"
      :loading="formAssist.loading"
      v-model="formAssist.formValue"
      :options="formOptions()"
      @close="formAssist.formValue = {}"
      @confirm="createSocialCircle"
    />

    <form-modal
      title="封禁"
      :height="30"
      v-model:show="bannedFormAssist.showModal"
      :loading="bannedFormAssist.loading"
      v-model="bannedFormAssist.formValue"
      :options="bannedFormOptions"
      @close="bannedFormAssist.formValue = {}"
      @confirm="banned"
    />

    <template v-if="currentDetail">
      <shared-modal
        v-model:show="showDetailModal"
        :width="980"
        :title="currentDetail?.name"
        @close=";(showDetailModal = false), (currentDetail = null)"
      >
        <n-descriptions label-placement="left" :column="2" :size="'large'">
          <n-descriptions-item label="名称">
            {{ currentDetail.name }}
          </n-descriptions-item>
          <n-descriptions-item label="分类">
            {{ currentDetail.classifyName }}
          </n-descriptions-item>
          <n-descriptions-item label="成员头衔">
            {{ currentDetail.memberTitle }}
          </n-descriptions-item>
          <n-descriptions-item label="创建人">
            {{ currentDetail.creatorName }}
          </n-descriptions-item>
          <n-descriptions-item label="订阅人数">
            {{ currentDetail.followers }}
          </n-descriptions-item>
          <n-descriptions-item label="虚拟订阅人数">
            {{ currentDetail.vFollowers }}
          </n-descriptions-item>
          <n-descriptions-item label="状态">
            {{ formatStatus(currentDetail.status)?.text }}
          </n-descriptions-item>
          <n-descriptions-item label="展示在引导页">
            {{ currentDetail.guide ? '是' : '否' }}
          </n-descriptions-item>
          <n-descriptions-item label="图标">
            <n-image :src="$FILE_PATH + currentDetail.icon" :width="100" />
          </n-descriptions-item>
          <n-descriptions-item label="封面">
            <n-image :src="$FILE_PATH + currentDetail.cover" :width="300" />
          </n-descriptions-item>
          <n-descriptions-item
            label="封禁原因"
            v-if="currentDetail.bannedReason"
            :span="2"
          >
            {{ currentDetail.bannedReason }}
          </n-descriptions-item>
          <n-descriptions-item label="注意事项" :content-style="{ margin: 0 }">
            <div v-html="currentDetail.rule" style="margin: 0"></div>
          </n-descriptions-item>
        </n-descriptions>
      </shared-modal>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
