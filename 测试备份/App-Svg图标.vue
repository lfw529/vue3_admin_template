<template>
  <div>
    <h1>SVG 测试</h1>
    <!-- 测试SVG图标使用-->
    <!-- svg:图标外层容器节点，内部需要与 use 标签结合使用 -->
    <svg style="width: 30px; height: 30px">
      <!-- xlink: href 执行用哪一个图标，属性值务必为 # icon-图标名字 -->
      <!-- use 标签 fill 属性可以设置图标的颜色 -->
      <use xlink:href="#icon-phone" fill="red"></use>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
