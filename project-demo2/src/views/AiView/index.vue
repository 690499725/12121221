<template>
  <div class="ai-view">
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">智能助手</h3>
        <div class="chat-controls">
          <label class="thinking-toggle">
            <input type="checkbox" v-model="showThinking" />
            显示思考
          </label>
          <button class="btn btn-outline" @click="testConnection">测试连接</button>
          <button class="btn btn-outline" @click="clearChat">清空聊天</button>
        </div>
      </div>
      
      <div class="chat-container">
        <div class="message" v-for="message in chatMessages" :key="message.id" :class="message.type">
          <strong>{{ message.sender }}:</strong> 
          <span v-html="message.content"></span>
        </div>
        <div v-if="isTyping && !useStream" class="message message-answer">
          <strong>DeepSeek助手:</strong> 
          <span class="typing-indicator">
            <i class="fas fa-circle"></i>
            <i class="fas fa-circle"></i>
            <i class="fas fa-circle"></i>
          </span>
        </div>
        <!-- 移除底部“正在思考中...”提示，避免与思考消息重复 -->
      </div>
      
      <div class="chat-input">
        <input 
          type="text" 
          placeholder="输入您的问题..." 
          v-model="newMessage"
          @keypress.enter="sendMessage"
          :disabled="isTyping"
        >
        <button class="btn btn-primary" @click="sendMessage" :disabled="isTyping || !newMessage.trim()">
          {{ isTyping ? '发送中...' : '发送' }}
        </button>
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
import { chatWithCoze, handleStreamResponse, handleNormalResponse } from '@/api/cozeApi'

