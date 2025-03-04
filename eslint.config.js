// 导入必要的规则集模块
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 定义要检查的文件
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },

  // 定义要忽略的文件或目录
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_nodules/**',
    ],
  },

  // 应用推荐的 JS/TS 规则集
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 应用 Vue 插件的基础规则集
  ...pluginVue.configs['flat/essential'],

  /* 指定如何解析语法 */
  {
    languageOptions: {
      parser: vueEslintParser,
      globals: globals.browser,
    },
  },

  // 来自插件的规则
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  {
    plugins: {
      pluginVue,
    },
    rules: {
      // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      'pluginVue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'pluginVue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
      'pluginVue/no-mutating-props': 'off', // 不允许组件 prop的改变
      'pluginVue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    },
  },
  {
    plugins: {
      tseslint,
    },
    rules: {
      // eslint（https://eslint.bootcss.com/docs/rules/）
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符
    },
  },
]
