// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type { loginFormData } from './type'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 暴露请求函数
// 登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () => request.get(API.USERINFO_URL)
