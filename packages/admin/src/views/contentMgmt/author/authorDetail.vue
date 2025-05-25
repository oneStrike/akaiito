<script setup lang="ts">
  import type { GetAuthorDetailTypesRes } from '@/apis/types/author'
  import { getAuthorDetailApi } from '@/apis/author.ts'
  import { getDataDictionaryItemsApi } from '@/apis/dictionary.ts'
  import { utils } from '@/utils'
  import { authorRoles, gender } from './shared.ts'

  defineOptions({
    name: 'AuthorDetailModal',
  })

  const props = withDefaults(
    defineProps<{
      visible?: boolean
      authorId: number
    }>(),
    {
      visible: false,
    },
  )

  const emits = defineEmits(['close'])

  const loading = ref(true)
  const authorDetail = ref<GetAuthorDetailTypesRes>(
    {} as GetAuthorDetailTypesRes,
  )
  getAuthorDetailApi({ id: props.authorId }).then((data) => {
    authorDetail.value = data
    loading.value = false
  })

  const nationalityData = ref<IterateObject[]>([])
  getDataDictionaryItemsApi({
    dictionaryCode: 'nationality',
  }).then(({ nationality }) => {
    nationalityData.value = nationality
  })
  const nationality = computed(() => {
    const target = nationalityData.value.find(
      (item) => item.code === authorDetail.value?.nationality,
    )
    return target?.name ?? '-'
  })

  const socialLinks = computed(() => {
    return utils.parseJson(authorDetail.value?.socialLinks, [])
  })

  const rolesLabel = computed(() => {
    const identity: string[] = []
    authorDetail.value?.roles?.forEach((item) => {
      authorRoles.forEach((roles) => {
        if (roles.value === item) {
          identity.push(roles.label)
        }
      })
    })
    return identity.join('、') || '-'
  })
</script>

<template>
  <es-modal
    v-if="visible"
    :model-value="visible"
    :title="`【${authorDetail?.name ?? '作者'}】详情`"
    :width="820"
    @closed="emits('close')"
  >
    <!-- 容器 -->
    <div v-loading="loading" class="p-4 space-y-6">
      <!-- 头像区域 -->
      <div class="flex justify-center">
        <el-image
          preview-teleported
          :preview-src-list="authorDetail.avatar ? [authorDetail.avatar] : []"
          :z-index="999999"
          fit="cover"
          :src="authorDetail.avatar ?? ''"
          class="w-32 h-32 rounded-full border border-gray-300 shadow-md"
        >
          <template #error>
            <el-text type="danger">加载失败</el-text>
          </template>
        </el-image>
      </div>

      <!-- 基本信息卡片 -->
      <el-descriptions :column="1" label-width="100px" border>
        <el-descriptions-item label="姓名">
          {{ authorDetail.name }}
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          {{
            gender.find((item) => item.value === authorDetail?.gender)?.label ??
            '-'
          }}
        </el-descriptions-item>
        <el-descriptions-item label="国籍">
          {{ nationality }}
        </el-descriptions-item>
        <el-descriptions-item label="身份">
          {{ rolesLabel }}
        </el-descriptions-item>
        <el-descriptions-item label="添加时间">
          {{ authorDetail.createdAt }}
        </el-descriptions-item>
        <el-descriptions-item v-if="socialLinks?.length" label="外部链接">
          <div class="flex flex-wrap gap-2">
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
        </el-descriptions-item>
        <el-descriptions-item label="作者描述">
          {{ authorDetail.description || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ authorDetail.remark || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </es-modal>
</template>
