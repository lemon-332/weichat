import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/icon/iconfont.css'
import '@/assets/scss/styles.scss'

import '@/mockjs/index.ts'

import router from '@/router'

import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(router)
  .use(createPinia())

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
