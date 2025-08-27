<template>
  <div class="slider-navs">
      <div class="logo">
        <el-icon><Discount /></el-icon>
        智慧医疗
      </div>
      <el-menu  
      background-color="#2c3e50"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="active"
      router
      class="el-menu-vertical-demo"
      @select="handleSelect"
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>控制面板</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <!-- <component class="icon" is="Scissor"></component> -->
          <el-icon><Setting /></el-icon>
          <span>系统配置</span>
        </el-menu-item>
        <el-menu-item index="/ai">
          <el-icon><Opportunity /></el-icon>
          <span>智能助手</span>
        </el-menu-item>
        <el-menu-item index="/medical">
          <el-icon><CirclePlusFilled /></el-icon>
          <span>医疗场景</span>
        </el-menu-item>
         <el-menu-item index="/data">
          <el-icon><Coin /></el-icon>
          <span>数据管理</span>
        </el-menu-item>
         <el-menu-item index="/safe">
          <el-icon><Bell /></el-icon>
          <span>安全管理</span>
        </el-menu-item>
         <el-menu-item index="/performance">
          <el-icon><Chicken /></el-icon>
          <span>性能监控</span>
        </el-menu-item>
         <el-menu-item index="/technology">
          <el-icon><Sunset /></el-icon>
          <span>技术支持</span>
        </el-menu-item>
      </el-menu>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
const active = ref('/')
const menuStore = useMenuStore();

if (localStorage.getItem("active")) {
  active.value = localStorage.getItem("active");
}

const handleSelect = (index) => { 
  // menuStore.setActive(index);
  localStorage.setItem("active", index);
}

</script>
<style scoped>
.slider-navs{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    max-width: 250px;
    background-color: #2c3e50;
    transition: 0.3s ease-in;
    border: 1px solid rgb(138, 130, 130);
    overflow: hidden;
    z-index: 1000;
}

.el-menu-vertical-demo span{
  font-weight: 700;
  font-size: 16px;
}

.logo{
  width: 100%;
  height: 72px;
  background-color: #2c3e50;
  text-align: center;
  font-size: 25px;
  color: #fff;
  line-height: 72px;
  border-bottom: 1px solid #425262;
  margin-bottom: 10px;
}

/* 添加选中项的背景色样式 */
:deep(.el-menu-item.is-active) {
  background-color: #34495e ;
  border-left: 4px solid #3498db;
}

:deep(.el-menu-item:hover) {
  background-color: #34495e;
}
</style>