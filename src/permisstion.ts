//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router'
import setting from './setting'
import nprogrss from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogrss.configure({ showSpinner: false }) // 不显示加载圆球
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
let useStore = useUserStore(pinia)

//全局守卫:项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  //to: 你将要访问哪个路由
  //from: 你从哪个路由而来
  //next: 路由的放行函数
  nprogrss.start() // 进度条
  // 获取 token, 去判断用户登录、还是未登录
  let token = useStore.token
  // 获取用户名字
  let username = useStore.username
  // 用户登录判断
  if (token) {
    // 登录成功，访问 login，不能访问，指向首页
    if (to.path == './login') {
      next({ path: '/' })
    } else {
      // 登录成功访问其余6个路由（登录排除）
      // 有用户信息
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        try {
          // 获取用户信息
          await useStore.userInfo()
          // 放行
          next()
        } catch (error) {
          // token 过期：获取不到用户信息了
          // 用户手动修改本地存储token
          // 退出登录 -> 用户相关的数据清空
          useStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
      next()
    }
  } else {
    // 用户未登录判断
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  next()
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogrss.done()
})

//第一个问题:任意路由切换实现进度条业务   --nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
