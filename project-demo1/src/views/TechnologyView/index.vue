<template>
  <div class="technology-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">技术支持</h3>
        <button class="btn btn-primary" @click="requestSupport">请求支持</button>
      </div>
      
      <div class="grid-2">
        <div>
          <h4 style="margin: 15px 0 10px; color: #2c3e50;">服务内容</h4>
          <ul class="service-list">
            <li v-for="service in serviceContent" :key="service.id" class="service-item">
              <i class="fas fa-check-circle"></i>
              {{ service.name }}
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style="margin: 15px 0 10px; color: #2c3e50;">服务承诺</h4>
          <div class="service-commitment">
            <div v-for="commitment in serviceCommitments" :key="commitment.id" class="commitment-item">
              <i :class="commitment.icon" :style="{ color: commitment.color }"></i>
              <span>{{ commitment.text }}</span>
            </div>
          </div>
          
          <h4 style="margin: 25px 0 10px; color: #2c3e50;">联系方式</h4>
          <div class="contact-info">
            <div v-for="contact in contactMethods" :key="contact.id" class="contact-item">
              <i :class="contact.icon" :style="{ color: contact.color }"></i>
              <span>{{ contact.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">常见问题</h3>
      </div>
      
      <div class="faq-container">
        <div v-for="faq in faqList" :key="faq.id" class="faq-item">
          <div class="faq-question" @click="toggleFaq(faq.id)">
            <span>{{ faq.question }}</span>
            <i :class="['fas', faq.isOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </div>
          <div class="faq-answer" v-show="faq.isOpen">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">支持工单</h3>
        <button class="btn btn-outline" @click="createTicket">创建工单</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>工单号</th>
            <th>问题类型</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>优先级</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in supportTickets" :key="ticket.id">
            <td>{{ ticket.number }}</td>
            <td>{{ ticket.type }}</td>
            <td>
              <span :class="['status', 'status-' + ticket.status]">
                {{ ticket.statusText }}
              </span>
            </td>
            <td>{{ ticket.createTime }}</td>
            <td>
              <span :class="['priority', 'priority-' + ticket.priority]">
                {{ ticket.priorityText }}
              </span>
            </td>
            <td>
              <button 
                class="btn btn-outline" 
                style="padding: 5px 10px; font-size: 12px;"
                @click="viewTicket(ticket)"
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
  name: 'TechnologyView',
  data() {
    return {
      serviceContent: [
        { id: 1, name: '设备安装部署' },
        { id: 2, name: '系统集成' },
        { id: 3, name: '数据处理' },
        { id: 4, name: '模型微调' },
        { id: 5, name: '专职技术人员驻场' },
        { id: 6, name: '运维保障' },
        { id: 7, name: '用户培训' }
      ],
      serviceCommitments: [
        {
          id: 1,
          icon: 'fas fa-clock',
          color: '#3498db',
          text: '7×24小时响应支持'
        },
        {
          id: 2,
          icon: 'fas fa-user-md',
          color: '#3498db',
          text: '工作日专职技术人员驻场'
        },
        {
          id: 3,
          icon: 'fas fa-tools',
          color: '#3498db',
          text: '非工作日1小时内远程响应'
        }
      ],
      contactMethods: [
        {
          id: 1,
          icon: 'fas fa-phone',
          color: '#3498db',
          text: '400-123-4567'
        },
        {
          id: 2,
          icon: 'fas fa-envelope',
          color: '#3498db',
          text: 'support@deepseek.com'
        },
        {
          id: 3,
          icon: 'fas fa-comment',
          color: '#3498db',
          text: '在线客服'
        }
      ],
      faqList: [
        {
          id: 1,
          question: '如何重置系统密码？',
          answer: '请联系系统管理员或拨打技术支持热线400-123-4567获取帮助。',
          isOpen: false
        },
        {
          id: 2,
          question: '系统出现故障如何处理？',
          answer: '首先检查系统状态页面，如果问题持续存在，请创建支持工单或联系技术支持。',
          isOpen: false
        },
        {
          id: 3,
          question: '如何申请新的功能模块？',
          answer: '通过系统内的功能申请功能提交申请，或直接联系技术支持团队。',
          isOpen: false
        },
        {
          id: 4,
          question: '数据备份策略是什么？',
          answer: '系统采用自动备份策略，每日凌晨2点进行全量备份，每小时进行增量备份。',
          isOpen: false
        }
      ],
      supportTickets: [
        {
          id: 1,
          number: 'TK-2023-001',
          type: '系统故障',
          status: 'active',
          statusText: '处理中',
          createTime: '2023-10-17 10:30',
          priority: 'high',
          priorityText: '高'
        },
        {
          id: 2,
          number: 'TK-2023-002',
          type: '功能咨询',
          status: 'pending',
          statusText: '待处理',
          createTime: '2023-10-17 14:20',
          priority: 'medium',
          priorityText: '中'
        },
        {
          id: 3,
          number: 'TK-2023-003',
          type: '培训需求',
          status: 'resolved',
          statusText: '已解决',
          createTime: '2023-10-16 16:45',
          priority: 'low',
          priorityText: '低'
        }
      ]
    }
  },
  methods: {
    requestSupport() {
      console.log('请求技术支持')
      // 这里可以添加请求支持的逻辑
      alert('正在为您转接技术支持...')
    },
    
    toggleFaq(faqId) {
      const faq = this.faqList.find(item => item.id === faqId)
      if (faq) {
        faq.isOpen = !faq.isOpen
      }
    },
    
    createTicket() {
      console.log('创建支持工单')
      // 这里可以添加创建工单的逻辑
      alert('创建工单功能')
    },
    
    viewTicket(ticket) {
      console.log('查看工单:', ticket.number)
      // 这里可以添加查看工单的逻辑
      alert(`查看工单详情: ${ticket.number}`)
    }
  }
}
</script>

<style scoped>
.technology-view {
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

.service-list {
  list-style: none;
  padding: 0;
}

.service-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;
}

.service-item i {
  color: #2ecc71;
  margin-right: 10px;
  font-size: 16px;
}

.service-commitment, .contact-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.commitment-item, .contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.commitment-item:last-child, .contact-item:last-child {
  margin-bottom: 0;
}

.commitment-item i, .contact-item i {
  margin-right: 10px;
  font-size: 16px;
}

.faq-container {
  max-width: 100%;
}

.faq-item {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background: #e9ecef;
}

.faq-answer {
  padding: 15px 20px;
  border-top: 1px solid #eaeaea;
  background: white;
  line-height: 1.6;
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

.status-pending {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.status-resolved {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.priority {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.priority-high {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.priority-medium {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.priority-low {
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
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
