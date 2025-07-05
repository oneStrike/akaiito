<script setup lang="ts">
  import type { AuthorDetailResponse } from '@/apis/types/author'
  import { authorDetailApi } from '@/apis/author.ts'
  import { useDataDict } from '@/hooks/useDataDict.ts'
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
  const rolesLabel = ref('')
  const authorDetail = ref<AuthorDetailResponse>({} as AuthorDetailResponse)
  authorDetailApi({ id: props.authorId }).then(async (data) => {
    authorDetail.value = await useDataDict.fillRow(data, {
      nationality: 'nationality',
    })
    rolesLabel.value = useBitMask
      .getLabels(authorDetail.value.roles!, authorRoles)
      .join('、')
    loading.value = false
  })

  const socialLinks = computed(() => {
    return utils.parseJson(authorDetail.value?.socialLinks, [])
  })

  function openLink(url: string) {
    window.open(url, '_blank')
  }
</script>

<template>
  <EsModal
    v-if="visible"
    :model-value="visible"
    :title="`【${authorDetail?.name ?? '作者'}】详情`"
    :width="800"
    @closed="emits('close')"
  >
    <div v-loading="loading" class="p-4">
      <!-- 作者卡片 -->
      <el-card class="mb-5">
        <div class="flex items-start gap-5">
          <div class="relative flex-shrink-0">
            <el-image
              preview-teleported
              :preview-src-list="
                authorDetail.avatar ? [authorDetail.avatar] : []
              "
              :z-index="999999"
              fit="cover"
              :src="authorDetail.avatar ?? ''"
              class="w-20 h-20 rounded-full"
            />
            <div
              v-if="authorDetail.featured"
              class="rounded-full flex items-center justify-center shadow-sm absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-white text-xs"
            >
              荐
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex flex-col gap-2 mb-3">
              <h3
                class="text-lg font-semibold m-0 text-gray-900 dark:text-gray-100"
              >
                {{ authorDetail.name || '未知作者' }}
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  状态:
                </span>
                <span
                  :class="
                    authorDetail.isEnabled
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  "
                  class="text-sm font-medium"
                >
                  {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
                </span>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex items-center mb-3 flex-wrap gap-2">
                <el-tag
                  v-if="authorDetail.gender !== undefined"
                  type="info"
                  size="small"
                  effect="plain"
                  class="text-xs mr-1 mb-1 rounded"
                >
                  {{
                    gender.find((item) => item.value === authorDetail?.gender)
                      ?.label ?? '未知'
                  }}
                </el-tag>

                <el-tag
                  type="success"
                  size="small"
                  effect="plain"
                  class="mr-1 mb-1 text-xs rounded"
                >
                  {{ authorDetail.nationality || '未知' }}
                </el-tag>

                <el-tag
                  v-if="rolesLabel !== '-'"
                  type="warning"
                  size="small"
                  effect="plain"
                  class="mr-1 mb-1 text-xs rounded"
                >
                  {{ rolesLabel }}
                </el-tag>

                <el-tag
                  v-if="authorDetail.featured"
                  type="danger"
                  size="small"
                  effect="plain"
                  class="mr-1 mb-1 text-xs rounded"
                >
                  精选作者
                </el-tag>

                <el-tag
                  :type="authorDetail.isEnabled ? 'success' : 'info'"
                  size="small"
                  effect="plain"
                  class="mr-1 mb-1 text-xs rounded"
                >
                  {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
                </el-tag>
              </div>
            </div>

            <p
              v-if="authorDetail.description"
              class="m-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
            >
              {{ authorDetail.description }}
            </p>
          </div>
        </div>
      </el-card>

      <!-- 统计数据 -->
      <div class="grid grid-cols-2 gap-4 mb-5">
        <el-card class="text-center">
          <div class="text-3xl mb-2 font-bold text-blue-600 dark:text-blue-400">
            {{ authorDetail.followersCount || 0 }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">关注者</div>
        </el-card>
        <el-card class="text-center">
          <div
            class="text-3xl mb-2 font-bold text-purple-600 dark:text-purple-400"
          >
            {{ authorDetail.worksCount || 0 }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">作品数量</div>
        </el-card>
      </div>

      <!-- 社交链接 -->
      <el-card v-if="socialLinks?.length" class="mb-4">
        <template #header>
          <h3
            class="text-base font-semibold m-0 text-gray-900 dark:text-gray-100"
          >
            社交媒体
          </h3>
        </template>
        <div class="space-y-2">
          <div
            v-for="(item, idx) in socialLinks"
            :key="idx"
            class="flex items-center justify-between p-3 rounded cursor-pointer transition-colors border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            @click="openLink(item.value)"
          >
            <div class="flex-1 min-w-0">
              <div
                class="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100"
              >
                {{ item.label }}
              </div>
              <div class="text-xs truncate text-gray-600 dark:text-gray-400">
                {{ item.value }}
              </div>
            </div>
            <div class="w-5 h-5 flex items-center justify-center opacity-50">
              <i
                class="text-xs el-icon-arrow-right text-gray-400 dark:text-gray-500"
              />
            </div>
          </div>
        </div>
      </el-card>

      <!-- 系统信息 -->
      <el-card class="mb-4">
        <template #header>
          <h3
            class="text-base font-semibold m-0 text-gray-900 dark:text-gray-100"
          >
            系统信息
          </h3>
        </template>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              创建时间
            </div>
            <div class="text-sm text-gray-900 dark:text-gray-100">
              {{
                $dayjs
                  .utc(authorDetail.createdAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              更新时间
            </div>
            <div class="text-sm text-gray-900 dark:text-gray-100">
              {{
                $dayjs
                  .utc(authorDetail.updatedAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </div>
          </div>
          <div v-if="authorDetail.remark" class="col-span-2 space-y-1">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              备注
            </div>
            <div
              class="text-sm p-3 rounded border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 text-gray-700 dark:text-gray-300"
            >
              {{ authorDetail.remark }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </EsModal>
</template>
