import { createRouter, createWebHistory } from 'vue-router'
import layout from '../views/layout.vue'
import Home from '../views/HomeView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children:[
        {
          path:"/",
          name:"home",
          component:Home,
        },
        {
          path:"/setting",
          name:"setting",
          component:()=>import("../views/SettingView/index.vue"),
        },
        {
          path:"/ai",
          name:"ai",
          component:()=>import("../views/AiView/index.vue"),
        },
        {
          path:"/medical",
          name:"medical",
          component:()=>import("../views/MedicalView/index.vue"),
        },
        {
          path:"/data",
          name:"data",
          component:()=>import("../views/DataView/index.vue"),
        },
        {
          path:"/safe",
          name:"safe",
          component:()=>import("../views/SafeView/index.vue"),
        },
        {
          path:"/performance",
          name:"performance",
          component:()=>import("../views/PerformanceView/index.vue"),
        },
        {
          path:"/technology",
          name:"technology",
          component:()=>import("../views/TechnologyView/index.vue"),
        }
      ]
    },
   
  ],
})

export default router
