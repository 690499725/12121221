<template>
    <div class="header">
        <div class="left-content">
            <div class="title">控制面板 - DeepSeek 本地化部署控制台</div>
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
        </div>
    </div>
</template>

<script setup>

import { useMenuStore } from "@/stores/menuStore";
const menuStore = useMenuStore();
// const useMenuStore = useMenuStore();

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