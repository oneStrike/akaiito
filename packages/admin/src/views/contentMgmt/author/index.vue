<script lang="ts" setup>
import type {
  GetAuthorDetailTypesRes,
  GetAuthorPageTypesRes,
} from '@/apis/types/author'
import {
  createAuthorApi,
  deleteAuthorApi,
  getAuthorDetailApi,
  getAuthorPageApi,
  updateAuthorApi,
  updateAuthorStatusApi,
} from '@/apis/author'
import { utils } from '@/utils'
import { filter, formOptions, tableColumns, toolbar } from './shared'

defineOptions({
  name: 'Author',
})
type Record = GetAuthorPageTypesRes['list'][number]

const modalFrom = reactive({
  show: false,
  loading: false,
})
const detailModel = ref(false)
const currentRow = ref<GetAuthorDetailTypesRes | null>(null)
const formTool = useFormTool(formOptions)
formTool.fillDict([
  {
    field: 'nationality',
    code: 'nationality',
  },
])
const gender = ['未知', '男', '女']
const { reset, request, loading, requestData, params, sortChange } = useRequest(
  async (params: IterateObject) => {
    if (Array.isArray(params.roles)) {
      params.roles = JSON.stringify(params.roles)
    }
    return await getAuthorPageApi(params)
  },
)

async function submitForm(val: any) {
  modalFrom.loading = true
  if (val.website) {
    val.website = encodeURIComponent(val.website)
  }
  if (!val.avatar) {
    delete val.avatar
  }
  if (Array.isArray(val.socialLinks)) {
    val.socialLinks = JSON.stringify(val.socialLinks)
  }
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateAuthorApi(val)
  } else {
    await createAuthorApi(val)
  }
  modalFrom.show = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！',
  })
  currentRow.value = null
  modalFrom.loading = false
  request()
}

async function switchStatus(val: any) {
  await updateAuthorStatusApi(val)
  await request()
}

const roles = {
  MODEL: '模特',
  WRITER: '作家',
  ILLUSTRATOR: '画师',
  COMIC_ARTIST: '漫画家',
}

// 函数实现
function identityHandler(row: Record) {
  const identity: string[] = []
  row.roles.forEach((item) => {
    identity.push(roles[item as keyof typeof roles])
  })
  return identity.join('、') || '-'
}

// 获取详情数据
async function getDetail(val: Record) {
  currentRow.value = await getAuthorDetailApi({ id: val.id })
}

const openFormModal = async (val?: Record) => {
  if (val) {
    await getDetail(val)
  } else {
    currentRow.value = null
  }
  modalFrom.show = true
}
const openDetailModal = async (val: Record) => {
  if (val) {
    await getDetail(val)
  }
  detailModel.value = true
}

const nationality = computed(() => {
  const options =
    formTool.getItem('nationality')[0].componentProps?.options ?? []
  const target = options.find(
    (item) => item.value === currentRow.value?.nationality,
  )
  return target?.label ?? '-'
})

const socialLinks = computed(() => {
  return utils.parseJson(currentRow.value?.socialLinks, [])
})
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <es-table
      v-model:params="params"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      :filter="filter"
      :toolbar="toolbar"
      @link="openDetailModal"
      @reset="reset"
      @query="request"
      @sort-change="sortChange"
      @toolbar-handler="openFormModal()"
    >
      <template #status="{ row }">
        <es-switch :request="switchStatus" :row="row" />
      </template>

      <template #roles="{ row }">
        <span>{{ identityHandler(row) }}</span>
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <el-divider direction="vertical" />
        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteAuthorApi"
          :row="row"
          @success="request()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-if="modalFrom.show"
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formTool.options"
      @submit="submitForm"
    />

    <es-modal
      v-if="currentRow && detailModel"
      v-model="detailModel"
      :title="`【${currentRow?.name}】详情`"
    >
      <div class="w-full flex items-center justify-center mb-4">
        <el-image
          preview-teleported
          :preview-src-list="currentRow?.avatar ? [currentRow?.avatar] : []"
          :z-index="999999"
          fit="cover"
          :src="currentRow?.avatar ?? ''"
          class="h-30 w-22"
        >
          <template #error>
            <el-text type="danger">加载失败</el-text>
          </template>
        </el-image>
      </div>
      <el-descriptions border :column="1" :label-width="100">
        <el-descriptions-item label="姓名">
          {{ currentRow.name }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ gender[currentRow.gender!] ?? '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="国籍">
          {{ nationality }}
        </el-descriptions-item>
        <el-descriptions-item label="身份">
          {{ identityHandler(currentRow) }}
        </el-descriptions-item>
        <el-descriptions-item label="外部链接" :span="1">
          <template v-if="socialLinks.length">
            <el-link
              v-for="(item, idx) in socialLinks"
              :key="idx"
              type="primary"
              :href="item.value"
              target="_blank"
            >
              {{ item.label }}
              <el-divider
                v-if="idx + 1 !== socialLinks.length"
                direction="vertical"
              />
            </el-link>
          </template>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="作者描述" :span="1">
          {{ currentRow.description }}
        </el-descriptions-item>
        <el-descriptions-item label="备注" :span="1">
          {{ currentRow.remark }}
        </el-descriptions-item>
        <el-descriptions-item label="添加时间">
          {{ currentRow.createdAt }}
        </el-descriptions-item>
      </el-descriptions>
    </es-modal>
  </div>
</template>

<style scoped></style>
