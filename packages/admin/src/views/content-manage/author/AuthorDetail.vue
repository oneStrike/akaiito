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
    <div v-loading="loading" class="layout-container">
      <!-- 作者卡片 -->
      <div class="card mb-5">
        <div class="flex items-start gap-5">
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
            <div class="flex items-center justify-between mb-3">
              <h3 class="title-section m-0">
                {{ authorDetail.name || '未知作者' }}
              </h3>
              <span
                :class="authorDetail.isEnabled ? 'status-success' : 'status-danger'"
              >
                {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
              </span>
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

            <p v-if="authorDetail.description" class="text-regular m-0">
              {{ authorDetail.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="layout-grid-2 mb-5">
        <div class="content-stats">
          <div class="text-2xl mb-1 font-semibold text-primary">
            {{ authorDetail.followersCount || 0 }}
          </div>
          <div class="title-sub">关注者</div>
        </div>
        <div class="content-stats">
          <div class="text-2xl font-semibold text-primary mb-1">
            {{ authorDetail.worksCount || 0 }}
          </div>
          <div class="title-sub">作品数量</div>
        </div>
      </div>

      <!-- 社交链接 -->
      <div v-if="socialLinks?.length" class="card mb-4">
        <div class="layout-header">
          <div class="accent-bar-primary" />
          <h3 class="title-section">社交媒体</h3>
        </div>
        <div class="space-y-2">
          <div
            v-for="(item, idx) in socialLinks"
            :key="idx"
            class="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-100 transition-colors border border-[var(--el-border-color-light)]"
            @click="openLink(item.value)"
          >
            <div class="flex-1 min-w-0">
              <div class="title-sub mb-1">{{ item.label }}</div>
              <div class="text-regular text-xs truncate">{{ item.value }}</div>
            </div>
            <div class="w-5 h-5 flex items-center justify-center opacity-50">
              <i class="text-xs text-regular el-icon-arrow-right" />
            </div>
          </div>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="card mb-4">
        <div class="layout-header">
          <div class="accent-bar-info" />
          <h3 class="title-section">系统信息</h3>
        </div>
        <div class="layout-grid-2">
          <div class="content-section">
            <div class="title-sub">创建时间</div>
            <div class="text-primary">
              {{
                $dayjs
                  .utc(authorDetail.createdAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </div>
          </div>
          <div class="content-section">
            <div class="title-sub">更新时间</div>
            <div class="text-primary">
              {{
                $dayjs
                  .utc(authorDetail.updatedAt)
                  .format('YYYY-MM-DD HH:mm:ss') || '-'
              }}
            </div>
          </div>
          <div v-if="authorDetail.remark" class="content-section col-span-2">
            <div class="title-sub">备注</div>
            <div class="text-primary">{{ authorDetail.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </EsModal>
</template>

<style scoped>
  /* 设计系统样式已内置响应式支持 */
</style>
