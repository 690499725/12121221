<template>
  <div class="performance-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">性能概览</h3>
      </div>
      
      <div class="grid-4">
        <div class="card" v-for="metric in performanceMetrics" :key="metric.type">
          <div class="card-header">
            <div class="card-title">{{ metric.title }}</div>
            <div class="card-icon" :style="metric.iconStyle">
              <i :class="metric.icon"></i>
            </div>
          </div>
          <div class="card-value">{{ metric.value }}</div>
          <div class="card-description">{{ metric.description }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: metric.percentage + '%', background: metric.color }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">实时监控</h3>
        <div class="monitoring-controls">
          <button class="btn btn-outline" @click="refreshData">刷新数据</button>
          <button class="btn btn-outline" @click="toggleAutoRefresh">
            {{ autoRefresh ? '停止自动刷新' : '开始自动刷新' }}
          </button>
        </div>
      </div>
      
      <div class="chart-container">
        <div style="text-align: center;">
          <i class="fas fa-chart-line" style="font-size: 48px; margin-bottom: 15px; color: #ccc;"></i>
          <div>系统性能实时监控图表</div>
          <div style="font-size: 14px; margin-top: 10px; color: #999;">
            最后更新: {{ lastUpdateTime }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">性能趋势</h3>
        <select class="form-control" style="width: auto;" v-model="selectedTimeRange">
          <option value="1h">最近1小时</option>
          <option value="6h">最近6小时</option>
          <option value="24h">最近24小时</option>
          <option value="7d">最近7天</option>
        </select>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>指标名称</th>
            <th>当前值</th>
            <th>平均值</th>
            <th>最大值</th>
            <th>最小值</th>
            <th>趋势</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trend in performanceTrends" :key="trend.name">
            <td>{{ trend.name }}</td>
            <td>{{ trend.current }}</td>
            <td>{{ trend.average }}</td>
            <td>{{ trend.max }}</td>
            <td>{{ trend.min }}</td>
            <td>
              <span :class="['trend-indicator', 'trend-' + trend.trend]">
                <i :class="trend.trendIcon"></i>
                {{ trend.trendText }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">告警设置</h3>
        <button class="btn btn-primary" @click="saveAlertSettings">保存设置</button>
      </div>
      
      <div class="grid-2">
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">CPU告警</h4>
          
          <div class="form-group">
            <label class="form-label">警告阈值 (%)</label>
            <input type="number" class="form-control" v-model="alertSettings.cpu.warning" min="0" max="100">
          </div>
          
          <div class="form-group">
            <label class="form-label">严重阈值 (%)</label>
            <input type="number" class="form-control" v-model="alertSettings.cpu.critical" min="0" max="100">
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">内存告警</h4>
          
          <div class="form-group">
            <label class="form-label">警告阈值 (%)</label>
            <input type="number" class="form-control" v-model="alertSettings.memory.warning" min="0" max="100">
          </div>
          
          <div class="form-group">
            <label class="form-label">严重阈值 (%)</label>
            <input type="number" class="form-control" v-model="alertSettings.memory.critical" min="0" max="100">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceView',
  data() {
    return {
      autoRefresh: false,
      lastUpdateTime: '2023-10-17 15:30:25',
      selectedTimeRange: '1h',
      performanceMetrics: [
        {
          type: 'cpu',
          title: 'CPU使用率',
          icon: 'fas fa-microchip',
          iconStyle: { background: 'rgba(52, 152, 219, 0.1)', color: '#3498db' },
          value: '42%',
          description: '当前CPU负载',
          percentage: 42,
          color: '#3498db'
        },
        {
          type: 'memory',
          title: '内存使用率',
          icon: 'fas fa-memory',
          iconStyle: { background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' },
          value: '68%',
          description: '当前内存占用',
          percentage: 68,
          color: '#e74c3c'
        },
        {
          type: 'disk',
          title: '磁盘使用率',
          icon: 'fas fa-hdd',
          iconStyle: { background: 'rgba(243, 156, 18, 0.1)', color: '#f39c12' },
          value: '35%',
          description: '当前磁盘占用',
          percentage: 35,
          color: '#f39c12'
        },
        {
          type: 'network',
          title: '网络流量',
          icon: 'fas fa-network-wired',
          iconStyle: { background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71' },
          value: '156 Mbps',
          description: '当前网络带宽',
          percentage: 45,
          color: '#2ecc71'
        }
      ],
      performanceTrends: [
        {
          name: 'CPU使用率',
          current: '42%',
          average: '38%',
          max: '78%',
          min: '12%',
          trend: 'up',
          trendIcon: 'fas fa-arrow-up',
          trendText: '上升'
        },
        {
          name: '内存使用率',
          current: '68%',
          average: '65%',
          max: '82%',
          min: '45%',
          trend: 'stable',
          trendIcon: 'fas fa-minus',
          trendText: '稳定'
        },
        {
          name: '磁盘I/O',
          current: '45 MB/s',
          average: '52 MB/s',
          max: '120 MB/s',
          min: '8 MB/s',
          trend: 'down',
          trendIcon: 'fas fa-arrow-down',
          trendText: '下降'
        },
        {
          name: '网络延迟',
          current: '15ms',
          average: '18ms',
          max: '45ms',
          min: '8ms',
          trend: 'up',
          trendIcon: 'fas fa-arrow-up',
          trendText: '上升'
        }
      ],
      alertSettings: {
        cpu: {
          warning: 70,
          critical: 90
        },
        memory: {
          warning: 80,
          critical: 95
        }
      }
    }
  },
  mounted() {
    this.startAutoRefresh()
  },
  beforeUnmount() {
    this.stopAutoRefresh()
  },
  methods: {
    refreshData() {
      console.log('刷新性能数据')
      this.lastUpdateTime = new Date().toLocaleString('zh-CN')
      // 这里可以添加刷新数据的逻辑
    },
    
    toggleAutoRefresh() {
      this.autoRefresh = !this.autoRefresh
      if (this.autoRefresh) {
        this.startAutoRefresh()
      } else {
        this.stopAutoRefresh()
      }
    },
    
    startAutoRefresh() {
      if (this.autoRefresh) {
        this.refreshInterval = setInterval(() => {
          this.refreshData()
        }, 30000) // 30秒刷新一次
      }
    },
    
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },
    
    saveAlertSettings() {
      console.log('保存告警设置:', this.alertSettings)
      // 这里可以添加保存设置的逻辑
      alert('告警设置已保存')
    }
  }
}
</script>

<style scoped>
.performance-view {
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

.monitoring-controls {
  display: flex;
  gap: 10px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
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
  border-radius: 4px;
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

.trend-indicator {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.trend-up {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.trend-down {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.trend-stable {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
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
  .grid-2, .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .monitoring-controls {
    flex-direction: column;
  }
}
</style>
