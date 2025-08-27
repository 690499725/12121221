<template>
    <div class="layout-container">
        <SliderNavs />
        <div class="right-container" >
            <TopNavs />
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup >
import {ref,reactive} from "vue"
import SliderNavs from "@/components/SliderNavs/index.vue"
import TopNavs from "@/components/TopNavs/index.vue"


</script>
<style  scoped>
.layout-container {
    width: 100%;
    overflow-x: hidden;
}

.right-container {
    margin-left: 250px; /* 与侧边栏宽度一致 */
    transition: 0.3s ease-in;
    width: calc(100% - 250px); /* 修正宽度计算 */
    overflow-x: hidden;
}

.content {
    padding: 10px;
    overflow-x: hidden; 
    box-sizing: border-box;
    width: 100%;
}
</style>
