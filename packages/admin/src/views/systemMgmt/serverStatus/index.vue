<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  defineOptions({
    name: 'ServerStatus',
  })

  // 系统状态数据
  const systemInfo = ref({
    cpu: {
      usage: 45,
      cores: 8,
      model: 'Intel Core i7-12700K',
      temperature: 52,
    },
    memory: {
      total: 32,
      used: 18.5,
      available: 13.5,
      usage: 57.8,
    },
    disk: {
      total: 1024,
      used: 512,
      available: 512,
      usage: 50,
    },
    system: {
      os: 'Ubuntu 22.04 LTS',
      uptime: '15天 8小时 32分钟',
      loadAverage: [1.2, 1.5, 1.8],
      processes: 245,
    },
    network: {
      upload: 125.6,
      download: 89.3,
    },
  })

  // 获取系统状态数据
  const fetchSystemStatus = () => {
    // 这里后续会调用实际的API
    console.log('获取系统状态数据')
  }

  // 格式化字节大小
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 GB'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
  }

  // 获取状态颜色
  const getStatusColor = (usage: number) => {
    if (usage < 50) return '#67c23a'
    if (usage < 80) return '#e6a23c'
    return '#f56c6c'
  }

  // 获取状态类型
  const getStatusType = (usage: number) => {
    if (usage < 50) return 'success'
    if (usage < 80) return 'warning'
    return 'danger'
  }

  onMounted(() => {
    fetchSystemStatus()
    // 每30秒刷新一次数据
    setInterval(fetchSystemStatus, 30000)
  })
</script>

