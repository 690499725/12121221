<template>
  <div class="safe-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">安全管理</h3>
      </div>
      
      <div class="grid-3">
        <div class="card" v-for="securityItem in securityOverview" :key="securityItem.type">
          <div class="card-header">
            <div class="card-title">{{ securityItem.title }}</div>
            <div class="card-icon" :style="securityItem.iconStyle">
              <i :class="securityItem.icon"></i>
            </div>
          </div>
          <div class="card-value">{{ securityItem.value }}</div>
          <div class="card-description">{{ securityItem.description }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: securityItem.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">安全配置</h3>
      </div>
      
      <div class="grid-2">
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">访问控制</h4>
          
          <div class="form-group" v-for="control in accessControls" :key="control.id">
            <label class="form-label">{{ control.name }}</label>
            <select class="form-control" v-model="control.enabled">
              <option :value="true">启用</option>
              <option :value="false">禁用</option>
            </select>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">安全策略</h4>
          
          <div class="form-group" v-for="policy in securityPolicies" :key="policy.id">
            <label class="form-label">{{ policy.name }}</label>
            <select class="form-control" v-model="policy.level">
              <option v-for="level in policy.levels" :key="level.value" :value="level.value">
                {{ level.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">安全日志</h3>
        <button class="btn btn-outline" @click="exportLogs">导出日志</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>事件类型</th>
            <th>用户</th>
            <th>IP地址</th>
            <th>状态</th>
            <th>详情</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in securityLogs" :key="log.id">
            <td>{{ log.timestamp }}</td>
            <td>{{ log.eventType }}</td>
            <td>{{ log.user }}</td>
            <td>{{ log.ipAddress }}</td>
            <td>
              <span :class="['status', 'status-' + log.status]">
                {{ log.statusText }}
              </span>
            </td>
            <td>
              <button 
                class="btn btn-outline" 
                style="padding: 5px 10px; font-size: 12px;"
                @click="viewLogDetails(log)"
              >
                查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafeView',
  data() {
    return {
      securityOverview: [
        {
          type: 'firewall',
          title: '防火墙状态',
          icon: 'fas fa-shield-alt',
          iconStyle: { background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71' },
          value: '正常',
          description: '所有规则正常运行',
          progress: 95
        },
        {
          type: 'antivirus',
          title: '病毒防护',
          icon: 'fas fa-bug',
          iconStyle: { background: 'rgba(52, 152, 219, 0.1)', color: '#3498db' },
          value: '已更新',
          description: '病毒库最新版本',
          progress: 88
        },
        {
          type: 'encryption',
          title: '数据加密',
          icon: 'fas fa-lock',
          iconStyle: { background: 'rgba(243, 156, 18, 0.1)', color: '#f39c12' },
          value: 'AES-256',
          description: '高强度加密算法',
          progress: 92
        }
      ],
      accessControls: [
        { id: 1, name: '用户认证', enabled: true },
        { id: 2, name: '权限管理', enabled: true },
        { id: 3, name: '会话控制', enabled: true },
        { id: 4, name: 'IP白名单', enabled: false }
      ],
      securityPolicies: [
        {
          id: 1,
          name: '密码策略',
          level: 'strong',
          levels: [
            { value: 'weak', label: '弱' },
            { value: 'medium', label: '中' },
            { value: 'strong', label: '强' }
          ]
        },
        {
          id: 2,
          name: '登录尝试限制',
          level: 'medium',
          levels: [
            { value: 'low', label: '低' },
            { value: 'medium', label: '中' },
            { value: 'high', label: '高' }
          ]
        },
        {
          id: 3,
          name: '会话超时',
          level: 'medium',
          levels: [
            { value: 'short', label: '短' },
            { value: 'medium', label: '中' },
            { value: 'long', label: '长' }
          ]
        }
      ],
      securityLogs: [
        {
          id: 1,
          timestamp: '2023-10-17 14:30:25',
          eventType: '用户登录',
          user: '张医生',
          ipAddress: '192.168.1.100',
          status: 'active',
          statusText: '成功'
        },
        {
          id: 2,
          timestamp: '2023-10-17 14:25:18',
          eventType: '权限变更',
          user: '管理员',
          ipAddress: '192.168.1.1',
          status: 'active',
          statusText: '成功'
        },
        {
          id: 3,
          timestamp: '2023-10-17 14:20:45',
          eventType: '异常访问',
          user: '未知',
          ipAddress: '192.168.1.200',
          status: 'warning',
          statusText: '警告'
        },
        {
          id: 4,
          timestamp: '2023-10-17 14:15:32',
          eventType: '数据导出',
          user: '李护士',
          ipAddress: '192.168.1.150',
          status: 'active',
          statusText: '成功'
        }
      ]
    }
  },
  methods: {
    exportLogs() {
      console.log('导出安全日志')
      // 这里可以添加导出日志的逻辑
      alert('正在导出安全日志...')
    },
    
    viewLogDetails(log) {
      console.log('查看日志详情:', log)
      // 这里可以添加查看详情的逻辑
      alert(`查看日志详情: ${log.eventType} - ${log.user}`)
    }
  }
}
</script>

<style scoped>
.safe-view {
  padding: 20px;
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

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
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
  margin-bottom: 10px;
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

@media (max-width: 768px) {
  .grid-2, .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
