<template>
  <div class="setting-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">系统配置</h3>
      </div>
      
      <div class="grid-2">
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">基本设置</h4>
          
          <div class="form-group">
            <label class="form-label">系统名称</label>
            <input type="text" class="form-control" v-model="basicSettings.systemName">
          </div>
          
          <div class="form-group">
            <label class="form-label">系统版本</label>
            <input type="text" class="form-control" v-model="basicSettings.version" disabled>
          </div>
          
          <div class="form-group">
            <label class="form-label">时区设置</label>
            <select class="form-control" v-model="basicSettings.timezone">
              <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                {{ tz.label }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">系统语言</label>
            <select class="form-control" v-model="basicSettings.language">
              <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                {{ lang.label }}
              </option>
            </select>
          </div>
          
          <button class="btn btn-primary" @click="saveBasicSettings">保存设置</button>
        </div>
        
        <div>
          <h4 style="margin-bottom: 20px; color: #2c3e50;">通知设置</h4>
          
          <div class="form-group">
            <label class="form-label">邮件通知</label>
            <select class="form-control" v-model="notificationSettings.emailEnabled">
              <option :value="true">启用</option>
              <option :value="false">禁用</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">管理员邮箱</label>
            <input type="email" class="form-control" v-model="notificationSettings.adminEmail">
          </div>
          
          <div class="form-group">
            <label class="form-label">系统警报级别</label>
            <select class="form-control" v-model="notificationSettings.alertLevel">
              <option v-for="level in alertLevels" :key="level.value" :value="level.value">
                {{ level.label }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">短信通知</label>
            <select class="form-control" v-model="notificationSettings.smsEnabled">
              <option :value="true">启用</option>
              <option :value="false">禁用</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">管理员手机</label>
            <input type="tel" class="form-control" v-model="notificationSettings.adminPhone">
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">硬件配置</h3>
      </div>
      
      <div class="grid-3">
        <div class="card" v-for="hardware in hardwareConfig" :key="hardware.type">
          <div class="card-header">
            <div class="card-title">{{ hardware.title }}</div>
            <div class="card-icon">
              <i :class="hardware.icon"></i>
            </div>
          </div>
          <div class="card-value">{{ hardware.value }}</div>
          <div class="card-description" v-for="spec in hardware.specs" :key="spec">{{ spec }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingView',
  data() {
    return {
      basicSettings: {
        systemName: 'DeepSeek医疗AI平台',
        version: 'v2.3.1',
        timezone: '(UTC+08:00) 北京，重庆，香港，乌鲁木齐',
        language: '简体中文'
      },
      timezones: [
        { value: '(UTC+08:00) 北京，重庆，香港，乌鲁木齐', label: '(UTC+08:00) 北京，重庆，香港，乌鲁木齐' },
        { value: '(UTC-05:00) 东部时间（美国和加拿大）', label: '(UTC-05:00) 东部时间（美国和加拿大）' },
        { value: '(UTC+00:00) 都柏林，爱丁堡，里斯本，伦敦', label: '(UTC+00:00) 都柏林，爱丁堡，里斯本，伦敦' }
      ],
      languages: [
        { value: '简体中文', label: '简体中文' },
        { value: 'English', label: 'English' },
        { value: '繁體中文', label: '繁體中文' }
      ],
      notificationSettings: {
        emailEnabled: true,
        adminEmail: 'admin@hospital.com',
        alertLevel: 'warning',
        smsEnabled: true,
        adminPhone: '13800138000'
      },
      alertLevels: [
        { value: 'critical', label: '仅关键错误' },
        { value: 'warning', label: '警告和错误' },
        { value: 'all', label: '所有通知' }
      ],
      hardwareConfig: [
        {
          type: 'cpu',
          title: 'CPU配置',
          icon: 'fas fa-microchip',
          value: '4颗',
          specs: ['国产化处理器', '主频: 2.8GHz', '单颗处理器: 48核']
        },
        {
          type: 'gpu',
          title: 'GPU/NPU配置',
          icon: 'fas fa-brain',
          value: '8颗',
          specs: ['国产化处理器', 'FP16算力: 280T', '内存容量: 64G/颗']
        },
        {
          type: 'memory',
          title: '内存配置',
          icon: 'fas fa-memory',
          value: '1024GB',
          specs: ['最大支持: 2048GB', '传输速率: 2900MT/s', '插槽: 16/32']
        }
      ]
    }
  },
  methods: {
    saveBasicSettings() {
      console.log('保存基本设置:', this.basicSettings)
      // 这里可以添加保存逻辑
      alert('设置已保存')
    }
  }
}
</script>

<style scoped>
.setting-view {
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

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
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
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .grid-2, .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
