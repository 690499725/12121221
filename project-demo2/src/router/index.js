import { createRouter, createWebHistory } from 'vue-router'
import layout from '../views/layout.vue'
import Home from '../views/HomeView/index.vue'
import { useTitleStore } from '../stores/titleStore'

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
          meta: {
            title: '控制面板'
          }
        },
        {
          path:"/setting",
          name:"setting",
          component:()=>import("../views/SettingView/index.vue"),
          meta: {
            title: '系统设置'
          }
        },
        {
          path:"/ai",
          name:"ai",
          component:()=>import("../views/AiView/index.vue"),
          meta: {
            title: '智能助手'
          }
        },
        {
          path:"/medical",
          name:"medical",
          component:()=>import("../views/MedicalView/index.vue"),
          meta: {
            title: '医疗管理'
          }
        },
        {
          path:"/data",
          name:"data",
          component:()=>import("../views/DataView/index.vue"),
          meta: {
            title: '数据管理'
          }
        },
        {
          path:"/safe",
          name:"safe",
          component:()=>import("../views/SafeView/index.vue"),
          meta: {
            title: '安全管理'
          }
        },
        {
          path:"/performance",
          name:"performance",
          component:()=>import("../views/PerformanceView/index.vue"),
          meta: {
            title: '性能监控'
          }
        },
        {
          path:"/technology",
          name:"technology",
          component:()=>import("../views/TechnologyView/index.vue"),
          meta: {
            title: '技术文档'
          }
        }

      ]
    },
   
  ],
})

// 路由守卫，自动设置标题
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    const titleStore = useTitleStore()
    titleStore.setTitle(to.meta.title)
  }
  next()
})

export default router