<template>
  <div class="server-status">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">服务器状态监控</h2>
      <p class="text-gray-600">实时监控系统资源使用情况</p>
    </div>

    <!-- 系统概览卡片 -->
    <el-row :gutter="20" class="mb-6">
      <!-- CPU 使用率 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="status-card">
          <div class="status-header">
            <div class="status-icon cpu-icon">
              <i class="el-icon-cpu">🖥️</i>
            </div>
            <div class="status-info">
              <h3>CPU 使用率</h3>
              <p class="status-value">{{ systemInfo.cpu.usage }}%</p>
            </div>
          </div>
          <el-progress
            :percentage="systemInfo.cpu.usage"
            :color="getStatusColor(systemInfo.cpu.usage)"
            :stroke-width="8"
            class="mt-4"
          />
        </el-card>
      </el-col>

      <!-- 内存使用率 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="status-card">
          <div class="status-header">
            <div class="status-icon memory-icon">
              <i class="el-icon-memory">💾</i>
            </div>
            <div class="status-info">
              <h3>内存使用率</h3>
              <p class="status-value">{{ systemInfo.memory.usage }}%</p>
            </div>
          </div>
          <el-progress
            :percentage="systemInfo.memory.usage"
            :color="getStatusColor(systemInfo.memory.usage)"
            :stroke-width="8"
            class="mt-4"
          />
        </el-card>
      </el-col>

      <!-- 磁盘使用率 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="status-card">
          <div class="status-header">
            <div class="status-icon disk-icon">
              <i class="el-icon-disk">💿</i>
            </div>
            <div class="status-info">
              <h3>磁盘使用率</h3>
              <p class="status-value">{{ systemInfo.disk.usage }}%</p>
            </div>
          </div>
          <el-progress
            :percentage="systemInfo.disk.usage"
            :color="getStatusColor(systemInfo.disk.usage)"
            :stroke-width="8"
            class="mt-4"
          />
        </el-card>
      </el-col>

      <!-- 系统负载 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="status-card">
          <div class="status-header">
            <div class="status-icon load-icon">
              <i class="el-icon-load">⚡</i>
            </div>
            <div class="status-info">
              <h3>系统负载</h3>
              <p class="status-value">{{ systemInfo.system.loadAverage[0] }}</p>
            </div>
          </div>
          <div class="load-info mt-4">
            <el-tag
              :type="getStatusType(systemInfo.system.loadAverage[0] * 25)"
              size="small"
            >
              1分钟: {{ systemInfo.system.loadAverage[0] }}
            </el-tag>
            <el-tag
              :type="getStatusType(systemInfo.system.loadAverage[1] * 25)"
              size="small"
              class="ml-2"
            >
              5分钟: {{ systemInfo.system.loadAverage[1] }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 详细信息 -->
    <el-row :gutter="20">
      <!-- CPU 详细信息 -->
      <el-col :xs="24" :lg="12">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">🖥️ CPU 详细信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="处理器型号">
              {{ systemInfo.cpu.model }}
            </el-descriptions-item>
            <el-descriptions-item label="核心数">
              {{ systemInfo.cpu.cores }} 核心
            </el-descriptions-item>
            <el-descriptions-item label="当前使用率">
              <el-tag :type="getStatusType(systemInfo.cpu.usage)">
                {{ systemInfo.cpu.usage }}%
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="温度">
              <el-tag
                :type="systemInfo.cpu.temperature > 70 ? 'danger' : 'success'"
              >
                {{ systemInfo.cpu.temperature }}°C
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <!-- 内存详细信息 -->
      <el-col :xs="24" :lg="12">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">💾 内存详细信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="总内存">
              {{ systemInfo.memory.total }} GB
            </el-descriptions-item>
            <el-descriptions-item label="已使用">
              <span class="text-red-500">{{ systemInfo.memory.used }} GB</span>
            </el-descriptions-item>
            <el-descriptions-item label="可用内存">
              <span class="text-green-500">
                {{ systemInfo.memory.available }} GB
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="使用率">
              <el-tag :type="getStatusType(systemInfo.memory.usage)">
                {{ systemInfo.memory.usage }}%
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-6">
      <!-- 磁盘详细信息 -->
      <el-col :xs="24" :lg="12">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">💿 磁盘详细信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="总容量">
              {{ systemInfo.disk.total }} GB
            </el-descriptions-item>
            <el-descriptions-item label="已使用">
              <span class="text-red-500">{{ systemInfo.disk.used }} GB</span>
            </el-descriptions-item>
            <el-descriptions-item label="可用空间">
              <span class="text-green-500">
                {{ systemInfo.disk.available }} GB
              </span>
            </el-descriptions-item>
            <el-descriptions-item label="使用率">
              <el-tag :type="getStatusType(systemInfo.disk.usage)">
                {{ systemInfo.disk.usage }}%
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <!-- 系统详细信息 -->
      <el-col :xs="24" :lg="12">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">⚙️ 系统详细信息</span>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="操作系统">
              {{ systemInfo.system.os }}
            </el-descriptions-item>
            <el-descriptions-item label="运行时间">
              {{ systemInfo.system.uptime }}
            </el-descriptions-item>
            <el-descriptions-item label="进程数">
              {{ systemInfo.system.processes }}
            </el-descriptions-item>
            <el-descriptions-item label="15分钟负载">
              <el-tag
                :type="getStatusType(systemInfo.system.loadAverage[2] * 25)"
              >
                {{ systemInfo.system.loadAverage[2] }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <!-- 网络状态 -->
    <el-row :gutter="20" class="mt-6">
      <el-col :span="24">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">🌐 网络状态</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <div class="network-item">
                <div class="network-label">上传速度</div>
                <div class="network-value upload">
                  <i class="el-icon-upload">⬆️</i>
                  {{ systemInfo.network.upload }} KB/s
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12">
              <div class="network-item">
                <div class="network-label">下载速度</div>
                <div class="network-value download">
                  <i class="el-icon-download">⬇️</i>
                  {{ systemInfo.network.download }} KB/s
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
  .server-status {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: calc(100vh - 120px);

    .status-card {
      height: 140px;
      transition: all 0.3s ease;
      border: none;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
      }

      :deep(.el-card__body) {
        padding: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .status-header {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .status-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;

      &.cpu-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      &.memory-icon {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      &.disk-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }

      &.load-icon {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      }
    }

    .status-info {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }

      .status-value {
        margin: 5px 0 0 0;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
    }

    .load-info {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .detail-card {
      margin-bottom: 20px;
      border: none;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
      }

      :deep(.el-descriptions__label) {
        font-weight: 500;
        color: #666;
      }

      :deep(.el-descriptions__content) {
        color: #333;
      }
    }

    .network-item {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-bottom: 10px;

      .network-label {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }

      .network-value {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &.upload {
          color: #e6a23c;
        }

        &.download {
          color: #67c23a;
        }
      }
    }

    // 响应式设计
    @media (max-width: 768px) {
      padding: 10px;

      .status-card {
        height: auto;
        margin-bottom: 15px;
      }

      .status-header {
        flex-direction: column;
        text-align: center;
        gap: 10px;
      }

      .status-info {
        .status-value {
          font-size: 20px;
        }
      }
    }
  }

  // 进度条自定义样式
  :deep(.el-progress-bar__outer) {
    border-radius: 10px;
    background-color: #f0f2f5;
  }

  :deep(.el-progress-bar__inner) {
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  // 标签样式优化
  :deep(.el-tag) {
    border-radius: 6px;
    font-weight: 500;
  }

  // 描述列表样式优化
  :deep(.el-descriptions) {
    .el-descriptions__table {
      border-radius: 8px;
      overflow: hidden;
    }

    .el-descriptions__cell {
      padding: 12px 16px;
    }
  }
</style>
