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
    <div v-loading="loading" class="bg-gray-50 p-5 min-h-[400px]">
      <!-- 作者卡片 -->
      <div
        class="flex bg-white rounded-xl p-6 mb-5 items-start gap-5 shadow-sm"
      >
        <div class="relative flex-shrink-0">
          <el-image
            preview-teleported
            :preview-src-list="authorDetail.avatar ? [authorDetail.avatar] : []"
            :z-index="999999"
            fit="cover"
            :src="authorDetail.avatar ?? ''"
            class="w-20 h-20 rounded-full"
          >
            <template #error>
              <div
                class="w-20 h-20 rounded-full flex bg-gray-100 items-center justify-center text-gray-400 text-2xl"
              >
                <i class="el-icon-user" />
              </div>
            </template>
          </el-image>
          <div
            v-if="authorDetail.featured"
            class="rounded-full flex items-center justify-center shadow-sm absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-white text-xs"
          >
            <i class="el-icon-star-on" />
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center mb-3 justify-between">
            <h3 class="text-xl font-semibold text-gray-800 m-0">
              {{ authorDetail.name || '未知作者' }}
            </h3>
            <el-tag
              :type="authorDetail.isEnabled ? 'success' : 'danger'"
              size="small"
              effect="plain"
            >
              {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
            </el-tag>
          </div>

          <div class="mb-4">
            <div class="flex flex-wrap gap-2 items-center mb-3">
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
            class="m-0 text-sm text-gray-600 leading-6"
          >
            {{ authorDetail.description }}
          </p>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="mb-5 grid grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-5 text-center shadow-sm">
          <div class="text-2xl font-semibold mb-1 text-blue-500">
            {{ authorDetail.followersCount || 0 }}
          </div>
          <div class="text-sm text-gray-600">关注者</div>
        </div>
        <div class="bg-white rounded-lg p-5 text-center shadow-sm">
          <div class="text-2xl font-semibold text-blue-500 mb-1">
            {{ authorDetail.worksCount || 0 }}
          </div>
          <div class="text-sm text-gray-600">作品数量</div>
        </div>
      </div>

      <!-- 社交链接 -->
      <div
        v-if="socialLinks?.length"
        class="bg-white rounded-lg p-5 mb-4 shadow-sm"
      >
        <div
          class="flex items-center gap-2 text-base font-medium text-gray-800 mb-4 pb-2"
        >
          <i class="text-blue-500 text-base el-icon-link" />
          <span>社交媒体</span>
        </div>
        <div class="flex gap-2 flex-col">
          <div
            v-for="(item, idx) in socialLinks"
            :key="idx"
            class="flex items-center bg-gray-50 rounded-lg py-3 px-4 cursor-pointer transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:border-blue-500"
            @click="openLink(item.value)"
          >
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-800 mb-0.5">
                {{ item.label }}
              </div>
              <div
                class="text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {{ item.value }}
              </div>
            </div>
            <div
              class="w-5 h-5 flex items-center justify-center duration-200 opacity-50 transition-opacity hover:opacity-80"
            >
              <i class="text-xs text-gray-600 el-icon-arrow-right" />
            </div>
          </div>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="bg-white rounded-lg p-5 mb-4 shadow-sm">
        <div
          class="flex items-center gap-2 text-base font-medium text-gray-800 mb-4 pb-2"
        >
          <i class="text-blue-500 text-base el-icon-time" />
          <span>系统信息</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <span
              class="text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              创建时间
            </span>
            <span class="text-sm text-gray-800 break-all">
              {{
                $dayjs
                  .utc(authorDetail.createdAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span
              class="text-xs text-gray-500 font-medium uppercase tracking-wider"
            >
              更新时间
            </span>
            <span class="text-sm text-gray-800 break-all">
              {{
                $dayjs
                  .utc(authorDetail.updatedAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </span>
          </div>
          <div
            v-if="authorDetail.remark"
            class="flex flex-col gap-1 col-span-2"
          >
            <span
              class="text-xs text-gray-500 font-medium uppercase tracking-wider"
            >
              备注
            </span>
            <span class="text-sm text-gray-800 break-all">
              {{ authorDetail.remark }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </EsModal>
</template>

<style scoped>
  /* 响应式设计 */
  @media (max-width: 768px) {
    .bg-white.rounded-xl.p-6.mb-5.flex.items-start.gap-5 {
      @apply flex-col text-center items-center;
    }

    .flex.items-center.justify-between.mb-3 {
      @apply flex-col gap-2 items-center;
    }

    .mb-4 {
      @apply justify-center;
    }

    .grid.grid-cols-2.gap-4.mb-5 {
      @apply grid-cols-1;
    }

    .grid.grid-cols-2.gap-4 {
      @apply grid-cols-1;
    }
  }
</style>
