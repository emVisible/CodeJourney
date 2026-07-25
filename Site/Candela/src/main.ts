import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@icon-park/vue-next/styles/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from './router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



app.use(ElementPlus,{locale:zhCn})
app.use(router)
app.mount("#app")
