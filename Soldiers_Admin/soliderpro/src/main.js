//导入vue
import { createApp } from 'vue'
//导入vue插件
import axios from 'axios'
import VueAxios from 'vue-axios'
//导入组件
import router from './router'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 创建Vue对象
const app = createApp(App)

// 将路由对象绑定到Vue对象
app.use(router)

// 将vue-axios与axios关联并绑定到Vue对象
app.use(VueAxios, axios)

//引用Antd组件
app.use(Antd)

// 挂载使用Vue对象
app.mount('#app')
