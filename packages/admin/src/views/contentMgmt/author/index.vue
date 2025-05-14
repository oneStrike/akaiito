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
      <!-- 容器 -->
      <div class="p-4 space-y-6">
        <!-- 头像区域 -->
        <div class="flex justify-center">
          <el-image
            preview-teleported
            :preview-src-list="currentRow.avatar ? [currentRow.avatar] : []"
            :z-index="999999"
            fit="cover"
            :src="currentRow.avatar ?? ''"
            class="w-32 h-32 rounded-full border border-gray-300 shadow-md"
          >
            <template #error>
              <el-text type="danger">加载失败</el-text>
            </template>
          </el-image>
        </div>

        <!-- 基本信息卡片 -->
        <el-descriptions :column="1" label-width="100px" border>
          <el-descriptions-item label="姓名">{{
            currentRow.name
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{
            gender[currentRow.gender!] ?? '-'
          }}</el-descriptions-item>
          <el-descriptions-item label="国籍">{{
            nationality
          }}</el-descriptions-item>
          <el-descriptions-item label="身份">{{
            identityHandler(currentRow)
          }}</el-descriptions-item>
          <el-descriptions-item label="添加时间">{{
            currentRow.createdAt
          }}</el-descriptions-item>
        </el-descriptions>

        <!-- 外部链接卡片 -->
        <template v-if="socialLinks?.length">
          <el-text>
            <span class="font-medium text-base px-4 py-2 bg-gray-50 border-b"
              >外部链接</span
            >
          </el-text>
          <div class="p-4 flex flex-wrap gap-2">
            <el-link
              v-for="(item, idx) in socialLinks"
              :key="idx"
              type="primary"
              :href="item.value"
              target="_blank"
              icon="link"
              class="text-blue-600 hover:underline"
            >
              {{ item.label }}
            </el-link>
          </div>
        </template>

        <!-- 描述与备注卡片 -->
        <el-descriptions :column="1" label-width="100px" border>
          <el-descriptions-item label="作者描述">{{
            currentRow.description || '-'
          }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{
            currentRow.remark || '-'
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </es-modal>
  </div>
</template>

<style scoped></style>
