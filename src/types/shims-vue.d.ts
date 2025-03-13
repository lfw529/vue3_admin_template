// shims-vue.d.ts
declare module '@/utils/request' {
  const request: any // 根据实际模块类型调整（如 Axios 实例）
  export default request
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/api/user' {
  // 登录接口方法
  export const reqLogin = (data: loginFormData) =>
    request.post(API.LOGIN_URL, data)
  // 获取用户信息接口方法
  export const reqUserInfo = () => request.get(API.USERINFO_URL)
}

declare module '@/api/user/type' {
  // 根据实际导出内容声明类型
  export interface loginFormData {
    username: string
    password: string
  }
  export interface loginResponseData {
    code: number
    data: dataType
  }
}

declare module '@/store/modules/user' {
  export const useUserStore: () => StoreDefinition<
    'User',
    UserState,
    {},
    {
      userLogin(data: loginFormData): Promise<string>
      userInfo(): Promise<void>
    }
  >
}

declare module '@/utils/token' {
  export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token)
  }

  export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
  }

  export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN')
  }
}

declare module '@/utils/time' {
  export const getTime = () => {
    let message = ''
    // 通过内置构造函数 Date
    let hours = new Date().getHours()
    if (hours <= 9) {
      message = '早上'
    } else if (hours <= 12) {
      message = '上午'
    } else if (hours <= 18) {
      message = '下午'
    } else {
      message = '晚上'
    }
    return message
  }
}

declare module '@/router/routes' {
  export const constantRoute = [
    {
      // 登录
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login',
    },
    {
      // 登录成功以后战术数据的路由
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
        },
      ],
    },
    {
      // 404
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404',
    },
    {
      // 任意
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
    },
  ]
}

declare module '@/router' {
  // 显式声明路由模块类型‌:ml-citation{ref="5,8" data="citationList"}

  export function afterEach(arg0: (to: any, from: any) => void) {
    throw new Error('Function not implemented.')
  }

  export function beforeEach(arg0: (to: any, from: any, next: any) => void) {
    throw new Error('Function not implemented.')
  }
}

declare module 'nprogress'
