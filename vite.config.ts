//import { defineConfig } from 'vite'   // defineConfig 已经过时，用 UserConfigExport 代替了
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vite.dev/config/
// mock 插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
//export default ({ command })=> {  // 上一版本的过时写法
// 注意这里要修改为函数形式
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true, //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
  }
}
