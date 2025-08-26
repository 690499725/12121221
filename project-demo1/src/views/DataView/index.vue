<template>
  <div class="data-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">数据管理</h3>
      </div>
      
      <div class="grid-3">
        <div class="card" v-for="dataType in dataTypes" :key="dataType.type">
          <div class="card-header">
            <div class="card-title">{{ dataType.title }}</div>
            <div class="card-icon">
              <i :class="dataType.icon"></i>
            </div>
          </div>
          <div class="card-value">{{ dataType.value }}</div>
          <div class="card-description">{{ dataType.description }}</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: dataType.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">数据处理任务</h3>
        <button class="btn btn-primary" @click="createNewTask">新建任务</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>任务名称</th>
            <th>类型</th>
            <th>状态</th>
            <th>进度</th>
            <th>开始时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in dataTasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td>{{ task.type }}</td>
            <td>
              <span :class="['status', 'status-' + task.status]">
                {{ task.statusText }}
              </span>
            </td>
            <td>
              <div class="progress-bar">
                <div class="progress" :style="{ width: task.progress + '%' }"></div>
              </div>
              {{ task.progress }}%
            </td>
            <td>{{ task.startTime }}</td>
            <td>
              <button 
                class="btn btn-outline" 
                style="padding: 5px 10px; font-size: 12px;"
                @click="viewTaskDetails(task)"
              >
                详情
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
  name: 'DataView',
  data() {
    return {
      dataTypes: [
        {
          type: 'medical',
          title: '病历数据',
          icon: 'fas fa-file-medical',
          value: '28,549 份',
          description: '已处理病历文书',
          progress: 75
        },
        {
          type: 'prescription',
          title: '医嘱数据',
          icon: 'fas fa-prescription',
          value: '64,832 条',
          description: '已处理医嘱处方',
          progress: 68
        },
        {
          type: 'examination',
          title: '检查结果',
          icon: 'fas fa-microscope',
          value: '42,156 份',
          description: '已处理检查检验结果',
          progress: 52
        }
      ],
      dataTasks: [
        {
          id: 1,
          name: '病历结构化处理',
          type: '数据处理',
          status: 'active',
          statusText: '进行中',
          progress: 65,
          startTime: '2023-10-15 09:30'
        },
        {
          id: 2,
          name: '医学知识抽取',
          type: '知识提取',
          status: 'active',
          statusText: '进行中',
          progress: 42,
          startTime: '2023-10-16 14:20'
        },
        {
          id: 3,
          name: '数据备份',
          type: '备份任务',
          status: 'active',
          statusText: '进行中',
          progress: 88,
          startTime: '2023-10-17 03:00'
        },
        {
          id: 4,
          name: '历史数据归档',
          type: '归档任务',
          status: 'success',
          statusText: '已完成',
          progress: 100,
          startTime: '2023-10-10 22:00'
        }
      ]
    }
  },
  methods: {
    createNewTask() {
      console.log('新建任务')
      // 这里可以添加新建任务的逻辑，比如显示模态框
      alert('新建任务功能')
    },
    
    viewTaskDetails(task) {
      console.log('查看任务详情:', task.name)
      // 这里可以添加查看详情的逻辑
      alert(`查看任务详情: ${task.name}`)
    }
  }
}
</script>

<style scoped>
.data-view {
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

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
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
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
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

.status-success {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
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
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
