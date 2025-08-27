<template>
  <div class="app-container">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import {ref,reactive} from "vue"

</script>
<style>
/* 全局CSS重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  overflow-x: hidden;
}

.app-container {
  width: 100%;
  overflow-x: hidden;
}

/* Element Plus 菜单样式覆盖 */
.el-menu {
  border-right: none !important;
}

/* 确保所有容器都不会超出视口 */
.layout-container,
.right-container,
.content,
.header {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
