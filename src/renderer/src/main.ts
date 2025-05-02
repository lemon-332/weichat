import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/assets/icon/iconfont.css'
import '@/assets/scss/styles.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'

import router from '@/router'

import App from './App.vue'

const app = createApp(App)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
