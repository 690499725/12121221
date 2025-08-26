<template>
  <div class="ai-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">智能助手</h3>
      </div>
      
      <div class="chat-container">
        <div class="message message-question" v-for="message in chatMessages" :key="message.id" :class="message.type">
          <strong>{{ message.sender }}:</strong> 
          <span v-html="message.content"></span>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          type="text" 
          placeholder="输入您的问题..." 
          v-model="newMessage"
          @keypress.enter="sendMessage"
        >
        <button class="btn btn-primary" @click="sendMessage">发送</button>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">助手工具</h3>
      </div>
      
      <div class="grid-3">
        <div class="tool-card" v-for="tool in aiTools" :key="tool.id" @click="selectTool(tool)">
          <div class="tool-icon">
            <i :class="tool.icon"></i>
          </div>
          <div>
            <div style="font-weight: 500;">{{ tool.title }}</div>
            <div style="font-size: 14px; color: #7f8c8d;">{{ tool.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiView',
  data() {
    return {
      newMessage: '',
      chatMessages: [
        {
          id: 1,
          sender: '用户',
          content: '如何诊断二型糖尿病？',
          type: 'message-question'
        },
        {
          id: 2,
          sender: 'DeepSeek助手',
          content: `二型糖尿病的诊断通常基于以下标准：<br><br>
            1. 空腹血糖 ≥ 7.0 mmol/L<br>
            2. 餐后2小时血糖 ≥ 11.1 mmol/L<br>
            3. 随机血糖 ≥ 11.1 mmol/L 伴有糖尿病症状<br>
            4. 糖化血红蛋白 (HbA1c) ≥ 6.5%<br><br>
            建议结合临床症状和实验室检查结果综合判断，必要时进行OGTT试验。`,
          type: 'message-answer'
        },
        {
          id: 3,
          sender: '用户',
          content: '请帮我写一份出院小结模板',
          type: 'message-question'
        },
        {
          id: 4,
          sender: 'DeepSeek助手',
          content: `出院小结模板如下：<br><br>
            【患者基本信息】<br>
            姓名：______ 性别：______ 年龄：______ 住院号：______<br><br>
            【入院情况】<br>
            主诉：______<br>
            入院诊断：______<br><br>
            【诊疗经过】<br>
            入院后给予______治疗，期间进行了______检查，结果显示______。<br><br>
            【出院情况】<br>
            患者目前______，生命体征平稳，查体______。<br><br>
            【出院诊断】<br>
            1. ______<br>
            2. ______<br><br>
            【出院医嘱】<br>
            1. 药物治疗：______<br>
            2. 定期复查：______<br>
            3. 注意事项：______<br><br>
            请您根据患者具体情况填写相关内容。`,
          type: 'message-answer'
        }
      ],
      aiTools: [
        {
          id: 1,
          title: '智能搜索',
          description: '基于知识库的精准搜索',
          icon: 'fas fa-search'
        },
        {
          id: 2,
          title: '智能答疑',
          description: '多类型问题解答',
          icon: 'fas fa-question-circle'
        },
        {
          id: 3,
          title: '写作辅助',
          description: '医疗文书写作助手',
          icon: 'fas fa-pencil-alt'
        }
      ]
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return
      
      // 添加用户消息
      const userMessage = {
        id: Date.now(),
        sender: '用户',
        content: this.newMessage,
        type: 'message-question'
      }
      this.chatMessages.push(userMessage)
      
      // 模拟AI回复
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'DeepSeek助手',
          content: `我已收到您的查询："${this.newMessage}"。正在分析您的问题，请稍候...`,
          type: 'message-answer'
        }
        this.chatMessages.push(aiMessage)
        
        // 滚动到底部
        this.$nextTick(() => {
          const chatContainer = document.querySelector('.chat-container')
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight
          }
        })
      }, 1000)
      
      // 清空输入框
      this.newMessage = ''
      
      // 滚动到底部
      this.$nextTick(() => {
        const chatContainer = document.querySelector('.chat-container')
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight
        }
      })
    },
    selectTool(tool) {
      console.log('选择工具:', tool.title)
      // 这里可以添加工具选择逻辑
      this.newMessage = `我想使用${tool.title}功能`
    }
  },
  
}
</script>

<style scoped>
.ai-view {
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

.chat-container {
  height: 400px;
  overflow-y: auto;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 15px;
}

.message {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.message-question {
  background: #e3f2fd;
  border-left: 4px solid #3498db;
}

.message-answer {
  background: #f1f8e9;
  border-left: 4px solid #2ecc71;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.chat-input input:focus {
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

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.tool-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.tool-card:hover {
  transform: translateX(5px);
}

.tool-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
