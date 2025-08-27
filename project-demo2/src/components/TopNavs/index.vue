<template>
    <div class="header">
        <div class="left-content">
             <div class="title">{{ titleStore.fullTitle }}</div>
        </div>
        <div class="right-content">
            <div class="user-info">
                <span class="icon"><el-icon><List /></el-icon></span>
                <div class="user-details">
                    <span>张医生</span>
                    <div class="user-a">
                        <span>桂林市人民医院</span>
                    </div>
                </div>
            </div>
            <button class="fullscreen-btn" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏'">
                <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'">全屏</i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTitleStore } from '@/stores/titleStore'
const titleStore = useTitleStore()
const isFullscreen = ref(false)

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      isFullscreen.value = true
    }).catch(err => {
      console.log('全屏失败:', err)
    })
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
    }).catch(err => {
      console.log('退出全屏失败:', err)
    })
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.header {
    height: 70px;
    color: #0f0f0f;
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    align-items: center;
    font-size: 22px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebe9e9;
    background: white;
    overflow: hidden;
}

.left-content {
    font-weight: 700;
    flex: 1;
    min-width: 0;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.right-content {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 15px;
}

.fullscreen-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #3498db;
    font-size: 16px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fullscreen-btn:hover {
    background: rgba(52, 152, 219, 0.1);
    transform: scale(1.1);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon {
    font-size: 15px;
    text-align: center;
    color: #3498db;
}

.user-details {
    margin-right: 20px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

.user-a {
    font-size: 12px;
    color: #797979;
}
</style>