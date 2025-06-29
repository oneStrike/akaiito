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
    rolesLabel.value = useBitmask
      .getLabels(authorDetail.value.roles!, authorRoles)
      .join('、')
    loading.value = false
  })

  const socialLinks = computed(() => {
    return utils.parseJson(authorDetail.value?.socialLinks, [])
  })
</script>

<template>
  <EsModal
    v-if="visible"
    :model-value="visible"
    :title="`【${authorDetail?.name ?? '作者'}】详情`"
    :width="800"
    @closed="emits('close')"
  >
    <div v-loading="loading" class="author-detail">
      <!-- 作者卡片 -->
      <div class="author-card">
        <div class="author-avatar-wrapper">
          <el-image
            preview-teleported
            :preview-src-list="authorDetail.avatar ? [authorDetail.avatar] : []"
            :z-index="999999"
            fit="cover"
            :src="authorDetail.avatar ?? ''"
            class="author-avatar"
          >
            <template #error>
              <div class="avatar-placeholder">
                <i class="el-icon-user" />
              </div>
            </template>
          </el-image>
          <div v-if="authorDetail.featured" class="featured-badge">
            <i class="el-icon-star-on" />
          </div>
        </div>

        <div class="author-info">
          <div class="author-header">
            <h3 class="author-name">{{ authorDetail.name || '未知作者' }}</h3>
            <el-tag
              :type="authorDetail.isEnabled ? 'success' : 'danger'"
              size="small"
              effect="plain"
            >
              {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
            </el-tag>
          </div>

        <div class="author-meta">
          <div class="meta-tags">
            <el-tag
               v-if="authorDetail.gender !== undefined"
               type="info"
               size="small"
               effect="plain"
               class="meta-tag"
             >
               {{ gender.find((item) => item.value === authorDetail?.gender)?.label ?? '未知' }}
             </el-tag>

             <el-tag
               type="success"
               size="small"
               effect="plain"
               class="meta-tag"
             >
               {{ authorDetail.nationality || '未知' }}
             </el-tag>

             <el-tag
               v-if="rolesLabel !== '-'"
               type="warning"
               size="small"
               effect="plain"
               class="meta-tag"
             >
               {{ rolesLabel }}
             </el-tag>

             <el-tag
               v-if="authorDetail.featured"
               type="danger"
               size="small"
               effect="plain"
               class="meta-tag"
             >
               精选作者
             </el-tag>

             <el-tag
               :type="authorDetail.isEnabled ? 'success' : 'info'"
               size="small"
               effect="plain"
               class="meta-tag"
             >
               {{ authorDetail.isEnabled ? '已启用' : '已禁用' }}
             </el-tag>
          </div>
        </div>

          <p v-if="authorDetail.description" class="author-desc">
            {{ authorDetail.description }}
          </p>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-number">{{ authorDetail.followersCount || 0 }}</div>
          <div class="stat-label">关注者</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ authorDetail.worksCount || 0 }}</div>
          <div class="stat-label">作品数量</div>
        </div>
      </div>

      <!-- 社交链接 -->
      <div v-if="socialLinks?.length" class="social-section">
        <div class="section-header">
          <i class="el-icon-link" />
          <span>社交媒体</span>
        </div>
        <div class="social-links">
          <el-link
            v-for="(item, idx) in socialLinks"
            :key="idx"
            :href="item.value"
            target="_blank"
            type="primary"
            class="social-link"
          >
            {{ item.label }}
          </el-link>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="info-section">
        <div class="section-header">
          <i class="el-icon-time" />
          <span>系统信息</span>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">创建时间</span>
            <span class="info-value">{{ authorDetail.createdAt || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">更新时间</span>
            <span class="info-value">{{ authorDetail.updatedAt || '-' }}</span>
          </div>
          <div v-if="authorDetail.remark" class="info-item full-width">
            <span class="info-label">备注</span>
            <span class="info-value">{{ authorDetail.remark }}</span>
          </div>
        </div>
      </div>
    </div>
  </EsModal>
</template>

<style scoped>
  .author-detail {
    padding: 20px;
    background: #fafafa;
    min-height: 400px;
  }

  /* 作者卡片 */
  .author-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
  }

  .author-avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #f5f5f5;
  }

  .avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    font-size: 24px;
  }

  .featured-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: #ffd700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .author-info {
    flex: 1;
    min-width: 0;
  }

  .author-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .author-name {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .author-meta {
  margin-bottom: 16px;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.meta-tag {
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  border-radius: 4px;
}

  .author-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin: 0;
  }

  /* 统计数据 */
  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    border: 1px solid #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .stat-number {
    font-size: 24px;
    font-weight: 600;
    color: #409eff;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: #666;
  }

  /* 区块样式 */
  .social-section,
  .info-section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f5f5f5;
  }

  .section-header i {
    color: #409eff;
    font-size: 16px;
  }

  /* 社交链接 */
  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .social-link {
    padding: 6px 12px;
    border-radius: 6px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .social-link:hover {
    background: #e3f2fd;
    border-color: #409eff;
  }

  /* 信息网格 */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .info-item.full-width {
    grid-column: 1 / -1;
  }

  .info-label {
    font-size: 12px;
    color: #999;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .info-value {
    font-size: 14px;
    color: #333;
    word-break: break-all;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .author-card {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    .author-header {
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }

    .author-meta {
      justify-content: center;
    }

    .stats-row {
      grid-template-columns: 1fr;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