export default {
  name: 'AiView',
  data() {
    return {
      newMessage: '',
      isTyping: false,
      useStream: true,
      debugMode: false,
      showThinking: true, // 新增：控制是否显示思考过程
      chatMessages: [
        {
          id: 1,
          sender: 'DeepSeek助手',
          content: '你好！我是DeepSeek智能助手，有什么可以帮助你的吗？',
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
  computed: {
    hasThinkingMessage() {
      // 只要存在思考相关的消息（进行中或已完成），就视为已有思考消息，避免底部再次出现“正在思考中...”
      return this.chatMessages.some(msg => msg.type === 'message-thinking' || msg.type === 'message-thinking-complete');
    }
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() === '' || this.isTyping) return
      
      const userMessage = this.newMessage.trim()
      
      // 添加用户消息
      const userMsg = {
        id: Date.now(),
        sender: '用户',
        content: userMessage,
        type: 'message-question'
      }
      this.chatMessages.push(userMsg)
      
      // 清空输入框
      this.newMessage = ''
      
      // 显示AI正在输入状态
      this.isTyping = true
      
      try {
        if (this.useStream) {
          // 流式响应
          await this.handleStreamChat(userMessage)
        } else {
          // 普通响应
          await this.handleNormalChat(userMessage)
        }
      } catch (error) {
        console.error('发送消息失败:', error)
        this.addErrorMessage('抱歉，发送消息时出现错误，请稍后重试。')
      } finally {
        this.isTyping = false
      }
      
      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    
    async handleStreamChat(message) {
      try {
        console.log('开始流式聊天，消息:', message)
        const stream = await chatWithCoze(message, true)
        
        // 创建思考消息容器
        const thinkingMessage = {
          id: Date.now() + 1,
          sender: 'DeepSeek助手',
          content: '',
          type: 'message-thinking'
        }
        
        // 创建最终回答消息容器
        const answerMessage = {
          id: Date.now() + 2,
          sender: 'DeepSeek助手',
          content: '',
          type: 'message-answer'
        }
        
        // 先添加思考消息
        this.chatMessages.push(thinkingMessage)
        
                 // 处理流式响应
         await handleStreamResponse(
           stream, 
           (content, type) => {
             console.log('收到内容:', content, '类型:', type)
             
             if (type === 'append-reasoning') {
               if (this.showThinking) {
                 thinkingMessage.content += content
                 this.$forceUpdate()
               }
             } else if (type === 'append-final') {
               if (!this.chatMessages.find(m => m.id === answerMessage.id)) {
                 answerMessage.content = ''
                 this.chatMessages.push(answerMessage)
               }
               answerMessage.content += content
               this.$forceUpdate()
               
               // 当开始显示最终回答时，立即移除思考消息的进度条
               if (thinkingMessage.content) {
                 thinkingMessage.type = 'message-thinking-complete'
                 this.$forceUpdate()
               }
             } else if (type === 'error') {
               // 显示错误信息
               const errorMessage = {
                 id: Date.now() + 3,
                 sender: '系统',
                 content: content,
                 type: 'message-error'
               }
               this.chatMessages.push(errorMessage)
               this.$forceUpdate()
             }
             
             this.scrollToBottom()
           },
           () => {
             // 思考完成回调 - 确保进度条被移除
             console.log('思考过程完成')
             if (thinkingMessage.content) {
               // 如果思考消息有内容，移除进度条样式
               thinkingMessage.type = 'message-thinking-complete'
               this.$forceUpdate()
             } else {
               // 如果思考消息没有内容，直接移除
               const index = this.chatMessages.findIndex(msg => msg.id === thinkingMessage.id)
               if (index !== -1) {
                 this.chatMessages.splice(index, 1)
               }
             }
             this.$forceUpdate()
           }
         )
        
        console.log('流式聊天完成')
        
      } catch (error) {
        console.error('流式聊天失败:', error)
        this.addErrorMessage(`抱歉，AI响应出现错误：${error.message}`)
      } finally {
        // 确保在完成后隐藏思考指示器
        this.isTyping = false
      }
    },
    
    async handleNormalChat(message) {
      try {
        console.log('开始普通聊天，消息:', message)
        const response = await chatWithCoze(message, false)
        
        if (this.debugMode) {
          console.log('原始响应对象:', response)
          const debugMessage = {
            id: Date.now() + 1,
            sender: '系统',
            content: `[DEBUG] 原始响应: ${JSON.stringify(response, null, 2)}`,
            type: 'message-info'
          }
          this.chatMessages.push(debugMessage)
        }
        
        const content = await handleNormalResponse(response)
        
        console.log('普通聊天完成，内容:', content)
        
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'DeepSeek助手',
          content: content,
          type: 'message-answer'
        }
        
        this.chatMessages.push(aiMessage)
        
      } catch (error) {
        console.error('普通聊天失败:', error)
        this.addErrorMessage(`抱歉，AI响应出现错误：${error.message}`)
      }
    },
    
    addErrorMessage(content) {
      const errorMessage = {
        id: Date.now(),
        sender: '系统',
        content: content,
        type: 'message-error'
      }
      this.chatMessages.push(errorMessage)
    },
    
    selectTool(tool) {
      console.log('选择工具:', tool.title)
      this.newMessage = `我想使用${tool.title}功能`
    },
    
    clearChat() {
      this.chatMessages = [{
        id: Date.now(),
        sender: 'DeepSeek助手',
        content: '聊天记录已清空，有什么可以帮助你的吗？',
        type: 'message-answer'
      }]
    },
    
    async testConnection() {
      try {
        this.isTyping = true
        const testMessage = {
          id: Date.now(),
          sender: '系统',
          content: '正在测试API连接...',
          type: 'message-info'
        }
        this.chatMessages.push(testMessage)
        
        const response = await chatWithCoze('测试', false)
        console.log('API测试响应:', response)
        
        const successMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: 'API连接测试成功！',
          type: 'message-success'
        }
        this.chatMessages.push(successMessage)
        
      } catch (error) {
        console.error('API连接测试失败:', error)
        const errorMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `API连接测试失败：${error.message}`,
          type: 'message-error'
        }
        this.chatMessages.push(errorMessage)
      } finally {
        this.isTyping = false
        this.scrollToBottom()
      }
    },
    
    async debugApiResponse() {
      try {
        this.isTyping = true
        const testMessage = {
          id: Date.now(),
          sender: '系统',
          content: '正在获取API原始响应...',
          type: 'message-info'
        }
        this.chatMessages.push(testMessage)
        
        // 测试流式响应
        const streamResponse = await chatWithCoze('你好', true)
        console.log('流式响应对象:', streamResponse)
        
        const streamDebugMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `[DEBUG] 流式响应对象类型: ${typeof streamResponse}, 构造函数: ${streamResponse.constructor.name}`,
          type: 'message-info'
        }
        this.chatMessages.push(streamDebugMessage)
        
        // 测试非流式响应
        const normalResponse = await chatWithCoze('你好', false)
        console.log('非流式响应对象:', normalResponse)
        
        const normalDebugMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `[DEBUG] 非流式响应: ${JSON.stringify(normalResponse, null, 2)}`,
          type: 'message-info'
        }
        this.chatMessages.push(normalDebugMessage)
        
      } catch (error) {
        console.error('API调试失败:', error)
        const errorMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `API调试失败：${error.message}`,
          type: 'message-error'
        }
        this.chatMessages.push(errorMessage)
      } finally {
        this.isTyping = false
        this.scrollToBottom()
      }
    },
    
    async debugStreamRaw() {
      try {
        this.isTyping = true
        const testMessage = {
          id: Date.now(),
          sender: '系统',
          content: '正在获取原始流式数据...',
          type: 'message-info'
        }
        this.chatMessages.push(testMessage)
        
        const stream = await chatWithCoze('你好', true)
        const reader = stream.getReader()
        const decoder = new TextDecoder()
        let rawData = ''
        
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) {
            break
          }
          
          const chunk = decoder.decode(value)
          rawData += chunk
          
          // 实时显示原始数据
          const rawDebugMessage = {
            id: Date.now() + 1,
            sender: '系统',
            content: `[RAW] ${chunk}`,
            type: 'message-info'
          }
          this.chatMessages.push(rawDebugMessage)
          this.scrollToBottom()
        }
        
        console.log('完整原始数据:', rawData)
        
      } catch (error) {
        console.error('原始流调试失败:', error)
        const errorMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `原始流调试失败：${error.message}`,
          type: 'message-error'
        }
        this.chatMessages.push(errorMessage)
      } finally {
        this.isTyping = false
        this.scrollToBottom()
      }
    },
    
    async simpleTest() {
      try {
        this.isTyping = true
        const testMessage = {
          id: Date.now(),
          sender: '系统',
          content: '开始简单测试...',
          type: 'message-info'
        }
        this.chatMessages.push(testMessage)
        
        // 直接调用API并显示结果
        const response = await chatWithCoze('你好', false)
        console.log('简单测试响应:', response)
        
        const resultMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `简单测试结果: ${JSON.stringify(response, null, 2)}`,
          type: 'message-info'
        }
        this.chatMessages.push(resultMessage)
        
      } catch (error) {
        console.error('简单测试失败:', error)
        const errorMessage = {
          id: Date.now() + 1,
          sender: '系统',
          content: `简单测试失败：${error.message}`,
          type: 'message-error'
        }
        this.chatMessages.push(errorMessage)
      } finally {
        this.isTyping = false
        this.scrollToBottom()
      }
    },
    
    scrollToBottom() {
      const chatContainer = document.querySelector('.chat-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }
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

.chat-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stream-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.thinking-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.debug-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.chat-container {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 15px;
}

.message {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.message-question {
  background: #e3f2fd;
  border-left: 4px solid #3498db;
}

.message-answer {
  background: #f1f8e9;
  border-left: 4px solid #2ecc71;
  animation: fadeInUp 0.3s ease-out;
  position: relative;
}

/* 移除打字机光标效果，避免干扰阅读 */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-thinking {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
  font-style: italic;
  color: #666;
  position: relative;
}

.message-thinking::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff9800, #ffc107, #ff9800);
  animation: thinking-progress 2s infinite;
  width: 100%;
}

.message-thinking-complete {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
  font-style: italic;
  color: #666;
  position: relative;
}

@keyframes thinking-progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.message-error {
  background: #ffebee;
  border-left: 4px solid #f44336;
}

.message-info {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.message-success {
  background: #e8f5e8;
  border-left: 4px solid #4caf50;
}

.typing-indicator {
  display: inline-flex;
  gap: 4px;
}

.typing-indicator i {
  font-size: 8px;
  color: #666;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator i:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator i:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.thinking-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.thinking-indicator i {
  font-size: 16px;
  color: #3498db;
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

.chat-input input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-outline {
  background: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.btn-outline:hover:not(:disabled) {
  background: #3498db;
  color: white;
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
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .chat-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
