import { defineStore } from 'pinia'

export const useTitleStore = defineStore('title', {
  state: () => ({
    title: '控制面板',
    subtitle: 'DeepSeek 本地化部署控制台'
  }),
  
  getters: {
    fullTitle: (state) => {
      return `${state.title} - ${state.subtitle}`
    }
  },
  
  actions: {
    setTitle(title) {
      this.title = title
    },
    
    setSubtitle(subtitle) {
      this.subtitle = subtitle
    },
    
    setFullTitle(title, subtitle) {
      this.title = title
      this.subtitle = subtitle
    }
  }
})
