import { createApp } from 'vue'
//@ts-ignore
import App from '@/App.vue'
//引入模板的全局的样式
import '@/styles/index.scss'
// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore  忽略当前文件ts类型的检测，否则有红色提示（打包会失败）
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 获取应用实例对象
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, // element-plus 国际化配置
})
// 环境配置测试
console.log(import.meta.env)
//svg 插件需要配置代码
import 'virtual:svg-icons-register'

// 安装自定义插件
import gloablComponent from './components/index'

// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'

app.use(gloablComponent)
app.use(router)
app.use(pinia)

// 引入路由鉴权文件
import './permisstion'

// // 测试代码：测试假接口能否使用
// import axios from 'axios';
// // 登录接口
// axios({
//     url: '/api/user/login',
//     method: "post",
//     data: {
//         username: 'admin',
//         password: '111111'
//     }
// })

// 将应用挂载到挂载点上
app.mount('#app')
