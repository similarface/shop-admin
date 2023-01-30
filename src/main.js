import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }

// 创建后挂载
app.use(router)
app.use(store)
app.use(ElementPlus)


import 'virtual:windi.css'
app.mount('#app')