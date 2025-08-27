<template>
  <div class="medical-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">医疗场景应用</h3>
      </div>
      
      <div class="grid-2">
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">标准规范</h4>
          
          <div class="form-group" v-for="standard in medicalStandards" :key="standard.id">
            <label class="form-label">{{ standard.name }}</label>
            <select class="form-control" v-model="standard.enabled">
              <option :value="true">启用</option>
              <option :value="false">禁用</option>
            </select>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">系统集成</h4>
          
          <div class="form-group" v-for="system in systemIntegrations" :key="system.id">
            <label class="form-label">{{ system.name }}</label>
            <div style="display: flex; align-items: center;">
              <span :class="['status', 'status-' + system.status]" style="margin-right: 10px;">
                {{ system.statusText }}
              </span>
              <button 
                class="btn btn-outline" 
                style="padding: 5px 10px; font-size: 12px;"
                @click="handleSystemAction(system)"
              >
                {{ system.actionText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">病历质控分析</h3>
      </div>
      
      <div class="chart-container">
        <div style="text-align: center;">
          <i class="fas fa-chart-bar" style="font-size: 48px; margin-bottom: 15px; color: #ccc;"></i>
          <div>病历质控数据分析图表</div>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>质控项目</th>
            <th>检查数量</th>
            <th>合格数量</th>
            <th>合格率</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in qualityControlItems" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.totalCount }}</td>
            <td>{{ item.qualifiedCount }}</td>
            <td>{{ item.qualifiedRate }}%</td>
            <td>
              <span :class="['status', 'status-' + item.status]">
                {{ item.statusText }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedicalView',
  data() {
    return {
      medicalStandards: [
        { id: 1, name: '电子病历书写规范', enabled: true },
        { id: 2, name: '医疗管理核心制度', enabled: true },
        { id: 3, name: '疾病知识图谱', enabled: true },
        { id: 4, name: '临床路径管理', enabled: true }
      ],
      systemIntegrations: [
        { 
          id: 1, 
          name: 'HIS系统对接', 
          status: 'active', 
          statusText: '已连接',
          actionText: '测试连接'
        },
        { 
          id: 2, 
          name: 'EMR系统对接', 
          status: 'active', 
          statusText: '已连接',
          actionText: '测试连接'
        },
        { 
          id: 3, 
          name: 'LIS系统对接', 
          status: 'warning', 
          statusText: '未连接',
          actionText: '配置'
        },
        { 
          id: 4, 
          name: 'PACS系统对接', 
          status: 'error', 
          statusText: '错误',
          actionText: '修复'
        }
      ],
      qualityControlItems: [
        {
          name: '病历完整性',
          totalCount: 1284,
          qualifiedCount: 1156,
          qualifiedRate: 90,
          status: 'active',
          statusText: '良好'
        },
        {
          name: '医学逻辑',
          totalCount: 1284,
          qualifiedCount: 1092,
          qualifiedRate: 85,
          status: 'active',
          statusText: '良好'
        },
        {
          name: '上下文一致性',
          totalCount: 1284,
          qualifiedCount: 1026,
          qualifiedRate: 80,
          status: 'warning',
          statusText: '需改进'
        },
        {
          name: '客观逻辑',
          totalCount: 1284,
          qualifiedCount: 1028,
          qualifiedRate: 80,
          status: 'warning',
          statusText: '需改进'
        }
      ]
    }
  },
  methods: {
    handleSystemAction(system) {
      console.log('系统操作:', system.name, system.actionText)
      
      switch (system.actionText) {
        case '测试连接':
          this.testConnection(system)
          break
        case '配置':
          this.configureSystem(system)
          break
        case '修复':
          this.repairSystem(system)
          break
      }
    },
    
    testConnection(system) {
      console.log('测试连接:', system.name)
      // 这里可以添加测试连接逻辑
      alert(`正在测试${system.name}连接...`)
    },
    
    configureSystem(system) {
      console.log('配置系统:', system.name)
      // 这里可以添加配置逻辑
      alert(`正在配置${system.name}...`)
    },
    
    repairSystem(system) {
      console.log('修复系统:', system.name)
      // 这里可以添加修复逻辑
      alert(`正在修复${system.name}...`)
    }
  }
}
</script>

<style scoped>
.medical-view {
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

.chart-container {
  height: 300px;
  margin-top: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
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
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
