<template>
  <div class="home-view">
    <!-- 仪表盘卡片 -->
    <div class="dashboard">
      <div class="card">
        <div class="card-header">
          <div class="card-title">系统状态</div>
          <div class="card-icon">
            <i class="fas fa-server"></i>
          </div>
        </div>
        <div class="card-value">运行中</div>
        <div class="card-description">所有服务正常运行</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: systemStatus.progress + '%' }"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">智能助手</div>
          <div class="card-icon">
            <i class="fas fa-robot"></i>
          </div>
        </div>
        <div class="card-value">{{ aiUsage.count }} 次</div>
        <div class="card-description">本月使用次数</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: aiUsage.progress + '%' }"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">数据处理</div>
          <div class="card-icon">
            <i class="fas fa-database"></i>
          </div>
        </div>
        <div class="card-value">{{ dataProcessing.amount }}</div>
        <div class="card-description">已处理医疗数据</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: dataProcessing.progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 功能模块 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">核心功能模块</h3>
        <button class="btn btn-outline" @click="manageModules">管理模块</button>
      </div>
      
      <div class="dashboard">
        <div class="card" v-for="module in coreModules" :key="module.id">
          <div class="card-header">
            <div class="card-title">{{ module.title }}</div>
            <div class="card-icon" :style="module.iconStyle">
              <i :class="module.icon"></i>
            </div>
          </div>
          <div class="card-description">
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li v-for="feature in module.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统监控 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">系统监控</h3>
        <button class="btn btn-outline" @click="viewDetails">查看详情</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>服务名称</th>
            <th>状态</th>
            <th>CPU使用率</th>
            <th>内存使用率</th>
            <th>运行时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in systemServices" :key="service.name">
            <td>{{ service.name }}</td>
            <td>
              <span :class="['status', 'status-' + service.status]">
                {{ service.statusText }}
              </span>
            </td>
            <td>{{ service.cpu }}%</td>
            <td>{{ service.memory }}%</td>
            <td>{{ service.uptime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      systemStatus: {
        progress: 95
      },
      aiUsage: {
        count: 1248,
        progress: 78
      },
      dataProcessing: {
        amount: '3.2 TB',
        progress: 65
      },
      coreModules: [
        {
          id: 1,
          title: '运维管理',
          icon: 'fas fa-tools',
          iconStyle: { background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71' },
          features: ['部件状态监测', '故障组件告警', '权限管理', '操作日志审计']
        },
        {
          id: 2,
          title: '智能助手',
          icon: 'fas fa-assistive-listening-systems',
          iconStyle: { background: 'rgba(243, 156, 18, 0.1)', color: '#f39c12' },
          features: ['智能搜索功能', '多类型问题答疑', '写作辅助', '问题回顾优化']
        },
        {
          id: 3,
          title: '医疗场景应用',
          icon: 'fas fa-laptop-medical',
          iconStyle: { background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' },
          features: ['电子病历规范', '医疗数据采集', '病历结构化处理', '辅助诊疗建议']
        }
      ],
      systemServices: [
        {
          name: 'AI模型推理服务',
          status: 'active',
          statusText: '正常',
          cpu: 42,
          memory: 68,
          uptime: '12天 4小时'
        },
        {
          name: '数据预处理服务',
          status: 'active',
          statusText: '正常',
          cpu: 28,
          memory: 45,
          uptime: '8天 16小时'
        },
        {
          name: 'API网关',
          status: 'active',
          statusText: '正常',
          cpu: 15,
          memory: 32,
          uptime: '23天 7小时'
        },
        {
          name: '数据库服务',
          status: 'warning',
          statusText: '警告',
          cpu: 76,
          memory: 82,
          uptime: '5天 12小时'
        }
      ]
    }
  },
  methods: {
    manageModules() {
      console.log('管理模块')
      // 这里可以添加跳转逻辑或显示模态框
    },
    viewDetails() {
      console.log('查看详情')
      // 这里可以添加跳转逻辑或显示模态框
    }
  }
}
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-title {
  font-size: 18px;
  color: #2c3e50;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 5px;
}

.card-description {
  color: #7f8c8d;
  font-size: 14px;
}

.section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

.section-title {
  font-size: 20px;
  color: #2c3e50;
}

.progress-bar {
  height: 8px;
  background: #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background: #3498db;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

th {
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
}

tr:hover {
  background-color: #f1f8ff;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.status-warning {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.status-error {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-outline {
  background: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
